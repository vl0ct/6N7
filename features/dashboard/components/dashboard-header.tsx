"use client"

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { WorkflowSelector } from "@/features/workflows/components/workflow-selector"
import type { Workflow } from "@/lib/db/schema"

// Floats over the content instead of taking up a row in the layout. The trigger
// is always available; the workflow selector only appears while the sidebar is
// hidden.
export function DashboardHeader({ workflows }: { workflows: Workflow[] }) {
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === "collapsed" || isMobile

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center gap-1 p-3">
      <SidebarTrigger className="pointer-events-auto bg-background/80 backdrop-blur-sm" />
      {isCollapsed ? (
        <WorkflowSelector
          workflows={workflows}
          className="pointer-events-auto bg-background/80 backdrop-blur-sm"
        />
      ) : null}
    </div>
  )
}
