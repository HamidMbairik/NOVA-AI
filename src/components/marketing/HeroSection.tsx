import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { AIEngine } from '@/components/three/AIEngine'
import { buttonClasses } from '@/lib/buttonStyles'

const stats = [
  { value: '24/7', label: 'Availability' },
  { value: '<30s', label: 'Response time' },
  { value: '71%', label: 'AI resolution' },
  { value: '+12pts', label: 'CSAT uplift' },
]

export function HeroSection() {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-40 lg:pb-32">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-[-10%] top-1/3 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      {/* 3D engine — full-bleed backdrop behind the copy */}
      <div className="absolute inset-0 -z-10">
        <AIEngine className="h-full w-full opacity-80" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp(0.05)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-accent-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Support That Never Sleeps
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.15)}
            className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-7xl"
          >
            Your customers get answers.{' '}
            <span className="text-gradient">Instantly.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            NOVA AI understands your products, your voice, and your customers —
            resolving support tickets in seconds while your team focuses on
            what matters.
          </motion.p>

          <motion.div
            {...fadeUp(0.35)}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/signup" className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}>
              Start free trial
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/features"
              className={buttonClasses('secondary', 'lg', 'w-full sm:w-auto')}
            >
              <PlayCircle className="h-5 w-5" aria-hidden="true" />
              See how it works
            </Link>
          </motion.div>

          <motion.p {...fadeUp(0.45)} className="mt-4 text-xs text-muted">
            Free 14-day trial · No credit card required · Cancel anytime
          </motion.p>
        </div>

        {/* Stats bar */}
        <motion.dl
          {...fadeUp(0.55)}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-20"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl px-4 py-5 text-center"
            >
              <dt className="order-2 mt-1 block text-xs font-medium uppercase tracking-wide text-muted">
                {stat.label}
              </dt>
              <dd className="font-display order-1 text-2xl font-bold text-text sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}