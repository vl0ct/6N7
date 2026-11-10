"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRightIcon, PlusIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { authClient } from "@/lib/auth-client"
import { toOrganizationSlug } from "@/features/auth/lib/to-organization-slug"
import type { OrganizationSummary } from "@/features/auth/components/organization-switcher"

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export function OrganizationPicker({
  organizations,
  activeOrganizationId,
}: {
  organizations: OrganizationSummary[]
  activeOrganizationId?: string | null
}) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  async function selectOrganization(organizationId: string) {
    setError(null)
    setIsPending(true)

    const { error } = await authClient.organization.setActive({
      organizationId,
    })

    if (error) {
      setError(error.message ?? "Unable to select organization")
      setIsPending(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  async function createOrganization(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsPending(true)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name")).trim()

    const { data, error } = await authClient.organization.create({
      name,
      slug: toOrganizationSlug(name),
    })

    if (error || !data) {
      setError(error?.message ?? "Unable to create organization")
      setIsPending(false)
      return
    }

    const { error: setActiveError } = await authClient.organization.setActive({
      organizationId: data.id,
    })

    if (setActiveError) {
      setError(
        setActiveError.message ??
          "Organization created, but it could not be selected"
      )
      setIsPending(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  async function signOut() {
    await authClient.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-6">
      {organizations.length > 0 ? (
        <div className="flex flex-col gap-2">
          {organizations.map((organization) => (
            <button
              key={organization.id}
              type="button"
              onClick={() => selectOrganization(organization.id)}
              disabled={isPending}
              className="flex w-full items-center gap-3 rounded-md border border-border p-3 text-left transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
            >
              <Avatar>
                {organization.logo ? (
                  <AvatarImage src={organization.logo} alt="" />
                ) : null}
                <AvatarFallback>{initials(organization.name)}</AvatarFallback>
              </Avatar>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">
                  {organization.name}
                </span>
                <span className="block truncate text-sm text-muted-foreground">
                  {organization.slug}
                </span>
              </span>
              {organization.id === activeOrganizationId ? (
                <span className="text-xs text-muted-foreground">Current</span>
              ) : (
                <ArrowRightIcon className="size-4 text-muted-foreground" />
              )}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          You&apos;re not a member of an organization yet. Create one to get
          started.
        </p>
      )}

      <form onSubmit={createOrganization} className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <PlusIcon className="size-4" />
          Create a new organization
        </div>
        <Field>
          <FieldLabel htmlFor="organization-name" className="sr-only">
            Organization name
          </FieldLabel>
          <Input
            id="organization-name"
            name="name"
            placeholder="Acme Inc."
            autoComplete="organization"
            required
          />
        </Field>
        {error ? <FieldError>{error}</FieldError> : null}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating…" : "Create organization"}
        </Button>
      </form>

      <Separator />
      <Button variant="ghost" onClick={signOut} className="self-start">
        Sign out
      </Button>
    </div>
  )
}
