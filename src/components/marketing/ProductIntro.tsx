import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Zap, Brain } from 'lucide-react'
import { SectionHeading } from '@/components/marketing/SectionHeading'
import { Reveal } from '@/components/marketing/Reveal'

const points = [
  {
    icon: Zap,
    title: 'Answers in seconds',
    description:
      'NOVA reads intent first — a tracking request is not a refund request. It answers routine questions instantly and gracefully hands off the rest.',
  },
  {
    icon: Brain,
    title: 'Learns from every ticket',
    description:
      'Every conversation sharpens NOVA. Resolved tickets teach it your products, policies, and perfect tone — so answers get better over time.',
  },
  {
    icon: ShieldCheck,
    title: 'Never invents answers',
    description:
      'NOVA only answers from verified knowledge. When it is not sure, it says so, asks a clarifying question, or escalates with full context.',
  },
]

/** Product introduction — the "why NOVA" pitch. */
export function ProductIntro() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Meet NOVA"
          title={
            <>
              Not a chatbot. A teammate that{' '}
              <span className="text-gradient">never clocks out.</span>
            </>
          }
          description="NOVA is purpose-built to resolve customer conversations end-to-end — handling the volume, triaging complexity, and keeping your team in control."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.1}>
              <div className="group h-full rounded-2xl border border-white/8 bg-surface p-7 transition-colors hover:border-primary/40">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-accent">
                  <point.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-text">
                  {point.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {point.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            to="/features"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-text"
          >
            Explore all features
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}