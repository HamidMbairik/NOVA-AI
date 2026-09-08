import type { LucideIcon } from 'lucide-react'

export interface NavLink {
  label: string
  to: string
}

export interface Feature {
  title: string
  description: string
  icon: LucideIcon
}

export interface Integration {
  name: string
  description: string
  category: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  photo: string
}

export interface PricingTier {
  name: string
  price: number
  period: string
  description: string
  features: string[]
  highlight: boolean
  cta: string
}

export interface FAQ {
  question: string
  answer: string
}
