import Link from "next/link"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form"

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>
}) {
  const { token, error } = await searchParams

  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="mx-auto">
          <Logo />
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>
              {token && !error ? "Choose a new password" : "Link expired"}
            </CardTitle>
            <CardDescription>
              {token && !error
                ? "Pick a password you haven't used before."
                : "This reset link is invalid or has expired. Request a fresh one to continue."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {token && !error ? (
              <ResetPasswordForm token={token} />
            ) : (
              <Button
                className="w-full"
                render={<Link href="/forgot-password" />}
              >
                Request a new link
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
