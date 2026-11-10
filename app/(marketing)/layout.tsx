import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "6N7 — Visual browser automation",
  description:
    "Build AI browser workflows on a visual canvas. Open pages, act, extract, observe, and hand off to agents — then watch every step run with live logs and session replays.",
  openGraph: {
    title: "6N7 — Visual browser automation",
    description:
      "Build AI browser workflows on a visual canvas. Open pages, act, extract, observe, and hand off to agents — then watch every step run.",
    type: "website",
  },
}

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-svh bg-background text-foreground dark:bg-[#0A0A0A]">
      {children}
    </div>
  )
}
