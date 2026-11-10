"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Building2Icon,
  CheckIcon,
  ChevronsUpDownIcon,
  PlusIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { toOrganizationSlug } from "@/features/auth/lib/to-organization-slug"
import { cn } from "@/lib/utils"

export type OrganizationSummary = {
  id: string
  name: string
  slug: string
  logo?: string | null
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export function OrganizationSwitcher({
  organizations,
  activeOrganizationId,
  className,
}: {
  organizations: OrganizationSummary[]
  activeOrganizationId?: string | null
  className?: string
}) {
  const router = useRouter()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const active = organizations.find((org) => org.id === activeOrganizationId)

  async function switchOrganization(organizationId: string) {
    if (organizationId === activeOrganizationId) return

    const { error } = await authClient.organization.setActive({
      organizationId,
    })

    if (error) {
      setError(error.message ?? "Unable to switch organization")
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

    setIsCreateOpen(false)
    setIsPending(false)
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "max-w-32 justify-start gap-1.5 px-2 sm:max-w-48",
                className
              )}
            >
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <Avatar size="sm">
                  {active?.logo ? (
                    <AvatarImage src={active.logo} alt="" />
                  ) : null}
                  <AvatarFallback>
                    {active ? initials(active.name) : <Building2Icon />}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">
                  {active?.name ?? "Select organization"}
                </span>
              </span>
              <ChevronsUpDownIcon className="text-muted-foreground" />
            </Button>
          }
        />
        <DropdownMenuContent className="w-64">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Organizations</DropdownMenuLabel>
            {organizations.map((organization) => (
              <DropdownMenuItem
                key={organization.id}
                onClick={() => switchOrganization(organization.id)}
              >
                <span className="truncate">{organization.name}</span>
                {organization.id === activeOrganizationId ? (
                  <CheckIcon className="ml-auto" />
                ) : null}
              </DropdownMenuItem>
            ))}
            {organizations.length === 0 ? (
              <DropdownMenuItem disabled>No organizations yet</DropdownMenuItem>
            ) : null}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsCreateOpen(true)}>
            <PlusIcon />
            Create organization
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <form onSubmit={createOrganization} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Create organization</DialogTitle>
              <DialogDescription>
                Organizations keep workflows and teammates separate.
              </DialogDescription>
            </DialogHeader>
            <Field>
              <FieldLabel htmlFor="organization-name">Name</FieldLabel>
              <Input
                id="organization-name"
                name="name"
                placeholder="Acme Inc."
                autoComplete="organization"
                required
              />
            </Field>
            {error ? <FieldError>{error}</FieldError> : null}
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating…" : "Create organization"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
