"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { LogOutIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { authClient } from "@/lib/auth-client"

export type MemberSummary = {
  id: string
  userId: string
  role: string
  createdAt: string
  user: {
    id: string
    name: string
    email: string
    image: string | null
  }
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

function roleBadgeVariant(role: string) {
  if (role === "owner") return "default" as const
  if (role === "admin") return "secondary" as const
  return "outline" as const
}

export function OrganizationSettings({
  organization,
  members,
  currentUserId,
  currentRole,
}: {
  organization: {
    id: string
    name: string
    slug: string
    logo: string | null
  }
  members: MemberSummary[]
  currentUserId: string
  currentRole: string
}) {
  const router = useRouter()
  const [name, setName] = useState(organization.name)
  const [slug, setSlug] = useState(organization.slug)
  const [logo, setLogo] = useState(organization.logo ?? "")
  const [organizationError, setOrganizationError] = useState<string | null>(
    null
  )
  const [isSavingOrganization, setIsSavingOrganization] = useState(false)
  const [pendingMember, setPendingMember] = useState<string | null>(null)
  const [memberToRemove, setMemberToRemove] = useState<MemberSummary | null>(
    null
  )
  const [isLeaveOpen, setIsLeaveOpen] = useState(false)

  const canManage = currentRole === "owner" || currentRole === "admin"

  function canManageMember(member: MemberSummary) {
    if (!canManage || member.userId === currentUserId) return false
    if (currentRole === "admin" && member.role === "owner") return false
    return true
  }

  async function saveOrganization(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setOrganizationError(null)

    if (!name.trim() || !slug.trim()) {
      setOrganizationError("Name and slug are required")
      return
    }

    setIsSavingOrganization(true)
    const { error } = await authClient.organization.update({
      organizationId: organization.id,
      data: {
        name: name.trim(),
        slug: slug.trim(),
        logo: logo.trim() || null,
      },
    })
    setIsSavingOrganization(false)

    if (error) {
      setOrganizationError(error.message ?? "Unable to update organization")
      return
    }

    toast.success("Organization updated")
    router.refresh()
  }

  async function updateRole(member: MemberSummary, role: string) {
    setPendingMember(member.id)
    const { error } = await authClient.organization.updateMemberRole({
      memberId: member.id,
      role,
      organizationId: organization.id,
    })
    setPendingMember(null)

    if (error) {
      toast.error(error.message ?? "Unable to update the member role")
      return
    }

    toast.success("Member role updated")
    router.refresh()
  }

  async function removeMember() {
    if (!memberToRemove) return

    setPendingMember(memberToRemove.id)
    const { error } = await authClient.organization.removeMember({
      memberIdOrEmail: memberToRemove.id,
      organizationId: organization.id,
    })
    setPendingMember(null)
    setMemberToRemove(null)

    if (error) {
      toast.error(error.message ?? "Unable to remove the member")
      return
    }

    toast.success("Member removed")
    router.refresh()
  }

  async function leaveOrganization() {
    setPendingMember("leave")
    const { error } = await authClient.organization.leave({
      organizationId: organization.id,
    })

    if (error) {
      setPendingMember(null)
      setIsLeaveOpen(false)
      toast.error(error.message ?? "Unable to leave the organization")
      return
    }

    await authClient.organization.setActive({ organizationId: null })
    setIsLeaveOpen(false)
    router.push("/choose-organization")
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-0 bg-transparent">
        <CardHeader>
          <CardTitle>Organization profile</CardTitle>
          <CardDescription>
            The name, slug and logo shown in the organization switcher.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={saveOrganization} className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Avatar size="lg">
                {logo ? <AvatarImage src={logo} alt="" /> : null}
                <AvatarFallback>
                  {initials(name || organization.slug)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {name || organization.name}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {slug || organization.slug}
                </p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="organization-name">Name</FieldLabel>
                <Input
                  id="organization-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="organization"
                  disabled={!canManage}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="organization-slug">Slug</FieldLabel>
                <Input
                  id="organization-slug"
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  disabled={!canManage}
                  required
                />
                <FieldDescription>
                  Used in URLs and must be unique.
                </FieldDescription>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="organization-logo">Logo URL</FieldLabel>
              <Input
                id="organization-logo"
                value={logo}
                onChange={(event) => setLogo(event.target.value)}
                placeholder="https://example.com/logo.png"
                type="url"
                disabled={!canManage}
              />
            </Field>
            {organizationError ? (
              <FieldError>{organizationError}</FieldError>
            ) : null}
            {canManage ? (
              <div>
                <Button type="submit" disabled={isSavingOrganization}>
                  {isSavingOrganization ? "Saving…" : "Save organization"}
                </Button>
              </div>
            ) : (
              <FieldDescription>
                Only organization owners and admins can edit these details.
              </FieldDescription>
            )}
          </form>
        </CardContent>
      </Card>

      <Card className="border-0 bg-transparent">
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>
            {members.length} {members.length === 1 ? "member" : "members"} in
            this organization.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {members.map((member) => {
            const isSelf = member.userId === currentUserId
            const manageable = canManageMember(member)

            return (
              <div
                key={member.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar>
                    {member.user.image ? (
                      <AvatarImage src={member.user.image} alt="" />
                    ) : null}
                    <AvatarFallback>
                      {initials(member.user.name || member.user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">
                        {member.user.name}
                      </p>
                      {isSelf ? <Badge variant="secondary">You</Badge> : null}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {member.user.email} · Joined{" "}
                      {formatDistanceToNow(new Date(member.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {manageable ? (
                    <NativeSelect
                      size="sm"
                      value={member.role}
                      onChange={(event) =>
                        updateRole(member, event.target.value)
                      }
                      disabled={pendingMember !== null}
                      aria-label={`Role for ${member.user.name}`}
                    >
                      <NativeSelectOption value="member">
                        Member
                      </NativeSelectOption>
                      <NativeSelectOption value="admin">
                        Admin
                      </NativeSelectOption>
                      {currentRole === "owner" ? (
                        <NativeSelectOption value="owner">
                          Owner
                        </NativeSelectOption>
                      ) : null}
                    </NativeSelect>
                  ) : (
                    <Badge variant={roleBadgeVariant(member.role)}>
                      {member.role}
                    </Badge>
                  )}

                  {manageable ? (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Remove ${member.user.name}`}
                      disabled={pendingMember !== null}
                      onClick={() => setMemberToRemove(member)}
                    >
                      <Trash2Icon />
                    </Button>
                  ) : null}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card className="border-0 bg-transparent">
        <CardHeader>
          <CardTitle>Leave organization</CardTitle>
          <CardDescription>
            You&apos;ll lose access to this organization&apos;s workflows.
          </CardDescription>
        </CardHeader>
        <CardFooter className="border-0 bg-transparent">
          <Button
            variant="destructive"
            onClick={() => setIsLeaveOpen(true)}
            disabled={pendingMember !== null}
          >
            <LogOutIcon />
            Leave organization
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog
        open={memberToRemove !== null}
        onOpenChange={(open) => {
          if (!open) setMemberToRemove(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove member?</AlertDialogTitle>
            <AlertDialogDescription>
              {memberToRemove?.user.name} will lose access to this organization
              and its workflows.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={removeMember}
              disabled={pendingMember !== null}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isLeaveOpen} onOpenChange={setIsLeaveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave organization?</AlertDialogTitle>
            <AlertDialogDescription>
              You&apos;ll need a new invitation to rejoin {organization.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={leaveOrganization}
              disabled={pendingMember !== null}
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
