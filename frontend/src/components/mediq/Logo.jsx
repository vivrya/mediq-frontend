export function Logo({ className = "" }) {
  return (
    <a
      href="#top"
      data-testid="mediq-logo"
      className={`group inline-flex items-center gap-2 font-display font-bold tracking-tight ${className}`}
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-primary-glow">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v18" />
          <path d="M3 12h18" />
          <circle cx="12" cy="12" r="3" className="fill-accent stroke-accent" />
        </svg>
        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent shadow-accent-glow" />
      </span>
      <span className="text-xl">Mediq</span>
    </a>
  );
}
