import Link from "next/link"
import { Logo } from "@/components/logo"

const footerLinks = [
  {
    name: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: "#how-it-works", label: "How it works" },
      { href: "#pricing", label: "Pricing" },
      { href: "#", label: "Changelog" },
    ],
  },
  {
    name: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Contact" },
      { href: "#", label: "GitHub" },
      { href: "#", label: "X" },
    ],
  },
  {
    name: "Legal",
    links: [
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
      { href: "#", label: "Security" },
    ],
  },
]

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl space-y-16 px-6 pt-32 pb-6">
        <div className="grid grid-cols-2 gap-x-3 gap-y-12 sm:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-full lg:col-span-3">
            <Link href="/" aria-label="go home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Build, run, and observe AI browser automations on one shared
              canvas.
            </p>
          </div>

          {footerLinks.map((linksGroup, index) => (
            <div key={index}>
              <span className="text-sm text-foreground">{linksGroup.name}</span>
              <ul className="mt-4 list-inside space-y-4">
                {linksGroup.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground duration-150 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-24 grid gap-x-3 gap-y-6 border-t pt-6 sm:grid-cols-2">
          <p className="max-w-md text-sm text-muted-foreground">
            Built with Stagehand, Liveblocks, Trigger.dev, and Better Auth.
          </p>
          <span className="block text-sm text-muted-foreground sm:text-right">
            &copy; 2026 6N7. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
