export const SIDEBAR = {
  upgradeTitle: "Upgrade to Pro",
  upgradeDescription: "Unlock all chunks, adaptive flashcards and mock exams.",
  upgradeButton: "See plans",
  backToSite: "Back to site",
  navItems: [
    { label: "Dashboard", testid: "dash-nav-home", to: "/dashboard" },
    { label: "My Courses", testid: "dash-nav-courses", to: "/dashboard/my-courses" },
    { label: "Courses", testid: "dash-nav-browse", to: "/dashboard/courses" },
    { label: "Video Chunks", testid: "dash-nav-videos", to: "/dashboard/videos" },
    { label: "Flashcards", testid: "dash-nav-flashcards", to: "/dashboard/flashcards" },
    { label: "Progress", testid: "dash-nav-progress", to: "/dashboard/progress" },
    { label: "Settings", testid: "dash-nav-settings", to: "/dashboard/settings" },
  ],
};

export const HEADER = {
  dayLabel: "MONDAY · DAY 14",
  title: "Dashboard",
  streakLabel: "14-day streak",
  notificationsTooltip: "Notifications",
  avatarInitial: "M",
};

export const WELCOME = {
  badge: "WELCOME BACK",
  heading: "Welcome to Mediq 👋",
  description: "Learn smarter. Stay consistent. Your next 7-minute chunk is one click away.",
};

export const MY_COURSES = {
  title: "My Courses",
  subtitle: "Your active learning tracks",
  emptyHeading: "You don't have any active courses yet.",
  emptyDescription:
    "Choose a full course or a subject-wise plan to start learning — most medics unlock access within 60 seconds.",
  viewCoursesBtn: "View courses",
  getAccessBtn: "Get access",
};

export const AVAILABLE_PLANS = {
  title: "Available plans",
  subtitle: "Full plans or single subjects — pick your pace",
  fullPlansLabel: "FULL PLANS",
  subjectPlansLabel: "SUBJECT-WISE PLANS",
  highlightBadge: "MOST POPULAR",
  buyButton: "Buy now",
  subjectMeta: "chapters · 3-7 min chunks",
  subjectCadence: "/ month",
  fullPlans: [
    {
      id: "ug",
      name: "UG Complete Plan",
      tag: "For MBBS UG",
      price: "$12",
      cadence: "/ month",
      features: ["All UG subjects & chunks", "Adaptive flashcards", "Focus mode + streaks", "Export to Anki / Notion"],
      highlight: true,
    },
    {
      id: "pg",
      name: "PG Complete Plan",
      tag: "USMLE · NEET PG · PLAB",
      price: "$29",
      cadence: "/ month",
      features: ["All PG MCQ banks (20k+)", "Mock exams with analytics", "1:1 mentor sessions", "Priority support"],
    },
  ],
  subjectPlans: [
    { id: "anatomy", name: "Anatomy", chapters: 42, price: "$6", color: "#0F52BA" },
    { id: "pharmacology", name: "Pharmacology", chapters: 38, price: "$6", color: "#10B981" },
    { id: "pathology", name: "Pathology", chapters: 35, price: "$6", color: "#7C3AED" },
    { id: "medicine", name: "Medicine", chapters: 64, price: "$8", color: "#F59E0B" },
  ],
};

export const CONTINUE_LEARNING = {
  title: "Continue learning",
  subtitle: "Pick up where you left off",
  heading: "Subscribe to unlock lessons, quizzes and flashcards.",
  description: "Your personalised study playlist appears here the moment your plan is active.",
  button: "Choose a plan",
};

export const FLASHCARDS_PREVIEW = {
  title: "Flashcards preview",
  subtitle: "Active recall, scheduled perfectly",
  heading: "Boost memory with smart flashcards.",
  button: "Unlock access",
  card1Subject: "Anatomy",
  card1Question: "Brachial plexus roots?",
  card2Subject: "Pharma",
  card2Answer: "β-lactams mechanism",
};
