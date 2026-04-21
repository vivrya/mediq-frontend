# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn start        # Dev server on port 3000 (Craco)
yarn build        # Production build
yarn test         # Run tests in watch mode
```

## Architecture

**Stack:** React 19 + TypeScript, React Router v7, Material-UI v6, Tailwind CSS v3, Craco (CRA customization)

**Two routes:**
- `/` — Marketing landing page (multiple scroll sections)
- `/dashboard` — App dashboard with sidebar navigation

**Key directories:**
- `src/components/mediq/` — Landing page sections (Hero, Features, Pricing, FAQ, etc.) and SVG animations (`animations/`)
- `src/components/ui/` — 48+ shadcn-based primitive components (Radix UI wrappers)
- `src/pages/` — Full pages (Dashboard.tsx)
- `src/theme.ts` — MUI theme builder (`buildTheme()`) with light/dark palettes
- `src/lib/utils.js` — `cn()` class merging utility

## Dual Styling System

The codebase uses **both** Tailwind CSS and MUI simultaneously:
- MUI components styled via `buildTheme()` in `src/theme.ts` (emotion-based)
- shadcn/Radix primitives styled via Tailwind with CSS variables
- Use `cn()` (from `src/lib/utils.js`) to merge Tailwind classes
- Path alias `@/*` maps to `src/*`

**Theme:** Sapphire primary (`#0F52BA`), Emerald secondary (`#10B981`). Fonts: Outfit (headings), Manrope (body). Dark mode toggled via `AppThemeProvider` Context, persisted to `localStorage` key `mediq-theme`.

## API Pattern

Axios with `process.env.REACT_APP_BACKEND_URL + "/api"` as base. No React Query — manual loading state with `useState`. Use an `alive` flag to prevent setState after unmount:

```ts
let alive = true;
useEffect(() => {
  axios.get('/api/...').then(res => { if (alive) setState(res.data); });
  return () => { alive = false; };
}, []);
```

## State Management

Local `useState` + React hooks only. No Redux. Context API used only for theme (`AppThemeProvider`). Forms use `react-hook-form` + Zod validation.

## Component Conventions

- TypeScript interfaces for all props
- `data-testid` attributes throughout in kebab-case (e.g., `hero-badge`, `waitlist-email`, `dash-nav-*`) — preserve these for E2E tests
- WaitlistForm accepts `source`, `dark`, `showRole`, `ctaLabel` props and is reused across landing sections
- Icons from `@mui/icons-material` (MUI components) and `lucide-react` (shadcn components)
