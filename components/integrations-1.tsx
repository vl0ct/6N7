import {
  Bot,
  Eye,
  Globe,
  Mail,
  MousePointerClick,
  Pointer,
  ScanText,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PaletteNode = {
  name: string
  description: string
  icon: LucideIcon
  accent: string
}

const trigger: PaletteNode = {
  name: "Start",
  description: "Kick off a workflow manually.",
  icon: MousePointerClick,
  accent: "bg-blue-500 text-white",
}

const actions: PaletteNode[] = [
  {
    name: "Open URL",
    description: "Load any page and expose its URL and title.",
    icon: Globe,
    accent: "bg-emerald-500 text-white",
  },
  {
    name: "Act",
    description: "Click, type, and navigate with AI instructions.",
    icon: Pointer,
    accent: "bg-violet-500 text-white",
  },
  {
    name: "Extract",
    description: "Pull structured data from any page.",
    icon: ScanText,
    accent: "bg-amber-500 text-white",
  },
  {
    name: "Observe",
    description: "Discover the elements an action can target.",
    icon: Eye,
    accent: "bg-sky-500 text-white",
  },
  {
    name: "Agent",
    description: "Hand a multi-step goal to an autonomous agent.",
    icon: Bot,
    accent: "bg-rose-500 text-white",
  },
  {
    name: "Send Email",
    description: "Send results with a custom subject and body.",
    icon: Mail,
    accent: "bg-teal-500 text-white",
  },
]

export default function IntegrationsSection() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:gap-12">
          <div className="flex flex-col justify-between gap-12 pb-6 max-lg:order-last md:mt-6">
            <div>
              <h2 className="text-4xl font-medium tracking-tight text-balance lg:text-5xl">
                The palette behind every workflow
              </h2>
              <p className="mt-4 mb-6 text-lg text-balance text-muted-foreground">
                Triggers and actions are typed, ready to drop in, and wired to
                the step before them. Start a run manually, then chain actions
                from URL to email.
              </p>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/sign-up">Start building</Link>}
              />
            </div>

            <p className="max-w-xs text-lg text-balance text-muted-foreground">
              <span className="font-medium text-foreground">
                Outputs flow downstream.
              </span>{" "}
              Reference any step&apos;s result from the next node.
            </p>
          </div>

          <div className="-mx-6 px-6 sm:mx-auto sm:max-w-md md:-mx-6 md:mr-0 md:ml-auto">
            <div className="rounded-xl border bg-card p-3 shadow-sm">
              <p className="px-1 pb-2 text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                Triggers
              </p>
              <PaletteCard {...trigger} />

              <p className="mt-4 px-1 pb-2 text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                Actions
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {actions.map((node) => (
                  <PaletteCard key={node.name} {...node} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PaletteCard({ name, description, icon: Icon, accent }: PaletteNode) {
  return (
    <div className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-canvas p-3 transition-colors hover:bg-accent">
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-md",
          accent
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 space-y-0.5">
        <h3 className="text-xs font-semibold">{name}</h3>
        <p className="line-clamp-2 text-[11px] text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}
