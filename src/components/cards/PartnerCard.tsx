import { ExternalLink, BookOpen } from 'lucide-react'
import type { Partner } from '../../types'

interface PartnerCardProps {
  partner: Partner
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-lg p-4 hover:border-neutral-300 transition-colors group">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-md bg-neutral-100 border border-[var(--color-border)] flex items-center justify-center flex-shrink-0">
          <span className="text-[12px] font-bold text-[var(--color-text-secondary)]">
            {partner.logo}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-[14px] font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
              {partner.name}
            </h4>
            {partner.isHiring && (
              <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                Hiring
              </span>
            )}
          </div>
          <p className="text-[12px] text-[var(--color-text-tertiary)] mt-0.5">
            Partner since {new Date(partner.partnerSince + '-01T00:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>

      <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed mb-3">
        {partner.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
        <span className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-tertiary)]">
          <BookOpen size={11} strokeWidth={1.75} />
          {partner.resourceCount} resources
        </span>
        <a
          href={partner.url}
          className="flex items-center gap-1 text-[12px] font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-mid)] transition-colors"
        >
          View
          <ExternalLink size={11} strokeWidth={2} />
        </a>
      </div>
    </div>
  )
}
