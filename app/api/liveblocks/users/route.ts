import { headers } from "next/headers"
import { and, eq, inArray } from "drizzle-orm"

import { db } from "@/lib/db"
import { member, user } from "@/lib/db/schema"
import { auth } from "@/lib/auth"

// `Liveblocks` is a global interface declared in liveblocks.config.ts.
type UserInfo = Liveblocks["UserMeta"]["info"]

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  const orgId = session?.session.activeOrganizationId

  if (!session || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  let userIds: unknown
  try {
    ;({ userIds } = await request.json())
  } catch {
    return new Response("Invalid JSON body", { status: 400 })
  }

  if (!Array.isArray(userIds) || userIds.some((id) => typeof id !== "string")) {
    return new Response("Expected { userIds: string[] }", { status: 400 })
  }

  const ids = userIds as string[]

  if (ids.length === 0) {
    return Response.json([])
  }

  // Only resolve users that belong to the caller's organization, so display
  // info can't be harvested for arbitrary users across other tenants.
  const rows = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    })
    .from(member)
    .innerJoin(user, eq(member.userId, user.id))
    .where(and(eq(member.organizationId, orgId), inArray(member.userId, ids)))

  const usersById = new Map(rows.map((row) => [row.id, row]))

  // Return one entry per requested ID, in the same order, null for unknown.
  const resolved: (UserInfo | null)[] = ids.map((id) => {
    const found = usersById.get(id)

    if (!found) {
      return null
    }

    return {
      name: found.name ?? found.email ?? "Anonymous",
      avatar: found.image ?? undefined,
    }
  })

  return Response.json(resolved)
}
