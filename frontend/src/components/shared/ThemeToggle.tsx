import { IconButton, Tooltip } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import { useColorMode } from "@/providers/ThemeProvider";

const META = {
  light: { icon: <DarkModeOutlinedIcon fontSize="small" />,  label: "Switch to dark mode"  },
  dark:  { icon: <WbTwilightIcon fontSize="small" />,        label: "Switch to warm mode"   },
  warm:  { icon: <LightModeOutlinedIcon fontSize="small" />, label: "Switch to light mode"  },
} as const;

export function ThemeToggle() {
  const { mode, toggle } = useColorMode();
  const { icon, label } = META[mode];

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={toggle}
        data-testid="theme-toggle"
        size="small"
        sx={{ border: 1, borderColor: "divider", color: "text.primary" }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
