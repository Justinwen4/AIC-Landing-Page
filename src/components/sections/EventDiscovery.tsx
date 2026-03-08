import { useState } from 'react'
import { ArrowRight, Filter, List, Map } from 'lucide-react'
import { events } from '../../data/mockData'
import EventCard from '../cards/EventCard'
import EventMap from './EventMap'

type ViewMode = 'list' | 'map'

export default function EventDiscovery() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filters = ['all', 'salon', 'demo-night', 'hackathon', 'workshop', 'fireside-chat']
  const filterLabels: Record<string, string> = {
    all: 'All Events',
    salon: 'Salons',
    'demo-night': 'Demo Nights',
    hackathon: 'Hackathons',
    workshop: 'Workshops',
    'fireside-chat': 'Fireside Chats',
  }

  const filtered =
    activeFilter === 'all' ? events : events.filter((e) => e.type === activeFilter)

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[16px] font-semibold text-[var(--color-text-primary)]">
            Recommended Events
          </h2>
          <p className="text-[12px] text-[var(--color-text-tertiary)] mt-0.5">
            Personalized based on your interests and location
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-neutral-100 rounded-md p-0.5">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[12px] font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-[var(--color-text-primary)] shadow-sm'
                  : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'
              }`}
            >
              <List size={13} strokeWidth={2} />
              List
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[12px] font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-white text-[var(--color-text-primary)] shadow-sm'
                  : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'
              }`}
            >
              <Map size={13} strokeWidth={2} />
              Map
            </button>
          </div>
          <button className="text-[12px] font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-mid)] flex items-center gap-1 transition-colors">
            View All
            <ArrowRight size={12} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1">
        <Filter size={13} strokeWidth={1.75} className="text-[var(--color-text-tertiary)] flex-shrink-0" />
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`text-[12px] font-medium px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${
              activeFilter === f
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-neutral-100 text-[var(--color-text-secondary)] hover:bg-neutral-200'
            }`}
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filtered.slice(0, 4).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EventMap events={filtered} />
      )}
    </section>
  )
}
