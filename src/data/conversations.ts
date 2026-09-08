import type {
  Customer,
  Conversation,
  Message,
  Channel,
  ConversationStatus,
  ResolutionType,
  Agent,
} from '@/types/conversations'

export const customers: Customer[] = [
  { id: 'c1', name: 'Dana Whitfield', email: 'dana@whitfield.co', company: 'Whitfield & Co', location: 'Chicago, US', avatarColor: 'from-primary to-secondary', photo: 'https://randomuser.me/api/portraits/women/12.jpg', customerSince: 'Mar 2025', totalConversations: 14, sentiment: 'positive' },
  { id: 'c2', name: 'Omar Haddad', email: 'omar@northpeak.io', company: 'Northpeak', location: 'Amsterdam, NL', avatarColor: 'from-secondary to-accent', photo: 'https://randomuser.me/api/portraits/men/45.jpg', customerSince: 'Jan 2025', totalConversations: 8, sentiment: 'neutral' },
  { id: 'c3', name: 'Lena Fischer', email: 'lena@brightline.de', company: 'Brightline', location: 'Berlin, DE', avatarColor: 'from-accent to-primary', photo: 'https://randomuser.me/api/portraits/women/33.jpg', customerSince: 'Jun 2025', totalConversations: 21, sentiment: 'positive' },
  { id: 'c4', name: 'Ravi Patel', email: 'ravi@kiteco.com', company: 'Kite & Co', location: 'London, UK', avatarColor: 'from-primary to-accent', photo: 'https://randomuser.me/api/portraits/men/75.jpg', customerSince: 'Sep 2024', totalConversations: 33, sentiment: 'negative' },
  { id: 'c5', name: 'Sofia Reyes', email: 'sofia@lumina.app', company: 'Lumina', location: 'Austin, US', avatarColor: 'from-secondary to-primary', photo: 'https://randomuser.me/api/portraits/women/56.jpg', customerSince: 'Feb 2025', totalConversations: 12, sentiment: 'positive' },
  { id: 'c6', name: 'Jin Nakamura', email: 'jin@atlas.studio', company: 'Atlas Studio', location: 'Tokyo, JP', avatarColor: 'from-accent to-secondary', photo: 'https://randomuser.me/api/portraits/men/22.jpg', customerSince: 'Nov 2024', totalConversations: 19, sentiment: 'neutral' },
]

const makeMessage = (author: Message['author'], content: string, minutesAgo = 0): Message => ({
  id: `m-${Math.random().toString(36).slice(2)}`,
  author,
  content,
  timestamp: new Date(Date.now() - minutesAgo * 60_000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
})

export const conversations: Conversation[] = [
  {
    id: 'conv-1001',
    customerId: 'c1',
    channel: 'chat',
    status: 'open',
    subject: 'Order status — #N-48291',
    tags: ['orders', 'shipping'],
    messages: [
      makeMessage('customer', 'Hey, I’d love to know where my order #N-48291 is.'),
      makeMessage('ai', 'I found your order. It’s currently in transit and expected to arrive tomorrow between 9am and 1pm.'),
      makeMessage('customer', 'Perfect, thank you so much!'),
      makeMessage('ai', 'You’re welcome! Anything else I can help you with?'),
    ],
    lastMessage: 'You’re welcome! Anything else I can help you with?',
    lastActivity: '2m ago',
    resolution: 'ai',
    aiConfidence: 97,
    priority: 'low',
  },
  {
    id: 'conv-1002',
    customerId: 'c4',
    channel: 'email',
    status: 'escalated',
    subject: 'Duplicate charge on Sep 5',
    tags: ['billing', 'refund'],
    messages: [
      makeMessage('customer', 'I was charged twice for my subscription this month. This is the second time this has happened.'),
      makeMessage('ai', 'I’m really sorry about that. I can see two charges on Sep 5 — a void has been issued on the duplicate.'),
      makeMessage('human', 'Hi Ravi, this is Marcus from support. I’ve escalated your case to billing, you should see the refund in 2–4 days.'),
      makeMessage('customer', 'Thanks, I’ll keep an eye out.'),
    ],
    lastMessage: 'Thanks, I’ll keep an eye out.',
    lastActivity: '8m ago',
    resolution: 'human',
    priority: 'high',
  },
  {
    id: 'conv-1003',
    customerId: 'c3',
    channel: 'whatsapp',
    status: 'resolved',
    subject: 'Return label request',
    tags: ['returns'],
    messages: [
      makeMessage('customer', 'I need a return label for the XL lamp, please.'),
      makeMessage('ai', 'Of course! I’ve generated a return label and emailed it to you. Just attach it to the parcel — the courier will pick it up tomorrow.'),
      makeMessage('customer', 'Amazing, thanks!'),
      makeMessage('ai', 'You’re welcome! Have a great day.'),
    ],
    lastMessage: 'You’re welcome! Have a great day.',
    lastActivity: '25m ago',
    resolution: 'ai',
    aiConfidence: 94,
    priority: 'low',
  },
  {
    id: 'conv-1004',
    customerId: 'c2',
    channel: 'slack',
    status: 'open',
    subject: 'Team trial — activation email missing',
    tags: ['onboarding'],
    messages: [
      makeMessage('customer', 'We signed up for the trial but the activation email never arrived.'),
      makeMessage('ai', 'Let me check — I can see the trial was created. I’ve resent the activation email to omar@northpeak.io. It may be in spam.'),
    ],
    lastMessage: 'I’ve resent the activation email to omar@northpeak.io.',
    lastActivity: '41m ago',
    resolution: 'ai',
    aiConfidence: 89,
    priority: 'medium',
  },
  {
    id: 'conv-1005',
    customerId: 'c5',
    channel: 'chat',
    status: 'pending',
    subject: 'Shipping change before dispatch',
    tags: ['orders'],
    messages: [
      makeMessage('customer', 'Can I change the shipping address? It hasn’t dispatched yet.'),
      makeMessage('ai', 'Can you confirm the current address and the new one? I’ll try to update it before dispatch.'),
    ],
    lastMessage: 'Can you confirm the current address and the new one?',
    lastActivity: '1h ago',
    resolution: 'ai',
    aiConfidence: 82,
    priority: 'medium',
  },
  {
    id: 'conv-1006',
    customerId: 'c6',
    channel: 'discord',
    status: 'resolved',
    subject: 'API rate limit question',
    tags: ['api', 'developer'],
    messages: [
      makeMessage('customer', 'What’s the rate limit on the Pro tier API?'),
      makeMessage('ai', 'Pro tier allows 120 requests/minute per key. You can see live usage in your dashboard under Analytics → API.'),
      makeMessage('customer', 'Got it, thanks!'),
    ],
    lastMessage: 'Got it, thanks!',
    lastActivity: '2h ago',
    resolution: 'ai',
    aiConfidence: 96,
    priority: 'low',
  },
  {
    id: 'conv-1007',
    customerId: 'c4',
    channel: 'email',
    status: 'resolved',
    subject: 'Invoice copy for accounting',
    tags: ['billing'],
    messages: [
      makeMessage('customer', 'Could you send me an invoice copy for my records?'),
      makeMessage('ai', 'Here’s a PDF of your latest invoice — also available anytime in Settings → Billing → Invoices.'),
    ],
    lastMessage: 'Here’s a PDF of your latest invoice — also available in Billing.',
    lastActivity: '3h ago',
    resolution: 'ai',
    aiConfidence: 91,
    priority: 'low',
  },
  {
    id: 'conv-1008',
    customerId: 'c1',
    channel: 'chat',
    status: 'resolved',
    subject: 'Gift card balance check',
    tags: ['gift_cards'],
    messages: [
      makeMessage('customer', 'How much is left on my gift card?'),
      makeMessage('ai', 'Your gift card ends in 4125 and has $36.40 remaining.'),
      makeMessage('customer', 'Thanks!'),
    ],
    lastMessage: 'Your gift card ends in 4125 and has $36.40 remaining.',
    lastActivity: '5h ago',
    resolution: 'ai',
    aiConfidence: 99,
    priority: 'low',
  },
]

export function getConversation(id: string): Conversation | undefined {
  return conversations.find((c) => c.id === id)
}

export function getCustomer(id: string): Customer | undefined {
  return customers.find((c) => c.id === id)
}

export const channels: { value: Channel; label: string }[] = [
  { value: 'chat', label: 'Chat' },
  { value: 'email', label: 'Email' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'slack', label: 'Slack' },
  { value: 'discord', label: 'Discord' },
]

export const conversationStatuses: { value: ConversationStatus; label: string }[] = [
  { value: 'open', label: 'Open' },
  { value: 'pending', label: 'Pending' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'escalated', label: 'Escalated' },
]

export const resolutions: { value: ResolutionType; label: string }[] = [
  { value: 'ai', label: 'AI' },
  { value: 'human', label: 'Human' },
]

export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'NOVA',
    personality: 'Helpful, concise, and quietly confident. Sounds like a sharp teammate who never panics.',
    instructions: 'Resolve routine questions about orders, shipping, returns, and account access using the knowledge base. Never invent policies. Escalate when sentiment or confidence is low.',
    tone: 'professional',
    automationLevel: 80,
    active: true,
    channels: ['chat', 'email', 'whatsapp', 'slack', 'discord'],
    languages: ['English', 'Spanish', 'French', 'German'],
    dailyLimit: 500,
    model: 'nova-2 (recommended)',
  },
  {
    id: 'agent-2',
    name: 'Vesper',
    personality: 'Warm and empathetic — a natural fit for delicate conversations and VIP customers.',
    instructions: 'Handle refunds, complaints, and escalation-sensitive topics. Sympathize first, resolve second. Escalate any conversation with billing disputes beyond your limits.',
    tone: 'empathetic',
    automationLevel: 65,
    active: true,
    channels: ['chat', 'whatsapp'],
    languages: ['English', 'Italian', 'Portuguese'],
    dailyLimit: 200,
    model: 'nova-2',
  },
  {
    id: 'agent-3',
    name: 'Atlas',
    personality: 'Technical and precise. Speaks developer fluently. Handles API and integration questions.',
    instructions: 'Answer API, webhook, and integration questions with code examples where helpful. Point developers to docs. Never share internal tokens.',
    tone: 'professional',
    automationLevel: 55,
    active: false,
    channels: ['discord', 'slack', 'email'],
    languages: ['English'],
    dailyLimit: 150,
    model: 'nova-2',
  },
]