import { Search, Bell } from 'lucide-react'
import { currentUser } from '../../data/mockData'

export default function TopBar() {
  const today = new Date()
  const formatted = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <header className="h-[56px] border-b border-[var(--color-border)] bg-white flex items-center justify-between px-6">
      <div>
        <h1 className="text-[15px] font-semibold text-[var(--color-text-primary)]">
          Welcome back, {currentUser.name.split(' ')[0]}
        </h1>
        <p className="text-[12px] text-[var(--color-text-tertiary)]">{formatted}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]"
            strokeWidth={1.75}
          />
          <input
            type="text"
            placeholder="Search events, resources…"
            className="h-8 w-[240px] pl-8 pr-3 text-sm bg-neutral-50 border border-[var(--color-border)] rounded-md placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[var(--color-text-tertiary)] bg-white border border-[var(--color-border)] px-1 py-0.5 rounded font-mono">
            ⌘K
          </kbd>
        </div>

        <button className="relative w-8 h-8 flex items-center justify-center rounded-md hover:bg-neutral-50 transition-colors">
          <Bell size={16} strokeWidth={1.75} className="text-[var(--color-text-secondary)]" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full" />
        </button>
      </div>
    </header>
  )
}
