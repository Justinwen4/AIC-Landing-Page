import { FileText, Video, BarChart3, Wrench, Database, ArrowUpRight } from 'lucide-react'
import type { Resource } from '../../types'

const typeConfig: Record<string, { icon: typeof FileText; label: string }> = {
  guide: { icon: FileText, label: 'Guide' },
  recording: { icon: Video, label: 'Recording' },
  report: { icon: BarChart3, label: 'Report' },
  tool: { icon: Wrench, label: 'Tool' },
  dataset: { icon: Database, label: 'Dataset' },
}

interface ResourceCardProps {
  resource: Resource
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const config = typeConfig[resource.type]
  const Icon = config.icon
  const date = new Date(resource.date + 'T00:00:00')
  const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <a
      href={resource.url}
      className="block bg-white border border-[var(--color-border)] rounded-lg p-4 hover:border-neutral-300 transition-colors group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-md bg-neutral-50 border border-[var(--color-border)] flex items-center justify-center">
          <Icon size={15} strokeWidth={1.75} className="text-[var(--color-text-secondary)]" />
        </div>
        <ArrowUpRight
          size={14}
          strokeWidth={2}
          className="text-[var(--color-text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
          {config.label}
        </span>
        {resource.duration && (
          <span className="text-[10px] text-[var(--color-text-tertiary)]">· {resource.duration}</span>
        )}
      </div>

      <h4 className="text-[13px] font-semibold text-[var(--color-text-primary)] mb-1 leading-snug group-hover:text-[var(--color-accent)] transition-colors">
        {resource.title}
      </h4>

      <p className="text-[12px] text-[var(--color-text-tertiary)] line-clamp-2 mb-3 leading-relaxed">
        {resource.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {resource.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-[var(--color-text-tertiary)] bg-neutral-50 border border-[var(--color-border)] px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-[11px] text-[var(--color-text-tertiary)]">{formatted}</span>
      </div>
    </a>
  )
}
