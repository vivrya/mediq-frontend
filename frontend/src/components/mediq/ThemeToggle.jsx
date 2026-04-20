import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      data-testid="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-foreground transition-all hover:shadow-premium hover:-translate-y-0.5"
    >
      <Sun className={`h-4 w-4 transition-all ${isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`} strokeWidth={1.75} />
      <Moon className={`absolute h-4 w-4 transition-all ${isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} strokeWidth={1.75} />
    </button>
  );
}
