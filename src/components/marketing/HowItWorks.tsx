import { howItWorks } from '@/data/marketing'
import { SectionHeading } from '@/components/marketing/SectionHeading'
import { Reveal } from '@/components/marketing/Reveal'

/** Four-step "from setup to self-driving support" narrative. */
export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Live in an afternoon. Self-driving in a week."
          description="No AI engineers, no weeks of setup. If you can connect an app, you can launch NOVA."
        />

        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.12}>
              <li className="relative h-full rounded-2xl border border-white/8 bg-surface p-7">
                <span
                  aria-hidden="true"
                  className="font-display text-5xl font-bold text-white/5"
                >
                  {step.step}
                </span>
                <div
                  aria-hidden="true"
                  className="absolute left-7 top-0 h-full w-px bg-gradient-to-b from-primary/40 to-transparent"
                />
                <h3 className="mt-4 text-lg font-semibold leading-snug text-text">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}