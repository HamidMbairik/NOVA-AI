import { useState, type FormEvent } from 'react'
import {
  Bot,
  Plus,
  Save,
  Power,
  Sparkles,
  Check,
  Languages,
} from 'lucide-react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { agents as seedAgents, channels } from '@/data/conversations'
import { cn } from '@/lib/cn'
import type { Agent } from '@/types/conversations'

const toneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'casual', label: 'Casual' },
  { value: 'empathetic', label: 'Empathetic' },
]

const modelOptions = ['nova-2 (recommended)', 'nova-2-fast', 'nova-mini']

interface AgentForm {
  name: string
  personality: string
  instructions: string
  tone: Agent['tone']
  automationLevel: number
  dailyLimit: string
  model: string
}

export function AgentsPage() {
  const [agents, setAgents] = useState(seedAgents)
  const [editingId, setEditingId] = useState<string>(seedAgents[0].id)
  const [form, setForm] = useState<AgentForm>(() => {
    const a = seedAgents[0]
    return {
      name: a.name,
      personality: a.personality,
      instructions: a.instructions,
      tone: a.tone,
      automationLevel: a.automationLevel,
      dailyLimit: String(a.dailyLimit),
      model: a.model,
    }
  })
  const [saved, setSaved] = useState(false)
  const [enabledChannels, setEnabledChannels] = useState<string[]>(seedAgents[0].channels)

  const editing = agents.find((a) => a.id === editingId)
  const isNew = editingId === 'new'

  const save = (e: FormEvent) => {
    e.preventDefault()
    if (isNew) {
      const agent: Agent = {
        id: `agent-${Date.now()}`,
        name: form.name || 'Untitled agent',
        personality: form.personality || 'Helpful and concise.',
        instructions: form.instructions || 'Resolve routine questions using the knowledge base.',
        tone: form.tone,
        automationLevel: form.automationLevel,
        active: true,
        channels: enabledChannels as Agent['channels'],
        languages: form.model === 'nova-2 (recommended)' ? ['English', 'Spanish'] : ['English'],
        dailyLimit: Number(form.dailyLimit) || 100,
        model: form.model,
      }
      setAgents((prev) => [...prev, agent])
      setEditingId(agent.id)
    } else {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? {
                ...a,
                name: form.name,
                personality: form.personality,
                instructions: form.instructions,
                tone: form.tone,
                automationLevel: form.automationLevel,
                dailyLimit: Number(form.dailyLimit) || a.dailyLimit,
                model: form.model,
                channels: enabledChannels as Agent['channels'],
              }
            : a,
        ),
      )
    }
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }

  const toggleChannel = (channel: string) =>
    setEnabledChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel],
    )

  const toggleActive = (id: string) =>
    setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)))

  const selectAgent = (id: string) => {
    setEditingId(id)
    if (id !== 'new') {
      const a = agents.find((x) => x.id === id)!
      setForm({
        name: a.name,
        personality: a.personality,
        instructions: a.instructions,
        tone: a.tone,
        automationLevel: a.automationLevel,
        dailyLimit: String(a.dailyLimit),
        model: a.model,
      })
      setEnabledChannels(a.channels)
    } else {
      setForm({ name: '', personality: '', instructions: '', tone: 'friendly', automationLevel: 50, dailyLimit: '200', model: 'nova-2 (recommended)' })
      setEnabledChannels(['chat', 'email'])
    }
  }

  return (
    <>
      <PageHeader
        title="AI Agents"
        description="Your AI teammates — who they are and how they behave."
        actions={
          <Button size="sm" variant="secondary" onClick={() => selectAgent('new')}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            New agent
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Agent list */}
        <div className="space-y-2">
          {agents.map((agent) => (
            <button
              key={agent.id}
              type="button"
              onClick={() => selectAgent(agent.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors',
                editingId === agent.id ? 'border-primary/50 bg-primary/10' : 'border-white/8 bg-surface hover:border-white/20',
              )}
            >
              <span
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl text-background',
                  agent.active ? 'bg-gradient-to-br from-primary to-accent' : 'bg-muted/40',
                )}
              >
                <Bot className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-semibold text-text">
                  {agent.name}
                  {agent.active && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-label="active" />}
                </p>
                <p className="truncate text-xs text-muted">{agent.model}</p>
              </div>
            </button>
          ))}
          <div className="flex items-center gap-2 rounded-xl border border-dashed border-white/10 p-3 text-xs text-muted">
            <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
            {agents.length} agents · {agents.filter((a) => a.active).length} active
          </div>
        </div>

        {/* Config editor */}
        <Card>
          {editing && !isNew && (
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', editing.active ? 'bg-gradient-to-br from-primary to-accent text-background' : 'bg-muted/40 text-muted')}>
                  <Bot className="h-4 w-4" aria-hidden="true" />
                </span>
                Configure {editing.name}
              </CardTitle>
              <Button
                size="sm"
                variant={editing.active ? 'secondary' : 'primary'}
                onClick={() => toggleActive(editing.id)}
              >
                <Power className="h-3.5 w-3.5" aria-hidden="true" />
                {editing.active ? 'Deactivate' : 'Activate'}
              </Button>
            </CardHeader>
          )}
          {!editing && isNew && (
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-background">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
                New agent
              </CardTitle>
            </CardHeader>
          )}

          <CardContent>
            <form onSubmit={save} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Agent name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Nova, Vesper, Atlas" />
                <Select label="Model" value={form.model} onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}>
                  {modelOptions.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </Select>
              </div>

              <Textarea
                label="Personality"
                value={form.personality}
                onChange={(e) => setForm((f) => ({ ...f, personality: e.target.value }))}
                rows={3}
                placeholder="How should this agent sound and behave?"
              />

              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <label htmlFor="instructions" className="font-medium text-text">Instructions</label>
                  <span className="text-xs text-muted">Rules your agent follows</span>
                </div>
                <Textarea
                  id="instructions"
                  value={form.instructions}
                  onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
                  rows={5}
                  className="font-mono text-xs"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <label htmlFor="automation" className="font-medium text-text">Automation level</label>
                    <span className="text-accent-soft">{form.automationLevel}%</span>
                  </div>
                  <input
                    id="automation"
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={form.automationLevel}
                    onChange={(e) => setForm((f) => ({ ...f, automationLevel: Number(e.target.value) }))}
                    className="w-full accent-[#7c3aed]"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-muted">
                    <span>Hands off to humans often</span>
                    <span>Resolves everything possible</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <Select label="Tone" value={form.tone} onChange={(e) => setForm((f) => ({ ...f, tone: e.target.value as Agent['tone'] }))}>
                    {toneOptions.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </Select>
                  <Input
                    label="Daily cap"
                    type="number"
                    min={0}
                    value={form.dailyLimit}
                    onChange={(e) => setForm((f) => ({ ...f, dailyLimit: e.target.value }))}
                  />
                </div>
              </div>

              <fieldset>
                <legend className="mb-2 text-sm font-medium text-text">Channels</legend>
                <div className="flex flex-wrap gap-2">
                  {channels.map((ch) => (
                    <button
                      key={ch.value}
                      type="button"
                      onClick={() => toggleChannel(ch.value)}
                      aria-pressed={enabledChannels.includes(ch.value)}
                      className={cn(
                        'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                        enabledChannels.includes(ch.value)
                          ? 'border-primary bg-primary/15 text-text'
                          : 'border-white/10 text-muted hover:border-white/25',
                      )}
                    >
                      {enabledChannels.includes(ch.value) && <Check className="mr-1 inline h-3.5 w-3.5 text-accent" aria-hidden="true" />}
                      {ch.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="flex items-center justify-between border-t border-white/8 pt-5">
                <p className="flex items-center gap-2 text-xs text-muted">
                  <Languages className="h-4 w-4 text-accent" aria-hidden="true" />
                  {enabledChannels.length} channel{enabledChannels.length === 1 ? '' : 's'} · learns from every resolved ticket
                </p>
                <Button type="submit" size="sm">
                  {saved ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" /> Saved
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" aria-hidden="true" /> Save agent
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default AgentsPage