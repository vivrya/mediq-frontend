import { BrainCircuit, PlayCircle, Layers, LineChart, Timer, Sparkles } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> Why Mediq
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            A learning stack built for the{" "}
            <span className="gradient-text">medical marathon.</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Seven years of syllabus. Millions of facts. One calm system that
            keeps your focus, memory and momentum high.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Big ADHD card */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 md:p-12 shadow-premium transition-all hover:-translate-y-1">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BrainCircuit className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-display text-2xl md:text-3xl font-bold tracking-tight">
                ADHD-friendly methods, by default
              </h3>
              <p className="mt-3 max-w-xl text-base text-muted-foreground">
                Every module is chunked into 3–7 minute micro-lessons, gamified
                with streaks and dopamine loops, and paced with focus timers so
                your brain never gets bored — or burned out.
              </p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { k: "3–7 min", v: "Micro-lessons" },
                  { k: "25/5", v: "Focus sprints" },
                  { k: "Daily", v: "Dopamine loops" },
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl border border-border bg-background px-4 py-3">
                    <div className="font-display text-lg font-bold">{s.k}</div>
                    <div className="text-xs text-muted-foreground">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Video Chunks */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-premium transition-all hover:-translate-y-1">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <PlayCircle className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h3 className="mt-5 font-display text-xl md:text-2xl font-bold tracking-tight">
              Video chunks, not lectures
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Binge-worthy clips that fit between classes, commutes and coffee.
            </p>
            <div className="mt-6 relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
              <div className="absolute inset-0 grid grid-cols-3 gap-1 p-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="rounded-md bg-gradient-to-br from-primary/25 to-accent/20"
                    style={{ opacity: 0.4 + i * 0.1 }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-background/90 backdrop-blur flex items-center justify-center shadow-premium">
                  <PlayCircle className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Smart Flashcards */}
          <div className="md:col-span-5 group relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-premium transition-all hover:-translate-y-1">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Layers className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h3 className="mt-5 font-display text-xl md:text-2xl font-bold tracking-tight">
              Spaced-repetition flashcards
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Proven to cut recall failures in half. Our engine adapts to your
              forgetting curve.
            </p>
            <div className="mt-6 relative h-52 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 via-secondary to-accent/15 border border-border">
              <div className="absolute inset-0 dot-grid opacity-30" />
              {/* CSS mini flashcards */}
              <div className="absolute left-6 top-6 w-40 rounded-xl bg-background border border-border p-3 shadow-premium rotate-[-8deg]">
                <div className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">Anatomy</div>
                <div className="mt-1 text-[11px] font-display font-bold leading-tight">Brachial plexus roots?</div>
                <div className="mt-2 flex gap-1">
                  <span className="h-1 flex-1 rounded-full bg-accent" />
                  <span className="h-1 flex-1 rounded-full bg-primary/30" />
                  <span className="h-1 flex-1 rounded-full bg-primary/30" />
                </div>
              </div>
              <div className="absolute right-5 top-10 w-40 rounded-xl bg-primary text-primary-foreground p-3 shadow-primary-glow rotate-[6deg]">
                <div className="text-[9px] font-semibold uppercase tracking-widest opacity-75">Pharma</div>
                <div className="mt-1 text-[11px] font-display font-bold leading-tight">β-lactams mechanism</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-white/20">
                  <div className="h-full w-2/3 rounded-full bg-accent" />
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-5 w-48 rounded-xl bg-background border border-border p-3 shadow-premium">
                <div className="flex items-center justify-between">
                  <div className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">Physio · Due</div>
                  <div className="text-[9px] font-semibold text-accent">+12 XP</div>
                </div>
                <div className="mt-1 text-[11px] font-display font-bold leading-tight">Frank-Starling law in 1 line</div>
              </div>
            </div>
          </div>

          {/* Focus Timer */}
          <div className="md:col-span-3 group rounded-[2rem] border border-border bg-card p-8 shadow-premium transition-all hover:-translate-y-1">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Timer className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
              Focus mode
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Distraction-free sessions with ambient cues.
            </p>
            <div className="mt-6 flex items-center justify-center">
              <div className="relative h-28 w-28">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                  <circle
                    cx="50" cy="50" r="44" fill="none"
                    stroke="hsl(var(--accent))" strokeWidth="6"
                    strokeDasharray="276" strokeDashoffset="70"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="font-display text-xl font-bold">17:32</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Deep work</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress big */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-premium transition-all hover:-translate-y-1">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LineChart className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h3 className="mt-5 font-display text-xl md:text-2xl font-bold tracking-tight">
              Progress you can feel
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Streaks, XP, mastery heatmaps — know exactly where to sharpen
              next.
            </p>
            <div className="mt-6 flex items-end gap-1.5 h-20">
              {[30, 55, 42, 70, 50, 88, 72, 95, 68, 82, 90, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-primary/30 to-accent"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
