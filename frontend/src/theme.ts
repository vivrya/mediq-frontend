import { createTheme, ThemeOptions, PaletteMode } from "@mui/material";

const baseTypography: ThemeOptions["typography"] = {
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  h1: { fontWeight: 700, letterSpacing: "-0.02em" },
  h2: { fontWeight: 700, letterSpacing: "-0.01em" },
  h3: { fontWeight: 600, letterSpacing: "-0.01em" },
  h4: { fontWeight: 600 },
  h5: { fontWeight: 500 },
  h6: { fontWeight: 500 },
  button: { textTransform: "none", fontWeight: 500 },
};

export function buildTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
      primary: { main: "#1976d2" },
      secondary: { main: "#9c27b0" },
      success: { main: "#2e7d32" },
      info: { main: "#0288d1" },
      warning: { main: "#ed6c02" },
      error: { main: "#d32f2f" },
      background:
        mode === "light"
          ? { default: "#fafafa", paper: "#ffffff" }
          : { default: "#0a0f1c", paper: "#111827" },
    },
    typography: baseTypography,
    shape: { borderRadius: 8 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999, paddingInline: 20, paddingBlock: 8 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 16 },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0 },
      },
    },
  });
}
