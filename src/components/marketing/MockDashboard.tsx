import { Bot, MessageSquare, Send, Check, PieChart } from 'lucide-react'
import { SectionHeading } from '@/components/marketing/SectionHeading'
import { Reveal } from '@/components/marketing/Reveal'

function RelevanceBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-white/5 ${className ?? ''}`}>
      <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${value}%` }} />
    </div>
  )
}

/** A pixel-built miniature of the NOVA dashboard — used instead of an image. */
export function MockDashboard() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="In the product"
          title="One calm workspace. Every conversation."
          description="A unified inbox with AI context on every ticket — no more tab-hopping between channels."
        />
        <Reveal delay={0.1} className="mt-14">
          <div className="relative">
            <div className="absolute -inset-x-8 -top-10 h-40 rounded-full bg-primary/10 blur-[80px]" aria-hidden="true" />
            <div className="relative mx-auto overflow-hidden rounded-2xl border border-white/10 bg-surface/90 shadow-2xl shadow-black/50">
              {/* Window chrome */}
              <div className="flex h-9 items-center gap-2 border-b border-white/8 bg-elevated/60 px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="ml-3 text-xs text-muted">app.nova.ai — Inbox</span>
              </div>

              <div className="flex">
                {/* Mini inbox list */}
                <div className="hidden w-64 border-r border-white/8 sm:block">
                  {[
                    { name: 'Dana Whitfield', subject: 'Order update request', ai: true, unread: 2 },
                    { name: 'Omar Haddad', subject: 'Login issue — urgent', ai: true, unread: 1 },
                    { name: 'Lena Fischer', subject: 'Shipping question', ai: false },
                    { name: 'Ravi Patel', subject: 'Payment discrepancy', ai: true },
                  ].map((row, i) => (
                    <div
                      key={row.name}
                      className={`border-b border-white/5 px-4 py-3 ${i === 0 ? 'bg-primary/10' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-text">{row.name}</p>
                        {row.ai ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                            <Bot className="h-2.5 w-2.5" /> AI
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-muted">
                            <MessageSquare className="h-2.5 w-2.5" />
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted">{row.subject}</p>
                    </div>
                  ))}
                </div>

                {/* Conversation view */}
                <div className="flex-1 p-4">
                  <div className="flex max-w-md flex-col gap-3">
                    <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-white/8 bg-elevated px-3.5 py-2.5 text-xs leading-relaxed text-text">
                      Hi! My order #N-48291 was supposed to arrive two days ago. Can you check?
                    </div>
                    <div className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-gradient-to-r from-primary/80 to-secondary/80 px-3.5 py-2.5 text-xs leading-relaxed text-white">
                      I’m on it, Dana. Checking the carrier now…
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-background">
                        <Bot className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <div className="rounded-2xl rounded-bl-md border border-white/8 bg-elevated px-3.5 py-2.5 text-xs leading-relaxed text-text">
                        <p>Good news — it’s out for delivery and should arrive today by 5pm.</p>
                        <div className="mt-2">
                          <p className="mb-1 text-[10px] font-medium text-muted">NOVA confidence</p>
                          <RelevanceBar value={97} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium text-accent-soft"
                      >
                        <Check className="h-3 w-3" aria-hidden="true" />
                        Resolve conversation
                      </button>
                    </div>
                  </div>

                  {/* Composer */}
                  <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-surface px-3 py-2">
                    <input
                      type="text"
                      readOnly
                      placeholder="Reply as Dana or let NOVA draft…"
                      className="w-full bg-transparent text-xs text-text placeholder:text-muted/60 focus:outline-none"
                      aria-label="Message composer preview"
                    />
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-background">
                      <Send className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </div>
                </div>

                {/* Context panel */}
                <div className="hidden w-56 border-l border-white/8 p-4 md:block">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                    Customer context
                  </p>
                  <div className="mt-3 rounded-xl bg-elevated/60 p-3">
                    <p className="text-xs font-medium text-text">Dana Whitfield</p>
                    <p className="mt-1 text-[10px] text-muted">dana@whitfield.co</p>
                    <p className="mt-1 text-[10px] text-muted">Loyalty: Gold</p>
                    <div className="mt-2.5">
                      <p className="mb-1 text-[10px] text-muted">Sentiment</p>
                      <div className="flex items-center gap-2">
                        <RelevanceBar value={86} />
                        <span className="text-[10px] text-emerald-400">Positive</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-muted">
                    Suggested KB
                  </p>
                  <div className="mt-2 rounded-xl bg-elevated/60 p-3 text-[10px] leading-relaxed text-muted">
                    <p className="text-accent-soft">“Where is my order?”</p>
                    <p className="mt-1">Matches 3 past tickets. 97% match.</p>
                  </div>
                </div>
              </div>

              {/* Mini analytics strip */}
              <div className="flex items-center gap-4 border-t border-white/8 bg-elevated/40 px-4 py-2.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] text-muted">
                  <PieChart className="h-3 w-3 text-accent" aria-hidden="true" />
                  71% resolved by AI
                </span>
                <span className="text-[10px] text-muted">Avg response: 24s</span>
                <span className="ml-auto text-[10px] text-muted">2,841 resolved this week</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}