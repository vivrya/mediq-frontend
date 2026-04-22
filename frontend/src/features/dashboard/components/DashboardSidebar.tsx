import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  Chip,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Logo } from "@/components/shared/Logo";

export const SIDEBAR_WIDTH = 248;

const navItems = [
  { icon: DashboardOutlinedIcon, label: "Dashboard", active: true, testid: "dash-nav-home" },
  { icon: MenuBookOutlinedIcon, label: "My Courses", testid: "dash-nav-courses" },
  { icon: PlayCircleOutlinedIcon, label: "Video Chunks", testid: "dash-nav-videos" },
  { icon: LayersOutlinedIcon, label: "Flashcards", testid: "dash-nav-flashcards" },
  { icon: InsightsOutlinedIcon, label: "Progress", testid: "dash-nav-progress" },
  { icon: SettingsOutlinedIcon, label: "Settings", testid: "dash-nav-settings" },
];

export function DashboardSidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          borderRight: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          px: 1.5,
          py: 2,
        },
      }}
      data-testid="dash-sidebar"
    >
      <Box sx={{ px: 1.5, mb: 2 }}>
        <Logo />
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List sx={{ p: 0 }}>
        {navItems.map((it) => {
          const Icon = it.icon;
          return (
            <ListItemButton
              key={it.label}
              data-testid={it.testid}
              selected={it.active}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                "&.Mui-selected": {
                  bgcolor: (t) => (t.palette.mode === "light" ? "primary.light" : "action.selected"),
                  color: (t) => (t.palette.mode === "light" ? "primary.dark" : "text.primary"),
                  "&:hover": { bgcolor: "primary.light" },
                  "& .MuiListItemIcon-root": {
                    color: (t) => (t.palette.mode === "light" ? "primary.dark" : "text.primary"),
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}>
                {it.label}
              </ListItemText>
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ mt: "auto", pt: 3 }}>
        <Card
          variant="outlined"
          sx={{
            p: 2,
            bgcolor: (t) => (t.palette.mode === "light" ? "primary.light" : "rgba(59,130,246,.1)"),
            borderColor: "primary.main",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <AutoAwesomeIcon fontSize="small" color="primary" />
            <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.dark" }}>
              Upgrade to Pro
            </Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
            Unlock all chunks, adaptive flashcards and mock exams.
          </Typography>
          <Button
            fullWidth
            size="small"
            variant="contained"
            color="primary"
            data-testid="dash-sidebar-upgrade"
            sx={{ mt: 1.5 }}
            href="#plans"
          >
            See plans
          </Button>
        </Card>
        <ListItemButton
          component={RouterLink}
          to="/"
          data-testid="dash-nav-logout"
          sx={{ borderRadius: 2, mt: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>
            <ArrowBackIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}>
            Back to site
          </ListItemText>
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
