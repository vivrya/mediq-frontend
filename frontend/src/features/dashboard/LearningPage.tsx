import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  Chip,
  Button,
  LinearProgress,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import EmojiNatureOutlinedIcon from "@mui/icons-material/EmojiNatureOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { BrainBloom, BRAIN_STAGE_LABELS as STAGE_LABELS, getStage } from "@/components/shared/BrainBloom";
import { ENROLLED_COURSES } from "./constants";
import { useUserStore } from "@/store/userStore";
import { useThemeTokens } from "@/providers/ThemeProvider";

export default function LearningPage() {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const tokens = useThemeTokens();

  const totalCompleted = ENROLLED_COURSES.reduce((s, c) => s + c.completedLessons, 0);
  const totalLessons   = ENROLLED_COURSES.reduce((s, c) => s + c.totalLessons, 0);
  const overallPct     = Math.round((totalCompleted / totalLessons) * 100);
  const blooming       = ENROLLED_COURSES.filter((c) => c.completedLessons === c.totalLessons).length;

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>

      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.75 }}>
        <EmojiNatureOutlinedIcon sx={{ color: "success.main", fontSize: 24 }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Your Learning Brain</Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 520 }}>
        Every lesson you complete grows your brain. Watch the flowers bloom as your knowledge deepens.
      </Typography>

      {/* Summary strip */}
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {[
          {
            icon: <LocalFireDepartmentIcon sx={{ color: tokens.fire, fontSize: 20 }} />,
            value: `${profile.streakDays} days`,
            label: "Current streak",
            bg: tokens.successSoft,
          },
          {
            icon: <EmojiNatureOutlinedIcon sx={{ color: tokens.success, fontSize: 20 }} />,
            value: ENROLLED_COURSES.length,
            label: "Plants growing",
            bg: tokens.successSoft,
          },
          {
            icon: <CheckCircleIcon sx={{ color: tokens.primary, fontSize: 20 }} />,
            value: totalCompleted,
            label: "Lessons completed",
            bg: tokens.primarySoft,
          },
          {
            icon: <span style={{ fontSize: 20 }}>🌸</span>,
            value: blooming,
            label: "Full blooms",
            bg: tokens.primarySoft,
          },
        ].map((s) => (
          <Grid key={s.label} size={{ xs: 6, sm: 3 }}>
            <Card variant="outlined" sx={{ p: 2, textAlign: "center", bgcolor: s.bg }}>
              <Stack alignItems="center" spacing={0.5}>
                {s.icon}
                <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1 }}>{s.value}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{s.label}</Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Overall garden progress */}
      <Card variant="outlined" sx={{ p: 3, mb: 5, background: tokens.cardBg }}>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
              Overall garden health
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {totalCompleted} of {totalLessons} lessons completed across all courses
            </Typography>
            <LinearProgress
              variant="determinate"
              value={overallPct}
              sx={{ mt: 1.5, height: 10, borderRadius: 5, bgcolor: "rgba(0,0,0,.06)", "& .MuiLinearProgress-bar": { background: tokens.progressGradient } }}
            />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: tokens.success, flexShrink: 0 }}>
            {overallPct}%
          </Typography>
        </Stack>
      </Card>

      {/* Plant cards */}
      <Grid container spacing={3}>
        {ENROLLED_COURSES.map((course) => {
          const pct     = Math.round((course.completedLessons / course.totalLessons) * 100);
          const stage   = getStage(pct);
          const isDone  = pct === 100;

          return (
            <Grid key={course.courseId} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card
                variant="outlined"
                data-testid={`learning-card-${course.courseId}`}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  transition: "box-shadow 0.25s, transform 0.25s",
                  "&:hover": { boxShadow: 6, transform: "translateY(-3px)" },
                  ...(isDone && {
                    background: (t) =>
                      tokens.doneCardBg,
                  }),
                }}
              >
                {/* Plant illustration area */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: 3,
                    pb: 1,
                    position: "relative",
                    background: `linear-gradient(180deg, ${course.color}12 0%, transparent 100%)`,
                  }}
                >
                  <BrainBloom progress={pct} size={150} />

                  {/* Stage label */}
                  <Chip
                    label={STAGE_LABELS[stage]}
                    size="small"
                    sx={{
                      mt: 1,
                      fontWeight: 700,
                      fontSize: 10,
                      height: 22,
                      bgcolor: course.color + "18",
                      color: course.color,
                    }}
                  />
                </Box>

                {/* Course info */}
                <Box sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
                  <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1.5 }}>
                    <Avatar
                      sx={{ bgcolor: course.color + "18", color: course.color, width: 32, height: 32, fontSize: 14, fontWeight: 800, flexShrink: 0 }}
                    >
                      {course.name[0]}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", display: "block" }}>
                        {course.category}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }} noWrap>
                        {course.name}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Progress bar */}
                  <Box sx={{ mb: 2 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.6 }}>
                      <Typography variant="caption" color="text.secondary">
                        {course.completedLessons} / {course.totalLessons} lessons
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: course.color }}>
                        {pct}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: course.color + "1A",
                        "& .MuiLinearProgress-bar": { bgcolor: course.color },
                      }}
                    />
                  </Box>

                  {/* CTA */}
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    endIcon={isDone
                      ? <CheckCircleIcon sx={{ fontSize: "14px !important" }} />
                      : <ArrowForwardIcon sx={{ fontSize: "14px !important" }} />
                    }
                    onClick={() => navigate(`/dashboard/courses/${course.courseId}`)}
                    data-testid={`learning-card-${course.courseId}-cta`}
                    sx={{
                      mt: "auto",
                      borderColor: course.color + "55",
                      color: course.color,
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      py: 0.75,
                      "&:hover": { borderColor: course.color, bgcolor: course.color + "0D" },
                    }}
                  >
                    {isDone ? "Review course" : pct === 0 ? "Start learning" : "Continue"}
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

    </Container>
  );
}
