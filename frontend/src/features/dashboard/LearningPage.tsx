import { useState } from "react";
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
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import EmojiNatureOutlinedIcon from "@mui/icons-material/EmojiNatureOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import { PlantGrowth, STAGE_LABELS, getStage } from "./components/PlantGrowth";
import { ENROLLED_COURSES } from "./constants";
import { useUserStore } from "@/store/userStore";

const TODAY = new Date("2026-05-05");

function daysSince(dateStr: string | null): number | null {
  if (!dateStr) return null;
  return Math.floor((TODAY.getTime() - new Date(dateStr).getTime()) / 86_400_000);
}

type ViewMode = "garden" | "list";

export default function LearningPage() {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const [view, setView] = useState<ViewMode>("garden");

  const totalCompleted = ENROLLED_COURSES.reduce((s, c) => s + c.completedLessons, 0);
  const totalLessons   = ENROLLED_COURSES.reduce((s, c) => s + c.totalLessons, 0);
  const overallPct     = Math.round((totalCompleted / totalLessons) * 100);
  const blooming       = ENROLLED_COURSES.filter((c) => c.completedLessons === c.totalLessons).length;

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>

      {/* ── Header ── */}
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 4 }}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.75 }}>
            <EmojiNatureOutlinedIcon sx={{ color: "success.main", fontSize: 24 }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Your Learning Garden</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 480 }}>
            Each course grows as you learn. Keep watering your knowledge — watch your garden bloom.
          </Typography>
        </Box>

        {/* View toggle */}
        <ToggleButtonGroup
          exclusive
          value={view}
          onChange={(_, v) => { if (v) setView(v); }}
          size="small"
          sx={{ height: 36, flexShrink: 0 }}
        >
          <ToggleButton value="garden" data-testid="view-garden">
            <Tooltip title="Garden view">
              <GridViewRoundedIcon fontSize="small" />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="list" data-testid="view-list">
            <Tooltip title="List view">
              <ViewListRoundedIcon fontSize="small" />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {/* ── Summary strip ── */}
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {[
          {
            icon: <LocalFireDepartmentIcon sx={{ color: "#F59E0B", fontSize: 20 }} />,
            value: `${profile.streakDays} days`,
            label: "Current streak",
            bg: "#FEF3C7",
            darkBg: "rgba(245,158,11,.12)",
          },
          {
            icon: <EmojiNatureOutlinedIcon sx={{ color: "#10B981", fontSize: 20 }} />,
            value: ENROLLED_COURSES.length,
            label: "Plants growing",
            bg: "#ECFDF5",
            darkBg: "rgba(16,185,129,.12)",
          },
          {
            icon: <CheckCircleIcon sx={{ color: "#0F52BA", fontSize: 20 }} />,
            value: totalCompleted,
            label: "Lessons completed",
            bg: "#EFF6FF",
            darkBg: "rgba(15,82,186,.12)",
          },
          {
            icon: <span style={{ fontSize: 20 }}>🌸</span>,
            value: blooming,
            label: "Full blooms",
            bg: "#FDF4FF",
            darkBg: "rgba(192,86,173,.12)",
          },
        ].map((s) => (
          <Grid key={s.label} size={{ xs: 6, sm: 3 }}>
            <Card
              variant="outlined"
              sx={{ p: 2, textAlign: "center", bgcolor: (t) => t.palette.mode === "light" ? s.bg : s.darkBg }}
            >
              <Stack alignItems="center" spacing={0.5}>
                {s.icon}
                <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1 }}>{s.value}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{s.label}</Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ── Overall progress ── */}
      <Card
        variant="outlined"
        sx={{
          p: 3, mb: 5,
          background: (t) =>
            t.palette.mode === "light"
              ? "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)"
              : "linear-gradient(135deg, rgba(16,185,129,.08) 0%, rgba(15,82,186,.08) 100%)",
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>Overall garden health</Typography>
            <Typography variant="caption" color="text.secondary">
              {totalCompleted} of {totalLessons} lessons completed across all courses
            </Typography>
            <LinearProgress
              variant="determinate"
              value={overallPct}
              sx={{
                mt: 1.5, height: 10, borderRadius: 5,
                bgcolor: "rgba(0,0,0,.06)",
                "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg, #10B981, #0F52BA)" },
              }}
            />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "success.main", flexShrink: 0 }}>
            {overallPct}%
          </Typography>
        </Stack>
      </Card>

      {/* ── Garden view ── */}
      {view === "garden" && (
        <Grid container spacing={3}>
          {ENROLLED_COURSES.map((course) => {
            const pct    = Math.round((course.completedLessons / course.totalLessons) * 100);
            const stage  = getStage(pct);
            const isDone = pct === 100;
            const days   = daysSince(course.lastActivityOn);
            const stale  = days !== null && days >= 10;

            return (
              <Grid key={course.courseId} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Card
                  variant="outlined"
                  data-testid={`learning-card-${course.courseId}`}
                  sx={{
                    height: "100%", display: "flex", flexDirection: "column", overflow: "hidden",
                    transition: "box-shadow 0.25s, transform 0.25s",
                    "&:hover": { boxShadow: 6, transform: "translateY(-3px)" },
                    ...(stale && { borderColor: "warning.main" }),
                    ...(isDone && {
                      background: (t) =>
                        t.palette.mode === "light"
                          ? "linear-gradient(160deg, #f0fdf4 0%, #fdf4ff 100%)"
                          : "linear-gradient(160deg, rgba(16,185,129,.08) 0%, rgba(192,86,173,.08) 100%)",
                    }),
                  }}
                >
                  <Box
                    sx={{
                      display: "flex", flexDirection: "column", alignItems: "center", pt: 3, pb: 1,
                      background: (t) =>
                        t.palette.mode === "light"
                          ? `linear-gradient(180deg, ${course.color}0A 0%, transparent 100%)`
                          : `linear-gradient(180deg, ${course.color}14 0%, transparent 100%)`,
                    }}
                  >
                    <PlantGrowth progress={pct} color={course.color} size={120} />
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                      <Chip
                        label={STAGE_LABELS[stage]}
                        size="small"
                        sx={{ fontWeight: 700, fontSize: 10, height: 22, bgcolor: course.color + "18", color: course.color }}
                      />
                      {stale && (
                        <Chip label={`NOT WATERED · ${days}D`} size="small" color="warning"
                          sx={{ fontWeight: 700, fontSize: 10, height: 22 }} />
                      )}
                    </Stack>
                  </Box>

                  <Box sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
                    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1.5 }}>
                      <Avatar sx={{ bgcolor: course.color + "18", color: course.color, width: 32, height: 32, fontSize: 14, fontWeight: 800, flexShrink: 0 }}>
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
                        variant="determinate" value={pct}
                        sx={{ height: 6, borderRadius: 3, bgcolor: course.color + "1A", "& .MuiLinearProgress-bar": { bgcolor: course.color } }}
                      />
                    </Box>

                    <Button
                      variant="outlined" size="small" fullWidth
                      endIcon={isDone
                        ? <CheckCircleIcon sx={{ fontSize: "14px !important" }} />
                        : <ArrowForwardIcon sx={{ fontSize: "14px !important" }} />
                      }
                      onClick={() => navigate(`/dashboard/courses/${course.courseId}`)}
                      data-testid={`learning-card-${course.courseId}-cta`}
                      sx={{
                        mt: "auto", borderColor: course.color + "55", color: course.color,
                        fontWeight: 600, fontSize: "0.8rem", py: 0.75,
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
      )}

      {/* ── List view ── */}
      {view === "list" && (
        <Card variant="outlined" sx={{ overflow: "hidden" }}>
          {ENROLLED_COURSES.map((course, idx) => {
            const pct    = Math.round((course.completedLessons / course.totalLessons) * 100);
            const stage  = getStage(pct);
            const isDone = pct === 100;
            const days   = daysSince(course.lastActivityOn);
            const stale  = days !== null && days >= 10;

            return (
              <Box
                key={course.courseId}
                data-testid={`learning-list-${course.courseId}`}
                sx={{
                  px: 3, py: 2,
                  borderBottom: idx < ENROLLED_COURSES.length - 1 ? 1 : 0,
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  cursor: "pointer",
                  transition: "background 0.15s",
                  "&:hover": { bgcolor: "action.hover" },
                }}
                onClick={() => navigate(`/dashboard/courses/${course.courseId}`)}
              >
                {/* Mini plant */}
                <Box sx={{ flexShrink: 0 }}>
                  <PlantGrowth progress={pct} color={course.color} size={52} />
                </Box>

                {/* Course info */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.4 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
                      {course.name}
                    </Typography>
                    {stale && (
                      <Chip label={`${days}d idle`} size="small" color="warning"
                        sx={{ fontWeight: 700, fontSize: 10, height: 18 }} />
                    )}
                    {isDone && (
                      <CheckCircleIcon sx={{ fontSize: 14, color: "success.main", flexShrink: 0 }} />
                    )}
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="caption" color="text.secondary">{course.category}</Typography>
                    <Typography variant="caption" color="text.disabled">·</Typography>
                    <Typography variant="caption" color="text.secondary">{course.completedLessons}/{course.totalLessons} lessons</Typography>
                    {course.lastActivityOn && (
                      <>
                        <Typography variant="caption" color="text.disabled">·</Typography>
                        <AccessTimeIcon sx={{ fontSize: 11, color: "text.disabled" }} />
                        <Typography variant="caption" color="text.secondary">{days === 0 ? "today" : `${days}d ago`}</Typography>
                      </>
                    )}
                  </Stack>
                </Box>

                {/* Progress */}
                <Box sx={{ width: 160, flexShrink: 0 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Chip
                      label={STAGE_LABELS[stage]}
                      size="small"
                      sx={{ fontWeight: 700, fontSize: 10, height: 20, bgcolor: course.color + "18", color: course.color, maxWidth: 110, "& .MuiChip-label": { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }}
                    />
                    <Typography variant="caption" sx={{ fontWeight: 800, color: course.color, ml: 1, flexShrink: 0 }}>{pct}%</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate" value={pct}
                    sx={{ height: 5, borderRadius: 3, bgcolor: course.color + "1A", "& .MuiLinearProgress-bar": { bgcolor: course.color } }}
                  />
                </Box>

                {/* CTA */}
                <Button
                  variant="outlined" size="small"
                  onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/courses/${course.courseId}`); }}
                  sx={{
                    flexShrink: 0, width: 88, borderColor: course.color + "55", color: course.color,
                    fontWeight: 600, fontSize: "0.75rem", whiteSpace: "nowrap",
                    "&:hover": { borderColor: course.color, bgcolor: course.color + "0D" },
                  }}
                >
                  {isDone ? "Review" : pct === 0 ? "Start" : "Continue"}
                </Button>
              </Box>
            );
          })}
        </Card>
      )}

    </Container>
  );
}
