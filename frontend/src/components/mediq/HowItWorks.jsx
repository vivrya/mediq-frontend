import { Compass, Zap, Repeat, Trophy } from "lucide-react";

const steps = [
  {
    icon: Compass,
    title: "Map your syllabus",
    body: "Pick UG or PG, your exam, and your pace. Mediq builds a personal curriculum in under 60 seconds.",
  },
  {
    icon: Zap,
    title: "Study in focus sprints",
    body: "3–7 minute video chunks, interactive notes and micro-quizzes. One concept at a time.",
  },
  {
    icon: Repeat,
    title: "Recall with smart reviews",
    body: "Our spaced-repetition engine resurfaces exactly what you're about to forget.",
  },
  {
    icon: Trophy,
    title: "Track mastery, stay motivated",
    body: "Streaks, XP and mastery maps turn daily study into visible, rewarding progress.",
  },
];

export function HowItWorks() {
  return (
    <section id="method" className="py-24 md:py-32 bg-muted/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              How it works
            </span>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Four steps. Zero overwhelm.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            We designed Mediq around how focused attention actually works —
            short loops, fast feedback, frequent wins.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                data-testid={`step-${i + 1}`}
                className="relative rounded-3xl border border-border bg-card p-6 md:p-7 shadow-sm hover:shadow-premium transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold text-muted-foreground">
                    0{i + 1}
                  </span>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
