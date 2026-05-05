import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { buildTheme, AppMode } from "@/theme";
import { useUserStore } from "@/store/userStore";

interface ColorModeCtx {
  mode: AppMode;
  toggle: () => void;
}

const ColorModeContext = createContext<ColorModeCtx>({
  mode: "light",
  toggle: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

const STORAGE_KEY = "mediq-theme";
const MODES: AppMode[] = ["light", "dark", "warm"];

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>("light");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as AppMode | null;
    if (stored && MODES.includes(stored)) setMode(stored);
  }, []);

  const ctx = useMemo<ColorModeCtx>(
    () => ({
      mode,
      toggle: () =>
        setMode((m) => {
          const next = MODES[(MODES.indexOf(m) + 1) % MODES.length];
          try { localStorage.setItem(STORAGE_KEY, next); } catch {}
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
