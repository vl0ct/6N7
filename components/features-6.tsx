import { Bot, Building2, MonitorPlay, MousePointerClick } from "lucide-react"

import { RunConsoleMock } from "@/components/workflow-editor-mock"

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl space-y-12 px-6">
        <h2 className="relative z-10 max-w-4xl text-4xl font-medium tracking-tight text-balance text-muted-foreground lg:text-5xl">
          <span className="text-foreground">
            From first click to final email.
          </span>{" "}
          <br /> One connected automation.
        </h2>
        <div className="relative -mx-6 overflow-hidden px-3 pt-3 md:-mx-8">
          <div className="absolute inset-3 z-1 size-64 rounded-tl-3xl border-t border-l mask-radial-[100%_60%] mask-radial-from-65% mask-radial-at-top-left md:size-96 lg:inset-4"></div>
          <div className="relative aspect-88/36 min-w-2xl mask-b-from-75% mask-b-to-95%">
            <div className="absolute inset-0 overflow-hidden rounded-t-xl border bg-canvas-frame p-1 shadow-2xl shadow-black/25">
              <RunConsoleMock className="rounded-md border-0" />
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-3 *:max-w-xs max-sm:*:not-last:border-b max-sm:*:not-last:pb-3 sm:grid-cols-2 md:mt-16 md:gap-y-6 lg:mt-24 lg:grid-cols-4 lg:gap-6">
          <p className="text-balance text-muted-foreground">
            <span className="font-medium text-foreground">
              <MousePointerClick className="inline size-4 -translate-y-0.5" />{" "}
              Visual canvas.
            </span>{" "}
            Compose triggers and actions on a shared canvas instead of writing
            scripts.
          </p>

          <p className="text-balance text-muted-foreground">
            <span className="font-medium text-foreground">
              <Bot className="inline size-4 -translate-y-0.5" /> AI nodes.
            </span>{" "}
            Act, extract, observe, and delegate with Stagehand.
          </p>

          <p className="text-balance text-muted-foreground">
            <span className="font-medium text-foreground">
              <MonitorPlay className="inline size-4 -translate-y-0.5" /> Run
              console.
            </span>{" "}
            Per-step logs, output inspection, and session replays for every run.
          </p>

          <p className="text-balance text-muted-foreground">
            <span className="font-medium text-foreground">
              <Building2 className="inline size-4 -translate-y-0.5" /> Team
              workspaces.
            </span>{" "}
            Keep workflows, members, and roles separate per organization.
          </p>
        </div>
      </div>
    </section>
  )
}
