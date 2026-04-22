# Dashboard Page

Single file: `index.tsx`. Full authenticated app shell.

---

## Layout
Permanent sidebar (248px, hidden on mobile) + main content area with sticky header.

## Sidebar
- Logo at top
- Navigation: Dashboard, My Courses, Video Chunks, Flashcards, Progress, Settings (each with icon + `data-testid`)
- "Upgrade to Pro" upsell card at bottom
- "Back to site" link → `/`

## Header (sticky)
- Current day + date label (MONDAY · DAY 14)
- Streak chip (14-day)
- Notifications icon
- ThemeToggle
- User avatar

## Main Content Sections

| Section | Description |
|---------|-------------|
| Welcome | Greeting headline + subtitle |
| My Courses | Empty state with icon and CTA to browse plans |
| Available Plans — Full | UG Complete ($12/mo) and PG Complete ($29/mo) cards |
| Available Plans — Subject-wise | Anatomy, Pharmacology, Pathology, Medicine cards with chapter counts and prices |
| Continue Learning | Locked card prompting subscription |
| Flashcards Preview | Locked stacked flashcard mockup |

## Helper Component
`SectionHeader` — renders a section title with an optional subtitle. Used for all content section headings within the dashboard.
