import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"

/**
 * Clears the session cookie and leaves the app.
 *
 * The hard navigation is deliberate: the App Router cache still holds the
 * signed-in RSC payloads, so `router.push()` can repaint the previous screen
 * from cache, and it also guarantees the cookie deletion from the sign-out
 * response is in effect before the next request is made. A cookie that outlives
 * its session is what puts the app into a redirect loop.
 */
export async function signOutAndLeave(destination = "/") {
  const { error } = await authClient.signOut()

  // Without a successful response the cookie is still valid; say so instead of
  // pretending the user is signed out.
  if (error) {
    toast.error(error.message ?? "Unable to sign out")
    return false
  }

  window.location.replace(destination)
  return true
}
