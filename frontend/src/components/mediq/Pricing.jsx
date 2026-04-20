import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

const plans = (yearly) => [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "Taste the Mediq method. No card, no pressure.",
    features: [
      "50+ chunked video lessons",
      "Daily flashcard review",
      "Basic progress tracker",
      "Community support",
    ],
    cta: "Start free",
    testid: "pricing-free",
    highlight: false,
  },
  {
    name: "Pro",
    price: yearly ? "$12" : "$19",
    cadence: "per month",
    sub: yearly ? "Billed yearly · save 37%" : "Billed monthly",
    description: "The full UG toolkit: unlimited learning, zero friction.",
    features: [
      "All UG subjects & video chunks",
      "Adaptive spaced repetition",
      "Focus mode + streak analytics",
      "ADHD coaching prompts",
      "Export to Anki / Notion",
    ],
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
    features: [
      "All Pro features",
      "PG-level MCQ bank (20,000+)",
      "Mock exams with analytics",
      "1:1 mentor sessions (monthly)",
      "Priority support",
    ],
    cta: "Upgrade to PG",
    testid: "pricing-premium",
    highlight: false,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  const list = plans(yearly);

  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Pricing
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
            Fair pricing, serious value for a 7-year journey.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Start free. Upgrade only when the method is clearly working for you.
          </p>

          <div
            className="mt-8 inline-flex items-center rounded-full border border-border bg-background p-1 text-sm"
            role="tablist"
          >
            <button
              onClick={() => setYearly(false)}
              data-testid="billing-monthly"
              className={`rounded-full px-5 py-2 font-semibold transition-all ${
                !yearly ? "bg-foreground text-background" : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              data-testid="billing-yearly"
              className={`rounded-full px-5 py-2 font-semibold transition-all inline-flex items-center gap-1.5 ${
                yearly ? "bg-foreground text-background" : "text-muted-foreground"
              }`}
            >
              Yearly
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${yearly ? "bg-accent text-accent-foreground" : "bg-accent/15 text-accent"}`}>
                -30%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {list.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-[2rem] border p-8 md:p-10 transition-all ${
                p.highlight
                  ? "border-primary/40 bg-card shadow-primary-glow lg:-translate-y-3 ring-1 ring-primary/30"
                  : "border-border bg-card hover:-translate-y-1 hover:shadow-premium"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-primary-glow">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </span>
                </div>
              )}

              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                {p.name}
              </div>
              <div className="mt-4 flex items-end gap-1.5">
                <div className="font-display text-5xl font-bold tracking-tight">
                  {p.price}
                </div>
                <div className="pb-2 text-sm text-muted-foreground">
                  {p.cadence}
                </div>
              </div>
              {p.sub && (
                <div className="mt-1 text-xs text-muted-foreground">{p.sub}</div>
              )}
              <p className="mt-4 text-sm text-muted-foreground">{p.description}</p>

              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent shrink-0">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                data-testid={`${p.testid}-cta`}
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                  p.highlight
                    ? "bg-primary text-primary-foreground shadow-primary-glow hover:shadow-xl"
                    : "bg-foreground text-background hover:shadow-premium"
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          30-day money-back guarantee · Cancel anytime · Student verification discount available
        </p>
      </div>
    </section>
  );
}
