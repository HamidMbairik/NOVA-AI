import { useState, type FormEvent } from 'react'
import { Save, Check, Globe, Bell, Shield, User } from 'lucide-react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

type Tab = 'workspace' | 'profile' | 'notifications' | 'security'

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'workspace', label: 'Workspace', icon: Globe },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
]

export function SettingsPage() {
  const [tab, setTab] = useState<Tab>('workspace')
  const [saved, setSaved] = useState(false)
  const [workspace, setWorkspace] = useState({
    name: 'NOVA Labs',
    subdomain: 'novalabs',
    region: 'EU (Frankfurt)',
    timezone: 'Europe/Amsterdam',
  })
  const notify = {
    aiResolves: true,
    escalations: true,
    weeklyDigest: true,
    productUpdates: false,
  }
  const [twoFactor, setTwoFactor] = useState(true)

  const set = (key: keyof typeof workspace) => (value: string) =>
    setWorkspace((w) => ({ ...w, [key]: value }))

  const doSave = (e: FormEvent) => {
    e.preventDefault()
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1600)
  }

  return (
    <>
      <PageHeader title="Settings" description="Manage your workspace and account." />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Tab nav */}
        <nav aria-label="Settings sections" className="flex gap-2 lg:flex-col">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors lg:flex-none lg:justify-start',
                tab === t.id
                  ? 'border-primary/50 bg-primary/10 text-text'
                  : 'border-transparent text-muted hover:bg-white/5 hover:text-text',
              )}
            >
              <t.icon className="h-4 w-4" aria-hidden="true" />
              {t.label}
            </button>
          ))}
        </nav>

        <div>
          {tab === 'workspace' && (
            <form onSubmit={doSave} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Workspace</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-5 sm:grid-cols-2">
                  <Input label="Workspace name" value={workspace.name} onChange={(e) => set('name')(e.target.value)} />
                  <Input label="Subdomain" value={workspace.subdomain} onChange={(e) => set('subdomain')(e.target.value)} hint="You’ll access your inbox at this subdomain." />
                  <Select label="Data region" value={workspace.region} onChange={(e) => set('region')(e.target.value)}>
                    <option>EU (Frankfurt)</option>
                    <option>US (Virginia)</option>
                    <option>APAC (Singapore)</option>
                  </Select>
                  <Select label="Timezone" value={workspace.timezone} onChange={(e) => set('timezone')(e.target.value)}>
                    <option>Europe/Amsterdam</option>
                    <option>America/New_York</option>
                    <option>Asia/Tokyo</option>
                  </Select>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Default agent tone</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    rows={3}
                    defaultValue="Warm, clear, and confident. Use short sentences. Never hype weak products with emojis."
                    label="Global instructions"
                  />
                </CardContent>
              </Card>
              <div className="flex justify-end">
                <Button type="submit">
                  {saved ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" /> Saved
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" aria-hidden="true" /> Save changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {tab === 'profile' && (
            <form onSubmit={doSave} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-5 sm:grid-cols-2">
                  <Input label="Full name" defaultValue="Jordan Diaz" />
                  <Input label="Email" type="email" defaultValue="jordan@nova.ai" />
                  <Input label="Role" defaultValue="Owner" disabled hint="Managed by your team plan." className="sm:col-span-2" />
                </CardContent>
              </Card>
              <div className="flex justify-end">
                <Button type="submit">
                  <Save className="h-4 w-4" aria-hidden="true" /> Save changes
                </Button>
              </div>
            </form>
          )}

          {tab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ToggleRow label="AI resolves a conversation" description="Notify me when NOVA closes tickets on its own." defaultChecked={notify.aiResolves} />
                <ToggleRow label="Escalations to human" description="Someone needs my attention right now." defaultChecked={notify.escalations} />
                <ToggleRow label="Weekly digest" description="A Monday summary of last week’s support." defaultChecked={notify.weeklyDigest} />
                <ToggleRow label="Product updates" description="New NOVA features and changelog notes." defaultChecked={notify.productUpdates} />
              </CardContent>
            </Card>
          )}

          {tab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ToggleRow
                  label="Two-factor authentication"
                  description="Require a verification code when signing in."
                  defaultChecked={twoFactor}
                  onChange={setTwoFactor}
                />
                <div className="flex items-center justify-between rounded-xl border border-white/8 bg-elevated/50 p-4">
                  <div>
                    <p className="text-sm font-medium text-text">Active sessions</p>
                    <p className="mt-1 text-xs text-muted">This laptop · Amsterdam · Chrome</p>
                  </div>
                  <Button variant="danger" size="sm">Revoke all</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}

function ToggleRow({
  label,
  description,
  defaultChecked,
  onChange,
}: {
  label: string
  description: string
  defaultChecked?: boolean
  onChange?: (next: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/8 bg-elevated/50 p-4">
      <div>
        <p className="text-sm font-medium text-text">{label}</p>
        <p className="mt-0.5 text-xs text-muted">{description}</p>
      </div>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        aria-label={label}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-5 w-9 cursor-pointer appearance-none rounded-full bg-white/10 transition-colors checked:bg-gradient-to-r checked:from-primary checked:to-accent"
      />
    </label>
  )
}

export default SettingsPage