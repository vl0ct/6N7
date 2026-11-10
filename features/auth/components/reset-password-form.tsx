"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const newPassword = String(formData.get("password"))

    if (newPassword !== String(formData.get("confirm"))) {
      setError("Those passwords do not match.")
      return
    }

    setIsPending(true)
    const { error } = await authClient.resetPassword({ newPassword, token })
    setIsPending(false)

    if (error) {
      setError(
        error.message ??
          "This reset link is no longer valid. Request a new one to continue."
      )
      return
    }

    toast.success("Password updated. Sign in with your new password.")
    router.push("/sign-in")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field>
        <FieldLabel htmlFor="password">New password</FieldLabel>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="confirm">Confirm new password</FieldLabel>
        <Input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </Field>
      {error ? <FieldError>{error}</FieldError> : null}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Saving password" : "Save new password"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Link not working?{" "}
        <Link
          href="/forgot-password"
          className="text-foreground underline underline-offset-4"
        >
          Request a new one
        </Link>
      </p>
    </form>
  )
}
