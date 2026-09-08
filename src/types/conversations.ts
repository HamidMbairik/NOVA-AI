export type Channel = 'email' | 'chat' | 'whatsapp' | 'slack' | 'discord'
export type ConversationStatus = 'open' | 'resolved' | 'pending' | 'escalated'
export type ResolutionType = 'ai' | 'human'

export interface Customer {
  id: string
  name: string
  email: string
  company?: string
  location: string
  avatarColor: string
  photo?: string
  customerSince: string
  totalConversations: number
  sentiment: 'positive' | 'neutral' | 'negative'
}

export interface Message {
  id: string
  author: 'customer' | 'ai' | 'human'
  content: string
  timestamp: string
}

export interface Conversation {
  id: string
  customerId: string
  channel: Channel
  status: ConversationStatus
  subject: string
  tags: string[]
  messages: Message[]
  lastMessage: string
  lastActivity: string
  resolution: ResolutionType
  aiConfidence?: number
  priority: 'low' | 'medium' | 'high'
}

export interface Agent {
  id: string
  name: string
  personality: string
  instructions: string
  tone: 'friendly' | 'professional' | 'casual' | 'empathetic'
  automationLevel: number
  active: boolean
  channels: Channel[]
  languages: string[]
  dailyLimit: number
  model: string
}
