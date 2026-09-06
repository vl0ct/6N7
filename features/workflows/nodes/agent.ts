import type { Stagehand } from "@browserbasehq/stagehand"

export async function agent({
  stagehand,
  instruction,
}: {
  stagehand: Stagehand
  instruction: string
}) {
  const { data } = await stagehand.act(instruction)

  return {
    success: data.success,
    message: data.message,
    completed: data.success,
  }
}
