export interface DemoOption {
  label: string
  next: string
}

export interface DemoNode {
  id: string
  customer: string
  ai: string
  options: DemoOption[]
}

export interface DemoScenario {
  id: string
  label: string
  start: string
}

export const demoScenarios: DemoScenario[] = [
  { id: 'order', label: 'Order status', start: 'order-0' },
  { id: 'refund', label: 'Refund request', start: 'refund-0' },
  { id: 'account', label: 'Account help', start: 'account-0' },
]

export const demoGraph: Record<string, DemoNode> = {
  'order-0': {
    id: 'order-0',
    customer: 'Hey, do you know where my order is?',
    ai: "I found your order #N-48291. It shipped from our Chicago warehouse yesterday and is currently in transit. It's expected to arrive tomorrow between 9am and 1pm.",
    options: [
      { label: 'Track my package', next: 'order-1' },
      { label: 'It should have arrived', next: 'order-2' },
    ],
  },
  'order-1': {
    id: 'order-1',
    customer: 'Can I get the tracking number?',
    ai: 'Sure thing. Here it is: 1Z999AA10123456784. It just reached the regional sorting facility and is clearing customs on schedule.',
    options: [
      { label: 'Perfect, thanks!', next: 'order-done' },
      { label: 'It says delivered but I have nothing', next: 'order-2' },
    ],
  },
  'order-2': {
    id: 'order-2',
    customer: 'It was supposed to arrive but I have nothing.',
    ai: "I'm sorry about that. I can see the courier marked it as delivered at 2:10pm. Let me start a priority investigation — our team will confirm with the courier within 24 hours. Want me to also issue an immediate replacement?",
    options: [
      { label: 'Yes, send a replacement', next: 'order-3' },
      { label: 'Just investigate', next: 'order-done' },
    ],
  },
  'order-3': {
    id: 'order-3',
    customer: 'Yes, please send a replacement.',
    ai: 'Done. A replacement has been sent with express shipping at no charge — arrive by day after tomorrow. The investigation stays open, and you’ll get updates right here.',
    options: [{ label: 'Thank you!', next: 'order-done' }],
  },
  'order-done': {
    id: 'order-done',
    customer: 'Thank you, that helps a lot!',
    ai: "You're welcome! I've marked everything resolved. If anything else comes up, I'm here 24/7. Have a great day!",
    options: [],
  },

  'refund-0': {
    id: 'refund-0',
    customer: 'I want a refund for my last subscription payment.',
    ai: 'Happy to help. I can see the payment of $49 on Sep 5. Let me check — you’re within the 30-day window, so a full refund is possible. Shall I process it now?',
    options: [
      { label: 'Yes, process the refund', next: 'refund-1' },
      { label: 'Why was I charged twice?', next: 'refund-2' },
    ],
  },
  'refund-1': {
    id: 'refund-1',
    customer: 'Yes, please process it.',
    ai: 'Refund of $49 has been processed back to your original payment method. Expect it within 3–5 business days, and I emailed you the confirmation.',
    options: [{ label: 'Got it, thanks', next: 'refund-done' }],
  },
  'refund-2': {
    id: 'refund-2',
    customer: 'I think I was charged twice.',
    ai: "Let me look... You're right — there was a duplicate charge on Sep 5. That's on our side, and I sincerely apologize. I've voided the duplicate immediately; it will return to your account within 2–4 business days.",
    options: [{ label: 'Thank you for fixing it', next: 'refund-done' }],
  },
  'refund-done': {
    id: 'refund-done',
    customer: 'Thank you for fixing it.',
    ai: "My pleasure. I've noted your account for a double-charge review so it doesn't happen again. Anything else I can help with?",
    options: [],
  },

  'account-0': {
    id: 'account-0',
    customer: "I can't log into my account.",
    ai: "No problem — let's get you back in. Can you confirm which email you signed up with? For privacy, verify the last 4 digits of the phone number on file.",
    options: [
      { label: 'alex@company.com / ·· 4821', next: 'account-1' },
      { label: 'I don’t remember my email', next: 'account-2' },
    ],
  },
  'account-1': {
    id: 'account-1',
    customer: 'It’s alex@company.com, phone ending 4821.',
    ai: 'Verified. I’ve reset your password and sent a one-time link to alex@company.com. It expires in 15 minutes — click it and you can set a new password right away.',
    options: [{ label: 'Done, I’m in!', next: 'account-done' }],
  },
  'account-2': {
    id: 'account-2',
    customer: 'I really don’t remember which email I used.',
    ai: "No worries. I've triggered a recovery flow — a secure code was sent to your phone ending 4821. Reply here with that code and I'll help you locate the account.",
    options: [{ label: 'Code: 294 771', next: 'account-3' }],
  },
  'account-3': {
    id: 'account-3',
    customer: 'The code is 294 771.',
    ai: 'Confirmed. Your account is under alex@company.com. I’ve sent a password reset link there — once you’re in you can update your email if you prefer.',
    options: [{ label: 'Perfect, thanks', next: 'account-done' }],
  },
  'account-done': {
    id: 'account-done',
    customer: 'Perfect, thanks!',
    ai: 'You’re very welcome. Anything else I can help with? If not, I’ll close this conversation for you.',
    options: [],
  },
}

export const demoStart = demoScenarios[0].start
export const demoIntro = {
  customer: 'Where is my order?',
  ai: "I found your order. It's currently in transit and is expected to arrive tomorrow.",
}