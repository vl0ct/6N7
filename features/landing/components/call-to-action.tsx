import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CallToAction() {
  return (
    <section className="bg-canvas p-1">
      <div className="rounded-md bg-canvas py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-center gap-6 max-lg:flex-col max-lg:text-center lg:justify-between">
            <h2 className="max-w-4xl text-4xl font-medium tracking-tight text-balance text-muted-foreground">
              <span className="text-foreground">Stop spectating.</span> <br />{" "}
              Join the lore.
            </h2>

            <Button
              size="lg"
              className="rounded-md"
              nativeButton={false}
              render={
                <Link href="/sign-up">
                  <span>Start building</span>
                  <ArrowRight />
                </Link>
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}
