# Mediq — Premium Landing Page PRD

## Original Problem Statement
Design a premium modern landing page UI for a medical education platform called **Mediq**. The platform helps UG and PG medical students prepare smarter using ADHD-friendly learning methods, short video chunks, quizzes, flashcards, progress tracking, and focus-based study experiences.

Brand Style: Clean, premium, modern SaaS · Trustworthy · Minimal clutter · Calm, focused, motivating · Apple + Notion + Duolingo + premium edtech blend.
Palette: Deep blue/teal primary, white/light-grey secondary, green success accent. Dark-mode ready.
Typography: Modern sans-serif, strong readable headings, clean hierarchy.

## User Choices (from `ask_human`)
- Scope: Landing page only (no backend)
- Colour direction: "You pick" → chose Sapphire `#0F52BA` + Emerald `#10B981`
- Dark-mode toggle: Yes
- Sections: Hero, Features, How-it-works, ADHD methods, Video chunks demo, Quiz/Flashcard preview, Progress tracker preview, Testimonials, Pricing, FAQ, CTA, Footer

## Architecture
- React 19 + CRA + Tailwind + Shadcn UI (accordion only used from shadcn)
- `next-themes` class-based dark-mode toggle
- No backend used; route `/` → `Landing`
- Fonts: Outfit (display) + Manrope (body) via Google Fonts
- Custom utility classes (glass, grain, gradient-text, dot-grid, animate-float, animate-marquee) in `src/index.css`

## User Personas
- UG medical student (MBBS Year 1–5)
- PG aspirant (USMLE, NEET PG, PLAB, AMC)
- ADHD / neurodivergent medic seeking calmer study UX

## What's Implemented (2025-12)
- [x] Sticky glass nav with logo, theme toggle, mobile menu
- [x] Hero with floating brand illustration, dual CTA, social proof row
- [x] Trust-bar marquee (simulated medical institutions)
- [x] Features bento grid (ADHD-friendly, Video chunks, Flashcards CSS mock, Focus timer ring, Progress bars)
- [x] How-it-works: 4-step flow
- [x] ADHD methods: 4 pillar cards with sticky intro
- [x] Video chunks: mock player + today's playlist (5 chunks)
- [x] Interactive flashcard flip + MCQ with correct/wrong states + confidence row
- [x] Progress preview: stat cards + activity heatmap + subject mastery bars
- [x] Testimonials: 3 medic stories w/ avatars
- [x] Pricing: Free / Pro (highlighted) / PG Premium, monthly ↔ yearly toggle
- [x] FAQ: shadcn Accordion, 6 items
- [x] Final CTA band + footer with 4 link columns + massive brand text
- [x] Light/dark theme toggle, validated no white-bg leaks in dark mode
- [x] `data-testid` coverage on every interactive element
- [x] Frontend-tested 100% (testing_agent_v3 iteration_1)

## P0/P1/P2 Backlog (deferred)
- [P1] Email waitlist capture → MongoDB + confirmation mailer
- [P1] Signup / onboarding flow
- [P2] Real video demo player with hosted MP4 or HLS
- [P2] CMS-backed testimonials / blog
- [P2] Localisation (EN/HI/AR)
- [P3] Web-analytics + A/B test CTA copy

## Next Action Items
- Decide whether to add a waitlist email capture (P1) to start measuring demand
- Hook pricing CTAs to Stripe Checkout when you're ready to monetise
- Swap placeholder testimonial images for real student photos once you have consent
