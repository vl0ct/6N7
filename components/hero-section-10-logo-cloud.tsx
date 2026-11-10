"use client"

import {
  Database,
  Globe2,
  Layers,
  Mail,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { useMedia } from "@/hooks/use-media"
import { InfiniteSlider } from "@/components/ui/motion-primitives/infinite-slider"

const partners: { name: string; icon: LucideIcon }[] = [
  { name: "Browserbase", icon: Globe2 },
  { name: "Trigger.dev", icon: Zap },
  { name: "Liveblocks", icon: Layers },
  { name: "Better Auth", icon: ShieldCheck },
  { name: "Neon", icon: Database },
  { name: "Resend", icon: Mail },
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
    <section className="border-b border-border">
      <p className="border-b border-border py-6 text-center text-base text-muted-foreground">
        Built on the tools that{" "}
        <span className="text-foreground">make it run</span>
      </p>

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
    </section>
  )
}
