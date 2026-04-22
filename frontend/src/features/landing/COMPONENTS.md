# Landing Page Components

Assembled in `index.tsx` (LandingPage). Each component is a full-width section rendered in the order listed below.

---

## Nav
Sticky top navbar. Desktop shows anchor links (Features, Method, Pricing, FAQ) + theme toggle + "Sign up" CTA routing to `/dashboard`. Mobile collapses into a drawer via hamburger menu.

## Hero
Above-the-fold section. Headline, sub-copy, social proof avatars, and `WaitlistForm` (with role toggle). `NeuralNet` animation renders in the background with mouse-parallax effect.

## TrustBar
Horizontally scrolling marquee of medical institution logos (Hopkins, AIIMS, Mayo, etc.) using the `mediq-marquee` CSS keyframe.

## Features
Grid of feature cards covering the product's core value props: ADHD-friendly methods, video chunks, spaced-rep flashcards, focus timer, progress tracking.

## HowItWorks
Four-step process: Map syllabus → Study in focus sprints → Recall with smart reviews → Track mastery.

## AdhdMethods
Four-pillar ADHD-first design section (Chunked cognition, Dopamine loops, Calm UI, One next action). Includes `CellMitosis` SVG animation in the sidebar on desktop.

## VideoChunks
Demo mockup of the video player showing a chunked lecture (Cranial Nerves, 06:30) and a "today's playlist" with completion states.

## QuizFlashcards
Interactive demo: a flippable flashcard (CSS 3D transform on click) and an MCQ with confidence rating buttons (Again / Hard / Good / Easy).

## ProgressPreview
Dashboard preview showing streak, XP, accuracy stats, a GitHub-style activity heatmap (20 weeks), and subject mastery progress bars.

## Testimonials
Three testimonial cards with quotes, avatars, names, roles, and 5-star aggregate rating (4.9).

## Pricing
Three-tier pricing cards (Free / Pro / PG Premium) with a Monthly ↔ Yearly toggle. Yearly plan shows savings chip. Each card has a feature list and CTA.

## FAQ
Six accordion items covering common questions: ADHD focus, curricula, video vs Anki, import, offline access, discounts.

## FinalCTA
Dark closing section with gradient headline and a second `WaitlistForm` (dark variant). `OrbitParticles` animation renders in the background.

## Footer
Four-column link grid (Product, Exams, Company, Resources) + social icons. Large gradient "Mediq" wordmark at the bottom.
