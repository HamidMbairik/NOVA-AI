import { Link } from 'react-router-dom'
import { Logo } from '@/components/Logo'

const columns: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'Integrations', to: '/integrations' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Resources', to: '/resources' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', to: '/contact' },
      { label: 'Resources', to: '/resources' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Log in', to: '/login' },
      { label: 'Sign up', to: '/signup' },
      { label: 'Dashboard', to: '/app' },
    ],
  },
]

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/8 bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link to="/" aria-label="NOVA AI home">
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              AI-powered customer support that never sleeps. Resolve tickets in
              seconds, not days.
            </p>
            <p className="mt-6 text-xs text-muted">
              © {new Date().getFullYear()} NOVA AI, Inc.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold text-text">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted transition-colors hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  )
}