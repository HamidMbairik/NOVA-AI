import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { integrations } from '@/data/marketing'
import { SectionHeading } from '@/components/marketing/SectionHeading'
import { Reveal } from '@/components/marketing/Reveal'
import { BrandIcon } from '@/components/ui/BrandIcon'

/** Homepage integrations teaser; full grid lives on the integrations page. */
export function IntegrationsPreview() {
  const visible = integrations.slice(0, 6)
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Integrations"
          title="Plugs into the tools you already run."
          description="Connect once, and every channel flows into one AI-powered inbox."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {visible.map((integration, i) => (
            <Reveal key={integration.name} delay={i * 0.05}>
              <Link
                to="/integrations"
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-white/8 bg-surface p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/40"
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
                >
                  <BrandIcon name={integration.name} className="h-7 w-7" />
                </span>
                <span className="text-sm font-medium text-text group-hover:text-accent-soft">
                  {integration.name}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            to="/integrations"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-text"
          >
            Browse all integrations
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}