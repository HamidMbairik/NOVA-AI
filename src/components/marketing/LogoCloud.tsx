import { Reveal } from '@/components/marketing/Reveal'

const names = ['Lumina', 'Helio', 'Atlas Studio', 'Northwind', 'Brightline', 'Kite & Co']

/** Text-based "trusted by" logos — no fake logo assets needed. */
export function LogoCloud() {
  return (
    <section className="border-y border-white/5 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Automating support for teams at
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {names.map((name) => (
              <span
                key={name}
                className="font-display text-lg font-semibold text-muted/70 transition-colors hover:text-text"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}