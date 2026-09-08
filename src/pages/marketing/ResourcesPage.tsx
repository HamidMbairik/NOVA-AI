import { useState } from 'react'
import { Clock, BookOpen } from 'lucide-react'
import { resources } from '@/data/marketing'
import { SectionHeading } from '@/components/marketing/SectionHeading'
import { Reveal } from '@/components/marketing/Reveal'
import { FinalCTA } from '@/components/marketing/FinalCTA'
import { Dialog, DialogCloseButton } from '@/components/ui/Dialog'
import { cn } from '@/lib/cn'

const categories = ['All', 'Guides', 'Case studies', 'Changelog'] as const
type Category = (typeof categories)[number]

export function ResourcesPage() {
  const [category, setCategory] = useState<Category>('All')
  const [activeId, setActiveId] = useState<string | null>(null)

  const active = resources.find((r) => r.id === activeId) ?? null

  const visible =
    category === 'All'
      ? resources
      : resources.filter((r) => {
          if (category === 'Guides') return r.category === 'Guide'
          if (category === 'Case studies') return r.category === 'Case study'
          return r.category === 'Changelog'
        })

  return (
    <>
      <section className="pt-36 pb-16 lg:pt-44">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Resources"
            title={
              <>
                Learn how teams run <span className="text-gradient">AI-first support.</span>
              </>
            }
            description="Guides, case studies, and product news — everything you need to launch and scale support that never sleeps."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter resources">
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

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 0.06}>
                <button
                  type="button"
                  onClick={() => setActiveId(post.id)}
                  className="group flex h-full w-full flex-col rounded-2xl border border-white/8 bg-surface p-6 text-left transition-all hover:-translate-y-1 hover:border-primary/40"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-xs font-medium',
                        post.category === 'Guide' && 'bg-accent/10 text-accent',
                        post.category === 'Case study' && 'bg-primary/15 text-accent-soft',
                        post.category === 'Changelog' && 'bg-emerald-500/10 text-emerald-400',
                      )}
                    >
                      {post.category}
                    </span>
                    <time className="text-xs text-muted">{post.date}</time>
                  </div>
                  <h2 className="mt-4 text-lg font-semibold leading-snug text-text transition-colors group-hover:text-accent-soft">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-muted">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {post.readTime} read
                  </p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Article reader */}
      <Dialog
        open={active !== null}
        onClose={() => setActiveId(null)}
        labelledBy="article-title"
      >
        {active && (
          <article className="p-7 sm:p-10" key={active.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                    {active.category}
                  </span>
                  <time className="text-xs text-muted">{active.date}</time>
                </div>
                <h2 id="article-title" className="mt-4 text-2xl font-bold leading-tight text-text">
                  {active.title}
                </h2>
                <p className="mt-2 text-sm text-muted">{active.readTime} read</p>
              </div>
              <DialogCloseButton onClose={() => setActiveId(null)} />
            </div>
            <div className="mt-6 space-y-5">
              {active.body.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-text/90">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-8 inline-flex items-center gap-2 border-t border-white/8 pt-6 text-xs text-muted">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Written for NOVA AI’s support community.
            </p>
          </article>
        )}
      </Dialog>

      <FinalCTA />
    </>
  )
}

export default ResourcesPage