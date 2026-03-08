import { Users, Calendar, Mail, Megaphone } from 'lucide-react'
import type { Chapter } from '../../types'

interface ChapterCardProps {
  chapter: Chapter
  isUserChapter?: boolean
}

export default function ChapterCard({ chapter, isUserChapter }: ChapterCardProps) {
  return (
    <div
      className={`bg-white border rounded-lg p-4 transition-colors ${
        isUserChapter
          ? 'border-[var(--color-accent)]/20 ring-1 ring-[var(--color-accent)]/5'
          : 'border-[var(--color-border)] hover:border-neutral-300'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-[14px] font-semibold text-[var(--color-text-primary)]">
              {chapter.name}
            </h4>
            {isUserChapter && (
              <span className="text-[10px] font-medium text-[var(--color-accent)] bg-[var(--color-accent-light)] px-1.5 py-0.5 rounded">
                Your Chapter
              </span>
            )}
          </div>
          <p className="text-[12px] text-[var(--color-text-tertiary)] mt-0.5">
            {chapter.city}, {chapter.country}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-secondary)]">
          <Users size={12} strokeWidth={1.75} className="text-[var(--color-text-tertiary)]" />
          {chapter.memberCount.toLocaleString()} members
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-secondary)]">
          <Calendar size={12} strokeWidth={1.75} className="text-[var(--color-text-tertiary)]" />
          {chapter.upcomingEvents} upcoming
        </div>
      </div>

      {chapter.recentAnnouncement && (
        <div className="bg-neutral-50 rounded-md p-2.5 mb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Megaphone size={11} strokeWidth={1.75} className="text-[var(--color-text-tertiary)]" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              Latest
            </span>
          </div>
          <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed">
            {chapter.recentAnnouncement}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-tertiary)]">
          <Mail size={11} strokeWidth={1.75} />
          {chapter.organizer}
        </div>
        <button className="text-[12px] font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-mid)] transition-colors">
          View Chapter
        </button>
      </div>
    </div>
  )
}
