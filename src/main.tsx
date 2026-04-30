import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from './sections/Navbar.tsx'
import Footer from './sections/Footer.tsx'
import Ambassador from './pages/Ambassador.tsx'
import Internships from './pages/Internships.tsx'
import AdminDashboardPage from './pages/AdminDashboardPage.tsx'
import EventsPage from './pages/EventsPage.tsx'

const normalizedPath = window.location.pathname.replace(/\/+$/, '').replace(/\.html$/, '') || '/'
const isAmbassadorPage = normalizedPath === '/ambassador'
const isInternshipsPage = normalizedPath === '/internships'
const isEventsPage = normalizedPath === '/events'
const isAdminPage = normalizedPath.startsWith('/admin')

const Root = isAmbassadorPage || isInternshipsPage || isEventsPage ? (
  <div className="relative min-h-screen bg-arzens-bg overflow-x-hidden">
    <div className="grain-overlay" />
    <div className="relative">
      <Navbar />
      {isAmbassadorPage ? <Ambassador /> : isInternshipsPage ? <Internships /> : <EventsPage />}
      <Footer />
    </div>
  </div>
) : isAdminPage ? (
  <div className="relative min-h-screen bg-arzens-bg overflow-x-hidden">
    <div className="grain-overlay" />
    <div className="relative">
      <Navbar />
      <AdminDashboardPage />
      <Footer />
    </div>
  </div>
) : (
  <App />
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {Root}
  </StrictMode>,
)
