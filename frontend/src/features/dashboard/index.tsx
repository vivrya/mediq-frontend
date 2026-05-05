import { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Card,
  Chip,
  LinearProgress,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useNavigate } from "react-router-dom";
import { AvailablePlans } from "./components/AvailablePlans";
import { SectionHeader } from "./components/SectionHeader";
import {
  WELCOME,
  MY_COURSES,
  CONTINUE_LEARNING,
  FLASHCARDS_PREVIEW,
  ENROLLED_COURSES,
  IN_PROGRESS_ITEMS,
} from "./constants";
import { useUserStore } from "@/store/userStore";
import { useThemeTokens } from "@/providers/ThemeProvider";

// ── Flip card used in the unlocked flashcard preview ──────────

function MiniFlipCard() {
  const [flipped, setFlipped] = useState(false);
  const tokens = useThemeTokens();
  return (
    <Box sx={{ perspective: 1000 }}>
      <Box
        onClick={() => setFlipped((v) => !v)}
        data-testid="dash-flashcard-flip"
        sx={{
          position: "relative",
          height: 160,
          cursor: "pointer",
          transformStyle: "preserve-3d",
          transition: "transform .6s cubic-bezier(.22,1,.36,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
        }}
      >
        <Card
          sx={{
            position: "absolute",
            inset: 0,
            p: 2.5,
            backfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: 4,
            borderTop: `3px solid ${tokens.featureBorderTop}`,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="overline" color="text.secondary" sx={{ fontSize: 9, letterSpacing: "0.2em", fontWeight: 600 }}>
              ANATOMY · SAMPLE
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "text.secondary" }}>
              <AutorenewIcon sx={{ fontSize: 12 }} />
              <Typography variant="caption" sx={{ fontSize: 10 }}>Tap to flip</Typography>
            </Stack>
          </Stack>
          <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.4 }}>
            What are the roots of the brachial plexus?
          </Typography>
          <Chip label="Easy" size="small" color="success" sx={{ alignSelf: "flex-start", fontWeight: 700, fontSize: 9, height: 18 }} />
        </Card>

        <Card
          sx={{
            position: "absolute",
            inset: 0,
            p: 2.5,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: 6,
          }}
        >
          <Typography variant="overline" sx={{ fontSize: 9, letterSpacing: "0.2em", fontWeight: 700, opacity: 0.8 }}>
            ANSWER
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.5 }}>
            C5, C6, C7, C8, T1 — "Rugby Teams Drink Cold Beer"
          </Typography>
          <Stack direction="row" spacing={0.75}>
            <Chip label="Nerves" size="small" sx={{ bgcolor: "rgba(255,255,255,.2)", color: "#fff", fontSize: 9, height: 18 }} />
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}

// ── Page ───────────────────────────────────────────────────────

export default function DashboardPage() {
  const { profile } = useUserStore();
  const navigate = useNavigate();
  const tokens = useThemeTokens();
  const active = profile.isActive;

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>

      {/* Welcome */}
      <Box sx={{ mb: 5 }} data-testid="dash-welcome">
        <Chip
          icon={<AutoAwesomeIcon />}
          label={WELCOME.badge}
          color="success"
          variant="outlined"
          size="small"
          sx={{ mb: 2, letterSpacing: "0.15em" }}
        />
        <Typography variant="h3" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: 700 }}>
          {WELCOME.heading}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1.5, fontSize: "1.125rem", maxWidth: 560 }}>
          {WELCOME.description}
        </Typography>
      </Box>

      {/* ── My Courses ── */}
      <Box sx={{ mb: 6 }} data-testid="dash-my-courses">
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <SectionHeader title={MY_COURSES.title} subtitle={MY_COURSES.subtitle} />
          {active && (
            <Button
              size="small"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/dashboard/my-courses")}
              sx={{ flexShrink: 0 }}
            >
              Browse all
            </Button>
          )}
        </Stack>

        {active ? (
          <Grid container spacing={3}>
            {ENROLLED_COURSES.map((c) => {
              const pct = Math.round((c.completedLessons / c.totalLessons) * 100);
              return (
                <Grid key={c.courseId} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    variant="outlined"
                    onClick={() => navigate(`/dashboard/courses/${c.courseId}`)}
                    data-testid={`dash-enrolled-${c.courseId}`}
                    sx={{
                      p: 2.5,
                      cursor: "pointer",
                      transition: "box-shadow 0.2s, transform 0.2s",
                      "&:hover": { boxShadow: 4, transform: "translateY(-2px)" },
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, bgcolor: c.color }} />
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                      <Avatar sx={{ bgcolor: c.color + "18", color: c.color, width: 40, height: 40, fontWeight: 800, fontSize: 16 }}>
                        {c.name[0]}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }} noWrap>
                          {c.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                          {c.category}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.75 }}>
                      <Typography variant="caption" color="text.secondary">
                        {c.completedLessons} / {c.totalLessons} lessons
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: c.color }}>
                        {pct}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      sx={{ height: 6, borderRadius: 3, bgcolor: c.color + "20", "& .MuiLinearProgress-bar": { bgcolor: c.color } }}
                    />
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Card
            variant="outlined"
            sx={{ p: { xs: 4, md: 6 }, textAlign: "center", borderStyle: "dashed", borderWidth: 2, bgcolor: "action.hover" }}
            data-testid="dash-courses-empty"
          >
            <Box sx={{ width: 72, height: 72, borderRadius: 3, bgcolor: "primary.light", color: "primary.dark", mx: "auto", display: "flex", alignItems: "center", justifyContent: "center", mb: 2.5 }}>
              <MenuBookOutlinedIcon sx={{ fontSize: 36 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{MY_COURSES.emptyHeading}</Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 460, mx: "auto", mt: 1 }}>
              {MY_COURSES.emptyDescription}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center" sx={{ mt: 3 }}>
              <Button variant="outlined" color="inherit" onClick={() => navigate("/dashboard/courses")} data-testid="dash-view-courses" sx={{ borderColor: "divider" }}>
                {MY_COURSES.viewCoursesBtn}
              </Button>
              <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} onClick={() => navigate("/dashboard/demo")} data-testid="dash-get-access">
                {MY_COURSES.getAccessBtn}
              </Button>
            </Stack>
          </Card>
        )}
      </Box>

      {!active && <AvailablePlans />}

      {/* ── Continue Learning + Flashcards ── */}
      <Grid container spacing={3} sx={{ mb: 6 }}>

        {/* Continue Learning */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card variant="outlined" sx={{ p: { xs: 3, md: 4 }, height: "100%" }} data-testid="dash-continue-learning">
            <SectionHeader title={CONTINUE_LEARNING.title} subtitle={CONTINUE_LEARNING.subtitle} compact />

            {active ? (
              <Stack spacing={1.25} sx={{ mt: 2 }}>
                {IN_PROGRESS_ITEMS.map((item) => {
                  const Icon = item.type === "video" ? PlayCircleOutlinedIcon : LayersOutlinedIcon;
                  const dest = item.type === "video"
                    ? `/dashboard/courses/${item.courseId}`
                    : `/dashboard/flashcards/${item.deckId}`;
                  return (
                    <Card
                      key={item.id}
                      variant="outlined"
                      onClick={() => navigate(dest)}
                      data-testid={`dash-inprogress-${item.id}`}
                      sx={{
                        p: 1.75,
                        cursor: "pointer",
                        transition: "box-shadow 0.15s, transform 0.15s",
                        "&:hover": { boxShadow: 3, transform: "translateX(3px)" },
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: item.color + "18", color: item.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon sx={{ fontSize: 18 }} />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }} noWrap>
                            {item.title}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary" noWrap sx={{ flex: 1 }}>
                              {item.subtitle}
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: item.color, flexShrink: 0 }}>
                              {item.meta}
                            </Typography>
                          </Stack>
                          <LinearProgress
                            variant="determinate"
                            value={item.progress}
                            sx={{ mt: 0.75, height: 4, borderRadius: 2, bgcolor: item.color + "20", "& .MuiLinearProgress-bar": { bgcolor: item.color } }}
                          />
                        </Box>
                        <ArrowForwardIcon sx={{ fontSize: 16, color: "text.disabled", flexShrink: 0 }} />
                      </Stack>
                    </Card>
                  );
                })}
              </Stack>
            ) : (
              <Box sx={{ mt: 2, p: 4, borderRadius: 3, border: 1, borderColor: "divider", bgcolor: "action.hover", textAlign: "center" }}>
                <LockOutlinedIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{CONTINUE_LEARNING.heading}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 420, mx: "auto" }}>
                  {CONTINUE_LEARNING.description}
                </Typography>
                <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} onClick={() => navigate("/dashboard/demo")} sx={{ mt: 2.5 }} data-testid="dash-continue-unlock">
                  {CONTINUE_LEARNING.button}
                </Button>
              </Box>
            )}
          </Card>
        </Grid>

        {/* Flashcard preview */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card variant="outlined" sx={{ p: { xs: 3, md: 4 }, height: "100%" }} data-testid="dash-flashcards-preview">
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <SectionHeader title={FLASHCARDS_PREVIEW.title} subtitle={FLASHCARDS_PREVIEW.subtitle} compact />
              {active && (
                <Button size="small" endIcon={<ArrowForwardIcon />} onClick={() => navigate("/dashboard/flashcards")}>
                  All decks
                </Button>
              )}
            </Stack>

            {active ? (
              <Box>
                <MiniFlipCard />
                <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                  {["Hard", "Medium", "Easy"].map((l, i) => (
                    <Button key={l} fullWidth variant={i === 2 ? "contained" : "outlined"} color={i === 2 ? "success" : "inherit"} size="small" sx={{ fontWeight: 700 }}>
                      {l}
                    </Button>
                  ))}
                </Stack>
              </Box>
            ) : (
              <Box sx={{ position: "relative", mt: 2, minHeight: 240 }}>
                <Box sx={{ position: "absolute", inset: 0, borderRadius: 3, filter: "blur(2px)", background: tokens.heroOverlay }} />
                <Card sx={{ position: "absolute", top: 16, left: 16, width: 170, p: 1.5, transform: "rotate(-6deg)", boxShadow: 3, filter: "blur(1px)", opacity: 0.85 }}>
                  <Typography variant="overline" color="text.secondary" sx={{ fontSize: 9 }}>{FLASHCARDS_PREVIEW.card1Subject}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 12, mt: 0.5 }}>{FLASHCARDS_PREVIEW.card1Question}</Typography>
                  <LinearProgress variant="determinate" value={33} color="success" sx={{ mt: 1, height: 4, borderRadius: 2 }} />
                </Card>
                <Card sx={{ position: "absolute", top: 48, right: 12, width: 170, p: 1.5, bgcolor: "primary.main", color: "primary.contrastText", transform: "rotate(5deg)", boxShadow: 4, filter: "blur(1px)", opacity: 0.85 }}>
                  <Typography variant="overline" sx={{ fontSize: 9, opacity: 0.85 }}>{FLASHCARDS_PREVIEW.card2Subject}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 12, mt: 0.5 }}>{FLASHCARDS_PREVIEW.card2Answer}</Typography>
                </Card>
                <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", p: 3, zIndex: 2 }}>
                  <Box sx={{ width: 56, height: 56, borderRadius: "50%", bgcolor: "background.paper", boxShadow: 4, display: "flex", alignItems: "center", justifyContent: "center", mb: 1.5, border: 1, borderColor: "divider" }}>
                    <LockOutlinedIcon color="primary" />
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 700, maxWidth: 260 }}>{FLASHCARDS_PREVIEW.heading}</Typography>
                  <Button variant="contained" color="primary" size="small" sx={{ mt: 2 }} onClick={() => navigate("/dashboard/demo")} data-testid="dash-flashcards-unlock">
                    {FLASHCARDS_PREVIEW.button}
                  </Button>
                </Box>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
