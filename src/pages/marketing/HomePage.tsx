import { HeroSection } from '@/components/marketing/HeroSection'
import { LogoCloud } from '@/components/marketing/LogoCloud'
import { ProductIntro } from '@/components/marketing/ProductIntro'
import { InteractiveDemoSection } from '@/components/marketing/InteractiveDemoSection'
import { FeatureGrid } from '@/components/marketing/FeatureGrid'
import { MockDashboard } from '@/components/marketing/MockDashboard'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { IntegrationsPreview } from '@/components/marketing/IntegrationsPreview'
import { AnalyticsPreview } from '@/components/marketing/AnalyticsPreview'
import { Testimonials } from '@/components/marketing/Testimonials'
import { PricingPreview } from '@/components/marketing/PricingPreview'
import { FAQSection } from '@/components/marketing/FAQSection'
import { FinalCTA } from '@/components/marketing/FinalCTA'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoCloud />
      <ProductIntro />
      <InteractiveDemoSection />
      <FeatureGrid />
      <MockDashboard />
      <HowItWorks />
      <IntegrationsPreview />
      <AnalyticsPreview />
      <Testimonials />
      <PricingPreview />
      <FAQSection />
      <FinalCTA />
    </>
  )
}

export default HomePage