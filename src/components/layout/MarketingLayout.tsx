import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { buttonClasses } from '@/lib/buttonStyles'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { marketingNav } from '@/data/site'
import { cn } from '@/lib/cn'

function MarketingNav() {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 8,
  )
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu when the route changes (adjust state during render).
  const [prevPath, setPrevPath] = useState(location.pathname)
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open ? 'glass shadow-lg shadow-black/20' : 'bg-transparent',
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link to="/" className="shrink-0" aria-label="NOVA AI home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {marketingNav.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-text'
                    : 'text-muted hover:text-text hover:bg-white/5',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink to="/login" className="text-sm font-medium text-muted transition-colors hover:text-text">
            Log in
          </NavLink>
          <Link to="/signup" className={buttonClasses('primary', 'sm')}>
            Get started
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-text hover:bg-white/5 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-surface px-4 pb-6 pt-2 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {marketingNav.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2.5 text-base font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-text'
                      : 'text-muted hover:text-text hover:bg-white/5',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
              <NavLink
                to="/login"
                className="rounded-lg px-3 py-2.5 text-base font-medium text-muted hover:text-text"
              >
                Log in
              </NavLink>
              <Link to="/signup" className={buttonClasses('primary', 'md')}>
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export function MarketingLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  )
}