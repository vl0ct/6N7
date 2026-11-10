"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CornerDownLeftIcon, SearchIcon, WorkflowIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import type { Workflow } from "@/lib/db/schema"

export function WorkflowSearch({ workflows }: { workflows: Workflow[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Search workflows"
        className="text-muted-foreground hover:text-foreground"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search workflows"
        description="Search and open a workflow."
        className="sm:max-w-lg"
      >
        <Command>
          <CommandInput placeholder="Search workflows…" />
          <div className="overflow-hidden rounded-md">
            <CommandList>
              <CommandEmpty>No workflows found.</CommandEmpty>
              <CommandGroup heading="Workflows">
                {workflows.map((workflow) => (
                  <CommandItem
                    key={workflow.id}
                    value={`${workflow.name} ${workflow.id}`}
                    onSelect={() => {
                      setOpen(false)
                      router.push(`/workflows/${workflow.id}`)
                    }}
                  >
                    <WorkflowIcon />
                    <span>{workflow.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="flex items-center gap-2 rounded-b-xl bg-canvas px-4 p-2 text-xs text-muted-foreground">
              <CornerDownLeftIcon className="size-4 outline-1 p-0.5 pr-1 rounded-sm" />
              Go to workflow
            </div>
          </div>
        </Command>
      </CommandDialog>
    </>
  )
}
