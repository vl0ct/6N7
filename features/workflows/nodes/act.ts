import type { Stagehand } from "@browserbasehq/stagehand"

export async function act({
  stagehand,
  instruction,
}: {
  stagehand: Stagehand
  instruction: string
}) {
  const { data } = await stagehand.act(instruction)
  const pages = await stagehand.browser.context.pages()
  const page = pages[0]

  return { success: data.success, message: data.message, url: await page.url() }
}
