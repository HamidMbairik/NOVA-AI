import {
  siShopify,
  siWhatsapp,
  siDiscord,
  siZendesk,
  siIntercom,
  siHubspot,
  siGmail,
} from 'simple-icons'
import type { LucideIcon } from 'lucide-react'

export interface Brand {
  name: string
  path: string
  /** Brand hex color, without the leading #. */
  hex: string
  /** Optional lucide fallback/companion icon. */
  icon?: LucideIcon
}

const slackPath =
  'M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zm2.521-10.123a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.527 2.527 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.527 2.527 0 010 8.834a2.527 2.527 0 012.522-2.521h6.312zm10.123 2.521a2.528 2.528 0 012.52-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.52V8.834zm-1.271 0a2.527 2.527 0 01-2.521 2.521 2.527 2.527 0 01-2.521-2.521V2.522A2.527 2.527 0 0115.166 0a2.527 2.527 0 012.521 2.522v6.312zm-2.521 10.123a2.528 2.528 0 012.521 2.52A2.528 2.528 0 0115.166 24a2.528 2.528 0 01-2.521-2.522v-2.52h2.52zm0-1.271a2.527 2.527 0 01-2.521-2.521 2.527 2.527 0 012.521-2.521h6.312A2.527 2.527 0 0124 15.166a2.527 2.527 0 01-2.522 2.521h-6.312z'

export const brands: Record<string, Brand> = {
  Shopify: { name: 'Shopify', path: siShopify.path, hex: siShopify.hex },
  Slack: { name: 'Slack', path: slackPath, hex: '4A154B' },
  WhatsApp: { name: 'WhatsApp', path: siWhatsapp.path, hex: siWhatsapp.hex },
  Discord: { name: 'Discord', path: siDiscord.path, hex: siDiscord.hex },
  Zendesk: { name: 'Zendesk', path: siZendesk.path, hex: siZendesk.hex },
  Intercom: { name: 'Intercom', path: siIntercom.path, hex: siIntercom.hex },
  HubSpot: { name: 'HubSpot', path: siHubspot.path, hex: siHubspot.hex },
  Gmail: { name: 'Gmail', path: siGmail.path, hex: siGmail.hex },
}

export function getBrand(name: string): Brand | undefined {
  return brands[name]
}
