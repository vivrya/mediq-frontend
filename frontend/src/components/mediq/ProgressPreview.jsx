import { Flame, Trophy, TrendingUp, Calendar } from "lucide-react";

export function ProgressPreview() {
  const subjects = [
    { name: "Anatomy", pct: 82, color: "bg-primary" },
    { name: "Physiology", pct: 68, color: "bg-accent" },
    { name: "Pharmacology", pct: 54, color: "bg-primary" },
    { name: "Pathology", pct: 41, color: "bg-accent" },
  ];

  // Simple heatmap (7x20)
  const cells = Array.from({ length: 7 * 20 }, (_, i) => {
    const v = (Math.sin(i * 1.3) + Math.cos(i * 0.7)) * 50 + 50;
    return Math.max(0, Math.min(100, v));
  });

  return (
    <section id="progress" className="py-24 md:py-32 bg-muted/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Progress tracker
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            The dashboard that keeps you{" "}
            <span className="gradient-text">coming back.</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            No anxiety-inducing red dots. Just clear signal on what you've
            mastered, what's fading, and what's next.
          </p>
        </div>

        <div className="mt-12 rounded-[2.5rem] border border-border bg-card p-6 md:p-10 shadow-premium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left summary cards */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
              <StatCard
                icon={Flame}
                label="Current streak"
                value="14 days"
                accent="text-orange-500"
                bg="bg-orange-500/10"
              />
              <StatCard
                icon={Trophy}
                label="Total XP"
                value="24,820"
                accent="text-accent"
                bg="bg-accent/10"
              />
              <StatCard
                icon={TrendingUp}
                label="Avg accuracy"
                value="88%"
                accent="text-primary"
                bg="bg-primary/10"
              />
              <StatCard
                icon={Calendar}
                label="This week"
                value="6h 42m"
                accent="text-foreground"
                bg="bg-secondary"
              />
            </div>

            {/* Right — heatmap + mastery */}
            <div className="lg:col-span-8 space-y-6">
              {/* Heatmap */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-base font-bold">
                    Study activity · last 20 weeks
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    Less → More
                  </span>
                </div>
                <div className="mt-4 grid grid-flow-col grid-rows-7 gap-1">
                  {cells.map((v, i) => (
                    <div
                      key={i}
                      className="h-3 w-3 rounded-[3px]"
                      style={{
                        backgroundColor:
                          v < 15
                            ? "hsl(var(--secondary))"
                            : v < 40
                            ? "hsl(var(--accent) / 0.25)"
                            : v < 65
                            ? "hsl(var(--accent) / 0.55)"
                            : v < 85
                            ? "hsl(var(--accent) / 0.8)"
                            : "hsl(var(--accent))",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Mastery bars */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <h4 className="font-display text-base font-bold">
                  Subject mastery
                </h4>
                <div className="mt-4 space-y-4">
                  {subjects.map((s) => (
                    <div key={s.name}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{s.name}</span>
                        <span className="font-semibold text-muted-foreground">
                          {s.pct}%
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-secondary overflow-hidden">
                        <div
                          className={`h-full rounded-full ${s.color}`}
                          style={{ width: `${s.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, label, value, accent, bg }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5 hover:shadow-premium transition-all">
      <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${bg} ${accent}`}>
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-display text-2xl font-bold">{value}</div>
    </div>
  );
}
