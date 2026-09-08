/**
 * QA harness — launches the installed Chrome headless, walks every route,
 * collects console errors and verifies key content exists.
 *
 * Usage: node scripts/verify.mjs [baseUrl]
 */
import puppeteer from 'puppeteer-core'
import { createServer } from 'vite'

const CHROME =
  'C:/Program Files/Google/Chrome/Application/chrome.exe'

const routes = [
  { path: '/', expect: ['Support That Never Sleeps', 'Start free trial', 'Live demo', 'How it works', 'Questions, answered'] },
  { path: '/features', expect: ['Intent recognition', 'Platform', 'Live metrics'] },
  { path: '/integrations', expect: ['Shopify', 'WhatsApp', 'Ecommerce', 'custom integration'] },
  { path: '/pricing', expect: ['Growth', 'Compare plans', 'Annual', 'Most popular'] },
  { path: '/resources', expect: ['Changelog', 'Case study', 'Guide', 'learn how teams run'] },
  { path: '/contact', expect: ['Contact', 'Team size', 'Send message'] },
  { path: '/login', expect: ['Welcome back', 'demo credentials', 'Log in'] },
  { path: '/signup', expect: ['Start your 14-day trial', 'Create free account', 'Full name'] },
  { path: '/app', expect: ['Overview', 'AI Agents'] },
  { path: '/app/conversations', expect: ['Conversations'] },
  { path: '/app/analytics', expect: ['Analytics'] },
]

let server
try {
  server = await createServer({ server: { port: 5198, strictPort: true } })
  await server.listen()
  const base = `http://localhost:5198`

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu'],
  })

  let failures = 0
  for (const route of routes) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 900 })
    const errors = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', (err) => errors.push(String(err)))

    // networkidle never settles on pages that load external assets (avatars/logos),
    // so wait for the DOM and give the SPA a beat to hydrate before checking content.
    await page.goto(`${base}${route.path}`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await new Promise((r) => setTimeout(r, 900))

    const body = await page.evaluate(() => document.body.innerText.toLowerCase())
    const missing = route.expect.filter((t) => !body.includes(t.toLowerCase()))

    if (missing.length || errors.length) {
      failures++
      console.log(
        `${route.path}:\n  missing: ${missing.join(', ') || 'none'}\n  errors: ${errors.join(' | ') || 'none'}`,
      )
    } else {
      console.log(`${route.path}  ✓`)
    }
    await page.close()
  }

  await browser.close()
  if (failures) {
    console.log(`\n${failures} route(s) had issues`)
    process.exit(1)
  }
  console.log('\nAll routes passed.')
} finally {
  if (server) await server.close()
}