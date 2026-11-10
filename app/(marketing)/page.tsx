import HeroSection from "@/components/hero-section-10"
import FeaturesFive from "@/components/features-5"
import FeaturesSix from "@/components/features-6"
import Content from "@/components/content-2"
import Stats from "@/components/stats-2"
import Pricing from "@/components/pricing-2"
import Integrations from "@/components/integrations-1"
import CallToAction from "@/components/call-to-action-2"
import Footer from "@/components/footer-2"

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-5xl border-x border-border">
      <HeroSection />
      <FeaturesFive />
      <Content />
      <Integrations />
      <FeaturesSix />
      <Stats />
      <Pricing />
      <CallToAction />
      <Footer />
    </div>
  )
}
