import { Star } from "lucide-react";

const S1 =
  "https://images.unsplash.com/photo-1766297248122-5957c51b1f7c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwc3R1ZGVudCUyMHN0dWR5aW5nfGVufDB8fHx8MTc3NjcwOTI0OXww&ixlib=rb-4.1.0&q=85";
const S2 =
  "https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwyfHxtZWRpY2FsJTIwc3R1ZGVudCUyMHN0dWR5aW5nfGVufDB8fHx8MTc3NjcwOTI0OXww&ixlib=rb-4.1.0&q=85";

const testimonials = [
  {
    quote:
      "I've tried Anki, YouTube, textbooks. Mediq is the first tool that actually holds my attention long enough for the dopamine to kick in. My PG prep feels calm now.",
    name: "Dr. Aanya Rao",
    role: "PG Internal Medicine · Mumbai",
    img: S1,
    stars: 5,
  },
  {
    quote:
      "The chunked videos are genius. I finish a topic during my break and the quiz right after makes it stick. Finally a tool built for how I study, not against me.",
    name: "Ibrahim Khalid",
    role: "MBBS 3rd Year · Kings College",
    img: S2,
    stars: 5,
  },
  {
    quote:
      "As someone with ADHD, every other app added friction. Mediq removes it. My streak is 47 days and I haven't forced a single one.",
    name: "Chloe Martins",
    role: "UG Medicine · Lisbon",
    img: S1,
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section id="stories" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Loved by medics
            </span>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Students who once gave up on apps{" "}
              <span className="gradient-text">keep coming back.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" strokeWidth={0} />
              ))}
            </div>
            <span><span className="font-semibold text-foreground">4.9</span> · 1,280 reviews</span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              data-testid={`testimonial-${i}`}
              className="relative flex flex-col rounded-3xl border border-border bg-card p-7 shadow-sm hover:shadow-premium transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: t.stars }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-accent text-accent" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-5 font-display text-lg leading-snug tracking-tight text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover border border-border"
                />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
