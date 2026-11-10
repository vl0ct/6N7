"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight, ChevronDown, X } from "lucide-react"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems: {
  name: string
  href?: string
  items?: { name: string; href: string }[]
}[] = [
  {
    name: "Features",
    items: [
      { name: "Visual canvas", href: "#features" },
      { name: "Inspector", href: "#inspector" },
      { name: "Run console", href: "#console" },
      { name: "Workspaces", href: "#workspaces" },
    ],
  },
  {
    name: "Company",
    items: [
      { name: "How it works", href: "#how-it-works" },
      { name: "Pricing", href: "#pricing" },
      { name: "About", href: "#" },
      { name: "GitHub", href: "#" },
    ],
  },
  { name: "Pricing", href: "#pricing" },
]

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false)

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
    <header>
      <nav
        data-state={menuState && "active"}
        className="sticky top-0 z-20 w-full border-b bg-background/80 backdrop-blur-xl max-lg:data-[state=active]:h-svh max-lg:data-[state=active]:overflow-y-auto max-lg:data-[state=active]:bg-background dark:bg-[#0A0A0A]/80 dark:max-lg:data-[state=active]:bg-[#0A0A0A]"
      >
        <div className="w-full px-6">
          <div className="relative flex items-center justify-between gap-6 py-5">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                aria-label="6N7 home"
                className="flex items-center"
              >
                <Logo />
              </Link>

              <div className="hidden items-center gap-6 lg:flex">
                {menuItems.map((item) =>
                  item.items ? (
                    <DropdownMenu key={item.name}>
                      <DropdownMenuTrigger
                        render={
                          <button
                            type="button"
                            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                          >
                            {item.name}
                            <ChevronDown className="size-3.5" />
                          </button>
                        }
                      />
                      <DropdownMenuContent align="start" className="w-48">
                        {item.items.map((subItem) => (
                          <DropdownMenuItem
                            key={subItem.name}
                            render={<Link href={subItem.href} />}
                          >
                            {subItem.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href ?? "#"}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                nativeButton={false}
                render={<Link href="/sign-in">Login</Link>}
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

            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              className="relative z-20 block cursor-pointer after:absolute after:-inset-4 lg:hidden"
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

          <div className="hidden pb-6 max-lg:in-data-[state=active]:flex max-lg:in-data-[state=active]:flex-col max-lg:in-data-[state=active]:gap-6">
            <div className="flex flex-col gap-5">
              {menuItems.map((item) =>
                item.items ? (
                  <div key={item.name}>
                    <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                      {item.name}
                    </span>
                    <div className="mt-2 flex flex-col gap-2">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setMenuState(false)}
                          className="text-lg font-medium text-foreground"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href ?? "#"}
                    onClick={() => setMenuState(false)}
                    className="text-lg font-medium text-foreground"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                nativeButton={false}
                render={
                  <Link href="/sign-in" onClick={() => setMenuState(false)}>
                    Login
                  </Link>
                }
              />
              <Button
                size="lg"
                className="rounded-full"
                nativeButton={false}
                render={
                  <Link href="/sign-up" onClick={() => setMenuState(false)}>
                    <span>Get started</span>
                    <ArrowUpRight />
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
