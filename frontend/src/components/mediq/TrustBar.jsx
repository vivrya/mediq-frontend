import { Building2, Stethoscope, GraduationCap, HeartPulse, Cross, Microscope } from "lucide-react";

const items = [
  { icon: Building2, name: "Hopkins Med" },
  { icon: Stethoscope, name: "Kings College" },
  { icon: GraduationCap, name: "AIIMS" },
  { icon: HeartPulse, name: "Mayo Learn" },
  { icon: Cross, name: "Cleveland" },
  { icon: Microscope, name: "Karolinska" },
];

export function TrustBar() {
  const loop = [...items, ...items];
  return (
    <section className="border-y border-border bg-muted/60" data-testid="trust-bar">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Trusted by students at top medical institutions
        </p>
        <div className="relative mt-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-muted/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-muted/80 to-transparent z-10" />
          <div className="flex w-[200%] items-center gap-16 animate-marquee">
            {loop.map((it, i) => {
              const Icon = it.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 text-muted-foreground/70 grayscale"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                  <span className="font-display text-lg font-semibold tracking-tight whitespace-nowrap">
                    {it.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
