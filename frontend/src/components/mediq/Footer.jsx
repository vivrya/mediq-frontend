import { Logo } from "./Logo";
import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const cols = [
  {
    title: "Product",
    links: ["Features", "ADHD Method", "Video chunks", "Progress", "Pricing"],
  },
  {
    title: "Exams",
    links: ["MBBS (UG)", "USMLE", "NEET PG", "PLAB", "AMC"],
  },
  {
    title: "Company",
    links: ["About", "Manifesto", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Blog", "Research", "Study guide", "Help center", "Status"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-6 md:px-12 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The calm, focused way to prepare for medicine. Built with ADHD
              medics, loved by every student.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-testid={`social-${i}`}
                  aria-label="Social link"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-border pt-6">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mediq Learning Labs · All rights
            reserved.
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>

        <div className="mt-10 select-none overflow-hidden">
          <div className="font-display font-bold tracking-tight gradient-text text-center leading-none text-[22vw]">
            Mediq
          </div>
        </div>
      </div>
    </footer>
  );
}
