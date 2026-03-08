export type EventType = 'salon' | 'demo-night' | 'hackathon' | 'workshop' | 'fireside-chat' | 'meetup'

export interface AICEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  chapter: string
  type: EventType
  attendees: number
  maxAttendees: number
  isRsvped: boolean
  imageUrl?: string
  lat: number
  lng: number
}

export interface Job {
  id: string
  company: string
  companyLogo: string
  role: string
  location: string
  type: 'remote' | 'hybrid' | 'onsite'
  tags: string[]
  postedDate: string
  applyUrl: string
}

export interface Chapter {
  id: string
  name: string
  city: string
  country: string
  memberCount: number
  upcomingEvents: number
  organizer: string
  organizerEmail: string
  recentAnnouncement?: string
}

export interface Resource {
  id: string
  title: string
  description: string
  type: 'recording' | 'guide' | 'report' | 'tool' | 'dataset'
  tags: string[]
  date: string
  url: string
  duration?: string
}

export interface Partner {
  id: string
  name: string
  logo: string
  description: string
  isHiring: boolean
  partnerSince: string
  resourceCount: number
  url: string
}

export interface UserProfile {
  name: string
  email: string
  avatar: string
  chapter: string
  role: string
  joinDate: string
  completionPercent: number
  interests: string[]
  location: string
  travelRadius: number
}

export type NavItem = {
  id: string
  label: string
  icon: string
  href: string
  badge?: number
}
