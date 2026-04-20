import { useState } from "react";
import { RefreshCcw, Check, X, ThumbsUp } from "lucide-react";

const choices = [
  { id: "a", text: "Inhibits DNA gyrase" },
  { id: "b", text: "Blocks 50S ribosomal subunit" },
  { id: "c", text: "Inhibits cell-wall peptidoglycan synthesis", correct: true },
  { id: "d", text: "Inhibits dihydrofolate reductase" },
];

export function QuizFlashcards() {
  const [flipped, setFlipped] = useState(false);
  const [picked, setPicked] = useState(null);

  return (
    <section id="quiz" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Quizzes & flashcards
            </span>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Active recall, rendered{" "}
              <span className="gradient-text">beautifully.</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Tap to flip. Rate your confidence. Mediq schedules the next review
              at the perfect moment — never too early, never too late.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Thousands of exam-style MCQs",
                "Auto-generated from lecture chunks",
                "Confidence-weighted spaced repetition",
              ].map((x) => (
                <li key={x} className="flex items-center gap-3 text-sm">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-foreground">{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Flashcard */}
            <div className="relative [perspective:1400px]">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 pl-1">
                Flashcard
              </div>
              <button
                onClick={() => setFlipped((v) => !v)}
                data-testid="flashcard-flip"
                className="group relative block h-72 w-full rounded-[2rem] transition-transform duration-700 ease-out [transform-style:preserve-3d]"
                style={{
                  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front */}
                <div className="absolute inset-0 rounded-[2rem] border border-border bg-card p-7 shadow-premium [backface-visibility:hidden] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Microbiology · 1 / 24
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <RefreshCcw className="h-3 w-3" /> Tap to flip
                    </span>
                  </div>
                  <div>
                    <div className="font-display text-2xl md:text-[1.7rem] font-bold leading-tight tracking-tight">
                      What is the mechanism of action of penicillin?
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex h-6 items-center rounded-full bg-secondary px-3 font-semibold">
                      Due today
                    </span>
                    <span>·</span>
                    <span>Easy</span>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-[2rem] border border-primary/30 bg-gradient-to-br from-primary to-primary/80 p-7 text-primary-foreground shadow-primary-glow [backface-visibility:hidden] flex flex-col justify-between"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest opacity-80">
                    Answer
                  </span>
                  <div className="font-display text-xl md:text-2xl font-bold leading-snug">
                    Inhibits bacterial cell-wall synthesis by binding
                    penicillin-binding proteins and blocking peptidoglycan
                    cross-linking.
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                      β-lactam
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                      Bactericidal
                    </span>
                  </div>
                </div>
              </button>
              <div className="mt-3 flex items-center gap-2">
                {["Again", "Hard", "Good", "Easy"].map((l, i) => (
                  <button
                    key={l}
                    data-testid={`confidence-${l.toLowerCase()}`}
                    className={`flex-1 rounded-xl border border-border px-3 py-2 text-xs font-semibold transition-colors hover:bg-secondary ${
                      i === 2 ? "bg-accent/10 text-accent border-accent/30" : ""
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* MCQ Quiz */}
            <div className="rounded-[2rem] border border-border bg-card p-7 shadow-premium">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  MCQ · Pharmacology
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  Q 7 / 20
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold tracking-tight">
                Penicillins exert their antibacterial effect by which of the
                following mechanisms?
              </h3>
              <div className="mt-5 space-y-2.5">
                {choices.map((c) => {
                  const isPicked = picked === c.id;
                  const showResult = picked !== null;
                  const correct = showResult && c.correct;
                  const wrongPick = showResult && isPicked && !c.correct;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setPicked(c.id)}
                      data-testid={`mcq-option-${c.id}`}
                      className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-all ${
                        correct
                          ? "border-accent/50 bg-accent/10 text-foreground"
                          : wrongPick
                          ? "border-destructive/40 bg-destructive/10 text-foreground"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border text-xs font-bold uppercase ${
                          correct
                            ? "border-accent bg-accent text-accent-foreground"
                            : wrongPick
                            ? "border-destructive bg-destructive text-destructive-foreground"
                            : "border-border bg-background text-muted-foreground"
                        }`}
                      >
                        {correct ? (
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        ) : wrongPick ? (
                          <X className="h-3.5 w-3.5" strokeWidth={3} />
                        ) : (
                          c.id.toUpperCase()
                        )}
                      </span>
                      <span className="flex-1 font-medium">{c.text}</span>
                    </button>
                  );
                })}
              </div>
              {picked && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-accent/10 text-accent px-3 py-2 text-xs font-semibold">
                  <ThumbsUp className="h-3.5 w-3.5" /> Logged. Next review in 2
                  days.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
