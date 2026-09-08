import {
  Zap,
  Sparkles,
  Workflow,
  MessageSquare,
  Database,
  BarChart3,
  ShieldCheck,
  Globe,
  type LucideIcon,
} from 'lucide-react'
import type { Feature, Integration, Testimonial } from '@/types/marketing'

export const features: Feature[] = [
  {
    title: 'Human-Quality Replies',
    description:
      'NOVA understands context, tone, and intent — resolving tickets with answers your customers can’t tell from human ones.',
    icon: Sparkles,
  },
  {
    title: 'Instant Resolution',
    description:
      'Average response time under 30 seconds. NOVA keeps conversations moving at full speed, 24/7.',
    icon: Zap,
  },
  {
    title: 'Smart Escalation',
    description:
      'NOVA knows when a customer needs a human. Sentiment detection routes complex cases to your team automatically.',
    icon: Workflow,
  },
  {
    title: 'Omnichannel Inbox',
    description:
      'Email, chat, WhatsApp, Slack, Discord — every conversation unified in one AI-powered workspace.',
    icon: MessageSquare,
  },
  {
    title: 'Living Knowledge Base',
    description:
      'NOVA learns from every resolved ticket, keeping answers accurate as your products evolve.',
    icon: Database,
  },
  {
    title: 'Actionable Analytics',
    description:
      'Resolution rates, CSAT, response times, and top questions — see exactly where support is winning.',
    icon: BarChart3,
  },
  {
    title: 'Enterprise-Grade Security',
    description:
      'SOC 2 Type II, encryption in transit and at rest, and configurable data retention.',
    icon: ShieldCheck,
  },
  {
    title: '40+ Languages',
    description:
      'Support customers worldwide with fluent, natural replies in over 40 languages.',
    icon: Globe,
  },
]

export const howItWorks: {
  step: string
  title: string
  description: string
}[] = [
  {
    step: '01',
    title: 'Connect your channels',
    description:
      'Link email, chat, WhatsApp, and more. NOVA pulls in every conversation automatically.',
  },
  {
    step: '02',
    title: 'Train NOVA on your business',
    description:
      'Import your knowledge base and products. NOVA learns your voice, policies, and answers.',
  },
  {
    step: '03',
    title: 'AI defuses & resolves',
    description:
      'Every ticket is analyzed instantly. Routine issues are resolved itself; complex ones reach humans.',
  },
  {
    step: '04',
    title: 'Your team focuses on what matters',
    description:
      'Watch resolution rates climb while hours per ticket collapse. Your team is freed for high-value work.',
  },
]

export const integrations: Integration[] = [
  {
    name: 'Shopify',
    description: 'Order lookups, shipping updates, refunds.',
    category: 'Ecommerce',
  },
  {
    name: 'Slack',
    description: 'Escalations and team responses in your channels.',
    category: 'Team',
  },
  {
    name: 'WhatsApp',
    description: 'Two-way customer conversations.',
    category: 'Messaging',
  },
  {
    name: 'Discord',
    description: 'Community support in your servers.',
    category: 'Community',
  },
  {
    name: 'Zendesk',
    description: 'Import tickets and keep your pipeline in sync.',
    category: 'Helpdesk',
  },
  {
    name: 'Intercom',
    description: 'Unify messenger conversations with NOVA.',
    category: 'Helpdesk',
  },
  {
    name: 'HubSpot',
    description: 'Customer context, seamlessly attached.',
    category: 'CRM',
  },
  {
    name: 'Gmail',
    description: 'Bring your existing inbox into NOVA.',
    category: 'Email',
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      'NOVA resolved 71% of our tickets before a human ever touched them. Our CSAT went from 82 to 94 in six weeks.',
    name: 'Sarah Kim',
    role: 'Head of Support',
    company: 'Lumina',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    quote:
      'We launched with NOVA as our entire support team. Response times dropped from hours to seconds — our customers noticed immediately.',
    name: 'Marcus Cole',
    role: 'Co-founder',
    company: 'Helio',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    quote:
      'It writes like us. The sentiment detection is scary good at knowing when to hand off to a human.',
    name: 'Priya Nair',
    role: 'Customer Success Lead',
    company: 'Atlas Studio',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    quote:
      'Setup took an afternoon. By the end of the week our reply time sat at 24 seconds and nobody had lifted a finger.',
    name: 'Tomás Rivera',
    role: 'VP of Customer Experience',
    company: 'Northwind',
    photo: 'https://randomuser.me/api/portraits/men/54.jpg',
  },
  {
    quote:
      'The escalation logic is what sold us. NOVA knows exactly when to tap a human, and hands off with the full context already attached.',
    name: 'Amara Okafor',
    role: 'Head of Operations',
    company: 'Kite & Co',
    photo: 'https://randomuser.me/api/portraits/women/79.jpg',
  },
  {
    quote:
      'We stopped hiring night-shift agents entirely. Customers still get answers at 3am, and they read like us.',
    name: 'Jonas Weber',
    role: 'Support Engineer',
    company: 'Brightline',
    photo: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
]

export const faqs = [
  {
    question: 'How accurate is NOVA?',
    answer:
      'NOVA cites your knowledge base for every answer. If it can’t find a confident, verifiable answer, it escalates to a human instead of guessing. Most teams hit 70%+ AI resolution within the first month.',
  },
  {
    question: 'Is my data used to train your models?',
    answer:
      'No. Your conversations and knowledge base are never used to train shared models. Your data stays in your workspace, encrypted in transit and at rest.',
  },
  {
    question: 'Does a human ever get cut out?',
    answer:
      'NOVA handles routine requests and triages the rest — it flags sentiment, intent, and complexity for your team. You keep full control of escalations and handoff.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Most teams are live within an afternoon. Connect a channel, add your knowledge base, pick a personality, and NOVA starts resolving.',
  },
  {
    question: 'What happens if NOVA doesn’t know an answer?',
    answer:
      'It transparently asks a clarifying question or escalates to a teammate — never hallucinating. Escalated tickets arrive with full context and suggested replies.',
  },
  {
    question: 'Can I change the plan later?',
    answer:
      'Yes. Upgrade, downgrade, or cancel anytime. Usage is prorated and there’s no lock-in.',
  },
]

export const pricingTiers = [
  {
    name: 'Startup',
    price: 0,
    period: '/month',
    description: 'For teams getting started with AI support.',
    features: [
      'Up to 100 conversations / month',
      '2 AI agents',
      'Email, chat & website widget',
      'Basic analytics',
      'Community support',
    ],
    highlight: false,
    cta: 'Start for free',
  },
  {
    name: 'Growth',
    price: 49,
    period: '/month',
    description: 'For growing teams that want automation to scale.',
    features: [
      'Up to 1,500 conversations / month',
      '10 AI agents',
      'All channels: WhatsApp, Slack, Discord',
      'Knowledge base training',
      'Advanced analytics & CSAT',
      'Priority support',
    ],
    highlight: true,
    cta: 'Start 14-day trial',
  },
  {
    name: 'Scale',
    price: 149,
    period: '/month',
    description: 'For teams with serious volume and needs.',
    features: [
      'Unlimited conversations',
      'Unlimited agents',
      'Custom models & tone per agent',
      'SSO / SAML',
      'SOC 2 report access',
      'Dedicated success manager',
    ],
    highlight: false,
    cta: 'Talk to sales',
  },
] as const

export const featuresDeepDive: {
  icon: LucideIcon
  tag: string
  title: string
  description: string
  bullets: string[]
}[] = [
  {
    icon: Sparkles,
    tag: 'Intent recognition',
    title: 'Understands what customers actually mean.',
    description:
      'NOVA reads the full conversation, not just keywords. “Where is my stuff?” is recognized as a tracking request — and resolved like one.',
    bullets: [
      'Classifies intent, tone, and urgency in every message',
      'Distinguishes order tracking from refunds from complaints',
      'Understands context that spans multiple messages',
    ],
  },
  {
    icon: BarChart3,
    tag: 'Agent analytics',
    title: 'Every number, watching itself improve.',
    description:
      'Resolution rate, CSAT, response time, top questions — automatically tracked and trended, with zero setup.',
    bullets: [
      'Live dashboards for conversations, agents, and channels',
      'Weekly summaries delivered to your inbox',
      'Benchmarks against similar businesses',
    ],
  },
  {
    icon: MessageSquare,
    tag: 'Omnichannel',
    title: 'Every channel. One inbox. One brain.',
    description:
      'Email, chat, WhatsApp, Slack, and Discord all flow into a single AI-powered workspace with full conversation history.',
    bullets: [
      'Seamless context as customers switch channels',
      'Collision-free collaboration for your team',
      'Native integrations with the tools you already use',
    ],
  },
  {
    icon: ShieldCheck,
    tag: 'Trust & safety',
    title: 'Smart escalation, never a wrong answer.',
    description:
      'NOVA flags sentiment and confidence on every ticket. Anything risky or uncertain goes to a human with full context attached.',
    bullets: [
      'Answers only from your verified knowledge base',
      'Sentiment-aware escalation thresholds you control',
      'Full audit log of every AI action',
    ],
  },
]

export const resources: {
  id: string
  title: string
  excerpt: string
  category: 'Guide' | 'Case study' | 'Changelog'
  date: string
  readTime: string
  body: string[]
}[] = [
  {
    id: 'prompt-perfect',
    title: 'Prompt-perfect: writing instructions your AI agent actually listens to',
    excerpt:
      'The single highest-leverage skill in AI support is writing clear agent instructions. Here’s the exact structure we use.',
    category: 'Guide',
    date: 'Sep 2, 2026',
    readTime: '6 min',
    body: [
      'Instructions are the difference between an agent that vibes and an agent that resolves. Your AI agent follows the guardrails you set — the trick is setting the right ones.',
      'Start with WHO. “You are a support agent for Acme Co. selling X to small businesses.” Then state the JOB: “Your job is to resolve routine questions about orders, shipping, and returns using the knowledge base.” Then the RULES: “Only answer from the knowledge base. If confidence is low, escalate.”',
      'Finally, add TONE and LIMITS — “warm but professional, no emojis in formal channels, max 3 sentences when a simple answer exists.” We see resolution rates jump 15–20 points when teams follow this structure.',
    ],
  },
  {
    id: 'from-2h-to-24s',
    title: 'How Helio cut response time from 2 hours to 24 seconds',
    excerpt:
      'A two-person support team running an online store at 12,000 tickets a year — and what changed when they switched to AI-first support.',
    category: 'Case study',
    date: 'Aug 19, 2026',
    readTime: '8 min',
    body: [
      'Marcus and his co-founder were the entire support department at Helio, a furniture retailer. Every morning started against a wall of overnight email.',
      'They connected Shopify and Gmail, imported their FAQ into the knowledge base, and gave NOVA a no-nonsense personality. Within a week, 71% of tickets were resolved without a human.',
      '“Customers ask the same forty things, over and over. Now NOVA handles those perfectly and hands us the interesting ones,” Marcus says. CSAT moved from 82 to 94 in six weeks.',
    ],
  },
  {
    id: 'sentiment-routing',
    title: 'Sentiment routing: teaching AI when to pass the conversation to a human',
    excerpt:
      'Escalation isn’t failure — it’s the smartest thing your AI can do. How to configure sentiment-aware handoffs that customers actually love.',
    category: 'Guide',
    date: 'Aug 5, 2026',
    readTime: '5 min',
    body: [
      'The best AI agents know their own limits. Frustrated customers deserve a human, and the data agrees: satisfaction jumps when angry conversations leave the bot quickly.',
      'NOVA scores sentiment and intent continuously. Configure thresholds per scenario — angry about product quality? Escalate immediately. Mildly confused about checkout? Give the bot one more turn.',
      'Escalated tickets arrive with the full transcript, a suggested reply, and the customer’s history attached. Your humans arrive prepared, not blind.',
    ],
  },
  {
    id: 'knowledge-base-launch',
    title: 'The 3-hour knowledge base that powers your AI agent',
    excerpt:
      'You don’t need a documentation team to give NOVA great answers. You need the right fragments of the support you already do.',
    category: 'Guide',
    date: 'Jul 21, 2026',
    readTime: '7 min',
    body: [
      'Rules of thumb: aim for one clear answer per topic. Start with shipping, returns, payments, and account access — that covers ~80% of inbound.',
      'For each topic, write the FAQ-style question, a tight 3–6 sentence answer, and the “conditions” — when the answer applies and what edge cases to hand off.',
      'Then let NOVA learn. Every resolved conversation adds signal. After two weeks of volume, our customers notice the answers getting sharper.',
    ],
  },
  {
    id: 'whatsapp-support',
    title: 'Shipping support to WhatsApp: a playbook',
    excerpt:
      'Over a billion people message businesses daily. Here’s how to bring WhatsApp into your support ecosystem without chaos.',
    category: 'Case study',
    date: 'Jul 2, 2026',
    readTime: '6 min',
    body: [
      'When Kite & Co. switched their storefront chat to WhatsApp, volume tripled overnight — and the inbox didn’t break a sweat.',
      'NOVA handles order tracking, delivery update requests, and return labels 24/7. Human agents only see conversations that need judgment, and every reply keeps the customer’s thread intact.',
      'WhatsApp two-way messaging means rich interactions — images, product links, and voice notes all flow into the same workspace.',
    ],
  },
  {
    id: 'now-ai-agents-learn',
    title: 'Changelog: AI agents now learn from resolved tickets',
    excerpt:
      'The biggest update yet — NOVA spots knowledge gaps and suggests new entries straight from the conversations you’ve resolved.',
    category: 'Changelog',
    date: 'Jun 18, 2026',
    readTime: '2 min',
    body: [
      'Every time NOVA resolves a conversation that leans on a weak knowledge article, it flags it for review instead of guessing.',
      'In Analytics, a new “Suggested knowledge” panel lists topics customers keep asking about that don’t have a solid article yet — with draft answers auto-generated for approval.',
      'Turn on the toggle and your knowledge base starts writing itself. Approve or edit, and the cycle continues.',
    ],
  },
]

export type MarketingIcon = LucideIcon