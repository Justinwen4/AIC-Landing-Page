import { useState } from 'react'
import { MapPin, Minus, Plus, Navigation } from 'lucide-react'
import type { AICEvent } from '../../types'

interface EventMapProps {
  events: AICEvent[]
}

const typeLabels: Record<string, string> = {
  'salon': 'Salon',
  'demo-night': 'Demo Night',
  'hackathon': 'Hackathon',
  'workshop': 'Workshop',
  'fireside-chat': 'Fireside Chat',
  'meetup': 'Meetup',
}

export default function EventMap({ events }: EventMapProps) {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const [radius, setRadius] = useState(50)

  const sfEvents = events.filter((e) => e.chapter === 'San Francisco')
  const otherEvents = events.filter((e) => e.chapter !== 'San Francisco')

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-lg overflow-hidden">
      <div className="relative h-[380px] bg-[#f8f9fa]">
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e5e5" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* San Francisco cluster */}
        <div className="absolute" style={{ left: '35%', top: '45%' }}>
          <div className="relative">
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5"
              style={{
                width: `${radius * 3}px`,
                height: `${radius * 3}px`,
              }}
            />
            {sfEvents.map((event, i) => {
              const angle = (i / sfEvents.length) * 2 * Math.PI - Math.PI / 2
              const r = 20 + i * 12
              const x = Math.cos(angle) * r
              const y = Math.sin(angle) * r

              return (
                <div
                  key={event.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                  style={{ left: `${x}px`, top: `${y}px` }}
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div
                    className={`w-3 h-3 rounded-full border-2 border-white shadow-sm transition-transform ${
                      event.isRsvped ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-accent-mid)]'
                    } ${hoveredEvent === event.id ? 'scale-150' : ''}`}
                  />

                  {hoveredEvent === event.id && (
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white border border-[var(--color-border)] rounded-lg shadow-lg p-3 w-[220px] z-20">
                      <p className="text-[11px] font-semibold text-[var(--color-accent)] mb-0.5">
                        {typeLabels[event.type]}
                      </p>
                      <p className="text-[13px] font-medium text-[var(--color-text-primary)] mb-1 leading-snug">
                        {event.title}
                      </p>
                      <p className="text-[11px] text-[var(--color-text-tertiary)]">
                        {event.date} · {event.time}
                      </p>
                      <p className="text-[11px] text-[var(--color-text-tertiary)]">
                        {event.location}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
            <div className="absolute -translate-x-1/2 translate-y-4 text-[11px] font-medium text-[var(--color-text-secondary)] whitespace-nowrap">
              San Francisco · {sfEvents.length} events
            </div>
          </div>
        </div>

        {/* New York marker */}
        {otherEvents.map((event) => (
          <div
            key={event.id}
            className="absolute cursor-pointer"
            style={{ left: '72%', top: '38%' }}
            onMouseEnter={() => setHoveredEvent(event.id)}
            onMouseLeave={() => setHoveredEvent(null)}
          >
            <div
              className={`w-3 h-3 rounded-full border-2 border-white shadow-sm bg-neutral-400 transition-transform ${
                hoveredEvent === event.id ? 'scale-150' : ''
              }`}
            />
            {hoveredEvent === event.id && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white border border-[var(--color-border)] rounded-lg shadow-lg p-3 w-[220px] z-20">
                <p className="text-[11px] font-semibold text-[var(--color-accent)] mb-0.5">
                  {typeLabels[event.type]}
                </p>
                <p className="text-[13px] font-medium text-[var(--color-text-primary)] mb-1 leading-snug">
                  {event.title}
                </p>
                <p className="text-[11px] text-[var(--color-text-tertiary)]">
                  {event.date} · {event.time}
                </p>
                <p className="text-[11px] text-[var(--color-text-tertiary)]">{event.location}</p>
              </div>
            )}
            <div className="absolute -translate-x-1/2 translate-y-2 text-[11px] font-medium text-[var(--color-text-tertiary)] whitespace-nowrap">
              New York
            </div>
          </div>
        ))}

        {/* Controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button className="w-8 h-8 bg-white border border-[var(--color-border)] rounded-md flex items-center justify-center hover:bg-neutral-50 transition-colors shadow-sm">
            <Plus size={14} strokeWidth={2} className="text-[var(--color-text-secondary)]" />
          </button>
          <button className="w-8 h-8 bg-white border border-[var(--color-border)] rounded-md flex items-center justify-center hover:bg-neutral-50 transition-colors shadow-sm">
            <Minus size={14} strokeWidth={2} className="text-[var(--color-text-secondary)]" />
          </button>
          <button className="w-8 h-8 bg-white border border-[var(--color-border)] rounded-md flex items-center justify-center hover:bg-neutral-50 transition-colors shadow-sm">
            <Navigation size={14} strokeWidth={2} className="text-[var(--color-text-secondary)]" />
          </button>
        </div>

        {/* Location indicator */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white border border-[var(--color-border)] rounded-md px-3 py-2 shadow-sm">
          <MapPin size={13} strokeWidth={1.75} className="text-[var(--color-accent)]" />
          <span className="text-[12px] font-medium text-[var(--color-text-primary)]">
            San Francisco
          </span>
          <span className="text-[11px] text-[var(--color-text-tertiary)]">·</span>
          <div className="flex items-center gap-1.5">
            <input
              type="range"
              min={10}
              max={200}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-16 h-1 accent-[var(--color-accent)]"
            />
            <span className="text-[11px] text-[var(--color-text-tertiary)] w-10">{radius} mi</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2.5 border-t border-[var(--color-border)] bg-neutral-50/50">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
          <span className="text-[11px] text-[var(--color-text-tertiary)]">RSVP'd</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[var(--color-accent-mid)]" />
          <span className="text-[11px] text-[var(--color-text-tertiary)]">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-neutral-400" />
          <span className="text-[11px] text-[var(--color-text-tertiary)]">Other chapters</span>
        </div>
      </div>
    </div>
  )
}
