import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Sparkles } from 'lucide-react'
import { pricingTiers } from '@/data/marketing'
import { SectionHeading } from '@/components/marketing/SectionHeading'
import { Reveal } from '@/components/marketing/Reveal'
import { buttonClasses } from '@/lib/buttonStyles'
import { FAQSection } from '@/components/marketing/FAQSection'
import { FinalCTA } from '@/components/marketing/FinalCTA'
import { cn } from '@/lib/cn'

const comparison = [
  { feature: 'Conversations / month', startup: '100', growth: '1,500', scale: 'Unlimited' },
  { feature: 'AI agents', startup: '2', growth: '10', scale: 'Unlimited' },
  { feature: 'Channels', startup: 'Email · chat', growth: 'All channels', scale: 'All + API' },
  { feature: 'Knowledge base training', startup: '—', growth: 'Included', scale: 'Included' },
  { feature: 'Advanced analytics & CSAT', startup: '—', growth: 'Included', scale: 'Included' },
  { feature: 'Custom tone per agent', startup: '—', growth: '—', scale: 'Included' },
  { feature: 'SSO / SAML', startup: '—', growth: '—', scale: 'Included' },
  { feature: 'SOC 2 report access', startup: '—', growth: '—', scale: 'Included' },
  { feature: 'Priority support', startup: 'Community', growth: 'Priority', scale: 'Dedicated manager' },
]

export function PricingPage() {
  const [annual, setAnnual] = useState(true)

  return (
    <>
      <section className="pt-36 pb-16 lg:pt-44">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pricing"
            title={
              <>
                Pricing that scales with you.{' '}
                <span className="text-gradient">Not against you.</span>
              </>
            }
            description="Free to start, transparent as you grow. Every paid plan includes a 14-day free trial."
          />

          {/* Billing toggle */}
          <Reveal delay={0.2} className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-surface p-1">
              <button
                type="button"
                onClick={() => setAnnual(false)}
                aria-pressed={!annual}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  !annual ? 'bg-elevated text-text' : 'text-muted',
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                aria-pressed={annual}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  annual ? 'bg-elevated text-text' : 'text-muted',
                )}
              >
                Annual
                <span className="ml-1.5 text-xs text-accent">−20%</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {pricingTiers.map((tier, i) => {
              const price = annual && tier.price > 0 ? Math.round(tier.price * 0.8) : tier.price
              return (
                <Reveal key={tier.name} delay={i * 0.1}>
                  <div
                    className={cn(
                      'relative flex h-full flex-col rounded-2xl border p-7 transition-colors',
                      tier.highlight
                        ? 'border-primary/50 bg-gradient-to-b from-primary/15 to-surface'
                        : 'border-white/8 bg-surface',
                    )}
                  >
                    {tier.highlight && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-semibold text-background">
                        Most popular
                      </span>
                    )}
                    <h3 className="font-display text-lg font-semibold text-text">{tier.name}</h3>
                    <p className="mt-1.5 text-sm text-muted">{tier.description}</p>
                    <p className="mt-5 flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold text-text">
                        ${price}
                      </span>
                      <span className="text-sm text-muted">{tier.period}</span>
                    </p>
                    {annual && tier.price > 0 && (
                      <p className="mt-1 text-xs text-emerald-400">
                        Billed annually · save ${tier.price - price}/mo
                      </p>
                    )}
                    <ul className="mt-6 flex-1 space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/signup"
                      className={buttonClasses(tier.highlight ? 'primary' : 'secondary', 'md', 'mt-7')}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" aria-hidden="true" />
              <h2 className="text-xl font-bold text-text">Compare plans in detail</h2>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/8 bg-elevated/60">
                    <th scope="col" className="px-6 py-4 font-medium text-muted">
                      Feature
                    </th>
                    {pricingTiers.map((t) => (
                      <th key={t.name} scope="col" className="px-6 py-4 font-semibold text-text">
                        {t.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={cn('border-white/5', i % 2 === 1 && 'bg-white/[0.02]')}>
                      <th scope="row" className="border-t border-white/5 px-6 py-3.5 font-normal text-text">
                        {row.feature}
                      </th>
                      <td className="border-t border-white/5 px-6 py-3.5 text-muted">{row.startup}</td>
                      <td className="border-t border-white/5 px-6 py-3.5 text-muted">{row.growth}</td>
                      <td className="border-t border-white/5 px-6 py-3.5 text-muted">{row.scale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQSection />
      <FinalCTA />
    </>
  )
}

export default PricingPage