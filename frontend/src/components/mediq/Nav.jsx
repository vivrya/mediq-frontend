import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Features", href: "#features" },
  { label: "Method", href: "#method" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={`flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "glass border-border shadow-premium"
              : "border-transparent bg-transparent"
          }`}
        >
          <Logo />

          <nav className="hidden md:flex items-center gap-1" data-testid="primary-nav">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-${l.label.toLowerCase()}`}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#pricing"
              data-testid="nav-cta-get-access"
              className="hidden sm:inline-flex items-center rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:shadow-premium"
            >
              Get Access
            </a>
            <button
              aria-label="Menu"
              data-testid="mobile-menu-toggle"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-2 rounded-2xl border border-border bg-background/95 backdrop-blur p-3 shadow-premium">
            <div className="flex flex-col">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                data-testid="mobile-nav-cta"
                className="mt-2 rounded-xl bg-foreground px-4 py-3 text-center text-sm font-semibold text-background"
              >
                Get Access
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
