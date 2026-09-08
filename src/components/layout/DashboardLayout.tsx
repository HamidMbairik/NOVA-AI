import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  MessageSquare,
  Bot,
  BookOpen,
  BarChart3,
  Puzzle,
  Users,
  CreditCard,
  Settings,
  Search,
  Bell,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { cn } from '@/lib/cn'

const navSections: { label: string; links: { to: string; label: string; icon: typeof LayoutDashboard }[] }[] = [
  {
    label: 'Workspace',
    links: [
      { to: '/app', label: 'Overview', icon: LayoutDashboard },
      { to: '/app/conversations', label: 'Conversations', icon: MessageSquare },
      { to: '/app/agents', label: 'AI Agents', icon: Bot },
      { to: '/app/knowledge', label: 'Knowledge Base', icon: BookOpen },
      { to: '/app/analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'Manage',
    links: [
      { to: '/app/integrations', label: 'Integrations', icon: Puzzle },
      { to: '/app/team', label: 'Team', icon: Users },
      { to: '/app/billing', label: 'Billing', icon: CreditCard },
      { to: '/app/settings', label: 'Settings', icon: Settings },
    ],
  },
]

function Sidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Link to="/" aria-label="NOVA AI home">
          <Logo />
        </Link>
      </div>

      <nav aria-label="Dashboard" className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted/60">
              {section.label}
            </p>
            <ul className="space-y-1">
              {section.links.map((link) => (
                <li key={link.to + link.label}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary/15 text-text'
                          : 'text-muted hover:bg-white/5 hover:text-text',
                      )
                    }
                  >
                    <link.icon
                      className={cn(
                        'h-4.5 w-4.5',
                        // Active state handled by parent classname; keep icon neutral
                      )}
                      aria-hidden="true"
                    />
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/8 p-3">
        <Link
          to="/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-text"
        >
          <LogOut className="h-4.5 w-4.5" aria-hidden="true" />
          Log out
        </Link>
      </div>
    </div>
  )
}

function DashboardHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/8 bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open navigation"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-text hover:bg-white/5 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden flex-1 sm:block sm:max-w-md">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search conversations, customers, docs…"
          aria-label="Search"
          className="h-10 w-full rounded-lg border border-white/10 bg-surface pl-10 pr-4 text-sm text-text placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-text"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span
            aria-hidden="true"
            className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent"
          />
        </button>
        <button
          type="button"
          aria-label="Account menu"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-background"
        >
          JD
        </button>
      </div>
    </header>
  )
}

export function DashboardLayout() {
  const [mobileNav, setMobileNav] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/8 bg-surface lg:block">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      {mobileNav && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Dashboard navigation"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileNav(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-surface shadow-2xl">
            <div className="flex h-16 items-center justify-end px-4">
              <button
                type="button"
                onClick={() => setMobileNav(false)}
                aria-label="Close navigation"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div onClick={() => setMobileNav(false)}>
              <Sidebar />
            </div>
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <DashboardHeader onMenu={() => setMobileNav(true)} />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}