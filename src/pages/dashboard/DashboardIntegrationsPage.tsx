import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plug, Unplug, Check } from 'lucide-react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card } from '@/components/ui/Card'
import { Search } from 'lucide-react'
import { integrations } from '@/data/marketing'
import { BrandIcon } from '@/components/ui/BrandIcon'
import { cn } from '@/lib/cn'

export function DashboardIntegrationsPage() {
  const [connected, setConnected] = useState<string[]>([
    'Shopify',
    'Slack',
    'WhatsApp',
    'Discord',
  ])
  const [query, setQuery] = useState('')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q
      ? integrations.filter((i) => `${i.name} ${i.category}`.toLowerCase().includes(q))
      : integrations
  }, [query])

  const toggle = (name: string) =>
    setConnected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))

  return (
    <>
      <PageHeader
        title="Integrations"
        description="Connect your channels and tools."
        actions={
          <span className="rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-accent-soft">
            {connected.length} connected
          </span>
        }
      />

      <div className="relative mb-6 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search integrations…"
          aria-label="Search integrations"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 w-full rounded-lg border border-white/10 bg-surface pl-9 pr-3 text-sm text-text placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((integration) => {
          const isConnected = connected.includes(integration.name)
          return (
            <Card key={integration.name} className="p-5">
              <div className="flex items-start justify-between">
                <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <BrandIcon name={integration.name} className="h-7 w-7" />
                </span>
                <button
                  type="button"
                  onClick={() => toggle(integration.name)}
                  aria-pressed={isConnected}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                    isConnected
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : 'border-white/10 text-muted hover:border-white/25 hover:text-text',
                  )}
                >
                  {isConnected ? (
                    <>
                      <Unplug className="h-3.5 w-3.5" aria-hidden="true" />
                      Disconnect
                    </>
                  ) : (
                    <>
                      <Plug className="h-3.5 w-3.5" aria-hidden="true" />
                      Connect
                    </>
                  )}
                </button>
              </div>
              <h3 className="mt-4 font-semibold text-text">{integration.name}</h3>
              <p className="mt-1 flex-1 text-sm text-muted">{integration.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-accent">{integration.category}</span>
                {isConnected && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    Live
                  </span>
                )}
              </div>
            </Card>
          )
        })}
        {list.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-muted">
            No integrations for “{query}”. Want us to build one?{' '}
            <Link to="/contact" className="text-accent hover:text-text">Talk to us.</Link>
          </p>
        )}
      </div>
    </>
  )
}

export default DashboardIntegrationsPage