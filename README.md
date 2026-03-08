# The AI Collective — Member Dashboard

A single-page member dashboard for **The AI Collective (AIC)**, a global AI professional network with 31,400+ members across 24 chapters worldwide. Built as a prototype front-end with React, TypeScript, and Tailwind CSS.

## Overview

The dashboard gives AIC members a unified portal to discover events, explore career opportunities, browse resources, connect with chapters, and view partner spotlights — all from a clean, collapsible sidebar layout.

## Features

- **Events** — Browse and filter upcoming salons, hackathons, demo nights, workshops, and fireside chats. Includes an interactive Leaflet map.
- **Resources Hub** — Guides, recordings, reports, tools, and datasets curated for AI practitioners.
- **Career Opportunities** — Job board surfacing 127+ open positions across partner companies (remote, hybrid, onsite).
- **Chapters** — Directory of 24 global chapters with member counts, organizer info, and recent announcements.
- **Partners** — Partner company spotlights with hiring status and resource counts.
- **Profile Completion** — Inline widget tracking profile completeness.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Map | Leaflet + react-leaflet |
| Font | Inter (Google Fonts) |
| Linting | ESLint 9 + typescript-eslint |

All data is currently mocked in `src/data/mockData.ts` — there is no backend or API integration.

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx        # Collapsible left nav
│   │   └── TopBar.tsx         # Fixed top bar
│   ├── sections/
│   │   ├── EventDiscovery.tsx
│   │   ├── ResourcesHub.tsx
│   │   ├── CareerOpportunities.tsx
│   │   ├── ChapterActivity.tsx
│   │   ├── PartnerSpotlight.tsx
│   │   └── ProfileCompletion.tsx
│   ├── cards/
│   │   ├── EventCard.tsx
│   │   ├── JobCard.tsx
│   │   ├── ChapterCard.tsx
│   │   ├── ResourceCard.tsx
│   │   └── PartnerCard.tsx
│   └── AICLogo.tsx
├── data/
│   └── mockData.ts            # All mock data
├── types/
│   └── index.ts               # Core domain types
├── App.tsx
└── main.tsx
```

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

### Other Scripts

```bash
npm run build      # TypeScript compile + Vite production build
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

## Status

This is an early-stage prototype (`v0.0.0`). Navigation is scroll-based (no router). All content is mocked — no backend, auth, or API calls are wired up yet.
