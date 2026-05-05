import type { AppMode } from "@/theme";

export interface ThemeTokens {
  // Core accents
  primary: string;
  success: string;
  warn: string;
  fire: string;

  // Soft tints (used for chip/badge backgrounds)
  primarySoft: string;
  successSoft: string;

  // Gradient strings (ready-to-use CSS values)
  progressGradient: string;   // main overall progress bar fill
  cardBg: string;             // health card / section card bg
  doneCardBg: string;         // fully-completed course card bg
  heroOverlay: string;        // landing hero / feature card overlay
  sidebarDemoBg: string;      // sidebar "See how it works" button
  sidebarDemoHover: string;   // sidebar demo button hover state
  sidebarDemoBorder: string;  // sidebar demo button border color
  upgradeCardBg: string;      // sidebar upgrade card background

  // Misc
  featureBorderTop: string;   // flashcard preview card top border
}

const TOKENS: Record<AppMode, ThemeTokens> = {
  light: {
    primary:        "#0F52BA",
    success:        "#10B981",
    warn:           "#F59E0B",
    fire:           "#F59E0B",
    primarySoft:    "rgba(15,82,186,.08)",
    successSoft:    "rgba(16,185,129,.08)",
    progressGradient:   "linear-gradient(90deg, #10B981, #0F52BA)",
    cardBg:             "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)",
    doneCardBg:         "linear-gradient(160deg, #f0fdf4 0%, #fdf4ff 100%)",
    heroOverlay:        "linear-gradient(135deg, rgba(15,82,186,.14), rgba(16,185,129,.14))",
    sidebarDemoBg:      "linear-gradient(135deg, #ecfdf5 0%, #eff6ff 100%)",
    sidebarDemoHover:   "linear-gradient(135deg, #d1fae5 0%, #dbeafe 100%)",
    sidebarDemoBorder:  "#6EE7B7",   // success.light in light mode
    upgradeCardBg:      "#EFF6FF",   // primary.light tint
    featureBorderTop:   "#10B981",
  },
  dark: {
    primary:        "#3B82F6",
    success:        "#10B981",
    warn:           "#F59E0B",
    fire:           "#F59E0B",
    primarySoft:    "rgba(59,130,246,.10)",
    successSoft:    "rgba(16,185,129,.10)",
    progressGradient:   "linear-gradient(90deg, #10B981, #3B82F6)",
    cardBg:             "linear-gradient(135deg, rgba(16,185,129,.08) 0%, rgba(15,82,186,.08) 100%)",
    doneCardBg:         "linear-gradient(160deg, rgba(16,185,129,.08) 0%, rgba(192,86,173,.08) 100%)",
    heroOverlay:        "linear-gradient(135deg, rgba(59,130,246,.18), rgba(16,185,129,.18))",
    sidebarDemoBg:      "linear-gradient(135deg, rgba(16,185,129,.12) 0%, rgba(15,82,186,.12) 100%)",
    sidebarDemoHover:   "linear-gradient(135deg, rgba(16,185,129,.20) 0%, rgba(15,82,186,.20) 100%)",
    sidebarDemoBorder:  "rgba(16,185,129,.30)",
    upgradeCardBg:      "rgba(59,130,246,.10)",
    featureBorderTop:   "#10B981",
  },
  warm: {
    primary:        "#c26343",
    success:        "#6b8e5a",
    warn:           "#c99a3b",
    fire:           "#c99a3b",
    primarySoft:    "rgba(194,99,67,.10)",
    successSoft:    "rgba(107,142,90,.10)",
    progressGradient:   "linear-gradient(90deg, #6b8e5a, #c26343)",
    cardBg:             "linear-gradient(135deg, #dbe6d0 0%, #faebe0 100%)",
    doneCardBg:         "linear-gradient(160deg, #dbe6d0 0%, #f4d9c9 100%)",
    heroOverlay:        "linear-gradient(135deg, rgba(194,99,67,.14), rgba(107,142,90,.14))",
    sidebarDemoBg:      "linear-gradient(135deg, #dbe6d0 0%, #faebe0 100%)",
    sidebarDemoHover:   "linear-gradient(135deg, #c8dab8 0%, #f4d9c9 100%)",
    sidebarDemoBorder:  "#a8c49a",
    upgradeCardBg:      "#faebe0",
    featureBorderTop:   "#6b8e5a",
  },
};

export function getTokens(mode: AppMode): ThemeTokens {
  return TOKENS[mode];
}
