"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { LaptopIcon, LogOutIcon, ShieldCheckIcon } from "lucide-react"
import { toast } from "sonner"

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
import { authClient } from "@/lib/auth-client"

export type SessionSummary = {
  id: string
  token: string
  createdAt: string
  expiresAt: string
  ipAddress: string | null
  userAgent: string | null
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export function AccountSettings({
  user,
  sessions,
  currentSessionToken,
}: {
  user: { name: string; email: string; image: string | null }
  sessions: SessionSummary[]
  currentSessionToken: string
}) {
  const router = useRouter()
  const [name, setName] = useState(user.name)
  const [image, setImage] = useState(user.image ?? "")
  const [profileError, setProfileError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [pendingSession, setPendingSession] = useState<string | null>(null)

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setProfileError(null)

    if (!name.trim()) {
      setProfileError("Name is required")
      return
    }

    setIsSavingProfile(true)
    const { error } = await authClient.updateUser({
      name: name.trim(),
      image: image.trim() || null,
    })
    setIsSavingProfile(false)

    if (error) {
      setProfileError(error.message ?? "Unable to update your profile")
      return
    }

    toast.success("Profile updated")
    router.refresh()
  }

  async function changePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPasswordError(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const currentPassword = String(formData.get("currentPassword"))
    const newPassword = String(formData.get("newPassword"))
    const confirmPassword = String(formData.get("confirmPassword"))

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    setIsChangingPassword(true)
    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    })
    setIsChangingPassword(false)

    if (error) {
      setPasswordError(error.message ?? "Unable to change your password")
      return
    }

    form.reset()
    toast.success("Password updated. Other sessions were signed out.")
    router.refresh()
  }

  async function revokeSession(token: string) {
    setPendingSession(token)
    const { error } = await authClient.revokeSession({ token })
    setPendingSession(null)

    if (error) {
      toast.error(error.message ?? "Unable to revoke the session")
      return
    }

    toast.success("Session revoked")
    router.refresh()
  }

  async function revokeOtherSessions() {
    setPendingSession("others")
    const { error } = await authClient.revokeOtherSessions()
    setPendingSession(null)

    if (error) {
      toast.error(error.message ?? "Unable to revoke the sessions")
      return
    }

    toast.success("Other sessions revoked")
    router.refresh()
  }

  async function revokeAllSessions() {
    setPendingSession("all")
    const { error } = await authClient.revokeSessions()
    setPendingSession(null)

    if (error) {
      toast.error(error.message ?? "Unable to sign out everywhere")
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-0 bg-transparent">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This is how you appear across the app and to your teammates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={saveProfile} className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Avatar size="lg">
                {image ? <AvatarImage src={image} alt="" /> : null}
                <AvatarFallback>{initials(name || user.email)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate font-medium">{name || "Your name"}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
            <Field>
              <FieldLabel htmlFor="profile-name">Name</FieldLabel>
              <Input
                id="profile-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="profile-image">Avatar URL</FieldLabel>
              <Input
                id="profile-image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="https://example.com/avatar.png"
                type="url"
              />
              <FieldDescription>
                Leave empty to use your initials.
              </FieldDescription>
            </Field>
            {profileError ? <FieldError>{profileError}</FieldError> : null}
            <div>
              <Button type="submit" disabled={isSavingProfile}>
                {isSavingProfile ? "Saving…" : "Save profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-0 bg-transparent">
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Choose a strong password you don&apos;t use anywhere else.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={changePassword} className="flex flex-col gap-5">
            <Field>
              <FieldLabel htmlFor="current-password">
                Current password
              </FieldLabel>
              <Input
                id="current-password"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="new-password">New password</FieldLabel>
                <Input
                  id="new-password"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </Field>
            </div>
            {passwordError ? <FieldError>{passwordError}</FieldError> : null}
            <div>
              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? "Updating…" : "Update password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-0 bg-transparent">
        <CardHeader>
          <CardTitle>Active sessions</CardTitle>
          <CardDescription>
            Devices currently signed in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {sessions.map((item) => {
            const isCurrent = item.token === currentSessionToken

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                    <LaptopIcon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">
                        {item.userAgent ?? "Unknown device"}
                      </p>
                      {isCurrent ? (
                        <Badge variant="secondary">Current</Badge>
                      ) : null}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.ipAddress ?? "Unknown IP"} · Signed in{" "}
                      {formatDistanceToNow(new Date(item.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                {isCurrent ? null : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => revokeSession(item.token)}
                    disabled={pendingSession !== null}
                  >
                    Revoke
                  </Button>
                )}
              </div>
            )
          })}
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 border-0 bg-transparent">
          <Button
            variant="outline"
            onClick={revokeOtherSessions}
            disabled={pendingSession !== null}
          >
            <ShieldCheckIcon />
            Sign out other sessions
          </Button>
          <Button
            variant="destructive"
            onClick={revokeAllSessions}
            disabled={pendingSession !== null}
          >
            <LogOutIcon />
            Sign out everywhere
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
