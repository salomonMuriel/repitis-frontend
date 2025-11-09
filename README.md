# Frontend Technical Documentation

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM v7
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Auth:** Supabase Auth

---

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Card/
│   │   │   ├── CardDisplay.tsx       # Shows card with nueva badge
│   │   │   ├── CardImage.tsx
│   │   │   └── AudioButton.tsx
│   │   ├── Review/
│   │   │   ├── RatingButtons.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── SessionComplete.tsx
│   │   ├── Dashboard/
│   │   │   ├── LevelProgress.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── StreakDisplay.tsx
│   │   ├── Auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       └── Navigation.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Review.tsx
│   │   ├── Levels.tsx
│   │   ├── Settings.tsx
│   │   └── Progress.tsx
│   ├── hooks/
│   │   ├── useCardReview.ts
│   │   ├── useAuth.ts
│   │   ├── useProgress.ts
│   │   └── useAudio.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── supabase.ts
│   ├── store/
│   │   └── authStore.ts
│   ├── types/
│   │   ├── card.ts                   # CardResponse with is_new, TodayStats
│   │   ├── review.ts
│   │   └── user.ts
│   ├── utils/
│   │   ├── animations.ts
│   │   └── constants.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   ├── images/
│   │   ├── level-1/
│   │   ├── level-2/
│   │   └── ...
│   └── audio/
│       ├── level-1/
│       ├── level-2/
│       └── ...
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── .env.example
```

---

## Architecture Overview

### Component-Based Architecture

1. **Pages** (`pages/`)
   - Top-level route components
   - Orchestrate data fetching
   - Compose smaller components

2. **Components** (`components/`)
   - Reusable UI components
   - Organized by feature/domain
   - Presentational and container components

3. **Hooks** (`hooks/`)
   - Custom React hooks for logic reuse
   - Data fetching hooks
   - Business logic abstraction

4. **Services** (`services/`)
   - API client implementation
   - External service integrations
   - Authentication setup

5. **Store** (`store/`)
   - Global state management (Zustand)
   - Auth state, user preferences

6. **Types** (`types/`)
   - TypeScript type definitions
   - Shared interfaces

---

## Code Guidelines

### General Principles

- **TypeScript First:** Always define types/interfaces
- **Component Organization:** One component per file
- **Custom Hooks:** Extract reusable logic into hooks
- **Composition:** Prefer composition over prop drilling
- **Performance:** Use React.memo, useMemo, useCallback judiciously

### Naming Conventions

- **Components:** PascalCase (e.g., `CardDisplay.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useCardReview.ts`)
- **Types:** PascalCase with descriptive names (e.g., `CardProgress`)
- **Constants:** UPPER_SNAKE_CASE in `utils/constants.ts`

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react'
import { ComponentProps } from '@/types'

// 2. Types/Interfaces
interface Props {
  data: string
}

// 3. Component
export function Component({ data }: Props) {
  // Hooks
  const [state, setState] = useState()

  // Handlers
  const handleClick = () => {}

  // Render
  return <div>{data}</div>
}
```

### State Management

- **Local State:** `useState` for component-specific state
- **Shared State:** Zustand stores for cross-component state
- **Server State:** React Query for API data
- **Form State:** Controlled components or React Hook Form

---

## Core Features

### Card Review Flow

1. Fetch due cards from API (backend returns `is_new` flag)
2. Display card with "Nueva" badge if first-time card
3. User flips card → audio plays immediately
4. User rates difficulty (1-4)
5. Submit review, refetch today's stats from backend
6. Show next card or completion screen with stats

### Authentication

- Supabase Auth integration
- JWT token management
- Protected routes
- Session persistence

### Data Fetching

- React Query for caching and synchronization
- Optimistic updates for better UX
- Stale-while-revalidate strategy
- Background refetching
- **Today's stats**: Fetched from backend (`GET /api/v1/stats/today`) for real-time session tracking
  - `new_cards_today` and `total_reviews_today` displayed in progress bar
  - Refetches after each review

### Animations

- Framer Motion for smooth transitions
- Card flip animations
- Page transitions
- Micro-interactions on buttons

### UI Patterns

- **"Nueva" Badge**: Green badge with sparkle icon on new cards
  - Shows in top-right corner of card
  - Animated entrance with spring physics
  - Only displays when `card.is_new === true`
- **Immediate Audio Playback**: Audio plays instantly on card flip (no delay)
- **Stats Display**: Shows "Nuevas hoy: X | Total hoy: Y" fetched from backend

---

## Audio Strategy

### Recommended: Pre-recorded Audio

**Advantages:**
- Consistent, high-quality pronunciation
- Works offline (PWA)
- No API dependencies
- Fast playback

**Implementation:**
- Record with native Spanish speaker
- Edit in Audacity
- Export as MP3 (or WebM for smaller size)
- Store in `public/audio/level-{id}/{content}.mp3`
- Preload next card's audio for instant playback

### Alternative: Web Speech API

For prototyping or low-budget scenarios:
- Browser built-in TTS
- Spanish voice support
- Adjustable rate for kids
- No file storage needed

---

## Image Strategy

### Recommended: Illustrated Icon Set

**Options:**
1. **Flaticon/Freepik** - Purchase children-themed icon pack
2. **Custom Illustrations** - Commission from Fiverr/Upwork
3. **AI-Generated** - DALL-E with consistent style prompts

**Requirements:**
- Colorful, child-friendly style
- Consistent art style across all cards
- Clear visual representation
- Optimized for web (WebP format)

**File Organization:**
```
public/images/
  level-1/
    a.webp
    e.webp
  level-2/
    ma.webp
    me.webp
```

---

## Performance Optimization

### Image Optimization
- Convert to WebP format
- Lazy load images with native `loading="lazy"`
- Use appropriate image sizes
- Implement responsive images

### Code Splitting
- Route-based code splitting (automatic with Vite)
- Dynamic imports for heavy components
- Lazy load non-critical features

### Caching Strategy
- React Query cache configuration
- Service Worker for offline support (PWA)
- Preload critical resources

### Bundle Size
- Tree-shake unused dependencies
- Analyze bundle with `vite-bundle-visualizer`
- Minimize third-party dependencies

---

## Accessibility

### Keyboard Navigation
- Space bar to flip cards
- Numbers 1-4 for rating buttons
- Tab navigation for all interactive elements
- Escape to exit review session

### Screen Readers
- Semantic HTML elements
- ARIA labels for interactive components
- Announce card changes
- Status updates for reviews

### Visual Accessibility
- High contrast mode support
- Adjustable font sizes
- Focus indicators
- Color-blind friendly color schemes

---

## PWA Configuration

### Features
- Offline support for reviewed cards
- Install to home screen
- Background sync for reviews
- Push notifications (future: daily reminders)

### Service Worker
- Cache static assets
- Cache API responses
- Offline fallback page

### Manifest
- App name and icons
- Theme colors
- Display mode (standalone)
- Start URL

---

## Testing Strategy

### Unit Tests (Vitest)
- Component rendering
- Hook behavior
- Utility functions
- Type safety

### Integration Tests
- User flows (login, review session)
- API integration
- State management

### E2E Tests (Playwright)
- Critical user paths
- Cross-browser testing
- Accessibility testing

---

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_URL=http://localhost:8000
```

---

## Deployment

### Recommended: Vercel

**Advantages:**
- Automatic deployments from Git
- Edge network CDN
- Preview deployments for PRs
- Zero configuration for Vite

**Setup:**
```bash
npm install -g vercel
vercel --prod
```

### Alternative: Netlify

- Similar features to Vercel
- Drag-and-drop deployment
- Form handling
- Serverless functions

### Build Command
```bash
npm run build
```

Output: `dist/` directory

---

## Setup Instructions

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm run dev
```

Visit `http://localhost:5173` to see the app!

---

## Design System

### Colors
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Orange (#F59E0B)
- Error: Red (#EF4444)
- Neutral: Gray scale

### Typography
- Headings: Bold, large sizes for readability
- Body: Clear, legible font
- Card content: Very large (8xl) for learning

### Spacing
- Consistent spacing scale (Tailwind default)
- Generous padding for touch targets
- Clear visual hierarchy
