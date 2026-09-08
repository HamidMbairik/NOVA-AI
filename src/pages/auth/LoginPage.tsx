import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react'
import { AuthShell } from '@/components/auth/AuthShell'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface LoginForm {
  email: string
  password: string
}

export function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
  const [errors, setErrors] = useState<Partial<LoginForm>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle')

  const set = (key: keyof LoginForm) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: Partial<LoginForm> = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password.length < 8) next.password = 'Password must be at least 8 characters.'
    setErrors(next)
    if (Object.values(next).some(Boolean)) return
    setStatus('submitting')
    // Simulated login — wire to a real auth provider later.
    window.setTimeout(() => navigate('/app'), 900)
  }

  const autoFill = () => {
    setForm({ email: 'demo@nova.ai', password: 'novademopass' })
    setErrors({})
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link to="/signup" className="font-medium text-accent hover:text-text">
            Start free
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <Input
          name="email"
          type="email"
          label="Email address"
          placeholder="you@company.com"
          autoComplete="email"
          value={form.email}
          onChange={(e) => set('email')(e.target.value)}
          error={errors.email}
        />
        <div className="relative">
          <Input
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => set('password')(e.target.value)}
            error={errors.password}
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute bottom-2 right-3 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted hover:text-text"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 rounded border-white/20 bg-surface accent-[#7c3aed]"
            />
            Remember me
          </label>
          <a href="#reset" className="text-sm font-medium text-accent hover:text-text">
            Forgot password?
          </a>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Signing in…
            </>
          ) : (
            <>
              Log in
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>

        <div className="relative py-1 text-center">
          <span className="relative z-10 bg-transparent px-3 text-xs text-muted">or</span>
          <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/8" />
        </div>

        <button
          type="button"
          onClick={autoFill}
          className="w-full rounded-lg border border-white/10 bg-surface py-3 text-sm font-medium text-text transition-colors hover:border-white/20 hover:bg-elevated"
        >
          Use demo credentials
        </button>
      </form>
    </AuthShell>
  )
}

export default LoginPage