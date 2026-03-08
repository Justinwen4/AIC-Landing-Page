import { ArrowRight, MapPin } from 'lucide-react'
import { chapters, currentUser } from '../../data/mockData'
import ChapterCard from '../cards/ChapterCard'

export default function ChapterActivity() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin size={15} strokeWidth={1.75} className="text-[var(--color-text-tertiary)]" />
          <h2 className="text-[15px] font-semibold text-[var(--color-text-primary)]">
            Chapter Activity
          </h2>
        </div>
        <button className="text-[12px] font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-mid)] flex items-center gap-1 transition-colors">
          All Chapters
          <ArrowRight size={12} strokeWidth={2} />
        </button>
      </div>

      <div className="space-y-3">
        {chapters.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            isUserChapter={chapter.city === currentUser.chapter}
          />
        ))}
      </div>
    </section>
  )
}
