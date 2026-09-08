import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, ArrowRight } from 'lucide-react'
import { AuthShell } from '@/components/auth/AuthShell'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface SignupForm {
  name: string
  email: string
  company: string
  password: string
}

export function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<SignupForm>({ name: '', email: '', company: '', password: '' })
  const [errors, setErrors] = useState<Partial<SignupForm>>({})
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle')

  const set = (key: keyof SignupForm) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: Partial<SignupForm> = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password.length < 8) next.password = 'Use at least 8 characters.'
    setErrors(next)
    if (Object.values(next).some(Boolean)) return
    setStatus('submitting')
    // Simulated signup — wire to a real auth provider later.
    window.setTimeout(() => navigate('/app'), 900)
  }

  return (
    <AuthShell
      title="Start your 14-day trial"
      subtitle={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-accent hover:text-text">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <Input
          name="name"
          label="Full name"
          placeholder="Alex Carter"
          autoComplete="name"
          value={form.name}
          onChange={(e) => set('name')(e.target.value)}
          error={errors.name}
        />
        <Input
          name="email"
          type="email"
          label="Work email"
          placeholder="you@company.com"
          autoComplete="email"
          value={form.email}
          onChange={(e) => set('email')(e.target.value)}
          error={errors.email}
        />
        <Input
          name="company"
          label="Company"
          placeholder="Acme Inc."
          autoComplete="organization"
          value={form.company}
          onChange={(e) => set('company')(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          value={form.password}
          onChange={(e) => set('password')(e.target.value)}
          error={errors.password}
          hint="Use 8+ characters with a mix of letters and numbers."
        />

        <label className="flex items-start gap-2.5 pt-1 text-xs text-muted">
          <input
            type="checkbox"
            name="terms"
            required
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-surface accent-[#7c3aed]"
          />
          <span>
            I agree to the{' '}
            <a href="#terms" className="text-accent hover:text-text">Terms</a> and{' '}
            <a href="#privacy" className="text-accent hover:text-text">Privacy Policy</a>.
          </span>
        </label>

        <Button type="submit" size="lg" className="w-full" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Creating your workspace…
            </>
          ) : (
            <>
              Create free account
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted">
          Free forever on Starter· No credit card required· Cancel anytime
        </p>
      </form>
    </AuthShell>
  )
}

export default SignupPage