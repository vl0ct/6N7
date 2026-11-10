"use client"

import { useState } from "react"
import {
  Building2Icon,
  SettingsIcon,
  UserRoundIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  AccountSettings,
  type SessionSummary,
} from "@/features/settings/components/account-settings"
import {
  OrganizationSettings,
  type MemberSummary,
} from "@/features/settings/components/organization-settings"

export type SettingsDialogData = {
  user: { name: string; email: string; image: string | null }
  sessions: SessionSummary[]
  currentSessionToken: string
  organization: {
    id: string
    name: string
    slug: string
    logo: string | null
  }
  members: MemberSummary[]
  currentUserId: string
  currentRole: string
}

const tabs = [
  { value: "account", label: "Account", icon: UserRoundIcon },
  { value: "organization", label: "Organization", icon: Building2Icon },
] as const

export function SettingsDialog(props: SettingsDialogData) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<(typeof tabs)[number]["value"]>("account")

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Settings"
        className="text-muted-foreground hover:text-foreground"
        onClick={() => setOpen(true)}
      >
        <SettingsIcon />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="flex h-[min(44rem,85vh)] flex-col gap-0 overflow-hidden rounded-xl! border-0 bg-canvas p-1 outline-none sm:max-w-4xl!"
        >
          <DialogDescription className="sr-only">
            Manage your account and organization settings.
          </DialogDescription>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden sm:flex-row">
            <aside className="flex shrink-0 flex-col gap-1 bg-canvas p-2 sm:w-52">
              <DialogTitle className="px-2 py-3 font-heading text-sm font-medium">
                Settings
              </DialogTitle>
              <nav className="flex sm:flex-1 sm:flex-col pl-1 gap-2 sm:gap-0 sm:pt-3">
                {tabs.map((item) => {
                  const Icon = item.icon
                  const isActive = tab === item.value

                  return (
                    <Button
                      key={item.value}
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "justify-start -ml-2",
                        !isActive && "text-muted-foreground"
                      )}
                      onClick={() => setTab(item.value)}
                    >
                      <Icon />
                      {item.label}
                    </Button>
                  )
                })}
              </nav>
            </aside>

            <div className="min-h-0 flex-1 rounded-md bg-canvas-frame overflow-y-auto sm:pt-0.5 sm:pl-2">
              {tab === "account" ? (
                <AccountSettings
                  user={props.user}
                  sessions={props.sessions}
                  currentSessionToken={props.currentSessionToken}
                />
              ) : (
                <OrganizationSettings
                  organization={props.organization}
                  members={props.members}
                  currentUserId={props.currentUserId}
                  currentRole={props.currentRole}
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
