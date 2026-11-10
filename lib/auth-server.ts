import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

import { auth } from "@/lib/auth"

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() })
)

/**
 * Ensures the request is authenticated. Use in Server Components, layouts and
 * Server Actions; API route handlers should return a 401 themselves.
 */
export async function requireSession() {
  const session = await getSession()

  if (!session) {
    redirect("/sign-in")
  }

  return session
}

/**
 * Returns the signed-in user together with their active organization.
 * Redirects to the organization picker when no organization is active.
 */
export async function requireOrganization() {
  const session = await requireSession()
  const organizationId = session.session.activeOrganizationId

  if (!organizationId) {
    redirect("/choose-organization")
  }

  return { session, organizationId }
}
