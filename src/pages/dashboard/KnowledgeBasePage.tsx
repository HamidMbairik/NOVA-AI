import { useMemo, useState, type FormEvent } from 'react'
import { Search, FileText, Plus, Clock, CheckCircle2, AlertTriangle, Loader2, X } from 'lucide-react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogCloseButton } from '@/components/ui/Dialog'
import { knowledgeDocs } from '@/data/dashboard'
import type { KnowledgeDoc } from '@/types/dashboard'

function statusBadge(status: KnowledgeDoc['status']) {
  if (status === 'indexed') return <Badge tone="success" dot>Indexed</Badge>
  if (status === 'processing') return <Badge tone="cyan" dot>Indexing…</Badge>
  return <Badge tone="error" dot>Needs review</Badge>
}

export function KnowledgeBasePage() {
  const [docs, setDocs] = useState(knowledgeDocs)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [addOpen, setAddOpen] = useState(false)
  const [newDoc, setNewDoc] = useState({ title: '', category: '', content: '' })
  const [adding, setAdding] = useState(false)

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(docs.map((d) => d.category)))],
    [docs],
  )

  const filtered = useMemo(
    () =>
      docs.filter((d) => {
        if (category !== 'All' && d.category !== category) return false
        if (query) {
          const hay = `${d.title} ${d.content}`.toLowerCase()
          if (!hay.includes(query.toLowerCase())) return false
        }
        return true
      }),
    [docs, category, query],
  )

  const indexed = docs.filter((d) => d.status === 'indexed').length

  const addDoc = (e: FormEvent) => {
    e.preventDefault()
    if (!newDoc.title.trim() || !newDoc.content.trim()) return
    setAdding(true)
    window.setTimeout(() => {
      const doc: KnowledgeDoc = {
        id: `doc-${Date.now()}`,
        title: newDoc.title.trim(),
        category: newDoc.category.trim() || 'General',
        content: newDoc.content.trim(),
        status: 'processing',
        updatedAt: 'Just now',
        author: 'You',
        wordCount: newDoc.content.trim().split(/\s+/).length,
        relevance: 0,
      }
      setDocs((prev) => [doc, ...prev])
      setAdding(false)
      setAddOpen(false)
      setNewDoc({ title: '', category: '', content: '' })
    }, 900)
  }

  return (
    <>
      <PageHeader
        title="Knowledge Base"
        description="Everything NOVA knows — and what it’s learning."
        actions={
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add document
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 py-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent"><FileText className="h-5 w-5" aria-hidden="true" /></span>
            <div>
              <p className="font-display text-xl font-bold text-text">{docs.length}</p>
              <p className="text-xs text-muted">Documents</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 py-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"><CheckCircle2 className="h-5 w-5" aria-hidden="true" /></span>
            <div>
              <p className="font-display text-xl font-bold text-text">{indexed}</p>
              <p className="text-xs text-muted">Indexed &amp; live</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 py-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400"><Clock className="h-5 w-5" aria-hidden="true" /></span>
            <div>
              <p className="font-display text-xl font-bold text-text">{docs.filter((d) => d.status === 'processing').length}</p>
              <p className="text-xs text-muted">Indexing now</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search knowledge base…"
            aria-label="Search knowledge base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-white/10 bg-surface pl-9 pr-3 text-sm text-text placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
          />
        </div>
        <Select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category" className="sm:w-48">
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doc) => (
          <article key={doc.id} className="flex flex-col rounded-2xl border border-white/8 bg-surface p-5 transition-colors hover:border-primary/40">
            <div className="flex items-start justify-between gap-3">
              <Badge tone="muted">{doc.category}</Badge>
              {statusBadge(doc.status)}
            </div>
            <h2 className="mt-3 font-semibold text-text">{doc.title}</h2>
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
              {doc.content}
            </p>
            {doc.status === 'error' && (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-amber-400">
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                Conflicts with another article — review suggested.
              </p>
            )}
            <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3 text-xs text-muted">
              <span>{doc.updatedAt}</span>
              <span>{doc.wordCount} words</span>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-muted">
            No documents match your search.
          </p>
        )}
      </div>

      <Dialog open={addOpen} onClose={() => setAddOpen(false)} labelledBy="add-doc-title">
        <div className="flex items-center justify-between border-b border-white/8 p-6">
          <h2 id="add-doc-title" className="text-lg font-bold text-text">Add knowledge document</h2>
          <DialogCloseButton onClose={() => setAddOpen(false)} />
        </div>
        <form onSubmit={addDoc} className="space-y-5 p-6">
          <Input
            label="Title"
            placeholder="e.g. Loyalty program explained"
            value={newDoc.title}
            onChange={(e) => setNewDoc((d) => ({ ...d, title: e.target.value }))}
            required
          />
          <Input
            label="Category"
            placeholder="e.g. Loyalty"
            value={newDoc.category}
            onChange={(e) => setNewDoc((d) => ({ ...d, category: e.target.value }))}
          />
          <Textarea
            label="Content"
            rows={8}
            placeholder="Write the answer NOVA should give, with the conditions for when it applies…"
            value={newDoc.content}
            onChange={(e) => setNewDoc((d) => ({ ...d, content: e.target.value }))}
            required
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setAddOpen(false)}>
              <X className="h-4 w-4" aria-hidden="true" />
              Cancel
            </Button>
            <Button type="submit" disabled={adding}>
              {adding ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Indexing…
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Add &amp; index
                </>
              )}
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  )
}

export default KnowledgeBasePage