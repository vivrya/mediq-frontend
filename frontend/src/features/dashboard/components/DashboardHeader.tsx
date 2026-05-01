import { useState } from "react";
import { Box, Container, Stack, Typography, Chip, Avatar, IconButton, Tooltip } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { ProfileMenu } from "./ProfileMenu";
import { HEADER } from "../constants";
import { useUserStore } from "@/store/userStore";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good evening";
}

export function DashboardHeader() {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const profile = useUserStore((s) => s.profile);

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        bgcolor: "background.default",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Stack direction="row" alignItems="center" py={2} spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.18em", display: "block", lineHeight: 1 }}>
              {HEADER.dayLabel}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }} data-testid="dash-header-title">
              {getGreeting()}, {profile.name} 👋
            </Typography>
          </Box>
          <Chip
            icon={<LocalFireDepartmentIcon sx={{ color: "#F59E0B !important" }} />}
            label={HEADER.streakLabel}
            data-testid="dash-streak"
            sx={{ fontWeight: 600 }}
          />
          <Tooltip title={HEADER.notificationsTooltip}>
            <IconButton sx={{ border: 1, borderColor: "divider" }} data-testid="dash-notifications">
              <NotificationsNoneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <ThemeToggle />
          <Tooltip title="Profile & settings">
            <Avatar
              onClick={(e) => setMenuAnchor(e.currentTarget)}
              sx={{
                bgcolor: "primary.main",
                width: 36,
                height: 36,
                fontWeight: 700,
                cursor: "pointer",
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: 4 },
              }}
              data-testid="dash-avatar"
            >
              {profile.avatarInitial}
            </Avatar>
          </Tooltip>
        </Stack>
      </Container>

      <ProfileMenu anchorEl={menuAnchor} onClose={() => setMenuAnchor(null)} />
    </Box>
  );
}
