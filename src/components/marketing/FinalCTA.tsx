import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { buttonClasses } from '@/lib/buttonStyles'
import { Reveal } from '@/components/marketing/Reveal'

/** Final conversion section before the footer. */
export function FinalCTA() {
  return (
    <section className="pb-28 pt-8 lg:pb-36">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-surface to-accent/10 px-6 py-16 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
                Give your customers answers at 2am. And 2pm. Every minute.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
                Join thousands of teams letting NOVA handle the volume — while
                they handle the humans.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/signup" className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}>
                  Start free trial
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className={buttonClasses('secondary', 'lg', 'w-full sm:w-auto')}
                >
                  Talk to us
                </Link>
              </div>
              <p className="mt-5 text-xs text-muted">
                Free 14-day trial · No credit card required · Data stays yours
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}