import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    q: "Is Mediq only for students with ADHD?",
    a: "No. Mediq is built on ADHD-friendly learning science — short chunks, frequent rewards, clear next steps — which research shows benefits every learner. Neurodivergent students simply feel the difference first.",
  },
  {
    q: "Which exams and curricula are covered?",
    a: "UG covers MBBS years 1–5 (Indian MCI, UK GMC, US step-1 fundamentals). PG covers USMLE Step 1 & 2, NEET PG, PLAB 1, FRCP introductory, and AMC Part 1. More are added every month.",
  },
  {
    q: "How are video chunks different from YouTube?",
    a: "Each chunk is tightly 3–7 minutes, scripted by clinicians, paired with an instant quiz, and fed into your spaced-repetition schedule. No rabbit holes, no autoplay traps.",
  },
  {
    q: "Can I import my existing Anki deck?",
    a: "Yes. Pro and PG Premium tiers support one-click import of Anki .apkg decks, and we automatically map cards to our mastery graph.",
  },
  {
    q: "Does Mediq work offline?",
    a: "You can download any chunk or deck for offline study on iOS and Android. Progress syncs the moment you're back online.",
  },
  {
    q: "Is there a student discount?",
    a: "Absolutely. Verify your .edu (or equivalent) email and receive 40% off Pro and PG Premium. We also have scholarship slots each month — write to us.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-muted/40 border-y border-border">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            FAQ
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Questions, answered calmly.
          </h2>
        </div>

        <div className="mt-12 rounded-[2rem] border border-border bg-card px-6 md:px-10 py-2">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className={`${i === faqs.length - 1 ? "border-b-0" : ""}`}
              >
                <AccordionTrigger
                  data-testid={`faq-trigger-${i}`}
                  className="font-display text-left text-base md:text-lg font-semibold tracking-tight hover:no-underline py-6"
                >
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
