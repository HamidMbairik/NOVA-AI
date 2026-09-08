import { Check } from 'lucide-react'
import { featuresDeepDive } from '@/data/marketing'
import { FeatureGrid } from '@/components/marketing/FeatureGrid'
import { SectionHeading } from '@/components/marketing/SectionHeading'
import { Reveal } from '@/components/marketing/Reveal'
import { FinalCTA } from '@/components/marketing/FinalCTA'

export function FeaturesPage() {
  return (
    <>
      <section className="pt-36 pb-16 lg:pt-44">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Features"
            title={
              <>
                A support platform that thinks.{' '}
                <span className="text-gradient">And works.</span>
              </>
            }
            description="Every feature is built around one goal: resolve conversations faster without losing the human touch."
          />
        </div>
      </section>

      {/* Deep-dive blocks */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
          {featuresDeepDive.map((block, i) => (
            <Reveal key={block.title} delay={0.05}>
              <article
                className={`grid overflow-hidden rounded-3xl border border-white/8 bg-surface lg:grid-cols-2 ${
                  i % 2 === 1 ? 'lg:[direction:rtl]' : ''
                }`}
              >
                <div
                  className="p-8 sm:p-10 lg:[direction:ltr] lg:self-center"
                >
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                    <block.icon className="h-4 w-4" aria-hidden="true" />
                    {block.tag}
                  </span>
                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-text sm:text-3xl">
                    {block.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted">
                    {block.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {block.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-text/90">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative lg:[direction:ltr]">
                  {/* Visual blocks */}
                  <div className="flex h-full min-h-[260px] items-center justify-center bg-gradient-to-br from-primary/10 via-surface to-accent/10 p-8">
                    <VisualBlock index={i} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <FeatureGrid />

      <section className="border-t border-white/5 py-24">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 text-center sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { v: '1.2s', l: 'Median time to first AI response' },
            { v: '40+', l: 'Languages supported' },
            { v: '99.99%', l: 'Uptime SLA on Scale' },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-4xl font-bold text-gradient">{s.v}</p>
              <p className="mt-2 text-sm text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <FinalCTA />
    </>
  )
}

function VisualBlock({ index }: { index: number }) {
  const panels = [
    {
      rows: [
        { label: 'Order status', pct: 96, tone: 'from-primary to-secondary' },
        { label: 'Refund policy', pct: 88, tone: 'from-secondary to-accent' },
        { label: 'Shipping times', pct: 82, tone: 'from-primary to-accent' },
        { label: 'Account access', pct: 78, tone: 'from-accent to-primary' },
      ],
      title: 'Intent recognition',
    },
    {
      rows: [
        { label: 'Resolution rate', pct: 84, tone: 'from-primary to-accent' },
        { label: 'CSAT', pct: 92, tone: 'from-accent to-primary' },
        { label: 'Handoff accuracy', pct: 97, tone: 'from-primary to-secondary' },
      ],
      title: 'Live metrics',
    },
    {
      rows: [
        { label: 'WhatsApp', pct: 100, tone: 'from-primary to-accent' },
        { label: 'Email', pct: 100, tone: 'from-secondary to-accent' },
        { label: 'Slack', pct: 100, tone: 'from-primary to-secondary' },
        { label: 'Web widget', pct: 100, tone: 'from-accent to-primary' },
      ],
      title: 'Channels connected',
    },
    {
      rows: [
        { label: 'Sentiment detected', pct: 94, tone: 'from-primary to-accent' },
        { label: 'Escalated to human', pct: 29, tone: 'from-secondary to-primary' },
        { label: 'Customers helped', pct: 100, tone: 'from-accent to-primary' },
      ],
      title: 'Sentiment engine',
    },
  ]

  const panel = panels[index % panels.length]
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface/90 p-6 shadow-xl shadow-black/30">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
        {panel.title}
      </p>
      <div className="mt-4 space-y-4">
        {panel.rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-text">{row.label}</span>
              <span className="text-muted">{row.pct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${row.tone}`}
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturesPage