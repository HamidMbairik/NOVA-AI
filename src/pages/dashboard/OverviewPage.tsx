import {
  MessageSquare,
  CheckCircle2,
  Smile,
  Timer,
  Bot,
  Clock,
  Sparkles,
} from 'lucide-react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { LineChart, BarRow } from '@/components/dashboard/charts'
import { analyticsSeries, usageStats } from '@/data/dashboard'
import { conversations } from '@/data/conversations'
import { getCustomer } from '@/data/conversations'

const recentActivity = [
  { time: '2m ago', text: 'NOVA resolved “Order status — #N-48291”', tone: 'ai' as const },
  { time: '18m ago', text: '“Duplicate charge” escalated to Marcus', tone: 'human' as const },
  { time: '34m ago', text: 'Vesper answered a refund question on WhatsApp', tone: 'ai' as const },
  { time: '1h ago', text: 'Sarah resolved 5 conversations in Slack', tone: 'human' as const },
  { time: '2h ago', text: 'NOVA flagged a knowledge gap: “loyalty points”', tone: 'ai' as const },
]

export function OverviewPage() {
  const stats = [
    { label: 'Conversations today', value: `${usageStats.conversations}`, sub: 'of 1,500 quota', trend: 'up' as const, trendLabel: '+12%', icon: MessageSquare, tone: 'default' as const },
    { label: 'Resolution rate', value: `${usageStats.resolutionRate}%`, sub: 'goal 65%', trend: 'up' as const, trendLabel: '+4pts', icon: CheckCircle2, tone: 'primary' as const },
    { label: 'CSAT', value: `${usageStats.satisfaction}%`, sub: 'last 30 days', trend: 'up' as const, trendLabel: '+2pts', icon: Smile, tone: 'cyan' as const },
    { label: 'Avg response time', value: `${usageStats.responseTime}s`, sub: 'median, all channels', trend: 'down' as const, trendLabel: '-8s', icon: Timer, tone: 'default' as const },
  ]

  return (
    <>
      <PageHeader
        title="Overview"
        description="Wednesday, September 9 — everything looks healthy."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Conversations chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conversations over time</CardTitle>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" /> Total
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" /> AI resolved
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <LineChart
              labels={analyticsSeries.map((d) => d.date)}
              series={[
                { name: 'Total', values: analyticsSeries.map((d) => d.conversations), color: '#7c3aed' },
                { name: 'AI resolved', values: analyticsSeries.map((d) => d.aiResolved), color: '#22d3ee' },
              ]}
            />
          </CardContent>
        </Card>

        {/* AI resolution donut */}
        <Card>
          <CardHeader>
            <CardTitle>This month so far</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div
              className="relative mt-1 flex h-40 w-40 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#7c3aed 0deg ${usageStats.resolutionRate * 3.6}deg, rgba(255,255,255,0.06) ${usageStats.resolutionRate * 3.6}deg 360deg)`,
              }}
              role="img"
              aria-label={`${usageStats.resolutionRate}% of conversations resolved by AI`}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-surface">
                <span className="font-display text-2xl font-bold text-text">{usageStats.resolutionRate}%</span>
                <span className="text-xs text-muted">by AI</span>
              </div>
            </div>
            <div className="mt-4 w-full space-y-3">
              <BarRow label="Resolved by AI" value={`${usageStats.aiResolved}`} pct={usageStats.resolutionRate} />
              <BarRow label="Resolved by humans" value={`${(usageStats.conversations - usageStats.aiResolved)}`} pct={100 - usageStats.resolutionRate} color="from-accent to-accent/40" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Recent conversations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Open conversations</CardTitle>
            <Badge tone="primary">{conversations.filter((c) => c.status === 'open').length} open</Badge>
          </CardHeader>
          <CardContent className="space-y-1">
            {conversations.filter((c) => c.status === 'open' || c.status === 'pending').slice(0, 5).map((conv) => {
              const customer = getCustomer(conv.customerId)
              return (
                <div key={conv.id} className="flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-white/[0.03]">
                  {customer && <Avatar initials={customer.name.split(' ').map((n) => n[0]).join('')} src={customer.photo} colorClassName={customer.avatarColor} />}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text">{conv.subject}</p>
                    <p className="truncate text-xs text-muted">
                      {customer?.name} · {conv.channel}
                    </p>
                  </div>
                  <div className="hidden items-center gap-2 sm:flex">
                    <Badge tone={conv.resolution === 'ai' ? 'cyan' : 'primary'} dot={false}>
                      {conv.resolution === 'ai' ? <><Bot className="mr-1 h-3 w-3" /> AI</> : 'Human'}
                    </Badge>
                    <span className="text-xs text-muted">{conv.lastActivity}</span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Activity feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
              Activity feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="relative space-y-5">
              {recentActivity.map((item, i) => (
                <li key={i} className="relative pl-5">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1.5 h-2 w-2 rounded-full ${item.tone === 'ai' ? 'bg-accent' : 'bg-primary'}`}
                  />
                  <p className="text-sm leading-snug text-text">{item.text}</p>
                  <p className="mt-0.5 text-xs text-muted">{item.time}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="flex flex-col items-start gap-4 py-6 sm:flex-row sm:items-center">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-text">NOVA spotted a knowledge gap</p>
            <p className="text-sm text-muted">
              Customers asked about “loyalty points” 12 times this week with no matching article. Auto-draft one now?
            </p>
          </div>
          <button type="button" className="rounded-lg border border-primary/40 px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-primary/10">
            Review suggestion
          </button>
        </CardContent>
      </Card>
    </>
  )
}

export default OverviewPage