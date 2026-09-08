import { SectionHeading } from '@/components/marketing/SectionHeading'
import { Reveal } from '@/components/marketing/Reveal'

const data = [12, 18, 16, 24, 22, 30, 34]

const points = data
  .map((v, i) => `${i * 50},${110 - v * 2.8}`)
  .join(' ')

const areaPoints = `0,${110 - data[0] * 2.8} ${points} ${(data.length - 1) * 50 + 40},110 0,110`

function MiniSparkline({ values, tone }: { values: number[]; tone: 'purple' | 'cyan' }) {
  const max = Math.max(...values)
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${30 - (v / max) * 24}`).join(' ')
  const color = tone === 'purple' ? '#7c3aed' : '#22d3ee'
  return (
    <svg viewBox="0 0 100 32" className="h-8 w-full overflow-visible" aria-hidden="true">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Analytics teaser with a hand-drawn SVG chart. */
export function AnalyticsPreview() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal from="left">
            <div className="relative">
              <div className="absolute -inset-x-6 -top-8 h-32 rounded-full bg-accent/5 blur-[60px]" aria-hidden="true" />
              <div className="relative rounded-2xl border border-white/10 bg-surface/90 p-6 shadow-xl shadow-black/40">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-text">Conversations</p>
                    <p className="text-xs text-muted">Last 7 days</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                    +38%
                  </span>
                </div>
                <svg viewBox="0 0 340 120" className="mt-6 w-full" role="img" aria-label="Line chart showing conversations trending upward">
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0, 1, 2, 3].map((i) => (
                    <line key={i} x1="0" x2="340" y1={110 - i * 26} y2={110 - i * 26} stroke="rgba(255,255,255,0.04)" />
                  ))}
                  <polygon points={areaPoints} fill="url(#areaGrad)" />
                  <polyline
                    points={`${points} ${(data.length - 1) * 50 + 12},${110 - data[data.length - 1] * 2.8}`}
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx={(data.length - 1) * 50 + 12} cy={110 - data[data.length - 1] * 2.8} r="4" fill="#22d3ee" />
                </svg>
                <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                  <div>
                    <p className="text-xs text-muted">Avg response time</p>
                    <p className="text-lg font-semibold text-text">24s</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Resolution rate</p>
                    <p className="text-lg font-semibold text-text">71%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">CSAT</p>
                    <p className="text-lg font-semibold text-text">4.8/5</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Analytics"
              title="Know where support is winning."
              description="Every metric that matters — resolution rate, CSAT, response time, top questions — tracked automatically and ready for your board deck."
            />
            <Reveal delay={0.15}>
              <div className="mt-8 space-y-5">
                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-surface px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-text">Resolved by AI</p>
                    <p className="text-xs text-muted">No human ever touched these</p>
                  </div>
                  <div className="w-28">
                    <MiniSparkline values={[10, 14, 13, 18, 22, 27, 31]} tone="purple" />
                  </div>
                  <span className="text-sm font-semibold text-text">71%</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-surface px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-text">Customer satisfaction</p>
                    <p className="text-xs text-muted">Across all channels</p>
                  </div>
                  <div className="w-28">
                    <MiniSparkline values={[20, 21, 25, 23, 27, 28, 29]} tone="cyan" />
                  </div>
                  <span className="text-sm font-semibold text-text">+12pts</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-surface px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-text">Hours saved</p>
                    <p className="text-xs text-muted">Per agent, per month</p>
                  </div>
                  <div className="w-28">
                    <MiniSparkline values={[5, 8, 12, 15, 19, 24, 31]} tone="purple" />
                  </div>
                  <span className="text-sm font-semibold text-text">43h</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}