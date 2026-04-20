import { Play, Clock, CheckCircle2 } from "lucide-react";

const chunks = [
  { t: "04:12", title: "The Renin-Angiotensin System", tag: "Cardio · PG", done: true },
  { t: "06:30", title: "Cranial Nerves Mnemonic Chunk", tag: "Anatomy · UG", done: true, active: true },
  { t: "03:48", title: "Acid-base Disorders in 4 minutes", tag: "Physio · PG" },
  { t: "05:22", title: "ECG: From Rhythm to Diagnosis", tag: "Cardio · UG" },
  { t: "07:00", title: "Antibiotics: Cell wall inhibitors", tag: "Pharma · PG" },
];

export function VideoChunks() {
  return (
    <section id="video-demo" className="py-24 md:py-32 bg-muted/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Short video chunks
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Finish a topic{" "}
            <span className="gradient-text">before your coffee cools.</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Every chunk is timed, transcribed and attached to a 20-second quick
            recall. Perfect for hospital breaks and subway commutes.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Mock player */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-premium">
            <div className="relative aspect-video bg-gradient-to-br from-primary/80 via-primary to-accent/70">
              <div className="absolute inset-0 dot-grid opacity-20 mix-blend-overlay" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/30 backdrop-blur px-3 py-1 text-xs font-semibold text-white">
                  <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                  Live chunk
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-black/30 backdrop-blur px-3 py-1 text-xs font-semibold text-white">
                  <Clock className="h-3 w-3" /> 06:30
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  data-testid="video-play-mock"
                  className="group inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/95 backdrop-blur shadow-premium transition-transform hover:scale-105"
                >
                  <Play className="h-8 w-8 translate-x-0.5 fill-primary text-primary" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-white/80 text-xs font-semibold uppercase tracking-widest">
                  Anatomy · UG
                </div>
                <div className="font-display text-white text-xl md:text-2xl font-bold tracking-tight">
                  Cranial Nerves Mnemonic Chunk
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-white/20">
                  <div className="h-full w-1/3 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-5 rounded-[2rem] border border-border bg-card p-4 md:p-6 shadow-premium">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-display text-lg font-bold tracking-tight">
                Today's playlist
              </h3>
              <span className="text-xs font-semibold text-muted-foreground">
                5 chunks · 27 min
              </span>
            </div>
            <div className="mt-4 space-y-2">
              {chunks.map((c, i) => (
                <div
                  key={i}
                  data-testid={`playlist-item-${i}`}
                  className={`flex items-center gap-4 rounded-2xl border p-3 transition-all cursor-pointer ${
                    c.active
                      ? "border-primary/40 bg-primary/5"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                      c.done
                        ? "bg-accent/15 text-accent"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {c.done ? (
                      <CheckCircle2 className="h-5 w-5" strokeWidth={1.75} />
                    ) : (
                      <Play className="h-4 w-4 fill-current" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">
                      {c.title}
                    </div>
                    <div className="text-xs text-muted-foreground">{c.tag}</div>
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground">
                    {c.t}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
