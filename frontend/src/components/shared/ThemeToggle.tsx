import { IconButton, Tooltip } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useColorMode } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { mode, toggle } = useColorMode();
  const isDark = mode === "dark";
  return (
    <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton
        onClick={toggle}
        data-testid="theme-toggle"
        size="small"
        sx={{
          border: 1,
          borderColor: "divider",
          color: "text.primary",
        }}
      >
        {isDark ? (
          <LightModeOutlinedIcon fontSize="small" />
        ) : (
          <DarkModeOutlinedIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}
