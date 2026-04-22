import { Box, Container, Stack, Typography, Chip, Avatar, IconButton, Tooltip } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function DashboardHeader() {
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
              MONDAY · DAY 14
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }} data-testid="dash-header-title">
              Dashboard
            </Typography>
          </Box>
          <Chip
            icon={<LocalFireDepartmentIcon sx={{ color: "#F59E0B !important" }} />}
            label="14-day streak"
            data-testid="dash-streak"
            sx={{ fontWeight: 600 }}
          />
          <Tooltip title="Notifications">
            <IconButton sx={{ border: 1, borderColor: "divider" }} data-testid="dash-notifications">
              <NotificationsNoneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <ThemeToggle />
          <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36, fontWeight: 700 }} data-testid="dash-avatar">
            M
          </Avatar>
        </Stack>
      </Container>
    </Box>
  );
}
