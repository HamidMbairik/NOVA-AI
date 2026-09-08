import { useState, type FormEvent } from 'react'
import { CheckCircle2, Mail, MessageSquare, Globe, Loader2 } from 'lucide-react'
import { SectionHeading } from '@/components/marketing/SectionHeading'
import { Reveal } from '@/components/marketing/Reveal'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

interface FormState {
  name: string
  email: string
  company: string
  teamSize: string
  message: string
}

const initial: FormState = { name: '', email: '', company: '', teamSize: '', message: '' }

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {}
  if (form.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.'
  if (form.message.trim().length < 10) errors.message = 'Tell us a little more (at least 10 characters).'
  return errors
}

export function ContactPage() {
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const set = (key: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setStatus('sending')
    // Simulated API call — swap for a real endpoint later.
    window.setTimeout(() => setStatus('sent'), 1100)
  }

  const cards = [
    { icon: Mail, label: 'Email us', value: 'hello@nova.ai' },
    { icon: MessageSquare, label: 'Live chat', value: 'Mon–Fri, business hours' },
    { icon: Globe, label: 'Support center', value: 'help.nova.ai' },
  ]

  return (
    <>
      <section className="pt-36 pb-24 lg:pt-44">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Let’s talk about your support.{' '}
                <span className="text-gradient">No bots here.</span>
              </>
            }
            description="Real humans, fast replies. Tell us about your team and we’ll get back to you within one business day."
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <div className="space-y-4">
                {cards.map((card) => (
                  <div key={card.label} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-surface p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-accent-soft">
                      <card.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-text">{card.label}</p>
                      <p className="text-sm text-muted">{card.value}</p>
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5">
                  <p className="text-sm font-medium text-text">Average reply time</p>
                  <p className="mt-1 font-display text-3xl font-bold text-gradient">&lt; 4 hours</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {status === 'sent' ? (
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-10 text-center">
                  <CheckCircle2 className="h-12 w-12 text-emerald-400" aria-hidden="true" />
                  <h2 className="mt-4 text-xl font-bold text-text">Message sent!</h2>
                  <p className="mt-2 text-sm text-muted">
                    We’ll get back to you within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(initial)
                      setStatus('idle')
                    }}
                    className="mt-6 text-sm font-medium text-accent hover:text-text"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-white/8 bg-surface p-7">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      name="name"
                      label="Your name"
                      placeholder="Alex Carter"
                      value={form.name}
                      onChange={(e) => set('name')(e.target.value)}
                      error={errors.name}
                      autoComplete="name"
                    />
                    <Input
                      name="email"
                      type="email"
                      label="Work email"
                      placeholder="alex@company.com"
                      value={form.email}
                      onChange={(e) => set('email')(e.target.value)}
                      error={errors.email}
                      autoComplete="email"
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      name="company"
                      label="Company"
                      placeholder="Acme Inc."
                      value={form.company}
                      onChange={(e) => set('company')(e.target.value)}
                      autoComplete="organization"
                    />
                    <Select
                      name="teamSize"
                      label="Team size"
                      value={form.teamSize}
                      onChange={(e) => set('teamSize')(e.target.value)}
                    >
                      <option value="">Select…</option>
                      <option value="1">Just me</option>
                      <option value="2-10">2–10</option>
                      <option value="11-50">11–50</option>
                      <option value="50+">50+</option>
                    </Select>
                  </div>
                  <Textarea
                    name="message"
                    label="What do you need?"
                    placeholder="Tell us about your support setup, volumes, and goals…"
                    rows={5}
                    value={form.message}
                    onChange={(e) => set('message')(e.target.value)}
                    error={errors.message}
                  />
                  <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      'Send message'
                    )}
                  </Button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage