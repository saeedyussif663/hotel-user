# Hotel Guest Frontend — Project Guide

## Overview

A hotel guest-facing website built with React + Vite + TypeScript. The landing page (`/`) is complete. The next phase is the authenticated guest portal (bookings, profile, dashboard).

---

## Tech Stack

| Purpose | Library |
|---|---|
| Framework | React 19 |
| Bundler | Vite 8 |
| Language | TypeScript 6 |
| Routing | react-router 7 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn (Radix-based) |
| Icons | @phosphor-icons/react |
| Animations | framer-motion 12 |
| Font | Inter Variable (@fontsource-variable/inter) |

---

## Project Structure

```
src/
├── components/
│   ├── home/                   # Landing page sections (one file per section)
│   │   ├── announcement-bar.tsx
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   ├── rooms.tsx
│   │   ├── amenities.tsx
│   │   ├── experience.tsx
│   │   ├── testimonials.tsx
│   │   ├── cta-banner.tsx
│   │   └── footer.tsx
│   └── ui/                     # shadcn + custom base components
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── separator.tsx
│       └── section-badge.tsx   # custom — the pill used above section headings
├── pages/
│   └── home.tsx                # composes all home/ components, nothing else
├── router.ts
├── main.tsx
└── index.css                   # CSS variables + Tailwind config
```

---

## Design Rules

### No gradients
All section backgrounds are solid colors. Never use `bg-gradient-*`.

### Alternating section backgrounds
Follow this order down the page:
`bg-background` → `bg-muted` → `bg-background` → `bg-muted` → `bg-primary` (CTA) → `bg-background` (footer)

### Layout
- Every section uses `max-w-7xl mx-auto px-6` as its container.
- Section vertical padding is `py-24`. Hero uses `pt-8 pb-24`.
- Every section with a nav anchor needs `scroll-mt-16` to clear the sticky navbar.

### Colors (defined in `index.css` with OKLCH)
- **Primary**: `oklch(0.55 0.22 255)` — blue. Used for buttons, badges, highlights.
- **Background**: white
- **Muted**: light grey — alternating section background
- Dark mode is defined and activates with the `.dark` class on a parent element.

### Typography
- Font: Inter Variable, applied globally.
- Section headings: `text-4xl font-bold tracking-tight`
- Hero heading: `text-5xl` → `text-7xl` (responsive)
- Body / secondary text: `text-muted-foreground leading-relaxed`

---

## Component Conventions

### Icons — always use Phosphor
Never write raw `<svg>` paths. Import from `@phosphor-icons/react`.

```tsx
import { Buildings, Star, ForkKnife } from '@phosphor-icons/react';

<Star size={16} weight="fill" className="text-primary" />
```

- `size={16}` = Tailwind `size-4`
- `size={20}` = Tailwind `size-5`
- `weight="regular"` for outlines, `weight="fill"` for solid/filled icons

### UI — always use shadcn components
Never use raw `<input>`, `<button>` etc. Use the shadcn equivalents.
Add new components with: `npx shadcn@latest add <component-name>`

Currently installed: `button`, `badge`, `card`, `input`, `separator`

- `Badge` — for tags and labels (e.g. room tags like "Most Popular")
- `Card` / `CardContent` — for content cards. Use `p-0 gap-0` override when the card starts with a full-width image.
- `Input` — for all text inputs
- `Button` — variants: `default`, `outline`, `ghost`, `secondary`

### Section Badge — use `SectionBadge`, not shadcn `Badge`
`src/components/ui/section-badge.tsx` is a custom component (blue dot + uppercase label pill). Use it at the top of every section, above the heading. It is different from the shadcn `Badge`.

```tsx
import SectionBadge from '@/components/ui/section-badge';
<SectionBadge label="Our Story" />
```

### Animations — Framer Motion
- Hero: `initial` / `animate` (runs on mount)
- All other sections: `whileInView` with `viewport={{ once: true }}`
- Keep motion subtle: `y: 16–24` for fade-ups, `x: 30` for horizontal slides, duration `0.5–0.7s`

Standard section heading animation:
```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
```

Staggered card grids:
```tsx
// variants defined outside component
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

// grid wrapper
<motion.div
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.15 }}
  transition={{ staggerChildren: 0.1 }}
>

// each card
<motion.div
  variants={cardVariants}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  whileHover={{ y: -4, transition: { duration: 0.2 } }}
>
```

### Navbar scroll links
Nav links use plain `<a>` tags with a `scrollIntoView` helper — not react-router `<Link>`. This is intentional: react-router intercepts hash routes and breaks native smooth scroll.

```tsx
function scrollTo(href: string, onClose?: () => void) {
  const el = document.getElementById(href.replace('#', ''));
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  onClose?.();
}
```

Use react-router `<Link>` only for navigating between actual routes.

---

## Landing Page — Completed Sections

| Component | Anchor ID | Background |
|---|---|---|
| AnnouncementBar | — | `bg-primary` |
| Navbar | — | `bg-background` sticky |
| Hero | — | `bg-background` |
| Rooms | `#rooms` | `bg-background` |
| Amenities | `#amenities` | `bg-muted` |
| Experience | `#experience` | `bg-background` |
| Testimonials | — | `bg-muted` |
| CtaBanner | — | `bg-primary` |
| Footer | `#contact` | `bg-background` |

---

## What to Build Next (Guest Portal)

The authenticated side of the app. Suggested pages:

- `/login` — sign in / sign up
- `/dashboard` — overview of upcoming bookings, quick actions
- `/bookings` — browse and book rooms
- `/bookings/:id` — booking detail, manage or cancel
- `/profile` — guest preferences and personal info

### When building the portal
- Keep all the same design tokens, fonts, and component library.
- New shared layout components (sidebar, topbar, page shell) go in `src/components/layout/`, not `src/components/home/`.
- Add shadcn components as needed (`npx shadcn@latest add <name>`).
- Protected routes should be handled via a route guard in `src/router.ts`.
- Use react-router `<Link>` (not `<a>`) for all internal page navigation inside the portal.
