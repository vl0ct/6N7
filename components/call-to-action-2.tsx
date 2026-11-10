import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CallToAction() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-center gap-6 max-lg:flex-col max-lg:text-center lg:items-end lg:justify-between">
          <h2 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance xl:text-6xl">
            Your first automation is one canvas away.
          </h2>

          <Button
            size="lg"
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
    </section>
  )
}
