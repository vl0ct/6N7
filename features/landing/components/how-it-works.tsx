import { MonitorPlay, Workflow } from "lucide-react"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2">
          <h2 className="max-w-md text-4xl font-medium tracking-tight text-balance lg:text-5xl">
            A shared workspace for every browser workflow.
          </h2>
          <div className="space-y-6 lg:space-y-12">
            <p className="text-lg text-balance text-muted-foreground">
              6N7 turns browser automation into composable steps. Build flows
              with triggers and actions, run them on demand, and inspect every
              output — with your team in the same organization.
            </p>

            <div className="grid gap-4 pt-6 sm:grid-cols-2">
              <p className="text-lg text-balance text-muted-foreground">
                <span className="font-medium text-foreground">
                  <Workflow className="inline size-4 -translate-y-0.5 text-brand" />{" "}
                  Compose.
                </span>{" "}
                Pick triggers and actions from the palette, then wire outputs
                into the next node.
              </p>

              <p className="text-lg text-balance text-muted-foreground">
                <span className="font-medium text-foreground">
                  <MonitorPlay className="inline size-4 -translate-y-0.5 text-brand" />{" "}
                  Inspect.
                </span>{" "}
                Every run streams into the console. Open a step&apos;s output or
                replay the browser session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
