import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    tagline: "For solo builders",
    price: "$0",
    period: "/mo",
    cta: "Start free",
    variant: "outline" as const,
    features: [
      "3 workflows",
      "100 runs per month",
      "1 organization",
      "3 members",
      "7-day replay history",
      "Community support",
    ],
  },
  {
    name: "Pro",
    tagline: "For teams shipping daily",
    price: "$29",
    period: "/mo",
    cta: "Start free trial",
    popular: true,
    features: [
      "Everything in Starter",
      "Unlimited workflows",
      "5,000 runs per month",
      "10 members",
      "30-day session replays",
      "Priority support",
    ],
  },
  {
    name: "Team",
    tagline: "For orgs with shared automations",
    price: "$99",
    period: "/mo",
    cta: "Talk to us",
    variant: "outline" as const,
    features: [
      "Everything in Pro",
      "Unlimited runs",
      "Unlimited members",
      "Roles and permissions",
      "Account sessions",
      "Dedicated support",
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-xl space-y-6">
          <h2 className="text-4xl font-medium tracking-tight text-balance text-muted-foreground lg:text-5xl">
            <span className="text-foreground">Start free.</span> <br /> Upgrade
            as you scale.
          </h2>
          <p className="text-lg text-balance text-muted-foreground">
            Every plan includes the visual canvas, AI nodes, inspector, and run
            console.
          </p>
        </div>

        <div className="mt-12 grid gap-6 border *:p-8 max-lg:mx-auto max-lg:max-w-sm lg:mt-20 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col gap-8",
                index === 0 && "max-lg:border-b lg:border-r",
                plan.popular &&
                  "relative bg-card shadow-xl max-lg:border-y lg:border-x",
                index === 2 && "max-lg:border-t lg:border-l"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 w-fit translate-x-px -translate-y-px rounded-bl bg-brand/15 px-3 py-1 text-xs font-medium text-brand inset-ring inset-ring-foreground/10 [corner-shape:bevel]">
                  Popular
                </div>
              )}

              <div>
                <p className="text-lg font-medium">{plan.name}</p>
                <p className="text-lg font-medium text-muted-foreground">
                  {plan.tagline}
                </p>

                <div className="my-8 block text-4xl font-medium tracking-tight">
                  {plan.price}{" "}
                  <span className="text-lg text-muted-foreground">
                    {plan.period}
                  </span>
                </div>

                <Button
                  className="w-full"
                  variant={plan.variant ?? "default"}
                  nativeButton={false}
                  render={<Link href="/sign-up">{plan.cta}</Link>}
                />
              </div>

              <ul className="list-outside space-y-3 text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="size-3 text-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
