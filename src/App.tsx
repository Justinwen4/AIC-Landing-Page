import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'
import Dashboard from './components/Dashboard'

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState('home')

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeNav}
        onNavigate={setActiveNav}
      />

      <div
        className={`transition-[margin] duration-200 ${
          sidebarCollapsed ? 'ml-[56px]' : 'ml-[240px]'
        }`}
      >
        <TopBar />
        <main className="min-h-[calc(100vh-56px)]">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}
