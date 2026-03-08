import { ArrowRight, Briefcase } from 'lucide-react'
import { jobs } from '../../data/mockData'
import JobCard from '../cards/JobCard'

export default function CareerOpportunities() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Briefcase size={15} strokeWidth={1.75} className="text-[var(--color-text-tertiary)]" />
          <h2 className="text-[15px] font-semibold text-[var(--color-text-primary)]">
            Career Opportunities
          </h2>
          <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] bg-neutral-100 px-1.5 py-0.5 rounded">
            {jobs.length} new
          </span>
        </div>
        <button className="text-[12px] font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-mid)] flex items-center gap-1 transition-colors">
          View All Careers
          <ArrowRight size={12} strokeWidth={2} />
        </button>
      </div>

      <div className="bg-white border border-[var(--color-border)] rounded-lg overflow-hidden">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  )
}
