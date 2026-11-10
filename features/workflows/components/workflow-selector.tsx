"use client"

import { useTransition } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDownIcon, LayoutPanelLeftIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createWorkflowAction } from "@/features/workflows/actions"
import { generateSlug } from "@/features/workflows/lib/generate-slug"
import { cn } from "@/lib/utils"
import type { Workflow } from "@/lib/db/schema"

export function WorkflowSelector({
  workflows,
  className,
}: {
  workflows: Workflow[]
  className?: string
}) {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const activeId = pathname.startsWith("/workflows/")
    ? pathname.split("/")[2]
    : null
  const active = workflows.find((workflow) => workflow.id === activeId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "max-w-24 justify-start gap-1.5 px-2 sm:max-w-52",
              className
            )}
          >
            <LayoutPanelLeftIcon className="text-muted-foreground" />
            <span className="truncate">{active?.name ?? "Workflows"}</span>
            <ChevronDownIcon className="size-3.5 shrink-0 text-muted-foreground" />
          </Button>
        }
      />
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Workflows</DropdownMenuLabel>
          {workflows.map((workflow) => (
            <DropdownMenuItem
              key={workflow.id}
              render={<Link href={`/workflows/${workflow.id}`} />}
            >
              <LayoutPanelLeftIcon />
              <span className="truncate">{workflow.name}</span>
            </DropdownMenuItem>
          ))}
          {workflows.length === 0 ? (
            <DropdownMenuItem disabled>No workflows yet</DropdownMenuItem>
          ) : null}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              await createWorkflowAction(generateSlug())
            })
          }
        >
          <PlusIcon />
          New workflow
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/dashboard" />}>
          <LayoutPanelLeftIcon />
          All workflows
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
