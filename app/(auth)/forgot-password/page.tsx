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
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form"
import { getSession } from "@/lib/auth-server"

export default async function ForgotPasswordPage() {
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
            <CardTitle>Forgot your password?</CardTitle>
            <CardDescription>
              Enter your email and we&apos;ll send you a link to choose a new
              one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
