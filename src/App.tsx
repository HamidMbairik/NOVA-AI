import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { MarketingLayout } from '@/components/layout/MarketingLayout'

const HomePage = lazy(() => import('@/pages/marketing/HomePage'))
const FeaturesPage = lazy(() => import('@/pages/marketing/FeaturesPage'))
const IntegrationsPage = lazy(() => import('@/pages/marketing/IntegrationsPage'))
const PricingPage = lazy(() => import('@/pages/marketing/PricingPage'))
const ResourcesPage = lazy(() => import('@/pages/marketing/ResourcesPage'))
const ContactPage = lazy(() => import('@/pages/marketing/ContactPage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const SignupPage = lazy(() => import('@/pages/auth/SignupPage'))
const NotFoundPage = lazy(() => import('@/pages/marketing/NotFoundPage'))

const DashboardOverview = lazy(() => import('@/pages/dashboard/OverviewPage'))
const DashboardConversations = lazy(
  () => import('@/pages/dashboard/ConversationsPage'),
)
const DashboardAgents = lazy(() => import('@/pages/dashboard/AgentsPage'))
const DashboardKnowledge = lazy(
  () => import('@/pages/dashboard/KnowledgeBasePage'),
)
const DashboardAnalytics = lazy(() => import('@/pages/dashboard/AnalyticsPage'))
const DashboardIntegrations = lazy(
  () => import('@/pages/dashboard/DashboardIntegrationsPage'),
)
const DashboardTeam = lazy(() => import('@/pages/dashboard/TeamPage'))
const DashboardBilling = lazy(() => import('@/pages/dashboard/BillingPage'))
const DashboardSettings = lazy(() => import('@/pages/dashboard/SettingsPage'))

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route index element={<HomePage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="integrations" element={<IntegrationsPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />

        <Route path="app" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="conversations" element={<DashboardConversations />} />
          <Route path="conversations/:id" element={<DashboardConversations />} />
          <Route path="agents" element={<DashboardAgents />} />
          <Route path="knowledge" element={<DashboardKnowledge />} />
          <Route path="analytics" element={<DashboardAnalytics />} />
          <Route path="integrations" element={<DashboardIntegrations />} />
          <Route path="team" element={<DashboardTeam />} />
          <Route path="billing" element={<DashboardBilling />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App