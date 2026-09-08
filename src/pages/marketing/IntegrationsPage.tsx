import { useMemo, useState } from 'react'
import { Check, Plug } from 'lucide-react'
import { integrations } from '@/data/marketing'
import { SectionHeading } from '@/components/marketing/SectionHeading'
import { Reveal } from '@/components/marketing/Reveal'
import { FinalCTA } from '@/components/marketing/FinalCTA'
import { BrandIcon } from '@/components/ui/BrandIcon'
import { cn } from '@/lib/cn'

const categories = ['All', ...Array.from(new Set(integrations.map((i) => i.category)))]

export function IntegrationsPage() {
  const [category, setCategory] = useState('All')

  const visible = useMemo(
    () =>
      category === 'All'
        ? integrations
        : integrations.filter((i) => i.category === category),
    [category],
  )

  return (
    <>
      <section className="pt-36 pb-16 lg:pt-44">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Integrations"
            title={
              <>
                Your stack, fully connected. <span className="text-gradient">In minutes.</span>
              </>
            }
            description="NOVA plugs into the tools your team already lives in. Connect once — every channel flows into one AI-powered inbox."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter integrations by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                  category === c
                    ? 'border-primary bg-primary/15 text-text'
                    : 'border-white/10 text-muted hover:border-white/25 hover:text-text',
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((integration, i) => (
              <Reveal key={integration.name} delay={(i % 3) * 0.06}>
                <article className="flex h-full flex-col rounded-2xl border border-white/8 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/40">
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
                    >
                      <BrandIcon name={integration.name} className="h-7 w-7" />
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      Connected
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-text">{integration.name}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-muted">
                    {integration.description}
                  </p>
                  <p className="mt-4 text-xs font-medium text-accent">
                    {integration.category}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-8 text-center text-sm text-muted">
              No integrations in this category yet.
            </p>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <Plug className="mx-auto h-8 w-8 text-accent" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-text">
              Building a custom integration?
            </h2>
            <p className="mt-3 text-muted">
              NOVA ships with a clean REST API and webhooks — expose support on
              any platform you build.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}

export default IntegrationsPage