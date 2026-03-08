import { useState } from 'react'
import { ArrowRight, BookOpen } from 'lucide-react'
import { resources } from '../../data/mockData'
import ResourceCard from '../cards/ResourceCard'

export default function ResourcesHub() {
  const [activeType, setActiveType] = useState<string>('all')

  const types = ['all', 'guide', 'recording', 'report', 'tool', 'dataset']
  const typeLabels: Record<string, string> = {
    all: 'All',
    guide: 'Guides',
    recording: 'Recordings',
    report: 'Reports',
    tool: 'Tools',
    dataset: 'Datasets',
  }

  const filtered =
    activeType === 'all' ? resources : resources.filter((r) => r.type === activeType)

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BookOpen size={15} strokeWidth={1.75} className="text-[var(--color-text-tertiary)]" />
          <h2 className="text-[15px] font-semibold text-[var(--color-text-primary)]">
            Resources
          </h2>
          <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] bg-neutral-100 px-1.5 py-0.5 rounded">
            Member-only
          </span>
        </div>
        <button className="text-[12px] font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-mid)] flex items-center gap-1 transition-colors">
          Browse All
          <ArrowRight size={12} strokeWidth={2} />
        </button>
      </div>

      <div className="flex items-center gap-1.5 mb-4">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`text-[11px] font-medium px-2 py-1 rounded-md transition-colors ${
              activeType === t
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-neutral-100 text-[var(--color-text-secondary)] hover:bg-neutral-200'
            }`}
          >
            {typeLabels[t]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  )
}
