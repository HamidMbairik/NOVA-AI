import { useState } from 'react'
import {
  Check,
  Download,
  CreditCard,
  ArrowDownToLine,
  ArrowUpToLine,
  Sparkles,
  Receipt,
} from 'lucide-react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { usageStats, invoices } from '@/data/dashboard'

const plans = [
  { id: 'growth' as const, name: 'Growth', price: 49, seats: 10, tone: 'highlight' as const },
  { id: 'scale' as const, name: 'Scale', price: 149, seats: 25, tone: 'normal' as const },
]

export function BillingPage() {
  const [plan, setPlan] = useState<'growth' | 'scale'>('growth')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [billingYearly, setBillingYearly] = useState(true)

  const togglePlan = (target: 'growth' | 'scale') => {
    setPlan(target)
    setConfirmOpen(true)
  }

  const currentPlan = plans.find((p) => p.id === plan)!
  const usagePct = Math.min(100, Math.round((usageStats.conversations / usageStats.quota) * 100))

  return (
    <>
      <PageHeader
        title="Billing"
        description="Your plan, usage, and invoices."
      />

      {/* Current plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-accent" aria-hidden="true" />
            Current plan
          </CardTitle>
          <Badge tone={plan === 'growth' ? 'primary' : 'cyan'}>{currentPlan.name}</Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold text-text">
                ${billingYearly ? Math.round(currentPlan.price * 0.8) : currentPlan.price}
              </span>
              <span className="text-sm text-muted">/month{plan === 'growth' && billingYearly ? ' · billed annually' : ''}</span>
            </div>
            <p className="mt-2 text-sm text-muted">
              {plan === 'growth'
                ? '1,500 conversations/month · 10 agents · all channels · advanced analytics'
                : 'Unlimited conversations · unlimited agents · SSO/SAML · dedicated manager'}
            </p>
          </div>
          <Button
            variant={plan === 'growth' ? 'secondary' : 'primary'}
            onClick={() => togglePlan(plan === 'growth' ? 'scale' : 'growth')}
          >
            {plan === 'growth' ? (
              <>
                <ArrowUpToLine className="h-4 w-4" aria-hidden="true" />
                Upgrade to Scale
              </>
            ) : (
              <>
                <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
                Downgrade to Growth
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>This month’s usage</CardTitle>
          <span className="text-sm text-muted">{usageStats.conversations} / {usageStats.quota}</span>
        </CardHeader>
        <CardContent>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/5">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${usagePct}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted">
            {usagePct}% of your {usageStats.quota.toLocaleString()} monthly conversation quota.
            Overages bill at $0.02 per conversation.
          </p>
        </CardContent>
      </Card>

      {/* Plans selector */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {plans.map((p) => {
          const active = p.id === plan
          return (
            <Card key={p.id} className={active ? 'border-primary/50' : ''}>
              <CardHeader>
                <CardTitle>{p.name}</CardTitle>
                {active && <Badge tone="primary">Current</Badge>}
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold text-text">
                  ${p.price}
                  <span className="text-sm font-normal text-muted">/mo</span>
                </p>
                <ul className="mt-4 space-y-2.5">
                  {[
                    p.id === 'growth' ? '1,500 conversations / mo' : 'Unlimited conversations',
                    `${p.seats} AI agents`,
                    p.id === 'growth' ? 'All channels' : 'All channels + API',
                    p.id === 'growth' ? 'Advanced analytics' : 'SSO / SAML · dedicated manager',
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted">
                      <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <label className="mt-5 inline-flex cursor-pointer items-center gap-2.5 text-sm text-muted">
        <input
          type="checkbox"
          checked={billingYearly}
          onChange={(e) => setBillingYearly(e.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-surface accent-[#7c3aed]"
        />
        Pay annually
        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">Save 20%</span>
      </label>

      {/* Invoices */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-4 w-4 text-accent" aria-hidden="true" />
            Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/8 text-xs uppercase tracking-wider text-muted">
                <th scope="col" className="pb-3 font-medium">Invoice</th>
                <th scope="col" className="pb-3 font-medium">Plan</th>
                <th scope="col" className="pb-3 font-medium">Amount</th>
                <th scope="col" className="pb-3 font-medium">Status</th>
                <th scope="col" className="pb-3" />
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-white/5 last:border-0">
                  <td className="py-3.5 text-text">{inv.id}</td>
                  <td className="py-3.5 text-muted">{inv.plan}</td>
                  <td className="py-3.5 text-muted">{inv.amount === 0 ? 'Free' : `$${inv.amount}`}</td>
                  <td className="py-3.5">
                    {inv.status === 'paid' ? (
                      <Badge tone="success">Paid</Badge>
                    ) : inv.status === 'pending' ? (
                      <Badge tone="warning">Pending</Badge>
                    ) : (
                      <Badge tone="error">Failed</Badge>
                    )}
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      type="button"
                      aria-label={`Download ${inv.id}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Confirmation dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} labelledBy="plan-change-title">
        <div className="p-7">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-accent-soft">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 id="plan-change-title" className="mt-5 text-xl font-bold text-text">
            {plan === 'scale' ? 'Upgrade to Scale?' : 'Downgrade to Growth?'}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {plan === 'scale'
              ? 'You’ll get unlimited conversations, unlimited agents, and SSO/SAML. Charged $149/month from your next billing cycle.'
              : 'You’ll drop to 1,500 conversations/month and 10 agents. Charged $49/month from your next billing cycle.'}
          </p>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button onClick={() => setConfirmOpen(false)}>
              {plan === 'scale' ? 'Upgrade now' : 'Downgrade now'}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default BillingPage