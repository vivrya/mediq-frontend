import { ArrowRight, ShieldCheck } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-foreground text-background p-10 md:p-16 lg:p-20 grain">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-accent/40 blur-3xl" />
          </div>

          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-background/80">
              Ready when you are
            </span>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Your next 60 minutes of study
              <br />
              could be your{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                best ever.
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-base md:text-lg text-background/70">
              Join 12,400+ UG and PG medical students who replaced burnout with
              a calm, focused rhythm.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#pricing"
                data-testid="final-cta-primary"
                className="group inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-sm font-semibold text-foreground shadow-premium transition-all hover:-translate-y-0.5"
              >
                Start free — no card needed
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <div className="inline-flex items-center gap-2 text-sm text-background/70">
                <ShieldCheck className="h-4 w-4 text-accent" strokeWidth={1.75} />
                30-day money-back guarantee
              </div>
            </div>
          </div>

          <div className="relative mt-14 flex flex-wrap items-center gap-8 text-xs text-background/50 uppercase tracking-widest">
            <span>UG · MBBS</span>
            <span>·</span>
            <span>USMLE</span>
            <span>·</span>
            <span>NEET PG</span>
            <span>·</span>
            <span>PLAB</span>
            <span>·</span>
            <span>AMC</span>
          </div>
        </div>
      </div>
    </section>
  );
}
