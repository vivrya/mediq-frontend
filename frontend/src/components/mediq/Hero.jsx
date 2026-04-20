import { ArrowRight, Sparkles, Play } from "lucide-react";

const HERO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/6884ab8f-c36c-4a9c-aa44-f69c2646dc8a/images/887afc6ba91775830fc0d3e48d9c29d0e943f11dc8b671f42a1a3d84fa78bdd9.png";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 md:pt-44 pb-20 md:pb-28 grain">
      <div className="hero-glow" aria-hidden />
      <div className="absolute inset-x-0 top-24 flex justify-center opacity-60 dark:opacity-30 pointer-events-none">
        <div className="h-[520px] w-[520px] rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 animate-reveal">
            <span
              data-testid="hero-badge"
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent"
            >
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              New · ADHD-Focused Engine
            </span>

            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-foreground">
              Study medicine the way your{" "}
              <span className="gradient-text">brain actually learns.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
              Mediq turns the entire UG & PG syllabus into bite-sized video
              chunks, adaptive flashcards and focus sprints — engineered for
              ADHD minds, loved by every medic.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#pricing"
                data-testid="hero-cta-primary"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-primary-glow transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Start learning free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#video-demo"
                data-testid="hero-cta-secondary"
                className="group inline-flex items-center gap-3 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary"
              >
                <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground pulse-ring">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
                Watch 60-sec demo
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {["E11D48", "0F52BA", "10B981", "F59E0B"].map((c, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background"
                    style={{ background: `#${c}` }}
                  />
                ))}
              </div>
              <div>
                <span className="font-semibold text-foreground">12,400+ </span>
                students preparing with Mediq
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative animate-reveal" style={{ animationDelay: "120ms" }}>
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl" />
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-border bg-secondary/40 shadow-premium">
                <img
                  src={HERO_IMG}
                  alt="Focused neural network illustrating ADHD-friendly learning"
                  className="h-full w-full object-cover animate-float"
                  loading="eager"
                />
              </div>

              {/* Floating accent cards */}
              <div className="absolute -left-6 top-10 rounded-2xl border border-border bg-background/95 backdrop-blur p-3 shadow-premium animate-float-slow">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12l5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Today</div>
                    <div className="text-sm font-semibold">+248 XP · Streak 14🔥</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-10 rounded-2xl border border-border bg-background/95 backdrop-blur px-3 py-2.5 shadow-premium animate-float">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Recall</div>
                <div className="mt-1 text-lg font-display font-bold text-foreground">94%</div>
                <div className="mt-1 h-1.5 w-24 rounded-full bg-secondary">
                  <div className="h-full w-[94%] rounded-full bg-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
