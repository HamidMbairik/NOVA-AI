import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

interface AccordionItemProps {
  question: string
  children: ReactNode
  defaultOpen?: boolean
}

export function AccordionItem({
  question,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = `faq-panel-${question.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div className="overflow-hidden rounded-xl border border-white/8 bg-surface">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-text transition-colors hover:bg-white/[0.03]"
        >
          {question}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              'h-4 w-4 shrink-0 text-muted transition-transform duration-300',
              open && 'rotate-180 text-accent',
            )}
          />
        </button>
      </h3>
      <div
        id={panelId}
        hidden={!open}
        className="px-5 pb-5 text-sm leading-relaxed text-muted"
      >
        {children}
      </div>
    </div>
  )
}