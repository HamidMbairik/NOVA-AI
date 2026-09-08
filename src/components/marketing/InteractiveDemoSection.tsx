import { SectionHeading } from '@/components/marketing/SectionHeading'
import { InteractiveAIDemo } from '@/components/marketing/InteractiveAIDemo'
import { Reveal } from '@/components/marketing/Reveal'

/** Homepage section featuring the live AI demo. */
export function InteractiveDemoSection() {
  return (
    <section id="demo" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Live demo"
              title={
                <>
                  Talk to NOVA right now.{' '}
                  <span className="text-gradient">Go ahead.</span>
                </>
              }
              description="This is the same AI your customers would talk to. Try the scenarios below — real intents, real answers, no scripted happy-feel energy."
            />
            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-4">
                {[
                  'Understands intent, not just keywords',
                  'Answers only from verified knowledge',
                  'Escalates when it should, resolves when it can',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M2 6l3 3 5-6" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} from="none">
            <InteractiveAIDemo />
          </Reveal>
        </div>
      </div>
    </section>
  )
}