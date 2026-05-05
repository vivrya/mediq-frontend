import { createTheme, ThemeOptions, alpha } from "@mui/material";

export type AppMode = "light" | "dark" | "warm";

const baseTypography: ThemeOptions["typography"] = {
  fontFamily: "'Manrope', 'Helvetica', 'Arial', sans-serif",
  h1: { fontFamily: "'Outfit', 'Manrope', sans-serif", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.05 },
  h2: { fontFamily: "'Outfit', 'Manrope', sans-serif", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 },
  h3: { fontFamily: "'Outfit', 'Manrope', sans-serif", fontWeight: 700, letterSpacing: "-0.015em" },
  h4: { fontFamily: "'Outfit', 'Manrope', sans-serif", fontWeight: 700, letterSpacing: "-0.01em" },
  h5: { fontFamily: "'Outfit', 'Manrope', sans-serif", fontWeight: 600, letterSpacing: "-0.01em" },
  h6: { fontFamily: "'Outfit', 'Manrope', sans-serif", fontWeight: 600, letterSpacing: "-0.01em" },
  subtitle1: { fontWeight: 600 },
  subtitle2: { fontWeight: 600 },
  body1: { fontSize: "1rem", lineHeight: 1.65 },
  body2: { fontSize: "0.9375rem", lineHeight: 1.6 },
  button: { textTransform: "none", fontWeight: 600, letterSpacing: "-0.005em" },
  overline: { fontWeight: 700, letterSpacing: "0.18em" },
};

const dyslexicTypography: ThemeOptions["typography"] = {
  fontFamily: "'OpenDyslexic', sans-serif",
  h1: { fontFamily: "'OpenDyslexic', sans-serif", fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1.4 },
  h2: { fontFamily: "'OpenDyslexic', sans-serif", fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1.4 },
  h3: { fontFamily: "'OpenDyslexic', sans-serif", fontWeight: 700, letterSpacing: "0.02em" },
  h4: { fontFamily: "'OpenDyslexic', sans-serif", fontWeight: 700, letterSpacing: "0.02em" },
  h5: { fontFamily: "'OpenDyslexic', sans-serif", fontWeight: 600, letterSpacing: "0.02em" },
  h6: { fontFamily: "'OpenDyslexic', sans-serif", fontWeight: 600, letterSpacing: "0.02em" },
  subtitle1: { fontWeight: 600, letterSpacing: "0.02em" },
  subtitle2: { fontWeight: 600, letterSpacing: "0.02em" },
  body1: { fontSize: "1.05rem", lineHeight: 1.9, letterSpacing: "0.02em", wordSpacing: "0.1em" },
  body2: { fontSize: "1rem", lineHeight: 1.85, letterSpacing: "0.02em", wordSpacing: "0.1em" },
  button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.02em" },
  overline: { fontWeight: 700, letterSpacing: "0.18em" },
};

// ── Warm twilight palette tokens ────────────────────────────────
const W = {
  // Light variant
  light: {
    paper:        "#fbf8f1",
    paper2:       "#f4efe2",
    paper3:       "#ebe4d2",
    paperSink:    "#e5dcc4",
    ink:          "#191613",
    ink2:         "#3a342c",
    ink3:         "#5c544a",
    muted:        "#8c8576",
    muted2:       "#b3ab9a",
    line:         "#e6ddc8",
    line2:        "#d5caae",
    lineStrong:   "#c0b392",
    accent:       "#c26343",
    accentSoft:   "#f4d9c9",
    accentSofter: "#faebe0",
    accentInk:    "#8a3e22",
    ok:           "#6b8e5a",
    okSoft:       "#dbe6d0",
    warn:         "#c99a3b",
    warnSoft:     "#f2e4c3",
    error:        "#b4563f",
    canvas:       "#e9e3d3",
  },
  // Dark / warm-twilight variant
  dark: {
    paper:        "#1b1815",
    paper2:       "#241f1a",
    paper3:       "#2d2720",
    paperSink:    "#120f0c",
    ink:          "#f3ebd8",
    ink2:         "#d8cfb9",
    ink3:         "#a89e87",
    muted:        "#8a8070",
    muted2:       "#665d50",
    line:         "#2e2820",
    line2:        "#3a3229",
    lineStrong:   "#554a3c",
    accent:       "#e07a56",
    accentSoft:   "#3a2419",
    accentSofter: "#2a1b13",
    accentInk:    "#f2b29a",
    ok:           "#98ba80",
    okSoft:       "#2a3621",
    warn:         "#d6ad55",
    warnSoft:     "#36291a",
    error:        "#d17356",
    canvas:       "#0e0c0a",
  },
};

export function buildTheme(mode: AppMode, isDyslexicMode = false) {
  if (mode === "warm") return buildWarmTheme("light", isDyslexicMode);

  const isLight = mode === "light";
  const sapphire = isLight ? "#0F52BA" : "#3B82F6";
  const emerald = "#10B981";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: sapphire,
        light: isLight ? "#4F8AE0" : "#60A5FA",
        dark: isLight ? "#0A3B8A" : "#1D4ED8",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: emerald,
        contrastText: "#FFFFFF",
      },
      success: {
        main: emerald,
        light: "#34D399",
        dark: "#059669",
        contrastText: "#FFFFFF",
      },
      info: { main: sapphire },
      error: { main: "#E11D48" },
      warning: { main: "#F59E0B" },
      background: isLight
        ? { default: "#FDFDFC", paper: "#FFFFFF" }
        : { default: "#050814", paper: "#0B1220" },
      text: isLight
        ? { primary: "#0A0F1C", secondary: "#475569" }
        : { primary: "#F8FAFC", secondary: "#94A3B8" },
      divider: isLight ? "#E2E8F0" : "#1E293B",
    },
    typography: isDyslexicMode ? dyslexicTypography : baseTypography,
    shape: { borderRadius: 14 },
    shadows: [
      "none",
      `0 1px 2px ${alpha(sapphire, 0.06)}`,
      `0 2px 6px ${alpha(sapphire, 0.08)}`,
      `0 6px 20px -8px ${alpha(sapphire, 0.18)}`,
      `0 10px 30px -10px ${alpha(sapphire, 0.25)}`,
      `0 14px 36px -12px ${alpha(sapphire, 0.28)}`,
      `0 18px 42px -14px ${alpha(sapphire, 0.32)}`,
      ...Array(18).fill(`0 24px 60px -18px ${alpha(sapphire, 0.35)}`),
    ] as any,
    components: buildComponents({ accent: sapphire, isLight, isDyslexicMode }),
  });
}

function buildWarmTheme(variant: "light" | "dark", isDyslexicMode: boolean) {
  const t = variant === "light" ? W.light : W.dark;
  const accent = t.accent;

  return createTheme({
    palette: {
      mode: variant,
      primary:   { main: accent, light: t.accentSoft, dark: t.accentInk, contrastText: variant === "light" ? "#fff" : t.ink },
      secondary: { main: t.ok, contrastText: "#fff" },
      success:   { main: t.ok, light: t.okSoft, contrastText: "#fff" },
      warning:   { main: t.warn, light: t.warnSoft, contrastText: t.ink },
      error:     { main: t.error },
      info:      { main: accent },
      background: { default: t.canvas, paper: t.paper },
      text: {
        primary:   t.ink,
        secondary: t.ink2,
        disabled:  t.muted,
      },
      divider: t.line,
    },
    typography: isDyslexicMode ? dyslexicTypography : baseTypography,
    shape: { borderRadius: 14 },
    shadows: [
      "none",
      `0 1px 2px ${alpha(accent, 0.06)}`,
      `0 2px 6px ${alpha(accent, 0.09)}`,
      `0 6px 20px -8px ${alpha(accent, 0.18)}`,
      `0 10px 30px -10px ${alpha(accent, 0.24)}`,
      `0 14px 36px -12px ${alpha(accent, 0.28)}`,
      `0 18px 42px -14px ${alpha(accent, 0.32)}`,
      ...Array(18).fill(`0 24px 60px -18px ${alpha(accent, 0.35)}`),
    ] as any,
    components: buildComponents({ accent, isLight: variant === "light", isDyslexicMode, warm: t }),
  });
}

// ── Shared MUI component overrides ──────────────────────────────
function buildComponents({
  accent,
  isLight,
  isDyslexicMode,
  warm,
}: {
  accent: string;
  isLight: boolean;
  isDyslexicMode: boolean;
  warm?: typeof W.light;
}): ThemeOptions["components"] {
  const bg = warm
    ? (isLight ? warm.paper : warm.paper2)
    : (isLight ? "#FFFFFF" : "#0B1220");

  return {
    MuiCssBaseline: {
      styleOverrides: `
        ${isDyslexicMode ? `
          @font-face {
            font-family: 'OpenDyslexic';
            src: url('https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/fonts/OpenDyslexic-Regular.otf') format('opentype');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'OpenDyslexic';
            src: url('https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/fonts/OpenDyslexic-Bold.otf') format('opentype');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
        ` : ''}
        ::selection {
          background-color: ${alpha(accent, 0.2)};
          color: ${isLight ? "#0A0F1C" : "#F8FAFC"};
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 22,
          paddingBlock: 10,
          fontWeight: 600,
          transition: "transform .2s ease, box-shadow .2s ease, background-color .2s ease",
          "&:hover": { transform: "translateY(-1px)" },
        },
        containedPrimary: {
          boxShadow: `0 10px 30px -10px ${alpha(accent, 0.55)}`,
          "&:hover": { boxShadow: `0 14px 36px -10px ${alpha(accent, 0.65)}` },
        },
        containedSuccess: {
          boxShadow: `0 10px 30px -10px ${alpha(accent, 0.5)}`,
        },
        outlined: {
          borderColor: warm
            ? (isLight ? warm.line : warm.line2)
            : (isLight ? "#E2E8F0" : "#1E293B"),
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundImage: "none",
          transition: "transform .25s ease, box-shadow .25s ease",
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiAppBar: { defaultProps: { elevation: 0 } },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
        outlined: {
          borderColor: warm
            ? (isLight ? warm.line : warm.line2)
            : (isLight ? "#E2E8F0" : "#1E293B"),
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined", size: "medium" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingLeft: 20,
          paddingRight: 6,
          backgroundColor: bg,
        },
        input: { paddingBlock: 14 },
      },
    },
  };
}
