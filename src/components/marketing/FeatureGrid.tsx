import { features } from '@/data/marketing'
import { SectionHeading } from '@/components/marketing/SectionHeading'
import { Reveal } from '@/components/marketing/Reveal'

/** The full feature grid (also reused by the Features page). */
export function FeatureGrid() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Platform"
          title={
            <>
              Everything your support team needs.{' '}
              <span className="text-gradient">Nothing it doesn’t.</span>
            </>
          }
          description="A complete AI support stack — inbox, agents, knowledge, and analytics — that plugs into the tools you already use."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 4) * 0.07}>
              <div className="group h-full rounded-2xl border border-white/8 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-elevated/60">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-accent-soft transition-colors group-hover:bg-primary/20">
                  <feature.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-text">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}