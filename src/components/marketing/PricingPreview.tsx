import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { pricingTiers } from '@/data/marketing'
import { SectionHeading } from '@/components/marketing/SectionHeading'
import { Reveal } from '@/components/marketing/Reveal'
import { buttonClasses } from '@/lib/buttonStyles'

/** Pricing teaser for the homepage. */
export function PricingPreview() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Start free. Scale when you grow."
          description="Simple, transparent pricing that grows with your conversation volume."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-7 transition-colors ${
                  tier.highlight
                    ? 'border-primary/50 bg-gradient-to-b from-primary/15 to-surface'
                    : 'border-white/8 bg-surface'
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-semibold text-background">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold text-text">
                  {tier.name}
                </h3>
                <p className="mt-1.5 text-sm text-muted">{tier.description}</p>
                <p className="mt-5">
                  <span className="font-display text-4xl font-bold text-text">${tier.price}</span>
                  <span className="text-sm text-muted">{tier.period}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/pricing"
                  className={buttonClasses(
                    tier.highlight ? 'primary' : 'secondary',
                    'md',
                    'mt-7',
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-text"
          >
            Compare plans in full
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}