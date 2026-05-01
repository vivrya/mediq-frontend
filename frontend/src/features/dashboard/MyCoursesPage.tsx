import { useState, useMemo } from "react";
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
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { ENROLLED_COURSES } from "./constants";

type CourseStatus = "completed" | "in-progress" | "not-started";

function getStatus(completed: number, total: number): CourseStatus {
  if (completed === total) return "completed";
  if (completed > 0) return "in-progress";
  return "not-started";
}

const STATUS_CONFIG: Record<CourseStatus, { label: string; color: "success" | "warning" | "default" }> = {
  completed:     { label: "Completed",   color: "success" },
  "in-progress": { label: "In Progress", color: "warning" },
  "not-started": { label: "Not Started", color: "default" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export default function MyCoursesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CourseStatus | "all">("all");

  const totalEnrolled  = ENROLLED_COURSES.length;
  const inProgress     = ENROLLED_COURSES.filter((c) => c.completedLessons > 0 && c.completedLessons < c.totalLessons).length;
  const completed      = ENROLLED_COURSES.filter((c) => c.completedLessons === c.totalLessons).length;
  const totalCompleted = ENROLLED_COURSES.reduce((sum, c) => sum + c.completedLessons, 0);
  const totalLessons   = ENROLLED_COURSES.reduce((sum, c) => sum + c.totalLessons, 0);
  const overallPct     = Math.round((totalCompleted / totalLessons) * 100);

  const filteredCourses = useMemo(() => {
    const q = search.toLowerCase();
    return ENROLLED_COURSES.filter((c) => {
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q));
      const matchesStatus =
        statusFilter === "all" || getStatus(c.completedLessons, c.totalLessons) === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>

      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.75 }}>
        <SchoolOutlinedIcon sx={{ color: "primary.main", fontSize: 22 }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>My Courses</Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        All your enrolled courses, progress, and next steps in one place.
      </Typography>

      {/* Search + Filter */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }} sx={{ mb: 4 }}>
        <TextField
          placeholder="Search by name, category, or exam…"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: "text.disabled" }} />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 320 }}
          data-testid="my-courses-search"
        />
        <ToggleButtonGroup
          value={statusFilter}
          exclusive
          size="small"
          onChange={(_, v) => { if (v !== null) setStatusFilter(v); }}
          data-testid="my-courses-filter"
        >
          {([
            { value: "all",          label: "All" },
            { value: "in-progress",  label: "In Progress" },
            { value: "not-started",  label: "Not Started" },
            { value: "completed",    label: "Completed" },
          ] as { value: CourseStatus | "all"; label: string }[]).map((opt) => (
            <ToggleButton key={opt.value} value={opt.value} sx={{ px: 2, fontSize: "0.8rem", fontWeight: 600 }}>
              {opt.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/* Summary stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          { label: "Enrolled",    value: totalEnrolled, color: "primary.main" },
          { label: "In Progress", value: inProgress,    color: "warning.main" },
          { label: "Completed",   value: completed,     color: "success.main" },
        ].map((s) => (
          <Grid key={s.label} size={{ xs: 4, md: 2 }}>
            <Card variant="outlined" sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: s.color }}>{s.value}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{s.label}</Typography>
            </Card>
          </Grid>
        ))}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Overall progress</Typography>
              <Typography variant="body2" sx={{ fontWeight: 800, color: "primary.main" }}>{overallPct}%</Typography>
            </Stack>
            <LinearProgress variant="determinate" value={overallPct} sx={{ height: 8, borderRadius: 4 }} />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75 }}>
              {totalCompleted} of {totalLessons} lessons completed
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Course cards grid */}
      {filteredCourses.length === 0 && (
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            No courses match <strong>"{search || statusFilter}"</strong>.
          </Typography>
        </Box>
      )}
      <Grid container spacing={3}>
        {filteredCourses.map((course) => {
          const pct    = Math.round((course.completedLessons / course.totalLessons) * 100);
          const status = getStatus(course.completedLessons, course.totalLessons);
          const cfg    = STATUS_CONFIG[status];

          const ctaLabel = status === "completed" ? "Review" : status === "in-progress" ? "Continue" : "Start";

          return (
            <Grid key={course.courseId} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card
                variant="outlined"
                data-testid={`my-course-${course.courseId}`}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  transition: "box-shadow 0.2s, transform 0.2s",
                  "&:hover": { boxShadow: 5, transform: "translateY(-2px)" },
                }}
              >
                {/* Colour accent */}
                <Box sx={{ height: 4, bgcolor: course.color, flexShrink: 0 }} />

                <Box sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>

                  {/* Top — avatar + name + status */}
                  <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 2 }}>
                    <Avatar
                      sx={{ bgcolor: course.color + "18", color: course.color, width: 44, height: 44, fontWeight: 800, fontSize: 18, flexShrink: 0 }}
                    >
                      {course.name[0]}
                    </Avatar>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 0.4 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                          {course.category}
                        </Typography>
                        <Chip label={cfg.label} size="small" color={cfg.color} sx={{ fontWeight: 700, fontSize: 9, height: 18 }} />
                      </Stack>
                      <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                        {course.name}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Tags */}
                  <Stack direction="row" spacing={0.75} sx={{ mb: 2, flexWrap: "wrap", gap: 0.5 }}>
                    {course.tags.map((t) => (
                      <Chip key={t} label={t} size="small" variant="outlined" sx={{ fontSize: 10, height: 18, fontWeight: 600 }} />
                    ))}
                  </Stack>

                  {/* Progress */}
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
                      sx={{ height: 7, borderRadius: 4, bgcolor: course.color + "20", "& .MuiLinearProgress-bar": { bgcolor: course.color } }}
                    />
                  </Box>

                  {/* Meta */}
                  <Stack spacing={0.5} sx={{ mb: 2.5, flex: 1 }}>
                    {course.currentLesson && (
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <PlayCircleOutlinedIcon sx={{ fontSize: 13, color: "text.secondary", flexShrink: 0 }} />
                        <Typography variant="caption" color="text.secondary" noWrap>
                          Up next: <strong>{course.currentLesson}</strong>
                        </Typography>
                      </Stack>
                    )}
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <AccessTimeIcon sx={{ fontSize: 13, color: "text.secondary", flexShrink: 0 }} />
                      <Typography variant="caption" color="text.secondary">{course.estimatedHours} total</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <CalendarTodayOutlinedIcon sx={{ fontSize: 13, color: "text.secondary", flexShrink: 0 }} />
                      <Typography variant="caption" color="text.secondary">
                        {course.lastActivityOn
                          ? `Last studied ${formatDate(course.lastActivityOn)}`
                          : `Enrolled ${formatDate(course.enrolledOn)}`}
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* CTA */}
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={status === "completed" ? <CheckCircleIcon sx={{ fontSize: "14px !important" }} /> : <ArrowForwardIcon sx={{ fontSize: "14px !important" }} />}
                    onClick={() => navigate(`/dashboard/courses/${course.courseId}`)}
                    fullWidth
                    data-testid={`my-course-${course.courseId}-cta`}
                    sx={{
                      borderColor: course.color + "60",
                      color: course.color,
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      py: 0.75,
                      "&:hover": { borderColor: course.color, bgcolor: course.color + "0D" },
                    }}
                  >
                    {ctaLabel}
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
