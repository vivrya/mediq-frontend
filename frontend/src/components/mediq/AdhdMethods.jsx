import { BrainCircuit, Flame, Waves, Target } from "lucide-react";
import { CellMitosis } from "./animations/CellMitosis";

const pillars = [
  {
    icon: BrainCircuit,
    title: "Chunked cognition",
    body: "Lessons under 7 minutes match a distractible attention span — without losing depth.",
  },
  {
    icon: Flame,
    title: "Dopamine loops",
    body: "Micro-rewards after every task keep motivation high and shame spirals out.",
  },
  {
    icon: Waves,
    title: "Calm, predictable UI",
    body: "No flashy noise. A quiet, structured interface so your brain can finally rest and learn.",
  },
  {
    icon: Target,
    title: "One next action",
    body: "You always know the single most important thing to do next — never a blank page.",
  },
];

export function AdhdMethods() {
  return (
    <section id="adhd" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient cell mitosis animation */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[540px] h-[540px] pointer-events-none hidden lg:block opacity-70" aria-hidden>
        <CellMitosis opacity={0.6} className="w-full h-full" />
      </div>
      <div className="absolute -right-32 top-10 w-[360px] h-[360px] pointer-events-none opacity-40 lg:hidden" aria-hidden>
        <CellMitosis opacity={0.55} className="w-full h-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              ADHD-first design
            </span>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Built with neurodivergent medics, not around them.
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground">
              Traditional textbooks weren't built for variable focus. Mediq is
              engineered on four science-backed principles — so attention,
              motivation and memory finally work <em>for</em> you.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-muted/60 p-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-accent/20 text-accent flex items-center justify-center">
                  <Flame className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    63% more study minutes per week
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Reported by Mediq beta users after 30 days.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="group rounded-3xl border border-border bg-card p-6 md:p-7 hover:shadow-premium transition-all hover:-translate-y-1"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 font-display text-lg md:text-xl font-bold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
