import * as React from "react"
import Link from "next/link"

import { LogoIcon } from "@/components/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {
  OrganizationSwitcher,
  type OrganizationSummary,
} from "@/features/auth/components/organization-switcher"
import {
  SettingsDialog,
  type SettingsDialogData,
} from "@/features/settings/components/settings-dialog"
import { createWorkflowAction } from "@/features/workflows/actions"
import { WorkflowNav } from "@/features/workflows/components/workflow-nav"
import { WorkflowSearch } from "@/features/workflows/components/workflow-search"
import type { Workflow } from "@/lib/db/schema"

export function AppSidebar({
  workflows,
  organizations,
  activeOrganizationId,
  settings,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  workflows: Workflow[]
  organizations: OrganizationSummary[]
  activeOrganizationId: string
  settings: SettingsDialogData
}) {
  return (
    <Sidebar variant="inset" collapsible="offcanvas" className="p-0" {...props}>
      <SidebarHeader className="flex-row items-center justify-between gap-1 py-3 pr-1 pl-3">
        <Link
          href="/dashboard"
          aria-label="6N7 dashboard"
          className="relative flex items-center gap-2 after:absolute after:-inset-3"
        >
          <LogoIcon className="size-5" />
          <span className="text-sm font-medium tracking-tight">6N7</span>
        </Link>
        <div className="flex items-center gap-1">
          <WorkflowSearch workflows={workflows} />
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <WorkflowNav
          workflows={workflows}
          onCreateWorkflow={createWorkflowAction}
        />
      </SidebarContent>
      <SidebarFooter className="gap-1 pl-1 pr-1 ">
        <div className="flex items-center gap-1">
          <div className="min-w-0 flex-1">
            <OrganizationSwitcher
              organizations={organizations}
              activeOrganizationId={activeOrganizationId}
              className="w-full max-w-none justify-start sm:max-w-none"
            />
          </div>
          <SettingsDialog {...settings} />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
