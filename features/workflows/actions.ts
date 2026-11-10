"use server"

import { runs, tasks } from "@trigger.dev/sdk"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import type { runWorkflowTask } from "@/features/workflows/tasks/run-workflow"

import { liveblocks } from "@/lib/liveblocks"
import {
  createWorkflow,
  deleteWorkflow,
  saveWorkflowGraph,
} from "@/features/workflows/data"
import { WorkflowGraph } from "@/lib/db/schema"
import { requireOrganization } from "@/lib/auth-server"

export async function createWorkflowAction(name: string) {
  const { organizationId: orgId } = await requireOrganization()

  const workflow = await createWorkflow(orgId, name)

  revalidatePath("/workflows", "layout")
  redirect(`/workflows/${workflow.id}`)
}

export async function deleteWorkflowAction(id: string) {
  const { organizationId: orgId } = await requireOrganization()

  const workflow = await deleteWorkflow(orgId, id)

  if (!workflow) {
    throw new Error("Workflow not found")
  }

  // The workflow id doubles as its Liveblocks room id - clean it up too.
  await liveblocks.deleteRoom(id)

  revalidatePath("/workflows", "layout")
  redirect("/dashboard")
}

export async function runWorkflowAction({
  id,
  graph,
}: {
  id: string
  graph: WorkflowGraph
}) {
  const { organizationId: orgId } = await requireOrganization()

  await saveWorkflowGraph({ orgId, id, graph })

  const handle = await tasks.trigger<typeof runWorkflowTask>(
    "run-workflow",
    { workflowId: id, orgId },
    { tags: [`workflow:${id}`] }
  )

  return handle
}

export async function cancelWorkflowRunAction(runId: string) {
  await requireOrganization()
  await runs.cancel(runId)
}
