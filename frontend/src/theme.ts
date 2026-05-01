import { createTheme, ThemeOptions, PaletteMode, alpha } from "@mui/material";

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

export function buildTheme(mode: PaletteMode, isDyslexicMode = false) {
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
    components: {
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
          body {
            selection-background-color: ${alpha(sapphire, 0.2)};
          }
          ::selection {
            background-color: ${alpha(sapphire, 0.2)};
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
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
          containedPrimary: {
            boxShadow: `0 10px 30px -10px ${alpha(sapphire, 0.55)}`,
            "&:hover": { boxShadow: `0 14px 36px -10px ${alpha(sapphire, 0.65)}` },
          },
          containedSuccess: {
            boxShadow: `0 10px 30px -10px ${alpha(emerald, 0.5)}`,
          },
          outlined: {
            borderColor: isLight ? "#E2E8F0" : "#1E293B",
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
          outlined: { borderColor: isLight ? "#E2E8F0" : "#1E293B" },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          size: "medium",
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingLeft: 20,
            paddingRight: 6,
            backgroundColor: isLight ? "#FFFFFF" : "#0B1220",
          },
          input: {
            paddingBlock: 14,
          },
        },
      },
    },
  });
}
