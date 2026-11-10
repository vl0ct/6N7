import { headers } from "next/headers"

import { liveblocks } from "@/lib/liveblocks"
import { auth } from "@/lib/auth"

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user.id
  const orgId = session?.session.activeOrganizationId

  if (!session || !userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  // Identify the user with an ID token. Permissions are resolved per-room
  // from the user's groups - scope access to their active organization.
  const { status, body } = await liveblocks.identifyUser(
    {
      userId,
      groupIds: [orgId],
      organizationId: orgId,
    },
    {
      userInfo: {
        name: session.user.name ?? session.user.email ?? "Anonymous",
        avatar: session.user.image ?? undefined,
      },
    }
  )

  return new Response(body, { status })
}
