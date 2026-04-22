# Dashboard Page

`index.tsx` assembles the page shell from sub-components in `components/`.

---

## components/DashboardSidebar
Permanent left drawer (248px, hidden on mobile). Contains logo, nav items (Dashboard, My Courses, Video Chunks, Flashcards, Progress, Settings), an "Upgrade to Pro" upsell card, and a "Back to site" link.

## components/DashboardHeader
Sticky top bar. Shows current day/date label, 14-day streak chip, notifications icon, ThemeToggle, and user avatar.

## components/AvailablePlans
Plans section with its own data (`fullPlans`, `subjectPlans`). Renders full plan cards (UG Complete, PG Complete) and subject-wise cards (Anatomy, Pharmacology, Pathology, Medicine).

## components/SectionHeader
Small helper: renders a section title with an optional subtitle and compact-mode variant. Used by `index.tsx` and `AvailablePlans`.

## index.tsx — main content sections

| Section | Description |
|---------|-------------|
| Welcome | Greeting headline + subtitle |
| My Courses | Empty state with icon and CTAs to browse plans |
| AvailablePlans | Delegated to `AvailablePlans` component |
| Continue Learning | Locked card prompting subscription |
| Flashcards Preview | Locked stacked flashcard mockup with blurred background |
