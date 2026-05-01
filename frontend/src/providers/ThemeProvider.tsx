import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline, PaletteMode } from "@mui/material";
import { buildTheme } from "@/theme";
import { useUserStore } from "@/store/userStore";

interface ColorModeCtx {
  mode: PaletteMode;
  toggle: () => void;
}

const ColorModeContext = createContext<ColorModeCtx>({
  mode: "light",
  toggle: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

const STORAGE_KEY = "mediq-theme";

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as
      | PaletteMode
      | null;
    if (stored === "light" || stored === "dark") setMode(stored);
  }, []);

  const ctx = useMemo<ColorModeCtx>(
    () => ({
      mode,
      toggle: () =>
        setMode((m) => {
          const next = m === "light" ? "dark" : "light";
          try {
            localStorage.setItem(STORAGE_KEY, next);
          } catch {}
          return next;
        }),
    }),
    [mode],
  );

  const isDyslexicMode = useUserStore((s) => s.isDyslexicMode);
  const theme = useMemo(() => buildTheme(mode, isDyslexicMode), [mode, isDyslexicMode]);

  return (
    <ColorModeContext.Provider value={ctx}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
