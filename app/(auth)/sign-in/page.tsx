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
import { SignInForm } from "@/features/auth/components/sign-in-form"
import { getSocialProviders } from "@/lib/auth-providers"
import { getSession } from "@/lib/auth-server"

export default async function SignInPage() {
  const session = await getSession()
  if (session) redirect("/dashboard")

  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="mx-auto">
          <Logo />
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm providers={getSocialProviders()} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
