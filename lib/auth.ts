import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { organization } from "better-auth/plugins"
import { betterAuth } from "better-auth"
import { eq } from "drizzle-orm"

import { db, schema } from "@/lib/db"
import { sendPasswordResetEmail } from "@/lib/auth-email"
import { getSocialProviderCredentials } from "@/lib/auth-providers"

const google = getSocialProviderCredentials("google")
const github = getSocialProviderCredentials("github")

// Every Vercel deployment gets its own *.vercel.app host, so the documented
// "dynamic base URL" setup is used instead of a single BETTER_AUTH_URL: Better
// Auth resolves the base URL per request from the sanitized host, and
// allowedHosts are added to trustedOrigins automatically.
const allowedHosts = [
  "*.vercel.app",
  ...(process.env.NODE_ENV === "production" ? [] : ["localhost:3000"]),
]

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  baseURL: {
    allowedHosts,
    protocol: process.env.NODE_ENV === "development" ? "http" : "https",
  },
  socialProviders: {
    ...(google ? { google } : {}),
    ...(github ? { github } : {}),
  },
  emailAndPassword: {
    enabled: true,
    // A reset is the "I lost access" path, so drop every other session with it.
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      const email = sendPasswordResetEmail({
        to: user.email,
        name: user.name,
        url,
      }).catch((error) => {
        console.error("Failed to send password reset email", error)
      })

      // Not awaiting the mail keeps response timing from leaking whether the
      // address exists; `after` keeps the serverless invocation alive until the
      // provider responds. Imported lazily so scripts can import this module
      // outside the Next.js runtime.
      const { after } = await import("next/server")
      after(() => email)
    },
  },
  databaseHooks: {
    session: {
      create: {
        // Better Auth doesn't pick an active organization automatically. Mirror
        // Clerk's choose-organization flow by defaulting to the user's first
        // membership, so users land on their workspace immediately.
        before: async (session) => {
          const [membership] = await db
            .select({ organizationId: schema.member.organizationId })
            .from(schema.member)
            .where(eq(schema.member.userId, session.userId))
            .limit(1)

          return {
            data: {
              ...session,
              activeOrganizationId: membership?.organizationId ?? null,
            },
          }
        },
      },
    },
  },
  plugins: [organization(), nextCookies()],
})
