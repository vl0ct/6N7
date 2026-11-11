import {
  Bot,
  ChevronDown,
  ChevronUp,
  Eye,
  Globe,
  Loader2,
  Mail,
  MonitorPlay,
  MoreHorizontal,
  MousePointerClick,
  PanelLeft,
  Play,
  Plus,
  ScanText,
  Search,
  Settings,
  type LucideIcon,
} from "lucide-react"

import { LogoIcon } from "@/components/logo"
import { cn } from "@/lib/utils"

type MockNode = {
  title: string
  icon: LucideIcon
  accent: string
  fields: { label: string; value: string }[]
  position: string
  running?: boolean
}

const canvasNodes: MockNode[] = [
  {
    title: "Start",
    icon: MousePointerClick,
    accent: "bg-blue-500 text-white",
    fields: [],
    position: "top-[13%] left-[5%]",
  },
  {
    title: "Open URL",
    icon: Globe,
    accent: "bg-emerald-500 text-white",
    fields: [{ label: "URL", value: "app.example.com/pricing" }],
    position: "top-[13%] right-[5%]",
  },
  {
    title: "Extract",
    icon: ScanText,
    accent: "bg-amber-500 text-white",
    fields: [{ label: "Instruction", value: "Every plan price" }],
    position: "bottom-[15%] left-[5%]",
    running: true,
  },
  {
    title: "Send Email",
    icon: Mail,
    accent: "bg-teal-500 text-white",
    fields: [{ label: "To", value: "team@example.com" }],
    position: "bottom-[15%] right-[5%]",
  },
]

const palette = [
  { label: "Start", icon: MousePointerClick, accent: "bg-blue-500 text-white" },
  { label: "Open URL", icon: Globe, accent: "bg-emerald-500 text-white" },
  { label: "Act", icon: MousePointerClick, accent: "bg-violet-500 text-white" },
  { label: "Extract", icon: ScanText, accent: "bg-amber-500 text-white" },
  { label: "Observe", icon: Eye, accent: "bg-sky-500 text-white" },
  { label: "Agent", icon: Bot, accent: "bg-rose-500 text-white" },
  { label: "Send Email", icon: Mail, accent: "bg-teal-500 text-white" },
]

const workflows = ["Pricing monitor", "Lead capture", "Support triage"]

const runSteps: {
  title: string
  time: string
  icon: LucideIcon
  accent: string
  running?: boolean
  pending?: boolean
}[] = [
  {
    title: "Start",
    time: "0.2s",
    icon: MousePointerClick,
    accent: "bg-blue-500 text-white",
  },
  {
    title: "Open URL",
    time: "2.4s",
    icon: Globe,
    accent: "bg-emerald-500 text-white",
  },
  {
    title: "Extract",
    time: "11.8s",
    icon: ScanText,
    accent: "bg-amber-500 text-white",
    running: true,
  },
  {
    title: "Send Email",
    time: "3.9s",
    icon: Mail,
    accent: "bg-teal-500 text-white",
    pending: true,
  },
]

const previousRunSteps: {
  title: string
  time: string
  icon: LucideIcon
  accent: string
}[] = [
  {
    title: "Start",
    time: "0.2s",
    icon: MousePointerClick,
    accent: "bg-blue-500 text-white",
  },
  {
    title: "Open URL",
    time: "3.1s",
    icon: Globe,
    accent: "bg-emerald-500 text-white",
  },
  {
    title: "Extract",
    time: "9.6s",
    icon: ScanText,
    accent: "bg-amber-500 text-white",
  },
  {
    title: "Send Email",
    time: "2.8s",
    icon: Mail,
    accent: "bg-teal-500 text-white",
  },
]

const collaborators = [
  { initials: "MK", color: "bg-violet-500" },
  { initials: "JT", color: "bg-sky-500" },
  { initials: "AR", color: "bg-rose-500" },
]

function MockNodeCard({
  title,
  icon: Icon,
  accent,
  fields,
  position,
  running,
}: MockNode) {
  return (
    <div
      className={cn(
        "absolute w-[40%] max-w-44 rounded-md border border-border bg-card text-card-foreground",
        running && "bg-blue-500/10",
        position
      )}
    >
      <span className="absolute top-1/2 -left-1 h-3.5 w-1.5 -translate-y-1/2 rounded-l-xs bg-border" />
      <span className="absolute top-1/2 -right-1 h-3.5 w-1.5 -translate-y-1/2 rounded-r-xs bg-border" />

      <div className="flex items-center gap-2 px-2 py-2">
        <span
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-md",
            accent
          )}
        >
          {running ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Icon className="size-3.5" />
          )}
        </span>
        <span className="truncate text-[11px] font-semibold">{title}</span>
      </div>

      {fields.length > 0 ? (
        <div className="flex flex-col gap-1 border-t border-border px-2 py-1.5">
          {fields.map((field) => (
            <div
              key={field.label}
              className="flex items-center justify-between gap-2 text-[9px]"
            >
              <span className="shrink-0 text-muted-foreground">
                {field.label}
              </span>
              <span className="truncate font-medium">{field.value}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function CanvasMock() {
  return (
    <div
      aria-hidden
      className="relative size-full overflow-hidden rounded-md bg-canvas"
    >
      {/* Floating header: open-sidebar trigger + org switcher */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1 p-2">
        <span className="flex size-5 items-center justify-center rounded-md bg-background/80 text-muted-foreground backdrop-blur-sm">
          <PanelLeft className="size-3" />
        </span>
        <span className="flex items-center gap-1 rounded-md bg-background/80 px-1.5 py-1 text-[9px] font-medium backdrop-blur-sm">
          <span className="flex size-3.5 items-center justify-center rounded-full bg-muted text-[6px] font-semibold">
            AC
          </span>
          Acme Inc
          <ChevronDown className="size-2.5 text-muted-foreground" />
        </span>
      </div>

      <svg
        className="pointer-events-none absolute inset-0 size-full text-border"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M 45 24 H 55"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 79 34 V 66"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 55 76 H 45"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {canvasNodes.map((node) => (
        <MockNodeCard key={node.title} {...node} />
      ))}

      <div className="absolute top-2 right-2 flex -space-x-1.5">
        {collaborators.map((person) => (
          <span
            key={person.initials}
            className={cn(
              "flex size-5 items-center justify-center rounded-full border-2 border-canvas text-[7px] font-semibold text-white",
              person.color
            )}
          >
            {person.initials}
          </span>
        ))}
      </div>

      <div className="absolute top-[45%] left-[57%] flex items-center gap-1 text-[9px] font-medium text-violet-500">
        <span className="size-2 rotate-45 rounded-sm bg-violet-500" />
        Maya
      </div>
    </div>
  )
}

function ConsoleMock() {
  return (
    <div
      aria-hidden
      className="flex size-full flex-col overflow-hidden rounded-md bg-canvas"
    >
      <div className="flex items-center gap-2 px-2 py-1 text-[9px] font-medium text-muted-foreground">
        <span>10:42:18</span>
        <span className="lowercase">running</span>
        <span className="ml-auto">Run #184</span>
      </div>
      <div className="flex flex-col gap-0.5 px-1 pb-1">
        {runSteps.map(
          ({ title, time, icon: Icon, accent, running, pending }) => (
            <div
              key={title}
              className={cn(
                "flex items-center gap-2 rounded-md px-1.5 py-1 text-[10px]",
                running && "bg-accent",
                pending && "opacity-50"
              )}
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-md",
                  accent
                )}
              >
                {running ? (
                  <Loader2 className="size-3 animate-spin" />
                ) : (
                  <Icon className="size-3" />
                )}
              </span>
              <span className="truncate font-medium">{title}</span>
              <span className="ml-auto shrink-0 text-muted-foreground tabular-nums">
                {time}
              </span>
            </div>
          )
        )}
        <div className="flex items-center gap-2 rounded-md px-1.5 py-1 text-[10px] hover:bg-accent">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <MonitorPlay className="size-3" />
          </span>
          <span className="truncate font-medium">Replay</span>
        </div>
      </div>
    </div>
  )
}

function PaletteMock() {
  return (
    <div
      aria-hidden
      className="flex size-full flex-col overflow-hidden rounded-md bg-canvas"
    >
      <div className="flex items-center justify-between gap-2 border-b border-border p-2">
        <MoreHorizontal className="size-4 text-muted-foreground" />
        <span className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-[10px] font-medium text-secondary-foreground">
          <Play className="size-3 fill-current" />
          Run
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden px-2 pb-2">
        <div className="flex items-center justify-between py-1.5 text-[9px] font-medium text-muted-foreground">
          <span>Triggers</span>
          <ChevronUp className="size-3" />
        </div>
        <div className="flex flex-col gap-0.5">
          {palette.slice(0, 1).map(({ label, icon: Icon, accent }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-md px-1 py-1 text-[10px] hover:bg-accent"
            >
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-md",
                  accent
                )}
              >
                <Icon className="size-3" />
              </span>
              {label}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between py-1.5 text-[9px] font-medium text-muted-foreground">
          <span>Actions</span>
          <ChevronUp className="size-3" />
        </div>
        <div className="flex flex-col gap-0.5">
          {palette.slice(1).map(({ label, icon: Icon, accent }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-md px-1 py-1 text-[10px] text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-md",
                  accent
                )}
              >
                <Icon className="size-3" />
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SidebarMock() {
  return (
    <div aria-hidden className="hidden w-28 shrink-0 flex-col p-2 md:flex">
      <div className="flex items-center gap-1.5">
        <LogoIcon className="size-4" />
        <Search className="ml-auto size-3.5 text-muted-foreground" />
      </div>

      <div className="mt-5 flex items-center justify-between px-2">
        <span className="text-[8px] font-medium tracking-wider text-muted-foreground uppercase">
          Workflows
        </span>
        <Plus className="size-3 text-muted-foreground" />
      </div>

      <div className="mt-1 flex flex-col">
        {workflows.map((workflow, index) => (
          <div
            key={workflow}
            className={cn(
              "truncate px-2 py-1 text-[10px]",
              index === 0
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            {workflow}
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-1 px-1">
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[7px] font-semibold">
          AC
        </span>
        <span className="min-w-0 flex-1 truncate text-[9px] font-medium">
          Acme Inc
        </span>
        <Settings className="size-3 text-muted-foreground" />
      </div>
    </div>
  )
}

export function EditorPreview({
  className,
  showSidebar = true,
  showConsole = true,
  showPalette = true,
}: {
  className?: string
  showSidebar?: boolean
  showConsole?: boolean
  showPalette?: boolean
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex size-full overflow-hidden bg-canvas-frame",
        className
      )}
    >
      {showSidebar ? <SidebarMock /> : null}

      <div className="flex min-h-0 min-w-0 flex-1 gap-1 p-1">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-1">
          <div className="relative min-h-0 flex-1">
            <CanvasMock />
          </div>
          {showConsole ? (
            <div className="h-[38%] min-h-[82px]">
              <ConsoleMock />
            </div>
          ) : null}
        </div>

        {showPalette ? (
          <div className="hidden w-36 shrink-0 sm:block">
            <PaletteMock />
          </div>
        ) : null}
      </div>
    </div>
  )
}

const inspectorConnections = [
  { label: "URL", icon: Globe, accent: "bg-emerald-500 text-white" },
  { label: "Title", icon: Globe, accent: "bg-emerald-500 text-white" },
]

export function InspectorPreview({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-md bg-canvas",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border p-2">
        <MoreHorizontal className="size-4 text-muted-foreground" />
        <span className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-[10px] font-medium text-secondary-foreground">
          <Play className="size-3 fill-current" />
          Run
        </span>
      </div>

      <div className="flex flex-col gap-3 p-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-medium text-muted-foreground">
            Instruction <span className="text-destructive">*</span>
          </span>
          <div className="min-h-14 rounded-md border border-input bg-background px-2.5 py-2 text-[10px] leading-relaxed text-foreground">
            Every plan price, including the annual discount.
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-medium text-muted-foreground">
            Connections
          </span>
          <div className="flex flex-wrap gap-1">
            {inspectorConnections.map(({ label, icon: Icon, accent }) => (
              <span
                key={label}
                className="flex items-center gap-1 rounded-md border border-border bg-card px-1.5 py-1 text-[9px]"
              >
                <span
                  className={cn(
                    "flex size-3.5 items-center justify-center rounded-sm",
                    accent
                  )}
                >
                  <Icon className="size-2" />
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ConsoleStepRow({
  title,
  time,
  icon: Icon,
  accent,
  running,
  pending,
}: {
  title: string
  time: string
  icon: LucideIcon
  accent: string
  running?: boolean
  pending?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md px-1.5 py-1 text-[11px]",
        running && "bg-accent",
        pending && "opacity-50"
      )}
    >
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded-md",
          accent
        )}
      >
        {running ? (
          <Loader2 className="size-3 animate-spin" />
        ) : (
          <Icon className="size-3" />
        )}
      </span>
      <span className="truncate font-medium">{title}</span>
      <span className="ml-auto text-[10px] text-muted-foreground tabular-nums">
        {time}
      </span>
    </div>
  )
}

export function RunConsolePreview({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex size-full overflow-hidden rounded-md bg-canvas",
        className
      )}
    >
      <div className="flex w-[42%] shrink-0 flex-col p-2">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2 px-1 py-1 text-[10px] font-medium text-muted-foreground">
              <span>10:42:18</span>
              <span className="lowercase">running</span>
            </div>
            {runSteps.map((step) => (
              <ConsoleStepRow key={step.title} {...step} />
            ))}
            <div className="flex items-center gap-2 rounded-md px-1.5 py-1 text-[11px]">
              <span className="flex size-5 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <MonitorPlay className="size-3" />
              </span>
              <span className="font-medium">Replay</span>
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2 px-1 py-1 text-[10px] font-medium text-muted-foreground">
              <span>10:38:04</span>
              <span className="lowercase">succeeded</span>
            </div>
            {previousRunSteps.map((step) => (
              <ConsoleStepRow key={step.title} {...step} />
            ))}
            <div className="flex items-center gap-2 rounded-md px-1.5 py-1 text-[11px]">
              <span className="flex size-5 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <MonitorPlay className="size-3" />
              </span>
              <span className="font-medium">Replay</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <span className="flex size-5 items-center justify-center rounded-md bg-amber-500 text-white">
            <ScanText className="size-3" />
          </span>
          <span className="text-xs font-semibold">Extract 1</span>
          <span className="ml-auto text-[9px] text-muted-foreground">
            11.8s
          </span>
        </div>
        <pre className="min-h-0 flex-1 overflow-hidden p-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
          {`{
  "plans": [
    {
      "name": "Starter",
      "price": "$0",
      "annual": "$0",
      "features": 3
    },
    {
      "name": "Pro",
      "price": "$29",
      "annual": "$290",
      "features": 9
    },
    {
      "name": "Team",
      "price": "$99",
      "annual": "$990",
      "features": 12
    }
  ],
  "currency": "USD",
  "source": "app.example.com/pricing"
}`}
        </pre>
      </div>
    </div>
  )
}
