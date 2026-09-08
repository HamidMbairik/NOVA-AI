import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Sparkles, RotateCcw } from 'lucide-react'
import { demoGraph, demoScenarios, type DemoNode } from '@/data/demo'
import { cn } from '@/lib/cn'

interface ChatMessage {
  id: string
  from: 'customer' | 'ai'
  text: string
}

const TYPING_DELAY = 1400
const RESPONSE_DELAY = 400

function AvatarBubble({ from }: { from: 'customer' | 'ai' }) {
  return from === 'ai' ? (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-background">
      <Bot className="h-4 w-4" aria-hidden="true" />
    </span>
  ) : (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-elevated text-xs font-semibold text-text">
      Alex
    </span>
  )
}

export function InteractiveAIDemo() {
  const [scenarioId, setScenarioId] = useState(demoScenarios[0].id)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [node, setNode] = useState<DemoNode | null>(null)
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }, [])

  const pushAi = useCallback(
    (textNode: DemoNode) => {
      setTyping(true)
      timers.current.push(
        window.setTimeout(() => {
          setMessages((m) => [
            ...m,
            { id: `ai-${Date.now()}`, from: 'ai', text: textNode.ai },
          ])
          setNode(textNode)
          setTyping(false)
          if (textNode.options.length === 0) setDone(true)
        }, TYPING_DELAY),
      )
    },
    [],
  )

  const startScenario = useCallback(
    (id: string) => {
      clearTimers()
      const sc = demoScenarios.find((s) => s.id === id)
      if (!sc) return
      setScenarioId(id)
      const startNode = demoGraph[sc.start]
      setDone(false)
      setMessages([{ id: `c0`, from: 'customer', text: startNode.customer }])
      setNode(null)
      timers.current.push(
        window.setTimeout(() => pushAi(startNode), RESPONSE_DELAY),
      )
    },
    [clearTimers, pushAi],
  )

  // Boot the default conversation
  useEffect(() => {
    startScenario(scenarioId)
    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep the chat pinned to the latest message — only ever scroll the box.
  useEffect(() => {
    const node = scrollRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [messages, typing])

  const choose = (option: { label: string; next: string }) => {
    if (!node) return
    const nextNode = demoGraph[option.next]
    if (!nextNode) return
    setNode(null)
    setDone(false)
    setMessages((m) => [...m, { id: `c-${Date.now()}`, from: 'customer', text: option.label }])
    timers.current.push(
      window.setTimeout(() => pushAi(nextNode), RESPONSE_DELAY),
    )
  }

  const reset = () => startScenario(scenarioId)

  return (
    <div className="overflow-hidden rounded-2xl border border-white/8 bg-surface/80 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-background">
            <Bot className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-text">NOVA</p>
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Online · resolves in seconds
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-medium text-muted transition-colors hover:bg-white/5 hover:text-text"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Restart
        </button>
      </div>

      {/* Message area */}
      <div
        ref={scrollRef}
        className="h-[330px] space-y-4 overflow-y-auto px-5 py-5 sm:h-[360px]"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'flex items-end gap-2.5',
                msg.from === 'customer' && 'flex-row-reverse',
              )}
            >
              <AvatarBubble from={msg.from} />
              <div
                className={cn(
                  'max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                  msg.from === 'ai'
                    ? 'rounded-bl-md bg-elevated text-text'
                    : 'rounded-br-md bg-gradient-to-r from-primary/80 to-secondary/80 text-white',
                )}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-end gap-2.5"
          >
            <AvatarBubble from="ai" />
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-elevated px-4 py-3" aria-label="NOVA is typing">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-muted"
                  style={{ animation: `typing 1.2s infinite`, animationDelay: `${i * 0.18}s` }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Options */}
      <div className="border-t border-white/8 px-5 py-4">
        {!done && node && node.options.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {node.options.map((opt) => (
              <button
                key={opt.next}
                type="button"
                onClick={() => choose(opt)}
                className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-accent-soft transition-all hover:border-primary hover:bg-primary/20 hover:text-text"
              >
                {opt.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="flex items-center gap-2 text-sm text-muted">
            <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
            <span>
              {done
                ? 'Conversation resolved. Try another scenario to see NOVA work.'
                : 'Choose a scenario to begin a conversation.'}
            </span>
          </p>
        )}
      </div>

      {/* Scenario switcher */}
      <div className="flex flex-wrap gap-2 border-t border-white/8 bg-elevated/40 px-5 py-3">
        <span className="mr-1 self-center text-xs font-medium text-muted">Try:</span>
        {demoScenarios.map((sc) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => startScenario(sc.id)}
            aria-pressed={scenarioId === sc.id}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium transition-colors',
              scenarioId === sc.id
                ? 'bg-accent/15 text-accent'
                : 'bg-white/5 text-muted hover:text-text',
            )}
          >
            {sc.label}
          </button>
        ))}
      </div>
    </div>
  )
}