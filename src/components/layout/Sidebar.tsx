import { useState } from 'react'
import {
  Home,
  Calendar,
  BookOpen,
  Briefcase,
  MapPin,
  Handshake,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
} from 'lucide-react'
import { currentUser } from '../../data/mockData'
import AICLogo from '../AICLogo'

const navItems = [
  { id: 'home', label: 'Home', icon: Home, sectionId: 'section-home' },
  { id: 'events', label: 'Events', icon: Calendar, sectionId: 'section-events', badge: 3 },
  { id: 'resources', label: 'Resources', icon: BookOpen, sectionId: 'section-resources' },
  { id: 'careers', label: 'Careers', icon: Briefcase, sectionId: 'section-careers', badge: 12 },
  { id: 'chapters', label: 'Chapters', icon: MapPin, sectionId: 'section-chapters' },
  { id: 'partners', label: 'Partners', icon: Handshake, sectionId: 'section-partners' },
]

const bottomNavItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'profile', label: 'Profile', icon: User },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  activeItem: string
  onNavigate: (id: string) => void
}

export default function Sidebar({ collapsed, onToggle, activeItem, onNavigate }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  function handleNavClick(item: (typeof navItems)[0]) {
    onNavigate(item.id)
    const el = document.getElementById(item.sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (item.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-[var(--color-border)] flex flex-col z-40 ${
        collapsed ? 'w-[56px]' : 'w-[240px]'
      }`}
      style={{ transition: 'width 200ms ease' }}
    >
      {/* Brand */}
      <div
        className={`flex items-center h-[56px] border-b border-[var(--color-border)] flex-shrink-0 ${
          collapsed ? 'justify-center px-0' : 'px-3'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <AICLogo size={collapsed ? 28 : 32} />
          {!collapsed && (
            <span className="text-[13px] font-semibold text-[var(--color-text-primary)] truncate">
              The AI Collective
            </span>
          )}
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto min-h-0">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          const isHovered = hoveredItem === item.id

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`w-full flex items-center gap-2.5 h-9 rounded-md text-[13px] relative cursor-pointer border-0 ${
                collapsed ? 'justify-center px-0' : 'px-2.5'
              } ${
                isActive
                  ? 'bg-neutral-100 text-[var(--color-text-primary)] font-medium'
                  : isHovered
                    ? 'bg-neutral-50 text-[var(--color-text-primary)]'
                    : 'text-[var(--color-text-secondary)]'
              }`}
              style={{ transition: 'background 120ms ease, color 120ms ease' }}
              title={collapsed ? item.label : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-[var(--color-accent)] rounded-r" />
              )}
              <Icon size={17} strokeWidth={1.75} className="flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="truncate">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-auto text-[10px] font-medium bg-neutral-100 text-[var(--color-text-tertiary)] px-1.5 py-0.5 rounded tabular-nums">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom nav + user */}
      <div className="flex-shrink-0 py-2 px-2 space-y-0.5 border-t border-[var(--color-border)]">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-2.5 h-9 rounded-md text-[13px] text-[var(--color-text-secondary)] hover:bg-neutral-50 hover:text-[var(--color-text-primary)] cursor-pointer border-0 ${
                collapsed ? 'justify-center px-0' : 'px-2.5'
              }`}
              style={{ transition: 'background 120ms ease, color 120ms ease' }}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={17} strokeWidth={1.75} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}

        {/* User info */}
        <div
          className={`flex items-center gap-2.5 mt-2 pt-2.5 pb-1 border-t border-[var(--color-border)] ${
            collapsed ? 'justify-center px-0' : 'px-2.5'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[10px] font-semibold">{currentUser.avatar}</span>
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-[var(--color-text-primary)] truncate leading-tight">
                {currentUser.name}
              </p>
              <p className="text-[11px] text-[var(--color-text-tertiary)] truncate">
                {currentUser.chapter}
              </p>
            </div>
          )}
          {!collapsed && (
            <button
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] cursor-pointer border-0 bg-transparent p-0.5"
              style={{ transition: 'color 120ms ease' }}
            >
              <LogOut size={14} strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute top-[16px] -right-3 w-6 h-6 bg-white border border-[var(--color-border)] rounded-full flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:border-neutral-300 cursor-pointer shadow-sm z-50"
        style={{ transition: 'color 120ms ease, border-color 120ms ease' }}
      >
        {collapsed ? <ChevronRight size={12} strokeWidth={2} /> : <ChevronLeft size={12} strokeWidth={2} />}
      </button>
    </aside>
  )
}
