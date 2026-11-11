import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { LandingHeader } from "./header"
import LogoCloud from "./logo-cloud"

export default function Hero() {
  return (
    <>
      <LandingHeader />

      <main>
        <section className="bg-canvas p-1">
          <div className="relative overflow-hidden rounded-md px-6 pt-24 pb-32 text-white md:pt-28 md:pb-40">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <Image
                src="/hero-bg.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
              <h1 className="mt-8 text-5xl font-medium tracking-tight text-balance text-white md:text-6xl">
                Build browser agents
                from idea to run
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-balance text-white/70">
                Design browser workflows on a shared canvas. Chain actions,
                extract data, run agents and replay every step.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="rounded-sm bg-white text-black shadow-lg shadow-brand/25 hover:bg-white/90"
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
          </div>
        </section>

        <LogoCloud />
      </main>
    </>
  )
}
