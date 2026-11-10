"use client"

import { useTransition } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PlusIcon } from "lucide-react"

import { generateSlug } from "@/features/workflows/lib/generate-slug"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Workflow } from "@/lib/db/schema"

interface WorkflowNavProps {
  workflows: Workflow[]
  onCreateWorkflow: (name: string) => Promise<void>
}

export function WorkflowNav({ workflows, onCreateWorkflow }: WorkflowNavProps) {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleCreateWorkflow = () => {
    startTransition(async () => {
      await onCreateWorkflow(generateSlug())
    })
  }

  return (
    <nav className="flex min-h-0 flex-1 flex-col gap-6 py-3 pr-1 pl-3">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center justify-between ">
          <span className="text-xs tracking-wide text-muted-foreground">
            Workflows
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="New workflow"
            onClick={handleCreateWorkflow}
            disabled={isPending}
            className="text-muted-foreground hover:text-foreground"
          >
            <PlusIcon />
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex flex-col">
            {workflows.map((workflow) => {
              const isActive = pathname === `/workflows/${workflow.id}`

              return (
                <Link
                  key={workflow.id}
                  href={`/workflows/${workflow.id}`}
                  className={cn(
                    "flex w-full min-w-0 items-center rounded-none pt-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
                    isActive && "font-medium text-foreground"
                  )}
                >
                  <span className="truncate">{workflow.name}</span>
                </Link>
              )
            })}
            {workflows.length === 0 ? (
              <p className="py-1.5 text-sm text-muted-foreground">
                No workflows yet
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  )
}
