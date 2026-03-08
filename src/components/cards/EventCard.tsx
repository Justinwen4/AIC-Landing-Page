import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import type { AICEvent } from '../../types'

const typeLabels: Record<string, string> = {
  'salon': 'Salon',
  'demo-night': 'Demo Night',
  'hackathon': 'Hackathon',
  'workshop': 'Workshop',
  'fireside-chat': 'Fireside Chat',
  'meetup': 'Meetup',
}

interface EventCardProps {
  event: AICEvent
  variant?: 'default' | 'compact'
}

export default function EventCard({ event, variant = 'default' }: EventCardProps) {
  const date = new Date(event.date + 'T00:00:00')
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const day = date.getDate()
  const spotsLeft = event.maxAttendees - event.attendees
  const fillPercent = (event.attendees / event.maxAttendees) * 100

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3 py-2.5 px-3 rounded-md hover:bg-neutral-50 transition-colors group">
        <div className="w-10 h-10 bg-neutral-50 border border-[var(--color-border)] rounded-md flex flex-col items-center justify-center flex-shrink-0">
          <span className="text-[9px] font-semibold text-[var(--color-text-tertiary)] leading-none">{month}</span>
          <span className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight">{day}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[var(--color-text-primary)] truncate group-hover:text-[var(--color-accent)] transition-colors">
            {event.title}
          </p>
          <p className="text-[12px] text-[var(--color-text-tertiary)]">
            {event.time} · {event.chapter}
          </p>
        </div>
        <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] bg-neutral-50 border border-[var(--color-border)] px-1.5 py-0.5 rounded flex-shrink-0">
          {typeLabels[event.type]}
        </span>
      </div>
    )
  }

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-lg p-5 hover:border-neutral-300 transition-colors group">
      <div className="flex items-start gap-4">
        <div className="w-12 h-14 bg-neutral-50 border border-[var(--color-border)] rounded-md flex flex-col items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-semibold text-[var(--color-text-tertiary)] leading-none">{month}</span>
          <span className="text-lg font-semibold text-[var(--color-text-primary)] leading-tight">{day}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-accent)] bg-[var(--color-accent-light)] px-1.5 py-0.5 rounded">
              {typeLabels[event.type]}
            </span>
            {event.isRsvped && (
              <span className="text-[11px] font-medium text-[var(--color-accent-mid)] bg-emerald-50 px-1.5 py-0.5 rounded">
                RSVP'd
              </span>
            )}
          </div>

          <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-accent)] transition-colors leading-snug">
            {event.title}
          </h3>

          <p className="text-[13px] text-[var(--color-text-secondary)] mb-3 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          <div className="flex items-center gap-4 text-[12px] text-[var(--color-text-tertiary)]">
            <span className="flex items-center gap-1">
              <Clock size={12} strokeWidth={1.75} />
              {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} strokeWidth={1.75} />
              {event.location.split(',')[0]}
            </span>
            <span className="flex items-center gap-1">
              <Users size={12} strokeWidth={1.75} />
              {event.attendees}/{event.maxAttendees}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-1 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-accent)] rounded-full transition-all"
                style={{ width: `${fillPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-[var(--color-text-tertiary)] flex-shrink-0">
              {spotsLeft} spots left
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-tertiary)]">
          <Calendar size={12} strokeWidth={1.75} />
          <span>{event.chapter} Chapter</span>
        </div>
        <button
          className={`text-[13px] font-medium px-3.5 py-1.5 rounded-md transition-colors ${
            event.isRsvped
              ? 'bg-neutral-100 text-[var(--color-text-secondary)] hover:bg-neutral-200'
              : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-mid)]'
          }`}
        >
          {event.isRsvped ? 'Attending' : 'RSVP'}
        </button>
      </div>
    </div>
  )
}
