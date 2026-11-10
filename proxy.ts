import { getSessionCookie } from "better-auth/cookies"
import { NextResponse, type NextRequest } from "next/server"

const protectedPrefixes = ["/dashboard", "/workflows", "/choose-organization"]
const authPages = ["/sign-in", "/sign-up", "/forgot-password"]

function matchesPrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

// Optimistic redirects only. Every protected page, Server Action and Route
// Handler validates the session against the database itself.
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)
  const { pathname } = request.nextUrl

  if (
    !sessionCookie &&
    protectedPrefixes.some((p) => matchesPrefix(pathname, p))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  if (sessionCookie && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/workflows/:path*",
    "/choose-organization",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
  ],
}
