import { MapPin, ExternalLink } from 'lucide-react'
import type { Job } from '../../types'

const typeColors: Record<string, string> = {
  remote: 'text-blue-700 bg-blue-50',
  hybrid: 'text-amber-700 bg-amber-50',
  onsite: 'text-neutral-600 bg-neutral-100',
}

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  const daysAgo = Math.floor(
    (Date.now() - new Date(job.postedDate + 'T00:00:00').getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="flex items-start gap-3.5 py-3.5 px-4 border-b border-[var(--color-border)] last:border-b-0 hover:bg-neutral-50/50 transition-colors group">
      <div className="w-9 h-9 rounded-md bg-neutral-100 border border-[var(--color-border)] flex items-center justify-center flex-shrink-0">
        <span className="text-[11px] font-bold text-[var(--color-text-secondary)]">
          {job.companyLogo}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="text-[13px] font-medium text-[var(--color-text-primary)] truncate group-hover:text-[var(--color-accent)] transition-colors">
              {job.role}
            </h4>
            <p className="text-[12px] text-[var(--color-text-secondary)]">{job.company}</p>
          </div>
          <a
            href={job.applyUrl}
            className="flex-shrink-0 text-[12px] font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-mid)] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Apply
            <ExternalLink size={11} strokeWidth={2} />
          </a>
        </div>

        <div className="flex items-center gap-2 mt-1.5">
          <span className="flex items-center gap-1 text-[11px] text-[var(--color-text-tertiary)]">
            <MapPin size={10} strokeWidth={2} />
            {job.location}
          </span>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${typeColors[job.type]}`}>
            {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
          </span>
          <span className="text-[11px] text-[var(--color-text-tertiary)] ml-auto">
            {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-[var(--color-text-tertiary)] bg-neutral-50 border border-[var(--color-border)] px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
