"use client"

import {
  Building2,
  Clock,
  ListChecks,
  Link2,
  MonitorPlay,
  MousePointerClick,
  Play,
  ScanText,
  Settings,
  ShieldCheck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  InspectorMock,
  RunConsoleMock,
  WorkflowEditorMock,
} from "@/components/workflow-editor-mock"
import { cn } from "@/lib/utils"

const features = [
  { id: "canvas", label: "Visual canvas" },
  { id: "inspector", label: "Inspector" },
  { id: "console", label: "Run console" },
  { id: "workspaces", label: "Workspaces" },
] as const

type FeatureId = (typeof features)[number]["id"]

const featureHighlights: Record<
  FeatureId,
  { icon: LucideIcon; label: string }[]
> = {
  canvas: [
    { icon: MousePointerClick, label: "Triggers and actions" },
    { icon: ListChecks, label: "Typed inputs and outputs" },
    { icon: Zap, label: "Graph validation before a run" },
  ],
  inspector: [
    { icon: ScanText, label: "Edit any node in place" },
    { icon: Link2, label: "Insert upstream outputs" },
    { icon: ShieldCheck, label: "Required fields enforced" },
  ],
  console: [
    { icon: Play, label: "One-click runs" },
    { icon: MonitorPlay, label: "Session replays" },
    { icon: Clock, label: "Per-step timing" },
  ],
  workspaces: [
    { icon: Building2, label: "Organizations" },
    { icon: Users, label: "Members and roles" },
    { icon: ShieldCheck, label: "Account sessions" },
  ],
}

function FeatureList({
  items,
}: {
  items: { icon: LucideIcon; label: string }[]
}) {
  return (
    <ul className="mt-8 divide-y text-muted-foreground *:flex *:items-center *:gap-3 *:py-3">
      {items.map(({ icon: Icon, label }) => (
        <li key={label}>
          <Icon className="size-4" />
          {label}
        </li>
      ))}
    </ul>
  )
}

function VisualCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex aspect-square overflow-hidden rounded-xl border bg-canvas-frame p-1 md:col-span-3">
      <div className="relative size-full overflow-hidden rounded-md bg-canvas">
        {children}
      </div>
    </div>
  )
}

export default function FeaturesSection() {
  const [activeId, setActiveId] = useState<FeatureId>("canvas")
  const sectionRefs = useRef<Partial<Record<FeatureId, HTMLDivElement | null>>>(
    {}
  )

  const scrollToFeature = (id: FeatureId) => {
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    setActiveId(id)
  }

  useEffect(() => {
    const sections = features
      .map((feature) => sectionRefs.current[feature.id])
      .filter((section): section is HTMLDivElement => section != null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const nextId = visible[0]?.target.id as FeatureId | undefined
        if (nextId) setActiveId(nextId)
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.35, 0.55, 0.75] }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-4xl text-4xl font-medium tracking-tight text-balance text-muted-foreground">
          <span className="text-foreground">Built for browser automation.</span>{" "}
          <br /> One workspace from idea to run.
        </h2>
        <div className="mt-16 grid gap-6 md:mt-32 lg:grid-cols-[auto_1fr]">
          <div className="sticky top-24 h-fit w-56 max-lg:hidden">
            <div className="text-sm text-muted-foreground">Product</div>
            <div className="mt-4 -ml-4 flex flex-col *:justify-start">
              {features.map((feature) => (
                <Button
                  key={feature.id}
                  type="button"
                  variant="ghost"
                  data-state={activeId === feature.id ? "active" : undefined}
                  onClick={() => scrollToFeature(feature.id)}
                  className="not-data-[state=active]:text-muted-foreground hover:bg-transparent"
                >
                  {feature.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-16 md:gap-32">
            <div
              ref={(element) => {
                sectionRefs.current.canvas = element
              }}
              id="canvas"
              className="grid scroll-mt-32 gap-6 sm:grid-cols-2 md:grid-cols-5 lg:gap-12"
            >
              <div className="flex flex-col pb-4 md:col-span-2">
                <div className="md:pr-6 lg:pr-0">
                  <h3 className="mb-6 text-sm font-medium text-muted-foreground">
                    Visual canvas
                  </h3>
                  <p className="text-lg font-medium text-balance text-muted-foreground">
                    <span className="text-foreground">Every step in view.</span>{" "}
                    Pick triggers and actions from the palette. Each node shows
                    its inputs and outputs, so the flow stays readable.
                  </p>
                </div>
                <FeatureList items={featureHighlights.canvas} />
              </div>
              <VisualCard>
                <WorkflowEditorMock
                  showSidebar={false}
                  showConsole={false}
                  className="rounded-md"
                />
              </VisualCard>
            </div>

            <div
              ref={(element) => {
                sectionRefs.current.inspector = element
              }}
              id="inspector"
              className="grid scroll-mt-32 gap-6 sm:grid-cols-2 md:grid-cols-5 lg:gap-12"
            >
              <div className="flex flex-col pb-4 md:col-span-2">
                <div className="md:pr-6 lg:pr-0">
                  <h3 className="mb-6 text-sm font-medium text-muted-foreground">
                    Inspector
                  </h3>
                  <p className="text-lg font-medium text-balance text-muted-foreground">
                    <span className="text-foreground">
                      Edit the node, not the code.
                    </span>{" "}
                    Select any step to edit its fields, insert upstream outputs,
                    and see connections as typed chips.
                  </p>
                </div>
                <FeatureList items={featureHighlights.inspector} />
              </div>
              <VisualCard>
                <InspectorMock className="rounded-md border-0" />
              </VisualCard>
            </div>

            <div
              ref={(element) => {
                sectionRefs.current.console = element
              }}
              id="console"
              className="grid scroll-mt-32 gap-6 sm:grid-cols-2 md:grid-cols-5 lg:gap-12"
            >
              <div className="flex flex-col pb-4 md:col-span-2">
                <div className="md:pr-6 lg:pr-0">
                  <h3 className="mb-6 text-sm font-medium text-muted-foreground">
                    Run console
                  </h3>
                  <p className="text-lg font-medium text-balance text-muted-foreground">
                    <span className="text-foreground">
                      Every run, step by step.
                    </span>{" "}
                    Runs stream into the console with timings and outputs. Open
                    a recording to{" "}
                    <span className="rounded bg-emerald-500/10 px-1.5 text-emerald-500">
                      replay the browser session
                    </span>
                    .
                  </p>
                </div>
                <FeatureList items={featureHighlights.console} />
              </div>
              <VisualCard>
                <RunConsoleMock className="rounded-md border-0" />
              </VisualCard>
            </div>

            <div
              ref={(element) => {
                sectionRefs.current.workspaces = element
              }}
              id="workspaces"
              className="grid scroll-mt-32 gap-6 sm:grid-cols-2 md:grid-cols-5 lg:gap-12"
            >
              <div className="flex flex-col pb-4 md:col-span-2">
                <div className="md:pr-6 lg:pr-0">
                  <h3 className="mb-6 text-sm font-medium text-muted-foreground">
                    Workspaces
                  </h3>
                  <p className="text-lg font-medium text-balance text-muted-foreground">
                    <span className="text-foreground">
                      One workspace, every teammate.
                    </span>{" "}
                    Organizations keep workflows, members, roles, and account
                    sessions separate. Switch workspaces without losing your
                    place.
                  </p>
                </div>
                <FeatureList items={featureHighlights.workspaces} />
              </div>
              <VisualCard>
                <WorkspacesMock />
              </VisualCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const members = [
  {
    name: "Maya King",
    email: "maya@acme.co",
    role: "Owner",
    initials: "MK",
    color: "bg-violet-500",
  },
  {
    name: "Jon Taylor",
    email: "jon@acme.co",
    role: "Admin",
    initials: "JT",
    color: "bg-sky-500",
  },
  {
    name: "Amara Reed",
    email: "amara@acme.co",
    role: "Member",
    initials: "AR",
    color: "bg-rose-500",
  },
]

function WorkspacesMock() {
  return (
    <div aria-hidden className="flex size-full flex-col p-3">
      <div className="flex items-center gap-2 px-1 pb-2">
        <Building2 className="size-4 text-muted-foreground" />
        <span className="text-xs font-medium">Organization</span>
        <span className="ml-auto flex size-6 items-center justify-center rounded-full bg-muted text-[9px] font-semibold">
          AC
        </span>
      </div>

      <div className="rounded-md border border-border bg-card p-2">
        <div className="flex items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-[9px] font-semibold">
            AC
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium">Acme Inc</p>
            <p className="truncate text-[10px] text-muted-foreground">acme</p>
          </div>
          <Settings className="ml-auto size-3.5 text-muted-foreground" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between px-1">
        <span className="text-[10px] font-medium tracking-wide text-muted-foreground">
          Members
        </span>
        <span className="text-[10px] text-muted-foreground">3</span>
      </div>

      <div className="mt-1 flex flex-col gap-0.5">
        {members.map(({ name, email, role, initials, color }) => (
          <div
            key={name}
            className="flex items-center gap-2 rounded-md px-1.5 py-1.5 hover:bg-accent"
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-[8px] font-semibold text-white",
                color
              )}
            >
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium">{name}</p>
              <p className="truncate text-[9px] text-muted-foreground">
                {email}
              </p>
            </div>
            <span className="ml-auto rounded-md border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">
              {role}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 rounded-md border border-border p-2 text-[10px] text-muted-foreground">
        <ShieldCheck className="size-3.5 shrink-0" />
        Account sessions are protected
        <span className="ml-auto flex items-center gap-1 text-emerald-600">
          <span className="size-1.5 rounded-full bg-emerald-500" />3 online
        </span>
      </div>
    </div>
  )
}
