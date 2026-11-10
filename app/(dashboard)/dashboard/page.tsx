import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { NewWorkflowButton } from "@/features/workflows/components/new-workflow-button"
import { requireOrganization } from "@/lib/auth-server"

export default async function Page() {
  await requireOrganization()

  return (
    <div className="size-full bg-canvas-frame p-1">
      <Empty className="h-full rounded-md border-none bg-canvas">
        <EmptyHeader>
          <EmptyTitle className="font-normal text-muted-foreground">
            No workflow selected
          </EmptyTitle>
          <EmptyDescription>
            Choose a workflow from the sidebar or create a new one.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <NewWorkflowButton />
        </EmptyContent>
      </Empty>
    </div>
  )
}
