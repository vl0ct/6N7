/**
 * Imports Clerk users, password hashes and organization memberships into
 * Better Auth.
 *
 * Usage:
 *   1. Export users from the Clerk dashboard and save the CSV as
 *      `exported_users.csv` in the project root.
 *   2. Make sure CLERK_SECRET_KEY, DATABASE_URL, BETTER_AUTH_SECRET and
 *      BETTER_AUTH_URL are set in `.env.local`.
 *   3. Run `pnpm auth:migrate-clerk`.
 *
 * The script is idempotent: rows that already exist are left untouched.
 */
import { readFile } from "node:fs/promises"

import { parse } from "csv-parse/sync"
import { config } from "dotenv"

config({ path: ".env.local" })

const { auth } = await import("../lib/auth")

type ClerkCsvUser = {
  id: string
  first_name: string
  last_name: string
  username: string
  primary_email_address: string
  primary_phone_number: string
  verified_email_addresses: string
  unverified_email_addresses: string
  verified_phone_numbers: string
  unverified_phone_numbers: string
  totp_secret: string
  password_digest: string
  password_hasher: string
}

type ClerkExternalAccount = {
  id: string
  provider: string
  provider_user_id: string
  approved_scopes: string
  email_address: string
  first_name: string
  last_name: string
  image_url: string
  created_at: number
  updated_at: number
}

type ClerkUser = {
  id: string
  first_name: string | null
  last_name: string | null
  username: string | null
  image_url: string
  primary_email_address_id: string | null
  email_addresses: { id: string; email_address: string }[]
  created_at: number
  updated_at: number
  external_accounts: ClerkExternalAccount[]
}

type ClerkOrganization = {
  id: string
  name: string
  slug: string | null
  image_url: string | null
  created_at: number
  updated_at: number
}

type ClerkMembership = {
  id: string
  role: string
  created_at: number
  updated_at: number
  public_user_data: {
    user_id: string
  } | null
}

const clerkSecretKey = process.env.CLERK_SECRET_KEY
const context = await auth.$context

async function clerkGet<T>(path: string): Promise<T> {
  if (!clerkSecretKey) {
    throw new Error("CLERK_SECRET_KEY is not set")
  }

  const response = await fetch(`https://api.clerk.com/v1${path}`, {
    headers: { Authorization: `Bearer ${clerkSecretKey}` },
  })

  if (!response.ok) {
    throw new Error(
      `Clerk request failed (${response.status}): ${await response.text()}`
    )
  }

  return response.json() as Promise<T>
}

async function clerkGetAll<T>(path: string, pick: (response: unknown) => T[]) {
  const all: T[] = []
  const limit = 500

  for (let offset = 0; ; offset += limit) {
    const separator = path.includes("?") ? "&" : "?"
    const response = await clerkGet<unknown>(
      `${path}${separator}offset=${offset}&limit=${limit}`
    )
    const data = pick(response)
    all.push(...data)

    if (data.length < limit) break
  }

  return all
}

async function getClerkUsers() {
  return clerkGetAll<ClerkUser>("/users", (response) => response as ClerkUser[])
}

async function getClerkOrganizations() {
  return clerkGetAll<ClerkOrganization>(
    "/organizations",
    (response) => (response as { data: ClerkOrganization[] }).data
  )
}

async function getClerkMemberships(organizationId: string) {
  return clerkGetAll<ClerkMembership>(
    `/organizations/${organizationId}/memberships`,
    (response) => (response as { data: ClerkMembership[] }).data
  )
}

function getCSVData(csv: string) {
  return parse(csv, {
    columns: true,
    skip_empty_lines: true,
  }) as ClerkCsvUser[]
}

// Clerk's CSV encodes list columns as JSON arrays, so `[]` is a truthy string.
// Parse them properly instead of testing the raw cell.
function csvList(value: string): string[] {
  if (!value) return []

  try {
    const parsed: unknown = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  }
}

function safeDate(timestamp?: number | null): Date {
  if (!timestamp) return new Date()

  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) return new Date()

  const year = date.getFullYear()
  if (year < 2000 || year > 2100) return new Date()

  return date
}

function fullName(first?: string | null, last?: string | null) {
  return [first, last].filter(Boolean).join(" ") || "Unknown"
}

async function createRow(
  model: string,
  data: Record<string, unknown>,
  forceAllowId = false
) {
  return context.adapter.create<
    Record<string, unknown>,
    Record<string, unknown>
  >({
    model,
    data,
    forceAllowId,
  })
}

type WhereValue = string | number | boolean | string[] | number[] | Date | null

async function findOne(
  model: string,
  where: { field: string; value: WhereValue }[]
) {
  return context.adapter.findOne<Record<string, unknown>>({ model, where })
}

async function migrateUsers(csvUsers: ClerkCsvUser[], clerkUsers: ClerkUser[]) {
  let imported = 0
  let skipped = 0

  for (const csvUser of csvUsers) {
    const clerkUser = clerkUsers.find((user) => user.id === csvUser.id)

    const existing = await findOne("user", [{ field: "id", value: csvUser.id }])

    const createdAt = safeDate(clerkUser?.created_at)
    const updatedAt = safeDate(clerkUser?.updated_at)

    if (existing) {
      skipped += 1
    } else {
      await createRow(
        "user",
        {
          id: csvUser.id,
          name: fullName(csvUser.first_name, csvUser.last_name),
          email: csvUser.primary_email_address.trim().toLowerCase(),
          emailVerified: csvList(csvUser.verified_email_addresses).length > 0,
          image: clerkUser?.image_url ?? null,
          createdAt,
          updatedAt,
        },
        true
      )
      imported += 1
    }

    // Clerk hashes passwords with bcrypt. Better Auth's configured verifier
    // accepts both bcrypt (migrated users) and scrypt (new sign-ups).
    if (csvUser.password_digest) {
      const existingCredential = await findOne("account", [
        { field: "userId", value: csvUser.id },
        { field: "providerId", value: "credential" },
      ])

      if (!existingCredential) {
        await createRow("account", {
          providerId: "credential",
          accountId: csvUser.id,
          userId: csvUser.id,
          password: csvUser.password_digest,
          createdAt,
          updatedAt,
        })
      }
    }

    for (const externalAccount of clerkUser?.external_accounts ?? []) {
      const existingAccount = await findOne("account", [
        { field: "id", value: externalAccount.id },
      ])
      if (existingAccount) continue

      await createRow(
        "account",
        {
          id: externalAccount.id,
          providerId: externalAccount.provider.replace(/^oauth_/, ""),
          accountId: externalAccount.provider_user_id,
          userId: csvUser.id,
          scope: externalAccount.approved_scopes || null,
          createdAt: safeDate(externalAccount.created_at),
          updatedAt: safeDate(externalAccount.updated_at),
        },
        true
      )
    }
  }

  return { imported, skipped }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function mapRole(role: string) {
  const normalized = role.replace(/^org:/, "")
  if (normalized === "admin") return "admin"
  if (normalized === "owner") return "owner"
  return "member"
}

async function migrateOrganizations() {
  const organizations = await getClerkOrganizations()
  let imported = 0
  let skipped = 0

  for (const organization of organizations) {
    const existing = await findOne("organization", [
      { field: "id", value: organization.id },
    ])

    if (!existing) {
      const createdAt = safeDate(organization.created_at)
      const slug =
        organization.slug ||
        `${slugify(organization.name) || "organization"}-${organization.id.slice(-6)}`

      await createRow(
        "organization",
        {
          id: organization.id,
          name: organization.name,
          slug,
          logo: organization.image_url,
          createdAt,
          metadata: null,
        },
        true
      )
    } else {
      skipped += 1
    }

    const memberships = await getClerkMemberships(organization.id)

    for (const membership of memberships) {
      const userId = membership.public_user_data?.user_id
      if (!userId) continue

      const user = await findOne("user", [{ field: "id", value: userId }])
      if (!user) continue

      const existingMember = await findOne("member", [
        { field: "organizationId", value: organization.id },
        { field: "userId", value: userId },
      ])
      if (existingMember) continue

      await createRow(
        "member",
        {
          id: membership.id,
          organizationId: organization.id,
          userId,
          role: mapRole(membership.role),
          createdAt: safeDate(membership.created_at),
        },
        true
      )
    }

    imported += 1
  }

  return { imported, skipped }
}

async function main() {
  const csv = await readFile("exported_users.csv", "utf8")
  const csvUsers = getCSVData(csv)
  const clerkUsers = await getClerkUsers()

  console.log(`Found ${csvUsers.length} Clerk users in the export.`)

  const withoutPassword = csvUsers.filter(
    (user) => !user.password_digest
  ).length
  if (withoutPassword > 0) {
    console.warn(
      `${withoutPassword} user(s) have no password hash in the export; they will need to reset their password or use a social login.`
    )
  }

  const unsupportedHasher = csvUsers.filter(
    (user) =>
      user.password_digest &&
      user.password_hasher &&
      !user.password_hasher.toLowerCase().includes("bcrypt")
  ).length
  if (unsupportedHasher > 0) {
    console.warn(
      `${unsupportedHasher} user(s) use a non-bcrypt password hasher; they will need to reset their password.`
    )
  }

  const users = await migrateUsers(csvUsers, clerkUsers)
  console.log(`Users: ${users.imported} imported, ${users.skipped} skipped.`)

  const organizations = await migrateOrganizations()
  console.log(
    `Organizations: ${organizations.imported} imported, ${organizations.skipped} already present.`
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Migration failed:", error)
    process.exit(1)
  })
