import type {
  KnowledgeDoc,
  AnalyticsPoint,
  TeamMember,
  Invoice,
  UsageStats,
} from '@/types/dashboard'

export const knowledgeDocs: KnowledgeDoc[] = [
  {
    id: 'doc-1',
    title: 'Where is my order?',
    category: 'Shipping',
    content: 'Provide a live status from the carrier. If in transit, give the ETA shown. If delayed beyond 2 days, offer to start an investigation and issue a no-charge replacement on request.',
    status: 'indexed',
    updatedAt: 'Sep 6, 2026',
    author: 'NOVA auto-edit',
    wordCount: 640,
    relevance: 97,
  },
  {
    id: 'doc-2',
    title: 'Return & refund policy',
    category: 'Returns',
    content: '30-day returns on all unused items. Refunds processed within 3–5 business days to the original payment method. Duplicate charges: void immediately, escalate to billing.',
    status: 'indexed',
    updatedAt: 'Sep 4, 2026',
    author: 'Sarah K.',
    wordCount: 890,
    relevance: 94,
  },
  {
    id: 'doc-3',
    title: 'Shipping rates & times',
    category: 'Shipping',
    content: 'Standard: $6.99, 3–5 business days. Express: $14.99, 1–2 business days. Free standard over $75. International from $12.99.',
    status: 'indexed',
    updatedAt: 'Sep 2, 2026',
    author: 'Ops Team',
    wordCount: 520,
    relevance: 91,
  },
  {
    id: 'doc-4',
    title: 'Account recovery flow',
    category: 'Accounts',
    content: 'Verify identity via email or phone code. Reset link expires in 15 minutes. If the email is unknown, use the recovery code flow to locate the account.',
    status: 'processing',
    updatedAt: 'Sep 7, 2026',
    author: 'Import',
    wordCount: 380,
    relevance: 88,
  },
  {
    id: 'doc-5',
    title: 'API rate limits',
    category: 'Developer',
    content: 'Starter: 30 req/min. Growth: 120 req/min. Scale: 1,000 req/min. 429 responses include Retry-After header. See Analytics → API for live usage.',
    status: 'indexed',
    updatedAt: 'Aug 29, 2026',
    author: 'Jin N.',
    wordCount: 440,
    relevance: 93,
  },
  {
    id: 'doc-6',
    title: 'Gift card balance & expiry',
    category: 'Gift cards',
    content: 'Balances never expire in the EU. Balance lookup by card number ending. Refunds onto gift cards post instantly.',
    status: 'error',
    updatedAt: 'Aug 25, 2026',
    author: 'Sarah K.',
    wordCount: 210,
    relevance: 85,
  },
]

export const analyticsSeries: AnalyticsPoint[] = [
  { date: 'Sep 1', conversations: 182, aiResolved: 128 },
  { date: 'Sep 2', conversations: 210, aiResolved: 152 },
  { date: 'Sep 3', conversations: 195, aiResolved: 140 },
  { date: 'Sep 4', conversations: 244, aiResolved: 178 },
  { date: 'Sep 5', conversations: 231, aiResolved: 169 },
  { date: 'Sep 6', conversations: 267, aiResolved: 190 },
  { date: 'Sep 7', conversations: 248, aiResolved: 176 },
]

export const topQuestions = [
  { question: 'Where is my order?', count: 214, pct: 18 },
  { question: 'Return / refund policy', count: 187, pct: 15 },
  { question: 'Shipping rates & times', count: 142, pct: 12 },
  { question: 'Account recovery', count: 96, pct: 8 },
  { question: 'Gift card balance', count: 78, pct: 7 },
]

export const channelPerformance = [
  { channel: 'Chat', conversations: 312, aiResolved: 84, icon: 'chat' as const },
  { channel: 'Email', conversations: 276, aiResolved: 62, icon: 'email' as const },
  { channel: 'WhatsApp', conversations: 198, aiResolved: 79, icon: 'whatsapp' as const },
  { channel: 'Slack', conversations: 122, aiResolved: 58, icon: 'slack' as const },
  { channel: 'Discord', conversations: 90, aiResolved: 49, icon: 'discord' as const },
]

export const usageStats: UsageStats = {
  conversations: 248,
  quota: 1500,
  aiResolved: 176,
  resolutionRate: 71,
  satisfaction: 94,
  responseTime: 24,
  csat: 4.8,
}

export const teamMembers: TeamMember[] = [
  { id: 't1', name: 'Jordan Diaz', email: 'jordan@nova.ai', role: 'Owner', avatarColor: 'from-primary to-secondary', initials: 'JD', photo: 'https://randomuser.me/api/portraits/men/11.jpg', lastActive: 'Online', conversationsHandled: 142, status: 'online' },
  { id: 't2', name: 'Sarah Kim', email: 'sarah@nova.ai', role: 'Admin', avatarColor: 'from-secondary to-accent', initials: 'SK', photo: 'https://randomuser.me/api/portraits/women/44.jpg', lastActive: 'Online', conversationsHandled: 98, status: 'online' },
  { id: 't3', name: 'Marcus Cole', email: 'marcus@nova.ai', role: 'Agent', avatarColor: 'from-accent to-primary', initials: 'MC', photo: 'https://randomuser.me/api/portraits/men/32.jpg', lastActive: '12m ago', conversationsHandled: 76, status: 'away' },
  { id: 't4', name: 'Priya Nair', email: 'priya@nova.ai', role: 'Agent', avatarColor: 'from-primary to-accent', initials: 'PN', photo: 'https://randomuser.me/api/portraits/women/68.jpg', lastActive: '2h ago', conversationsHandled: 64, status: 'offline' },
]

export const invoices: Invoice[] = [
  { id: 'INV-2026-09', date: 'Sep 1, 2026', amount: 49, status: 'paid', plan: 'Growth' },
  { id: 'INV-2026-08', date: 'Aug 1, 2026', amount: 49, status: 'paid', plan: 'Growth' },
  { id: 'INV-2026-07', date: 'Jul 1, 2026', amount: 49, status: 'paid', plan: 'Growth' },
  { id: 'INV-2026-06', date: 'Jun 1, 2026', amount: 0, status: 'paid', plan: 'Startup' },
]