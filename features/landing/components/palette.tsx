import Link from "next/link"

import {
  BetterAuthLogo,
  BrowserbaseLogo,
  LiveblocksLogo,
  NeonLogo,
  ResendLogo,
  TriggerDevLogo,
} from "./brand-logos"
import { Button } from "@/components/ui/button"

const integrations = [
  { name: "Browserbase", logo: BrowserbaseLogo },
  { name: "Trigger.dev", logo: TriggerDevLogo },
  { name: "Liveblocks", logo: LiveblocksLogo },
  { name: "Better Auth", logo: BetterAuthLogo },
  { name: "Neon", logo: NeonLogo },
  { name: "Resend", logo: ResendLogo },
]

// Cell indices (5 columns x 4 rows) that hold a logo.
const iconCells: Record<number, (typeof integrations)[number]> = {
  2: integrations[0],
  3: integrations[1],
  6: integrations[2],
  7: integrations[3],
  8: integrations[4],
  9: integrations[5],
}

export default function Palette() {
  return (
    <section id="integrations">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 pt-16 md:pt-24">
        <div className="relative aspect-[5/4] w-full max-w-[440px]">
          {/* Faded dashed grid */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 border-t border-l border-dashed border-border [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_35%,transparent_100%)]">
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="border-r border-b border-dashed border-border"
              />
            ))}
          </div>

          {/* Logos */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-4">
            {Array.from({ length: 20 }).map((_, index) => {
              const item = iconCells[index]
              if (!item) return <div key={index} />

              const Logo = item.logo

              return (
                <div key={index} className="flex items-center justify-center">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-muted/40">
                    <Logo className="size-6" />
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-10 pb-16 text-center md:pb-24">
        <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
          Integrations
        </span>
        <h2 className="mt-6 text-4xl font-medium tracking-tight text-balance md:text-5xl lg:text-6xl">
          Connect all your preferred tools
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-balance text-muted-foreground">
          Browserbase, Trigger.dev, Liveblocks, Better Auth, Neon, and Resend —
          one shared canvas for your whole stack.
        </p>
        <Button
          size="lg"
          className="mt-8 bg-brand text-brand-foreground hover:bg-brand/90"
          nativeButton={false}
          render={<Link href="/sign-up">Start building</Link>}
        />
      </div>
    </section>
  )
}
