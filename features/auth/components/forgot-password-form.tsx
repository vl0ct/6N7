"use client"

import { useState } from "react"
import Link from "next/link"
import { MailCheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsPending(true)

    const email = String(new FormData(event.currentTarget).get("email"))
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: `${window.location.origin}/reset-password`,
    })

    setIsPending(false)

    if (error) {
      setError(error.message ?? "Unable to send the reset link")
      return
    }

    setSentTo(email)
  }

  if (sentTo) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3 rounded-md border border-border p-3">
          <MailCheckIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            If an account exists for{" "}
            <span className="font-medium text-foreground">{sentTo}</span>, a
            reset link is on its way. It expires in one hour.
          </p>
        </div>
        <Button variant="outline" className="w-full" render={<Link href="/sign-in" />}>
          Back to sign in
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
      </Field>
      {error ? <FieldError>{error}</FieldError> : null}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Sending link" : "Send reset link"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link
          href="/sign-in"
          className="text-foreground underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}
