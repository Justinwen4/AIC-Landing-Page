import { useState } from 'react'
import {
  Home,
  Calendar,
  BookOpen,
  Briefcase,
  MapPin,
  Handshake,
  User,
  PanelLeftClose,
  PanelLeft,
  LogOut,
  Settings,
} from 'lucide-react'
import { currentUser } from '../../data/mockData'

const navItems = [
  { id: 'home', label: 'Home', icon: Home, href: '#' },
  { id: 'events', label: 'Events', icon: Calendar, href: '#', badge: 3 },
  { id: 'resources', label: 'Resources', icon: BookOpen, href: '#' },
  { id: 'careers', label: 'Careers', icon: Briefcase, href: '#', badge: 12 },
  { id: 'chapters', label: 'Chapters', icon: MapPin, href: '#' },
  { id: 'partners', label: 'Partners', icon: Handshake, href: '#' },
]

const bottomNavItems = [
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
  { id: 'profile', label: 'Profile', icon: User, href: '#' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  activeItem: string
  onNavigate: (id: string) => void
}

export default function Sidebar({ collapsed, onToggle, activeItem, onNavigate }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-[var(--color-border)] flex flex-col transition-[width] duration-200 z-40 ${
        collapsed ? 'w-[56px]' : 'w-[240px]'
      }`}
    >
      <div className="flex items-center h-[56px] px-3 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold tracking-wide">AIC</span>
          </div>
          {!collapsed && (
            <span className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
              The AI Collective
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          const isHovered = hoveredItem === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`w-full flex items-center gap-2.5 h-9 rounded-md text-sm transition-colors relative ${
                collapsed ? 'justify-center px-0' : 'px-2.5'
              } ${
                isActive
                  ? 'bg-neutral-100 text-[var(--color-text-primary)] font-medium'
                  : isHovered
                    ? 'bg-neutral-50 text-[var(--color-text-primary)]'
                    : 'text-[var(--color-text-secondary)]'
              }`}
              title={collapsed ? item.label : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-[var(--color-accent)] rounded-r" />
              )}
              <Icon size={18} strokeWidth={1.75} className="flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-[11px] font-medium bg-neutral-100 text-[var(--color-text-tertiary)] px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          )
        })}
      </nav>

      <div className="py-2 px-2 space-y-0.5 border-t border-[var(--color-border)]">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-2.5 h-9 rounded-md text-sm text-[var(--color-text-secondary)] hover:bg-neutral-50 hover:text-[var(--color-text-primary)] transition-colors ${
                collapsed ? 'justify-center px-0' : 'px-2.5'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} strokeWidth={1.75} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}

        <div
          className={`flex items-center gap-2.5 mt-2 pt-2 border-t border-[var(--color-border)] ${
            collapsed ? 'justify-center px-0' : 'px-2.5'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[10px] font-semibold">{currentUser.avatar}</span>
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                {currentUser.name}
              </p>
              <p className="text-[11px] text-[var(--color-text-tertiary)] truncate">
                {currentUser.chapter}
              </p>
            </div>
          )}
          {!collapsed && (
            <button className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
              <LogOut size={14} strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>

      <button
        onClick={onToggle}
        className="absolute top-[14px] -right-3 w-6 h-6 bg-white border border-[var(--color-border)] rounded-full flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:border-neutral-300 transition-colors shadow-sm"
      >
        {collapsed ? <PanelLeft size={12} /> : <PanelLeftClose size={12} />}
      </button>
    </aside>
  )
}
