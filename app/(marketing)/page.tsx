import {
  CallToAction,
  Features,
  Footer,
  Hero,
  RunConsole,
} from "@/features/landing"

export default function LandingPage() {
  return (
    <div className="p-2">
      <div className="mx-auto max-w-5xl rounded-xl bg-canvas p-1">
        <Hero />
        <Features />
        <RunConsole />
        <CallToAction />
        <Footer />
      </div>
    </div>
  )
}
