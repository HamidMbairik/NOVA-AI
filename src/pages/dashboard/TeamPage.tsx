import { useState, type FormEvent } from 'react'
import { Mail, UserPlus, MoreHorizontal, Crown, ShieldCheck, Headset } from 'lucide-react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogCloseButton } from '@/components/ui/Dialog'
import { teamMembers as seed } from '@/data/dashboard'
import { cn } from '@/lib/cn'
import type { TeamMember } from '@/types/dashboard'

const roleIcon = {
  Owner: Crown,
  Admin: ShieldCheck,
  Agent: Headset,
}

const roleTone: Record<TeamMember['role'], 'primary' | 'cyan' | 'default'> = {
  Owner: 'primary',
  Admin: 'cyan',
  Agent: 'default',
}

const statusDot = { online: 'bg-emerald-400', away: 'bg-amber-400', offline: 'bg-muted/50' } as const

export function TeamPage() {
  const [members, setMembers] = useState(seed)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [invite, setInvite] = useState({ email: '', role: 'Agent' as TeamMember['role'] })
  const [invited, setInvited] = useState(false)

  const sendInvite = (e: FormEvent) => {
    e.preventDefault()
    setInvited(true)
    window.setTimeout(() => {
      setMembers((prev) => [
        ...prev,
        {
          id: `t-${Date.now()}`,
          name: invite.email.split('@')[0],
          email: invite.email,
          role: invite.role,
          avatarColor: 'from-primary to-accent',
          initials: invite.email.slice(0, 2).toUpperCase(),
          lastActive: 'Invited',
          conversationsHandled: 0,
          status: 'offline',
        },
      ])
      setInvited(false)
      setInviteOpen(false)
      setInvite({ email: '', role: 'Agent' })
    }, 900)
  }

  return (
    <>
      <PageHeader
        title="Team"
        description="People, roles, and who’s around right now."
        actions={
          <Button size="sm" onClick={() => setInviteOpen(true)}>
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            Invite member
          </Button>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => {
          const Icon = roleIcon[member.role]
          return (
            <Card key={member.id}>
              <CardHeader className="px-5 pt-5 pb-0">
                <div className="flex items-start justify-between">
                  <span className="relative">
                    <Avatar initials={member.initials} src={member.photo} colorClassName={member.avatarColor} className="h-12 w-12 text-base" />
                    <span aria-hidden="true" className={cn('absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface', statusDot[member.status])} />
                  </span>
                  <button
                    type="button"
                    aria-label={`Options for ${member.name}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text"
                  >
                    <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </CardHeader>
              <div className="px-5 pb-5">
                <div className="mt-4 flex items-center gap-2">
                  <h2 className="font-semibold text-text">{member.name}</h2>
                  <Badge tone={roleTone[member.role]}>
                    <Icon className="mr-1 h-3 w-3" aria-hidden="true" />
                    {member.role}
                  </Badge>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  {member.email}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4 text-xs text-muted">
                  <span>{member.conversationsHandled} handled</span>
                  <span>{member.lastActive}</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Dialog open={inviteOpen} onClose={() => setInviteOpen(false)} labelledBy="invite-title">
        <div className="flex items-center justify-between border-b border-white/8 p-6">
          <h2 id="invite-title" className="text-lg font-bold text-text">Invite a teammate</h2>
          <DialogCloseButton onClose={() => setInviteOpen(false)} />
        </div>
        <form onSubmit={sendInvite} className="space-y-5 p-6">
          <Input
            label="Email address"
            type="email"
            placeholder="teammate@company.com"
            value={invite.email}
            onChange={(e) => setInvite((i) => ({ ...i, email: e.target.value }))}
            required
          />
          <Select
            label="Role"
            value={invite.role}
            onChange={(e) => setInvite((i) => ({ ...i, role: e.target.value as TeamMember['role'] }))}
          >
            <option value="Agent">Agent</option>
            <option value="Admin">Admin</option>
            <option value="Owner">Owner</option>
          </Select>
          <div className="flex justify-end">
            <Button type="submit" disabled={invited}>
              {invited ? 'Sending…' : 'Send invite'}
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  )
}

export default TeamPage