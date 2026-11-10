import { ArrowRight, ArrowUpRight, Play, Sparkles } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { HeroBars } from "@/components/hero-bars"
import { HeroHeader } from "@/components/hero-section-10-header"
import LogoCloud from "@/components/hero-section-10-logo-cloud"

export default function HeroSection() {
  return (
    <>
      <HeroHeader />

      <main>
        <section className="relative overflow-hidden border-b border-border px-6 pt-24 pb-32 md:pt-28 md:pb-40">
          <HeroBars />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
            <Link
              href="#workspaces"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
            >
              <Sparkles className="size-3.5" />
              New — Team workspaces
              <ArrowRight className="size-3.5" />
            </Link>

            <h1 className="mt-8 text-5xl font-medium tracking-tight text-balance md:text-6xl">
              Build browser agents
              <br className="hidden sm:block" /> from idea to run
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-balance text-muted-foreground">
              Design AI browser workflows on a shared canvas. Chain actions,
              extract data, and run agents — then replay every step.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="rounded-full"
                variant="outline"
                nativeButton={false}
                render={
                  <Link href="#features">
                    <Play className="fill-current" />
                    <span>Watch demo</span>
                  </Link>
                }
              />
              <Button
                size="lg"
                className="rounded-full"
                nativeButton={false}
                render={
                  <Link href="/sign-up">
                    <span>Get started</span>
                    <ArrowUpRight />
                  </Link>
                }
              />
            </div>
          </div>
        </section>

        <LogoCloud />
      </main>
    </>
  )
}
