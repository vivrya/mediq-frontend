export const HERO = {
  badge: "NEW · ADHD-FOCUSED ENGINE",
  headline: "Study medicine the way your",
  headlineAccent: "brain actually learns.",
  description:
    "Mediq turns the entire UG & PG syllabus into bite-sized video chunks, adaptive flashcards and focus sprints — engineered for ADHD minds, loved by every medic.",
  secondaryCta: "Or watch the 60-sec demo",
  socialProofCount: "12,400+",
  socialProofText: "students preparing with Mediq",
  floatingCardLabel: "Today",
  floatingCardStat: "+248 XP · Streak 14🔥",
  recallLabel: "RECALL",
  recallValue: "94%",
  imgAlt: "Focused neural network illustrating ADHD-friendly learning",
};

export const NAV = {
  links: [
    { label: "Features", href: "#features" },
    { label: "Method", href: "#method" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: "Sign up",
};

export const TRUST_BAR = {
  label: "Trusted by students at top medical institutions",
  institutions: ["Hopkins Med", "Kings College", "AIIMS", "Mayo Learn", "Cleveland", "Karolinska"],
};

export const FEATURES = {
  badge: "WHY MEDIQ",
  heading: "A learning stack built for the medical marathon.",
  description:
    "Seven years of syllabus. Millions of facts. One calm system that keeps your focus, memory and momentum high.",
  adhdCard: {
    title: "ADHD-friendly methods, by default",
    description:
      "Every module is chunked into 3–7 minute micro-lessons, gamified with streaks and dopamine loops, and paced with focus timers so your brain never gets bored — or burned out.",
    stats: [
      { key: "3–7 min", value: "Micro-lessons" },
      { key: "25/5", value: "Focus sprints" },
      { key: "Daily", value: "Dopamine loops" },
    ],
  },
  videoCard: {
    title: "Video chunks, not lectures",
    description: "Binge-worthy clips that fit between classes, commutes and coffee.",
  },
  flashcardCard: {
    title: "Spaced-repetition flashcards",
    description: "Proven to cut recall failures in half. Our engine adapts to your forgetting curve.",
  },
  focusCard: {
    title: "Focus mode",
    description: "Distraction-free sessions with ambient cues.",
    timerDisplay: "17:32",
    timerLabel: "DEEP WORK",
  },
  progressCard: {
    title: "Progress you can feel",
    description: "Streaks, XP, mastery heatmaps — know exactly where to sharpen next.",
  },
};

export const HOW_IT_WORKS = {
  badge: "HOW IT WORKS",
  heading: "Four steps. Zero overwhelm.",
  description:
    "We designed Mediq around how focused attention actually works — short loops, fast feedback, frequent wins.",
  steps: [
    { title: "Map your syllabus", body: "Pick UG or PG, your exam, and your pace. Mediq builds a personal curriculum in under 60 seconds." },
    { title: "Study in focus sprints", body: "3–7 minute video chunks, interactive notes and micro-quizzes. One concept at a time." },
    { title: "Recall with smart reviews", body: "Our spaced-repetition engine resurfaces exactly what you're about to forget." },
    { title: "Track mastery, stay motivated", body: "Streaks, XP and mastery maps turn daily study into visible, rewarding progress." },
  ],
};

export const ADHD_METHODS = {
  badge: "ADHD-FIRST DESIGN",
  heading: "Built with neurodivergent medics, not around them.",
  description:
    "Traditional textbooks weren't built for variable focus. Mediq is engineered on four science-backed principles — so attention, motivation and memory finally work",
  descriptionEmphasis: "for",
  descriptionSuffix: "you.",
  statValue: "63% more study minutes per week",
  statCaption: "Reported by Mediq beta users after 30 days.",
  pillars: [
    { title: "Chunked cognition", body: "Lessons under 7 minutes match a distractible attention span — without losing depth." },
    { title: "Dopamine loops", body: "Micro-rewards after every task keep motivation high and shame spirals out." },
    { title: "Calm, predictable UI", body: "No flashy noise. A quiet, structured interface so your brain can finally rest and learn." },
    { title: "One next action", body: "You always know the single most important thing to do next — never a blank page." },
  ],
};

export const VIDEO_CHUNKS = {
  badge: "SHORT VIDEO CHUNKS",
  heading: "Finish a topic before your coffee cools.",
  description:
    "Every chunk is timed, transcribed and attached to a 20-second quick recall. Perfect for hospital breaks and subway commutes.",
  liveBadge: "● LIVE CHUNK",
  featuredDuration: "06:30",
  featuredTag: "ANATOMY · UG",
  featuredTitle: "Cranial Nerves Mnemonic Chunk",
  playlistTitle: "Today's playlist",
  playlistMeta: "5 chunks · 27 min",
  chunks: [
    { duration: "04:12", title: "The Renin-Angiotensin System", tag: "Cardio · PG", done: true },
    { duration: "06:30", title: "Cranial Nerves Mnemonic Chunk", tag: "Anatomy · UG", done: true, active: true },
    { duration: "03:48", title: "Acid-base Disorders in 4 minutes", tag: "Physio · PG" },
    { duration: "05:22", title: "ECG: From Rhythm to Diagnosis", tag: "Cardio · UG" },
    { duration: "07:00", title: "Antibiotics: Cell wall inhibitors", tag: "Pharma · PG" },
  ],
};

export const QUIZ_FLASHCARDS = {
  badge: "QUIZZES & FLASHCARDS",
  heading: "Active recall, rendered beautifully.",
  description:
    "Tap to flip. Rate your confidence. Mediq schedules the next review at the perfect moment — never too early, never too late.",
  bullets: [
    "Thousands of exam-style MCQs",
    "Auto-generated from lecture chunks",
    "Confidence-weighted spaced repetition",
  ],
  flashcard: {
    label: "FLASHCARD",
    subject: "MICROBIOLOGY · 1 / 24",
    tapHint: "Tap to flip",
    question: "What is the mechanism of action of penicillin?",
    dueLabel: "Due today",
    difficultyLabel: "· Easy",
    answerLabel: "ANSWER",
    answer:
      "Inhibits bacterial cell-wall synthesis by binding penicillin-binding proteins and blocking peptidoglycan cross-linking.",
    tags: ["β-lactam", "Bactericidal"],
  },
  confidenceButtons: ["Again", "Hard", "Good", "Easy"],
  mcq: {
    label: "MCQ · PHARMACOLOGY",
    counter: "Q 7 / 20",
    question: "Penicillins exert their antibacterial effect by which of the following mechanisms?",
    choices: [
      { id: "a", text: "Inhibits DNA gyrase" },
      { id: "b", text: "Blocks 50S ribosomal subunit" },
      { id: "c", text: "Inhibits cell-wall peptidoglycan synthesis", correct: true },
      { id: "d", text: "Inhibits dihydrofolate reductase" },
    ],
    feedbackMessage: "Logged. Next review in 2 days.",
  },
};

export const PROGRESS_PREVIEW = {
  badge: "PROGRESS TRACKER",
  heading: "The dashboard that keeps you coming back.",
  description:
    "No anxiety-inducing red dots. Just clear signal on what you've mastered, what's fading, and what's next.",
  stats: [
    { label: "CURRENT STREAK", value: "14 days" },
    { label: "TOTAL XP", value: "24,820" },
    { label: "AVG ACCURACY", value: "88%" },
    { label: "THIS WEEK", value: "6h 42m" },
  ],
  activityTitle: "Study activity · last 20 weeks",
  activityLegend: "Less → More",
  masteryTitle: "Subject mastery",
  subjects: [
    { name: "Anatomy", pct: 82 },
    { name: "Physiology", pct: 68 },
    { name: "Pharmacology", pct: 54 },
    { name: "Pathology", pct: 41 },
  ],
};

export const TESTIMONIALS = {
  badge: "LOVED BY MEDICS",
  heading: "Students who once gave up on apps keep coming back.",
  ratingValue: "4.9",
  ratingCount: "1,280 reviews",
  items: [
    {
      quote: "I've tried Anki, YouTube, textbooks. Mediq is the first tool that actually holds my attention long enough for the dopamine to kick in. My PG prep feels calm now.",
      name: "Dr. Aanya Rao",
      role: "PG Internal Medicine · Mumbai",
    },
    {
      quote: "The chunked videos are genius. I finish a topic during my break and the quiz right after makes it stick. Finally a tool built for how I study, not against me.",
      name: "Ibrahim Khalid",
      role: "MBBS 3rd Year · Kings College",
    },
    {
      quote: "As someone with ADHD, every other app added friction. Mediq removes it. My streak is 47 days and I haven't forced a single one.",
      name: "Chloe Martins",
      role: "UG Medicine · Lisbon",
    },
  ],
};

export const PRICING = {
  badge: "PRICING",
  heading: "Fair pricing, serious value for a 7-year journey.",
  description: "Start free. Upgrade only when the method is clearly working for you.",
  billingToggle: { monthly: "Monthly", yearly: "Yearly", savingsChip: "SAVE 37%" },
  highlightBadge: "MOST POPULAR",
  footer: "30-day money-back guarantee · Cancel anytime · Student verification discount available",
  plans: (yearly: boolean) => [
    {
      name: "Free",
      price: "$0",
      cadence: "forever",
      description: "Taste the Mediq method. No card, no pressure.",
      features: ["50+ chunked video lessons", "Daily flashcard review", "Basic progress tracker", "Community support"],
      cta: "Start free",
      testid: "pricing-free",
    },
    {
      name: "Pro",
      price: yearly ? "$12" : "$19",
      cadence: "per month",
      sub: yearly ? "Billed yearly · save 37%" : "Billed monthly",
      description: "The full UG toolkit: unlimited learning, zero friction.",
      features: ["All UG subjects & video chunks", "Adaptive spaced repetition", "Focus mode + streak analytics", "ADHD coaching prompts", "Export to Anki / Notion"],
      cta: "Go Pro",
      testid: "pricing-pro",
      highlight: true,
    },
    {
      name: "PG Premium",
      price: yearly ? "$29" : "$39",
      cadence: "per month",
      sub: yearly ? "Billed yearly · save 26%" : "Billed monthly",
      description: "Exam-grade prep for USMLE, NEET PG, PLAB and more.",
      features: ["All Pro features", "PG-level MCQ bank (20,000+)", "Mock exams with analytics", "1:1 mentor sessions (monthly)", "Priority support"],
      cta: "Upgrade to PG",
      testid: "pricing-premium",
    },
  ],
};

export const FAQ = {
  badge: "FAQ",
  heading: "Questions, answered calmly.",
  items: [
    { q: "Is Mediq only for students with ADHD?", a: "No. Mediq is built on ADHD-friendly learning science — short chunks, frequent rewards, clear next steps — which research shows benefits every learner. Neurodivergent students simply feel the difference first." },
    { q: "Which exams and curricula are covered?", a: "UG covers MBBS years 1–5 (Indian MCI, UK GMC, US step-1 fundamentals). PG covers USMLE Step 1 & 2, NEET PG, PLAB 1, FRCP introductory, and AMC Part 1. More are added every month." },
    { q: "How are video chunks different from YouTube?", a: "Each chunk is tightly 3–7 minutes, scripted by clinicians, paired with an instant quiz, and fed into your spaced-repetition schedule. No rabbit holes, no autoplay traps." },
    { q: "Can I import my existing Anki deck?", a: "Yes. Pro and PG Premium tiers support one-click import of Anki .apkg decks, and we automatically map cards to our mastery graph." },
    { q: "Does Mediq work offline?", a: "You can download any chunk or deck for offline study on iOS and Android. Progress syncs the moment you're back online." },
    { q: "Is there a student discount?", a: "Absolutely. Verify your .edu (or equivalent) email and receive 40% off Pro and PG Premium. We also have scholarship slots each month — write to us." },
  ],
};

export const FINAL_CTA = {
  badge: "READY WHEN YOU ARE",
  heading: "Your next 60 minutes of study could be your",
  headingAccent: "best ever.",
  description: "Join 12,400+ UG and PG medical students who replaced burnout with a calm, focused rhythm.",
  guarantee: "30-day money-back guarantee · We never share your email",
  examTags: ["UG · MBBS", "USMLE", "NEET PG", "PLAB", "AMC"],
};

export const FOOTER = {
  tagline: "The calm, focused way to prepare for medicine. Built with ADHD medics, loved by every student.",
  wordmark: "Mediq",
  socialAriaLabel: "Social link",
  legalLinks: ["Privacy", "Terms", "Security", "Cookies"],
  cols: [
    { title: "Product", links: ["Features", "ADHD Method", "Video chunks", "Progress", "Pricing"] },
    { title: "Exams", links: ["MBBS (UG)", "USMLE", "NEET PG", "PLAB", "AMC"] },
    { title: "Company", links: ["About", "Manifesto", "Careers", "Press", "Contact"] },
    { title: "Resources", links: ["Blog", "Research", "Study guide", "Help center", "Status"] },
  ],
};
