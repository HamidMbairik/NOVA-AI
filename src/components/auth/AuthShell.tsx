import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Logo } from '@/components/Logo'

interface AuthShellProps {
  title: string
  subtitle: ReactNode
  children: ReactNode
  /** The aside panel content varies by page. */
  aside?: ReactNode
}

/** Split-screen auth layout: form on the left, brand proof on the right. */
export function AuthShell({ title, subtitle, children, aside }: AuthShellProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-between px-6 py-8 sm:px-10 lg:px-16">
        <div>
          <Link to="/" aria-label="NOVA AI home">
            <Logo />
          </Link>
        </div>

        <main className="mx-auto w-full max-w-md py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-3xl font-bold tracking-tight text-text">{title}</h1>
            <p className="mt-2 text-muted">{subtitle}</p>
            <div className="mt-9">{children}</div>
          </motion.div>
        </main>

        <p className="text-xs text-muted">
          © {new Date().getFullYear()} NOVA AI, Inc.
        </p>
      </div>

      <aside
        className="relative hidden overflow-hidden border-l border-white/8 bg-gradient-to-br from-primary/15 via-surface to-accent/10 p-12 lg:flex lg:flex-col lg:justify-center"
        aria-label="Why teams choose NOVA"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent/10 blur-[90px]"
        />

        {aside ?? (
          <>
            <figure className="relative max-w-md">
              <blockquote className="text-2xl font-medium leading-relaxed text-text">
                “We launched with NOVA as our entire support team. Response times
                dropped from hours to seconds.”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Marcus Cole"
                  className="h-11 w-11 rounded-full border border-white/10 object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-text">Marcus Cole</p>
                  <p className="text-xs text-muted">Co-founder, Helio</p>
                </div>
              </figcaption>
            </figure>

            <ul className="mt-12 max-w-md space-y-3">
              {[
                '71% of tickets resolved by AI',
                'Median response under 30 seconds',
                'SOC 2 Type II · EU data residency',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent" aria-hidden="true">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </div>
  )
}