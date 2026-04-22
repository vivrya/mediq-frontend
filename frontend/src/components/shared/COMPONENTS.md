# Shared Components

Reusable across multiple pages and features.

---

## Logo
Renders the Mediq brand mark: a blue square icon with a `+` symbol and green dot, followed by the "Mediq" wordmark. Wrapped in a link to `#top`. Used in Nav, Footer, and Dashboard sidebar.

## ThemeToggle
An icon button that toggles between light and dark mode. Reads and updates state via `useColorMode()` from `@/providers/ThemeProvider`. Displays a sun or moon icon depending on the current mode.

## WaitlistForm
Email signup form with optional role selector (UG student / PG aspirant / Curious). Fetches the current waitlist count on mount and posts to the API on submit. Props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `source` | string | `"hero"` | Tracks which CTA triggered the signup |
| `dark` | boolean | `false` | Dark-background color variant |
| `showRole` | boolean | `true` | Show/hide the role toggle |
| `ctaLabel` | string | `"Request early access"` | Submit button text |
| `testIdPrefix` | string | `"waitlist"` | Prefix for all `data-testid` attributes |

API calls are delegated to `@/services/waitlist`.
