"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight, X } from "lucide-react"

import { LogoIcon } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useScroll } from "@/hooks/use-scroll"

export const LandingHeader = () => {
  const [menuState, setMenuState] = React.useState(false)
  const scrolled = useScroll(10)

  React.useEffect(() => {
    if (!menuState) return

    const mediaQuery = window.matchMedia("(max-width: 1023px)")
    const updateOverflow = () => {
      document.documentElement.classList.toggle(
        "overflow-hidden",
        mediaQuery.matches
      )
    }

    updateOverflow()
    mediaQuery.addEventListener("change", updateOverflow)

    return () => {
      mediaQuery.removeEventListener("change", updateOverflow)
      document.documentElement.classList.remove("overflow-hidden")
    }
  }, [menuState])

  return (
    <header
      className={cn(
        "sticky top-0 z-20 w-full bg-canvas p-1 transition-all duration-300 ease-out",
        scrolled && "py-2"
      )}
    >
      {menuState && (
        <div
          aria-hidden
          onClick={() => setMenuState(false)}
          className="fixed inset-0 z-10 bg-black/60 lg:hidden"
        />
      )}

      <nav
        data-state={menuState && "active"}
        className="relative z-20 w-full"
      >
        <div className="mx-auto w-full max-w-5xl rounded-md border border-transparent bg-[#0A0A0A] px-6">
          <div className="relative flex items-center justify-between gap-6 py-3">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                aria-label="6N7 home"
                className="flex items-center gap-1 sm:gap-2"
              >
                <LogoIcon />
                (not a meme)
              </Link>
            </div>

            <div className="hidden items-center gap-2 rounded-md bg-canvas p-1.5 lg:flex">
              <Button
                variant="ghost"
                size="lg"
                className="rounded-sm transition-colors"
                nativeButton={false}
                render={<Link href="/sign-up">Sign-up for free</Link>}
              />
              <Button
                size="lg"
                className="rounded-sm"
                nativeButton={false}
                render={
                  <Link href="/sign-in">
                    <span>Login</span>
                    <ArrowUpRight />
                  </Link>
                }
              />
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 block cursor-pointer after:absolute after:-inset-4"
              >
                <div
                  aria-hidden
                  className="m-auto flex size-4.5 flex-col items-center justify-center gap-[7px] duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0"
                >
                  <span className="h-0.5 w-full rounded-full bg-foreground" />
                  <span className="h-0.5 w-full rounded-full bg-foreground" />
                </div>

                <X className="absolute inset-0 m-auto size-6 translate-x-[-3px] scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
              </button>
            </div>
          </div>

          <div className="hidden py-6 max-lg:in-data-[state=active]:flex max-lg:in-data-[state=active]:flex-col max-lg:in-data-[state=active]:gap-6">
            <div className="flex flex-col gap-3">
              <Button
                variant="secondary"
                size="lg"
                className="rounded-md transition-colors hover:border-brand/50 hover:bg-brand hover:text-brand-foreground"
                nativeButton={false}
                render={
                  <Link href="/sign-up" onClick={() => setMenuState(false)}>
                    <span>Sign-up</span>
                  </Link>
                }
              />
              <Button
                size="lg"
                className="rounded-md transition-colors hover:border-brand/50 hover:bg-brand hover:text-brand-foreground"
                nativeButton={false}
                render={
                  <Link href="/sign-in" onClick={() => setMenuState(false)}>
                    <span>Continue</span>
                  </Link>
                }
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
