import { useMemo, useRef, useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import {
  Search,
  Send,
  Bot,
  UserRound,
  Phone,
  MapPin,
  Building2,
  Tag,
  ArrowLeft,
  AlertTriangle,
} from 'lucide-react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Select } from '@/components/ui/Select'
import {
  conversations as seed,
  getCustomer,
  channels,
  conversationStatuses,
  resolutions,
} from '@/data/conversations'
import type {
  Channel,
  ConversationStatus,
  ResolutionType,
  Customer,
  Message,
} from '@/types/conversations'
import { cn } from '@/lib/cn'

type Filters = { status: ConversationStatus | 'all'; channel: Channel | 'all'; resolution: ResolutionType | 'all' }

function sentimentBadge(customer: Customer) {
  if (customer.sentiment === 'negative') return <Badge tone="error">Negative</Badge>
  if (customer.sentiment === 'positive') return <Badge tone="success">Positive</Badge>
  return <Badge tone="muted">Neutral</Badge>
}

function statusBadge(status: ConversationStatus) {
  const map: Record<ConversationStatus, 'muted' | 'cyan' | 'success' | 'error'> = {
    open: 'cyan',
    pending: 'muted',
    resolved: 'success',
    escalated: 'error',
  }
  return <Badge tone={map[status]} dot>{status}</Badge>
}

export function ConversationsPage() {
  const params = useParams()
  const [items, setItems] = useState(seed)
  const [filters, setFilters] = useState<Filters>({ status: 'all', channel: 'all', resolution: 'all' })
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | undefined>(params.id ?? undefined)
  const [view, setView] = useState<'list' | 'detail'>('list')

  const [prevRouteId, setPrevRouteId] = useState(params.id)
  if (prevRouteId !== params.id) {
    setPrevRouteId(params.id)
    if (params.id) setSelectedId(params.id)
  }

  const setFilter = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }))

  const filtered = useMemo(
    () =>
      items.filter((c) => {
        if (filters.status !== 'all' && c.status !== filters.status) return false
        if (filters.channel !== 'all' && c.channel !== filters.channel) return false
        if (filters.resolution !== 'all' && c.resolution !== filters.resolution) return false
        if (query) {
          const customer = getCustomer(c.customerId)
          const haystack = `${c.subject} ${customer?.name ?? ''} ${c.lastMessage}`.toLowerCase()
          if (!haystack.includes(query.toLowerCase())) return false
        }
        return true
      }),
    [items, filters, query],
  )

  const selected = selectedId ? items.find((c) => c.id === selectedId) : undefined

  const open = (id: string) => {
    setSelectedId(id)
    setView('detail')
  }

  return (
    <>
      <PageHeader
        title="Conversations"
        description="Every channel, one inbox."
        actions={
          <Badge tone="primary" dot>
            {items.filter((c) => c.status === 'open').length} open · {items.filter((c) => c.status === 'escalated').length} escalated
          </Badge>
        }
      />

      <div className="grid min-h-[560px] gap-4 lg:grid-cols-[1fr_1.6fr]">
        {/* List panel */}
        <section
          aria-label="Conversation list"
          className={cn('rounded-2xl border border-white/8 bg-surface', view === 'detail' && 'hidden lg:block')}
        >
          <div className="border-b border-white/8 p-4 space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search conversations…"
                aria-label="Search conversations"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-white/10 bg-elevated/50 pl-9 pr-3 text-sm text-text placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Select value={filters.status} onChange={(e) => setFilter('status', e.target.value as Filters['status'])} aria-label="Filter by status">
                <option value="all">Status</option>
                {conversationStatuses.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </Select>
              <Select value={filters.channel} onChange={(e) => setFilter('channel', e.target.value as Filters['channel'])} aria-label="Filter by channel">
                <option value="all">Channel</option>
                {channels.map((ch) => (
                  <option key={ch.value} value={ch.value}>{ch.label}</option>
                ))}
              </Select>
              <Select value={filters.resolution} onChange={(e) => setFilter('resolution', e.target.value as Filters['resolution'])} aria-label="Filter by resolution">
                <option value="all">Who</option>
                {resolutions.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </Select>
            </div>
          </div>

          <div className="max-h-[calc(100vh-320px)] overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted">No conversations match your filters.</p>
            ) : (
              filtered.map((conv) => {
                const customer = getCustomer(conv.customerId)
                const active = selectedId === conv.id
                return (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => open(conv.id)}
                    className={cn(
                      'flex w-full items-start gap-3 border-b border-white/5 px-4 py-3.5 text-left transition-colors',
                      active ? 'bg-primary/10' : 'hover:bg-white/[0.03]',
                    )}
                  >
                    {customer && <Avatar initials={customer.name.split(' ').map((n) => n[0]).join('')} src={customer.photo} colorClassName={customer.avatarColor} />}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-text">{customer?.name}</p>
                        <span className="shrink-0 text-xs text-muted">{conv.lastActivity}</span>
                      </div>
                      <p className="truncate text-sm text-muted">{conv.subject}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        {statusBadge(conv.status)}
                        <span className="text-xs text-muted">{conv.channel}</span>
                        {conv.resolution === 'ai' && conv.aiConfidence && (
                          <span className="text-xs text-muted">· {conv.aiConfidence}% confidence</span>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </section>

        {/* Detail panel */}
        <article
          aria-label="Conversation detail"
          className={cn('rounded-2xl border border-white/8 bg-surface', view === 'list' && 'hidden lg:block')}
        >
          {selected && selected.customerId ? (
            <ConversationDetail
              customer={getCustomer(selected.customerId)!}
              conversation={selected}
              onBack={() => setView('list')}
              onUpdate={(messages) =>
                setItems((prev) => prev.map((c) => (c.id === selected.id ? { ...c, messages } : c)))
              }
            />
          ) : (
            <div className="flex h-full min-h-[560px] flex-col items-center justify-center p-8 text-center">
              <Bot className="h-12 w-12 text-muted/30" aria-hidden="true" />
              <p className="mt-4 font-medium text-text">Select a conversation</p>
              <p className="mt-1 text-sm text-muted">Pick one from the list to view the full thread.</p>
              {view === 'detail' && (
                <button
                  type="button"
                  onClick={() => setView('list')}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-text lg:hidden"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back to list
                </button>
              )}
            </div>
          )}
        </article>
      </div>
    </>
  )
}

function ConversationDetail({
  customer,
  conversation,
  onBack,
  onUpdate,
}: {
  customer: Customer
  conversation: typeof seed[number]
  onBack: () => void
  onUpdate: (messages: Message[]) => void
}) {
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const [typing, setTyping] = useState(false)

  const send = (e: FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    const appended: Message[] = [
      ...conversation.messages,
      { id: `m-${Date.now()}`, author: 'human', content: text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]
    onUpdate(appended)
    setDraft('')
    setTyping(true)
    // Simulate an AI follow-up.
    window.setTimeout(() => {
      onUpdate([
        ...appended,
        { id: `m-${Date.now()}`, author: 'ai', content: 'Got it — I’ve noted that and will keep the customer updated. Anything else to add for the handoff?', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ])
      setTyping(false)
    }, 1200)
  }

  return (
    <div className="flex h-full min-h-[560px] flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-white/8 px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text lg:hidden"
            aria-label="Back to conversation list"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <Avatar initials={customer.name.split(' ').map((n) => n[0]).join('')} src={customer.photo} colorClassName={customer.avatarColor} />
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-text">{customer.name}</p>
              {sentimentBadge(customer)}
            </div>
            <p className="text-xs text-muted">{customer.email} · {customer.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {statusBadge(conversation.status)}
          <Badge tone={conversation.resolution === 'ai' ? 'cyan' : 'primary'}>
            {conversation.resolution === 'ai' ? <><Bot className="mr-1 h-3 w-3" /> AI</> : <><UserRound className="mr-1 h-3 w-3" /> Human</>}
          </Badge>
        </div>
      </div>

      {/* Customer context strip */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 border-b border-white/8 bg-elevated/30 px-5 py-2.5 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{customer.location}</span>
        <span className="inline-flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" aria-hidden="true" />{customer.totalConversations} conversations</span>
        <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" aria-hidden="true" />Customer since {customer.customerSince}</span>
        <span className="inline-flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5" aria-hidden="true" />{conversation.tags.join(', ')}
        </span>
      </div>

      {/* Thread */}
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {conversation.messages.map((msg) => (
          <div key={msg.id} className={cn('flex items-end gap-2.5', msg.author === 'customer' ? '' : 'flex-row-reverse')}>
            <span
              aria-hidden="true"
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px]',
                msg.author === 'ai' && 'bg-gradient-to-br from-primary to-accent text-background',
                msg.author === 'human' && 'bg-elevated text-text',
                msg.author === 'customer' && 'bg-elevated text-text',
              )}
            >
              {msg.author === 'ai' ? <Bot className="h-3.5 w-3.5" /> : <UserRound className="h-3.5 w-3.5" />}
            </span>
            <div className={cn('max-w-[75%]', msg.author === 'customer' ? '' : 'flex flex-col items-end')}>
              <div
                className={cn(
                  'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                  msg.author === 'customer'
                    ? 'rounded-bl-md bg-elevated text-text'
                    : msg.author === 'ai'
                      ? 'rounded-br-md bg-gradient-to-r from-primary/80 to-secondary/80 text-white'
                      : 'rounded-br-md bg-primary/15 text-text border border-primary/20',
                )}
              >
                {msg.content}
              </div>
              <span className="mt-1 px-1 text-[11px] text-muted">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex items-center gap-2 pl-10 text-xs text-muted">
            <Bot className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            NOVA is responding…
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Composer */}
      <form onSubmit={send} className="flex items-end gap-2 border-t border-white/8 p-4">
        {conversation.status === 'escalated' && (
          <span className="mb-1 hidden items-center gap-1.5 pr-1 text-xs text-amber-400 sm:flex">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            Human-owned
          </span>
        )}
        <textarea
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send(e as unknown as FormEvent)
            }
          }}
          placeholder="Reply as a teammate… (Enter to send)"
          aria-label="Reply to conversation"
          className="max-h-32 min-h-[44px] flex-1 resize-none rounded-lg border border-white/10 bg-elevated/50 px-3.5 py-2.5 text-sm text-text placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
        />
        <button
          type="submit"
          aria-label="Send reply"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent text-background transition-all hover:brightness-110 disabled:opacity-50"
          disabled={!draft.trim()}
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}

export default ConversationsPage