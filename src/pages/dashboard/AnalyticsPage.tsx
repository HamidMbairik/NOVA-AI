import { Link } from 'react-router-dom'
import {
  MessageSquare,
  CheckCircle2,
  Smile,
  Timer,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { LineChart, BarRow } from '@/components/dashboard/charts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  analyticsSeries,
  topQuestions,
  channelPerformance,
  usageStats,
} from '@/data/dashboard'

export function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        description="Last 7 days · updated just now"
        actions={
          <div className="flex gap-2">
            <select
              aria-label="Reporting period"
              defaultValue="7d"
              className="h-9 rounded-lg border border-white/10 bg-surface px-3 text-sm text-text focus:border-primary focus:outline-none"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Conversations" value="1,577" trend="up" trendLabel="+12%" icon={MessageSquare} tone="default" />
        <StatCard label="Resolution rate" value="71%" trend="up" trendLabel="+4pts" icon={CheckCircle2} tone="primary" />
        <StatCard label="Avg response time" value="24s" trend="down" trendLabel="-8s" icon={Timer} tone="cyan" />
        <StatCard label="CSAT" value="4.8/5" trend="up" trendLabel="+0.2" icon={Smile} tone="primary" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
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

        <Card>
          <CardHeader>
            <CardTitle>Resolution split</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <BarRow label="Resolved by AI" value={`${usageStats.resolutionRate}%`} pct={usageStats.resolutionRate} />
            <BarRow label="Resolved by humans" value={`${100 - usageStats.resolutionRate}%`} pct={100 - usageStats.resolutionRate} color="from-accent to-accent/40" />
            <div className="rounded-xl bg-accent/5 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-text">
                <TrendingUp className="h-4 w-4 text-accent" aria-hidden="true" />
                AI resolution trending up
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                +9pts in the last 30 days. Your knowledge base is working.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top questions</CardTitle>
            <Link to="/app/knowledge" className="text-xs font-medium text-accent hover:text-text">
              Review knowledge base
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {topQuestions.map((q, i) => (
              <div key={q.question}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-text">{i + 1}. {q.question}</span>
                  <span className="text-muted">{q.count} ×</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${q.pct * 5}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel performance</CardTitle>
            <Badge tone="cyan">AI resolution %</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {channelPerformance.map((ch) => (
              <div key={ch.channel}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-text">{ch.channel}</span>
                  <span className="text-muted">{ch.conversations} convos · {ch.aiResolved}% AI</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-gradient-to-r from-secondary to-accent" style={{ width: `${ch.aiResolved}%` }} />
                </div>
              </div>
            ))}
            <Link
              to="/app/integrations"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-text"
            >
              Manage channels
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default AnalyticsPage