import { Calendar, TrendingUp, Users, Globe } from 'lucide-react'
import { events, currentUser } from '../data/mockData'
import EventCard from './cards/EventCard'
import ProfileCompletion from './sections/ProfileCompletion'
import EventDiscovery from './sections/EventDiscovery'
import CareerOpportunities from './sections/CareerOpportunities'
import ChapterActivity from './sections/ChapterActivity'
import ResourcesHub from './sections/ResourcesHub'
import PartnerSpotlight from './sections/PartnerSpotlight'

const stats = [
  { label: 'Upcoming Events', value: '5', subtext: 'in your area', icon: Calendar },
  { label: 'Open Positions', value: '127', subtext: 'across partners', icon: TrendingUp },
  { label: 'Active Chapters', value: '24', subtext: 'worldwide', icon: Globe },
  { label: 'Members', value: '31.4k', subtext: 'global network', icon: Users },
]

export default function Dashboard() {
  const rsvpedEvents = events.filter((e) => e.isRsvped)

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Stats row */}
      <div id="section-home" className="scroll-mt-[72px] grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white border border-[var(--color-border)] rounded-lg px-4 py-3.5"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-medium text-[var(--color-text-tertiary)]">
                  {stat.label}
                </span>
                <Icon size={14} strokeWidth={1.75} className="text-[var(--color-text-tertiary)]" />
              </div>
              <p className="text-[22px] font-semibold text-[var(--color-text-primary)] leading-none">
                {stat.value}
              </p>
              <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1">{stat.subtext}</p>
            </div>
          )
        })}
      </div>

      {/* Quick access: upcoming RSVPs + profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-[var(--color-border)] rounded-lg">
            <div className="px-4 py-3 border-b border-[var(--color-border)]">
              <h3 className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                Your Upcoming Events
              </h3>
              <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">
                Events you've RSVP'd to · {currentUser.chapter}
              </p>
            </div>
            <div>
              {rsvpedEvents.length > 0 ? (
                rsvpedEvents.map((event) => (
                  <div key={event.id} className="px-1">
                    <EventCard event={event} variant="compact" />
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-[13px] text-[var(--color-text-tertiary)]">
                    No upcoming RSVPs. Browse events below to get started.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <ProfileCompletion />
        </div>
      </div>

      {/* Main sections — order matches sidebar nav */}
      <div className="space-y-10">
        <div id="section-events" className="scroll-mt-[72px]">
          <EventDiscovery />
        </div>

        <div id="section-resources" className="scroll-mt-[72px]">
          <ResourcesHub />
        </div>

        <div id="section-careers" className="scroll-mt-[72px]">
          <CareerOpportunities />
        </div>

        <div id="section-chapters" className="scroll-mt-[72px]">
          <ChapterActivity />
        </div>

        <div id="section-partners" className="scroll-mt-[72px]">
          <PartnerSpotlight />
        </div>
      </div>
    </div>
  )
}
