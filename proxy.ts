import { getSessionCookie } from "better-auth/cookies"
import { NextResponse, type NextRequest } from "next/server"

const protectedPrefixes = ["/dashboard", "/workflows", "/choose-organization"]

function matchesPrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

// Optimistic redirects only. Every protected page, Server Action and Route
// Handler validates the session against the database itself.
//
// The proxy deliberately never redirects the auth pages, even when a session
// cookie is present. A cookie only proves that a token was once issued, not
// that the session still exists: "sign out everywhere", revoking a session from
// another device and password resets all delete rows while leaving other
// browsers' cookies in place. If this file bounced /sign-in back to /dashboard
// on a stale cookie, the dashboard's own `requireSession()` redirect to
// /sign-in would bounce straight back, and the two would ping-pong for as long
// as the cookie lives. The auth pages already send signed-in visitors to
// /dashboard once the session is verified against the database.
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)
  const { pathname } = request.nextUrl

  if (
    !sessionCookie &&
    protectedPrefixes.some((p) => matchesPrefix(pathname, p))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/workflows/:path*", "/choose-organization"],
}
