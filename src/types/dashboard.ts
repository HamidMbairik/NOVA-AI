export interface KnowledgeDoc {
  id: string
  title: string
  category: string
  content: string
  status: 'indexed' | 'processing' | 'error'
  updatedAt: string
  author: string
  wordCount: number
  relevance: number
}

export interface AnalyticsPoint {
  date: string
  conversations: number
  aiResolved: number
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: 'Owner' | 'Admin' | 'Agent'
  avatarColor: string
  initials: string
  photo?: string
  lastActive: string
  conversationsHandled: number
  status: 'online' | 'offline' | 'away'
}

export interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  plan: string
}

export interface UsageStats {
  conversations: number
  aiResolved: number
  quota: number
  resolutionRate: number
  satisfaction: number
  responseTime: number
  csat: number
}
