import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import { Logo } from "@/components/shared/Logo";
import { SIDEBAR } from "../constants";
import { useUserStore } from "@/store/userStore";

export const SIDEBAR_WIDTH = 248;

const navIcons = [
  DashboardOutlinedIcon,
  MenuBookOutlinedIcon,
  SchoolOutlinedIcon,
  LayersOutlinedIcon,
  InsightsOutlinedIcon,
  SettingsOutlinedIcon,
];

// These routes require a subscription
const PREMIUM_PATHS = [
  "/dashboard/my-courses",
  "/dashboard/flashcards",
  "/dashboard/progress",
];

export function DashboardSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isSubscribed } = useUserStore();

  function handleNavClick(to: string, isPremium: boolean) {
    if (!isSubscribed && isPremium) {
      navigate("/dashboard/demo");
    } else {
      navigate(to);
    }
  }

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
        {SIDEBAR.navItems.map((it, i) => {
          const Icon = navIcons[i];
          const isPremium = PREMIUM_PATHS.includes(it.to);
          const locked = !isSubscribed && isPremium;
          const isActive =
            it.to === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(it.to);

          return (
            <Tooltip
              key={it.label}
              title={locked ? "Subscribe to unlock" : ""}
              placement="right"
              arrow
            >
              <ListItemButton
                onClick={() => handleNavClick(it.to, isPremium)}
                data-testid={it.testid}
                selected={isActive && !locked}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  opacity: locked ? 0.5 : 1,
                  "&.Mui-selected": {
                    bgcolor: (t) =>
                      t.palette.mode === "light" ? "primary.light" : "action.selected",
                    color: (t) =>
                      t.palette.mode === "light" ? "primary.dark" : "text.primary",
                    "&:hover": { bgcolor: "primary.light" },
                    "& .MuiListItemIcon-root": {
                      color: (t) =>
                        t.palette.mode === "light" ? "primary.dark" : "text.primary",
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
                {locked && (
                  <LockOutlinedIcon sx={{ fontSize: 13, color: "text.disabled" }} />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}

        {/* Demo item — only shown to non-subscribers */}
        {!isSubscribed && (
          <>
            <Divider sx={{ my: 1.5 }} />
            <ListItemButton
              component={RouterLink}
              to="/dashboard/demo"
              data-testid="dash-nav-demo"
              selected={pathname === "/dashboard/demo"}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                background: (t) =>
                  pathname === "/dashboard/demo"
                    ? undefined
                    : t.palette.mode === "light"
                    ? "linear-gradient(135deg, #ecfdf5 0%, #eff6ff 100%)"
                    : "linear-gradient(135deg, rgba(16,185,129,.12) 0%, rgba(15,82,186,.12) 100%)",
                border: "1px solid",
                borderColor: (t) =>
                  t.palette.mode === "light" ? "success.light" : "rgba(16,185,129,.3)",
                "&.Mui-selected": {
                  bgcolor: "success.light",
                  "& .MuiListItemIcon-root": { color: "success.dark" },
                },
                "&:hover": {
                  background: (t) =>
                    t.palette.mode === "light"
                      ? "linear-gradient(135deg, #d1fae5 0%, #dbeafe 100%)"
                      : "linear-gradient(135deg, rgba(16,185,129,.2) 0%, rgba(15,82,186,.2) 100%)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "success.main" }}>
                <OndemandVideoOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: 14, fontWeight: 700, color: "success.dark" }}
              >
                See how it works
              </ListItemText>
              <AutoAwesomeIcon sx={{ fontSize: 13, color: "success.main" }} />
            </ListItemButton>
          </>
        )}
      </List>

      <Box sx={{ mt: "auto", pt: 3 }}>
        {/* Upgrade card — only for non-subscribers */}
        {!isSubscribed && (
          <Card
            variant="outlined"
            sx={{
              p: 2,
              mb: 1,
              bgcolor: (t) =>
                t.palette.mode === "light" ? "primary.light" : "rgba(59,130,246,.1)",
              borderColor: "primary.main",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <AutoAwesomeIcon fontSize="small" color="primary" />
              <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.dark" }}>
                {SIDEBAR.upgradeTitle}
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
              {SIDEBAR.upgradeDescription}
            </Typography>
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="primary"
              data-testid="dash-sidebar-upgrade"
              component={RouterLink}
              to="/dashboard/demo"
              sx={{ mt: 1.5 }}
            >
              {SIDEBAR.upgradeButton}
            </Button>
          </Card>
        )}

        <ListItemButton
          component={RouterLink}
          to="/"
          data-testid="dash-nav-logout"
          sx={{ borderRadius: 2, mt: 1 }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>
            <ArrowBackIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}>
            {SIDEBAR.backToSite}
          </ListItemText>
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
