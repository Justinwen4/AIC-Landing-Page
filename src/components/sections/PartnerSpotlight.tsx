import { ArrowRight, Handshake } from 'lucide-react'
import { partners } from '../../data/mockData'
import PartnerCard from '../cards/PartnerCard'

export default function PartnerSpotlight() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Handshake size={15} strokeWidth={1.75} className="text-[var(--color-text-tertiary)]" />
          <h2 className="text-[15px] font-semibold text-[var(--color-text-primary)]">
            Partner Spotlight
          </h2>
        </div>
        <button className="text-[12px] font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-mid)] flex items-center gap-1 transition-colors">
          All Partners
          <ArrowRight size={12} strokeWidth={2} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </section>
  )
}
