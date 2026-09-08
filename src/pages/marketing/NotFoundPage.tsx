import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { buttonClasses } from '@/lib/buttonStyles'

export function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Link to="/" className="absolute left-6 top-6" aria-label="NOVA AI home">
        <Logo />
      </Link>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[100px]"
      />
      <Compass className="h-10 w-10 text-accent" aria-hidden="true" />
      <h1 className="mt-6 font-display text-7xl font-bold text-gradient">404</h1>
      <p className="mt-4 max-w-sm text-muted">
        This page took the day off — but our support team never does. Let’s get
        you back on track.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className={buttonClasses('primary', 'md')}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back home
        </Link>
        <Link to="/contact" className={buttonClasses('secondary', 'md')}>
          Contact support
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage