import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

import { Logo } from "@/components/logo"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OrganizationPicker } from "@/features/auth/components/organization-picker"
import { auth } from "@/lib/auth"
import { getSession } from "@/lib/auth-server"

export default async function ChooseOrganizationPage() {
  const session = await getSession()
  if (!session) redirect("/sign-in")

  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
  })

  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link href="/" className="mx-auto">
          <Logo />
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>Choose an organization</CardTitle>
            <CardDescription>
              Select a workspace to continue, or create a new one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OrganizationPicker
              organizations={organizations ?? []}
              activeOrganizationId={session.session.activeOrganizationId}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
