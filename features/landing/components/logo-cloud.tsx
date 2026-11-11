"use client"

import type { ComponentType } from "react"
import {
  BetterAuthLogo,
  BrowserbaseLogo,
  LiveblocksLogo,
  NeonLogo,
  ResendLogo,
  TriggerDevLogo,
} from "./brand-logos"
import { useMedia } from "@/hooks/use-media"
import { InfiniteSlider } from "@/components/ui/motion-primitives/infinite-slider"

const partners: {
  name: string
  icon: ComponentType<{ className?: string }>
}[] = [
  { name: "Browserbase", icon: BrowserbaseLogo },
  { name: "Trigger.dev", icon: TriggerDevLogo },
  { name: "Liveblocks", icon: LiveblocksLogo },
  { name: "Better Auth", icon: BetterAuthLogo },
  { name: "Neon", icon: NeonLogo },
  { name: "Resend", icon: ResendLogo },
]

const Logos = () => {
  return (
    <>
      {partners.map(({ name, icon: Icon }) => (
        <span
          key={name}
          className="flex items-center gap-2 text-lg font-semibold tracking-tight whitespace-nowrap text-muted-foreground"
        >
          <Icon className="size-5" />
          {name}
        </span>
      ))}
    </>
  )
}

export default function LogoCloud() {
  const isLarge = useMedia("(min-width: 64rem)")

  return (
    <section className="bg-canvas p-1">
      <div className="flex flex-col gap-[8px]">
        <div className="rounded-md bg-[#0A0A0A]">
          <p className="py-6 text-center text-base text-foreground">
            Built on the tools that{" "}
            <span className="text-muted-foreground">make it run</span>
          </p>
        </div>

        <div className="rounded-md bg-[#0A0A0A]">
          <div className="px-6">
            {isLarge ? (
              <div className="flex items-center justify-between py-8">
                <Logos />
              </div>
            ) : (
              <InfiniteSlider
                gap={44}
                className="mask-x-from-85% mask-x-to-99% py-8"
              >
                <Logos />
              </InfiniteSlider>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
