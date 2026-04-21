import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
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
  Avatar,
  IconButton,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Logo } from "@/components/mediq/Logo";
import { ThemeToggle } from "@/components/mediq/ThemeToggle";

const SIDEBAR_WIDTH = 248;

const navItems = [
  { icon: DashboardOutlinedIcon, label: "Dashboard", active: true, testid: "dash-nav-home" },
  { icon: MenuBookOutlinedIcon, label: "My Courses", testid: "dash-nav-courses" },
  { icon: PlayCircleOutlinedIcon, label: "Video Chunks", testid: "dash-nav-videos" },
  { icon: LayersOutlinedIcon, label: "Flashcards", testid: "dash-nav-flashcards" },
  { icon: InsightsOutlinedIcon, label: "Progress", testid: "dash-nav-progress" },
  { icon: SettingsOutlinedIcon, label: "Settings", testid: "dash-nav-settings" },
];

const fullPlans = [
  {
    id: "ug",
    name: "UG Complete Plan",
    tag: "For MBBS UG",
    price: "$12",
    cadence: "/ month",
    features: ["All UG subjects & chunks", "Adaptive flashcards", "Focus mode + streaks", "Export to Anki / Notion"],
    highlight: true,
  },
  {
    id: "pg",
    name: "PG Complete Plan",
    tag: "USMLE · NEET PG · PLAB",
    price: "$29",
    cadence: "/ month",
    features: ["All PG MCQ banks (20k+)", "Mock exams with analytics", "1:1 mentor sessions", "Priority support"],
  },
];

const subjectPlans = [
  { id: "anatomy", name: "Anatomy", chapters: 42, price: "$6", color: "#0F52BA" },
  { id: "pharmacology", name: "Pharmacology", chapters: 38, price: "$6", color: "#10B981" },
  { id: "pathology", name: "Pathology", chapters: 35, price: "$6", color: "#7C3AED" },
  { id: "medicine", name: "Medicine", chapters: 64, price: "$8", color: "#F59E0B" },
];

export default function Dashboard() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", display: "flex" }}>
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
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}>
              Back to site
            </ListItemText>
          </ListItemButton>
        </Box>
      </Drawer>

      {/* Main */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
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

        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>
          {/* 1. Welcome */}
          <Box sx={{ mb: 5 }} data-testid="dash-welcome">
            <Chip
              icon={<AutoAwesomeIcon />}
              label="WELCOME BACK"
              color="success"
              variant="outlined"
              size="small"
              sx={{ mb: 2, letterSpacing: "0.15em" }}
            />
            <Typography variant="h3" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: 700 }}>
              Welcome to Mediq 👋
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1.5, fontSize: "1.125rem", maxWidth: 560 }}>
              Learn smarter. Stay consistent. Your next 7-minute chunk is one click away.
            </Typography>
          </Box>

          {/* 2. My Courses */}
          <Box sx={{ mb: 6 }} data-testid="dash-my-courses">
            <SectionHeader title="My Courses" subtitle="Your active learning tracks" />
            <Card
              variant="outlined"
              sx={{
                p: { xs: 4, md: 6 },
                textAlign: "center",
                borderStyle: "dashed",
                borderWidth: 2,
                bgcolor: "action.hover",
              }}
              data-testid="dash-courses-empty"
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: 3,
                  bgcolor: "primary.light",
                  color: "primary.dark",
                  mx: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2.5,
                }}
              >
                <MenuBookOutlinedIcon sx={{ fontSize: 36 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                You don't have any active courses yet.
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 460, mx: "auto", mt: 1 }}>
                Choose a full course or a subject-wise plan to start learning — most medics unlock access within 60 seconds.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center" sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  color="inherit"
                  href="#plans"
                  data-testid="dash-view-courses"
                  sx={{ borderColor: "divider" }}
                >
                  View courses
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  href="#plans"
                  data-testid="dash-get-access"
                >
                  Get access
                </Button>
              </Stack>
            </Card>
          </Box>

          {/* 3. Available Plans */}
          <Box sx={{ mb: 6 }} id="plans" data-testid="dash-available-plans">
            <SectionHeader title="Available plans" subtitle="Full plans or single subjects — pick your pace" />

            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.15em", display: "block", mb: 1.5 }}>
              FULL PLANS
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {fullPlans.map((p) => (
                <Grid size={{ xs: 12, md: 6 }} key={p.id}>
                  <Card
                    variant={p.highlight ? "elevation" : "outlined"}
                    elevation={p.highlight ? 6 : 0}
                    sx={{
                      p: { xs: 3, md: 4 },
                      height: "100%",
                      position: "relative",
                      ...(p.highlight
                        ? { borderTop: 4, borderColor: "primary.main" }
                        : {}),
                    }}
                    data-testid={`dash-plan-${p.id}`}
                  >
                    {p.highlight && (
                      <Chip
                        label="MOST POPULAR"
                        color="primary"
                        size="small"
                        sx={{ position: "absolute", top: 16, right: 16, fontWeight: 700, letterSpacing: "0.1em" }}
                      />
                    )}
                    <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.2em", fontWeight: 600 }}>
                      {p.tag}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
                      {p.name}
                    </Typography>
                    <Stack direction="row" alignItems="flex-end" spacing={0.75} sx={{ mt: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, fontSize: "2.75rem", lineHeight: 1 }}>
                        {p.price}
                      </Typography>
                      <Typography color="text.secondary" sx={{ pb: 1 }}>
                        {p.cadence}
                      </Typography>
                    </Stack>
                    <Stack spacing={1.25} sx={{ mt: 2.5 }}>
                      {p.features.map((f) => (
                        <Stack key={f} direction="row" spacing={1.25} alignItems="center">
                          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 18 }} />
                          <Typography variant="body2">{f}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <Button
                      fullWidth
                      size="large"
                      variant={p.highlight ? "contained" : "outlined"}
                      color={p.highlight ? "primary" : "inherit"}
                      sx={{ mt: 3 }}
                      data-testid={`dash-plan-${p.id}-buy`}
                    >
                      Buy now
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.15em", display: "block", mb: 1.5 }}>
              SUBJECT-WISE PLANS
            </Typography>
            <Grid container spacing={2.5}>
              {subjectPlans.map((s) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={s.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      p: 2.5,
                      height: "100%",
                      transition: "transform .2s ease, box-shadow .2s ease",
                      "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
                    }}
                    data-testid={`dash-subject-${s.id}`}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        bgcolor: s.color + "20",
                        color: s.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: 18,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.name[0]}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }}>
                      {s.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {s.chapters} chapters · 3-7 min chunks
                    </Typography>
                    <Stack direction="row" alignItems="flex-end" spacing={0.5} sx={{ mt: 2 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {s.price}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ pb: 0.4 }}>
                        / month
                      </Typography>
                    </Stack>
                    <Button
                      fullWidth
                      size="small"
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      data-testid={`dash-subject-${s.id}-buy`}
                    >
                      Buy now
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* 4 + 5 row */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Card variant="outlined" sx={{ p: { xs: 3, md: 4 }, height: "100%", position: "relative", overflow: "hidden" }} data-testid="dash-continue-learning">
                <SectionHeader title="Continue learning" subtitle="Pick up where you left off" compact />
                <Box
                  sx={{
                    mt: 2,
                    p: 4,
                    borderRadius: 3,
                    border: 1,
                    borderColor: "divider",
                    bgcolor: "action.hover",
                    textAlign: "center",
                  }}
                >
                  <LockOutlinedIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Subscribe to unlock lessons, quizzes and flashcards.
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 420, mx: "auto" }}>
                    Your personalised study playlist appears here the moment your plan is active.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    href="#plans"
                    sx={{ mt: 2.5 }}
                    data-testid="dash-continue-unlock"
                  >
                    Choose a plan
                  </Button>
                </Box>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Card variant="outlined" sx={{ p: { xs: 3, md: 4 }, height: "100%", position: "relative", overflow: "hidden" }} data-testid="dash-flashcards-preview">
                <SectionHeader title="Flashcards preview" subtitle="Active recall, scheduled perfectly" compact />
                <Box sx={{ position: "relative", mt: 2, minHeight: 240 }}>
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 3,
                      background: (t) =>
                        t.palette.mode === "light"
                          ? "linear-gradient(135deg, rgba(15,82,186,.14), rgba(16,185,129,.14))"
                          : "linear-gradient(135deg, rgba(59,130,246,.18), rgba(16,185,129,.18))",
                      filter: "blur(2px)",
                    }}
                  />
                  <Card
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      width: 170,
                      p: 1.5,
                      transform: "rotate(-6deg)",
                      boxShadow: 3,
                      filter: "blur(1px)",
                      opacity: 0.85,
                    }}
                  >
                    <Typography variant="overline" color="text.secondary" sx={{ fontSize: 9 }}>
                      Anatomy
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 12, mt: 0.5 }}>
                      Brachial plexus roots?
                    </Typography>
                    <LinearProgress variant="determinate" value={33} color="success" sx={{ mt: 1, height: 4, borderRadius: 2 }} />
                  </Card>
                  <Card
                    sx={{
                      position: "absolute",
                      top: 48,
                      right: 12,
                      width: 170,
                      p: 1.5,
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      transform: "rotate(5deg)",
                      boxShadow: 4,
                      filter: "blur(1px)",
                      opacity: 0.85,
                    }}
                  >
                    <Typography variant="overline" sx={{ fontSize: 9, opacity: 0.85 }}>
                      Pharma
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 12, mt: 0.5 }}>
                      β-lactams mechanism
                    </Typography>
                  </Card>

                  {/* Locked overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      textAlign: "center",
                      p: 3,
                      zIndex: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        bgcolor: "background.paper",
                        boxShadow: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1.5,
                        border: 1,
                        borderColor: "divider",
                      }}
                    >
                      <LockOutlinedIcon color="primary" />
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 700, maxWidth: 260 }}>
                      Boost memory with smart flashcards.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mt: 2 }}
                      href="#plans"
                      data-testid="dash-flashcards-unlock"
                    >
                      Unlock access
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

function SectionHeader({
  title,
  subtitle,
  compact,
}: {
  title: string;
  subtitle?: string;
  compact?: boolean;
}) {
  return (
    <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ mb: compact ? 0 : 2.5 }}>
      <Box>
        <Typography variant={compact ? "h6" : "h5"} sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
