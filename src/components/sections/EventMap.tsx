import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, Clock, Users } from 'lucide-react'
import type { AICEvent } from '../../types'
import 'leaflet/dist/leaflet.css'

interface EventMapProps {
  events: AICEvent[]
}

const typeLabels: Record<string, string> = {
  salon: 'Salon',
  'demo-night': 'Demo Night',
  hackathon: 'Hackathon',
  workshop: 'Workshop',
  'fireside-chat': 'Fireside Chat',
  meetup: 'Meetup',
}

function createMarkerIcon(isRsvped: boolean) {
  const color = isRsvped ? '#1B4332' : '#065f46'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
    <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.27 21.73 0 14 0z" fill="${color}"/>
    <circle cx="14" cy="13" r="5.5" fill="white"/>
  </svg>`
  return L.divIcon({
    html: svg,
    className: 'custom-marker',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  })
}

function RadiusCircle({ center, radius }: { center: [number, number]; radius: number }) {
  const radiusMeters = radius * 1609.34
  return (
    <Circle
      center={center}
      radius={radiusMeters}
      pathOptions={{
        color: '#1B4332',
        fillColor: '#1B4332',
        fillOpacity: 0.04,
        weight: 1,
        dashArray: '6 4',
      }}
    />
  )
}

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useMemo(() => {
    map.setView(center, zoom, { animate: true })
  }, [map, center, zoom])
  return null
}

export default function EventMap({ events }: EventMapProps) {
  const [radius, setRadius] = useState(50)
  const [selectedEvent, setSelectedEvent] = useState<AICEvent | null>(null)

  const userLocation: [number, number] = [37.7749, -122.4194]

  const hasNY = events.some((e) => e.chapter === 'New York')
  const defaultZoom = hasNY ? 5 : 12
  const defaultCenter: [number, number] = hasNY ? [39.5, -98.0] : userLocation

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-lg overflow-hidden">
      <style>{`
        .custom-marker { background: none !important; border: none !important; }
        .leaflet-popup-content-wrapper { border-radius: 8px; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .leaflet-popup-content { margin: 0; min-width: 240px; }
        .leaflet-popup-tip { display: none; }
        .leaflet-control-zoom { border: 1px solid #e5e5e5 !important; border-radius: 6px !important; overflow: hidden; }
        .leaflet-control-zoom a { width: 32px !important; height: 32px !important; line-height: 32px !important; color: #525252 !important; border-color: #e5e5e5 !important; }
        .leaflet-control-zoom a:hover { background: #fafafa !important; }
      `}</style>

      <div className="relative h-[420px]">
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          className="h-full w-full z-0"
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <MapUpdater center={defaultCenter} zoom={defaultZoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          <RadiusCircle center={userLocation} radius={radius} />

          {events.map((event) => (
            <Marker
              key={event.id}
              position={[event.lat, event.lng]}
              icon={createMarkerIcon(event.isRsvped)}
              eventHandlers={{
                click: () => setSelectedEvent(event),
              }}
            >
              <Popup>
                <div className="p-3">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#1B4332] bg-[#f0fdf4] px-1.5 py-0.5 rounded mb-1.5">
                    {typeLabels[event.type]}
                  </span>
                  <p className="text-[13px] font-semibold text-[#171717] mb-1.5 leading-snug">
                    {event.title}
                  </p>
                  <p className="text-[12px] text-[#525252] mb-2 leading-relaxed line-clamp-2">
                    {event.description}
                  </p>
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#a3a3a3]">
                      <Clock size={11} strokeWidth={2} />
                      <span>
                        {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        · {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#a3a3a3]">
                      <MapPin size={11} strokeWidth={2} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#a3a3a3]">
                      <Users size={11} strokeWidth={2} />
                      <span>
                        {event.attendees}/{event.maxAttendees} attending
                      </span>
                    </div>
                  </div>
                  <button
                    className={`w-full text-[12px] font-medium px-3 py-1.5 rounded-md transition-colors ${
                      event.isRsvped
                        ? 'bg-[#f5f5f5] text-[#525252] hover:bg-[#e5e5e5]'
                        : 'bg-[#1B4332] text-white hover:bg-[#065f46]'
                    }`}
                  >
                    {event.isRsvped ? 'Attending' : 'RSVP'}
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Radius control overlay */}
        <div className="absolute bottom-3 left-3 z-[1000] flex items-center gap-2 bg-white border border-[#e5e5e5] rounded-lg px-3 py-2 shadow-sm">
          <MapPin size={13} strokeWidth={1.75} className="text-[#1B4332] flex-shrink-0" />
          <span className="text-[12px] font-medium text-[#171717]">San Francisco</span>
          <span className="text-[11px] text-[#a3a3a3]">·</span>
          <div className="flex items-center gap-1.5">
            <input
              type="range"
              min={5}
              max={200}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-20 h-1 accent-[#1B4332] cursor-pointer"
            />
            <span className="text-[11px] font-medium text-[#525252] tabular-nums w-[42px]">
              {radius} mi
            </span>
          </div>
        </div>

        {/* Selected event detail */}
        {selectedEvent && (
          <div className="absolute top-3 right-3 z-[1000] bg-white border border-[#e5e5e5] rounded-lg shadow-lg p-3 w-[260px]">
            <div className="flex items-start justify-between mb-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B4332] bg-[#f0fdf4] px-1.5 py-0.5 rounded">
                {typeLabels[selectedEvent.type]}
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-[#a3a3a3] hover:text-[#525252] text-sm leading-none"
              >
                &times;
              </button>
            </div>
            <p className="text-[13px] font-semibold text-[#171717] mb-1 leading-snug">
              {selectedEvent.title}
            </p>
            <p className="text-[11px] text-[#a3a3a3] mb-2">
              {selectedEvent.chapter} Chapter · {selectedEvent.attendees} attending
            </p>
            <button
              className={`w-full text-[12px] font-medium px-3 py-1.5 rounded-md transition-colors ${
                selectedEvent.isRsvped
                  ? 'bg-[#f5f5f5] text-[#525252]'
                  : 'bg-[#1B4332] text-white hover:bg-[#065f46]'
              }`}
            >
              {selectedEvent.isRsvped ? 'Attending' : 'RSVP'}
            </button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2.5 border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1B4332]" />
          <span className="text-[11px] text-[#a3a3a3]">RSVP'd</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#065f46]" />
          <span className="text-[11px] text-[#a3a3a3]">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full border border-dashed border-[#1B4332] bg-[#1B4332]/5" />
          <span className="text-[11px] text-[#a3a3a3]">Search radius</span>
        </div>
        <span className="ml-auto text-[11px] text-[#a3a3a3]">
          {events.length} events shown
        </span>
      </div>
    </div>
  )
}
