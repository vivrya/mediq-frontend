import { Box, Container, Typography, Card, Stack, Chip, Button, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useParams, useNavigate } from "react-router-dom";
import { findCourse, COURSE_DETAIL, type LessonType } from "./constants";

const lessonIcons: Record<LessonType, React.ElementType> = {
  video: PlayCircleOutlinedIcon,
  quiz: QuizOutlinedIcon,
  flashcard: LayersOutlinedIcon,
};

const lessonIconColor: Record<LessonType, string> = {
  video: "#0F52BA",
  quiz: "#F59E0B",
  flashcard: "#10B981",
};

const levelColor: Record<string, "success" | "warning" | "error"> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "error",
};

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = findCourse(courseId ?? "");

  if (!course) {
    return (
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 8, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Course not found</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/dashboard/courses")} sx={{ mt: 3 }}>
          {COURSE_DETAIL.backLabel}
        </Button>
      </Container>
    );
  }

  const freeLessons = course.lessons.filter((l) => l.free).length;

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>
      {/* back */}
      <Button
        startIcon={<ArrowBackIcon />}
        variant="text"
        color="inherit"
        onClick={() => navigate("/dashboard/courses")}
        sx={{ mb: 3, color: "text.secondary", pl: 0, "&:hover": { bgcolor: "transparent", color: "text.primary" } }}
        data-testid="course-detail-back"
      >
        {COURSE_DETAIL.backLabel}
      </Button>

      <Grid container spacing={4}>
        {/* left: course info */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card variant="outlined" sx={{ p: { xs: 3, md: 4 }, overflow: "hidden" }}>
            {/* accent bar */}
            <Box sx={{ height: 4, bgcolor: course.color, mx: -4, mt: -4, mb: 4 }} />

            {/* header */}
            <Stack direction="row" alignItems="flex-start" spacing={2} sx={{ mb: 3 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2.5,
                  bgcolor: course.color + "18",
                  color: course.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 22,
                  flexShrink: 0,
                }}
              >
                {course.name[0]}
              </Box>
              <Box>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {course.category}
                  </Typography>
                  <Chip label={course.level} color={levelColor[course.level]} size="small" sx={{ fontWeight: 700, fontSize: 10, height: 18 }} />
                </Stack>
                <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: "1.5rem", md: "1.75rem" }, lineHeight: 1.2 }}>
                  {course.name}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 0.75 }}>{course.tagline}</Typography>
              </Box>
            </Stack>

            {/* stats grid */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                { label: COURSE_DETAIL.instructorLabel, value: course.instructor, icon: PersonOutlineIcon },
                { label: COURSE_DETAIL.chaptersLabel, value: `${course.chapters}`, icon: LibraryBooksOutlinedIcon },
                { label: COURSE_DETAIL.durationLabel, value: course.totalDuration, icon: AccessTimeIcon },
                { label: COURSE_DETAIL.levelLabel, value: course.level, icon: CheckCircleOutlineIcon },
              ].map(({ label, value, icon: Icon }) => (
                <Grid size={{ xs: 6, sm: 3 }} key={label}>
                  <Box sx={{ p: 1.5, borderRadius: 2, border: 1, borderColor: "divider", bgcolor: "action.hover" }}>
                    <Icon sx={{ fontSize: 16, color: "text.secondary", mb: 0.5, display: "block" }} />
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.25 }}>{label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.8125rem" }}>{value}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* tags */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.15em", display: "block", mb: 1 }}>
                Exam Coverage
              </Typography>
              <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
                {course.tags.map((t) => (
                  <Chip key={t} label={t} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                ))}
              </Stack>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button variant="contained" color="primary" size="large" sx={{ flex: 1 }} data-testid="course-detail-enroll">
                {COURSES_PAGE_ENROLL}
              </Button>
              <Button variant="outlined" color="inherit" size="large" sx={{ flex: 1, borderColor: "divider" }} data-testid="course-detail-preview">
                Preview {freeLessons} free {freeLessons === 1 ? "lesson" : "lessons"}
              </Button>
            </Stack>
          </Card>
        </Grid>

        {/* right: playlist */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <Box sx={{ p: { xs: 2.5, md: 3 }, borderBottom: 1, borderColor: "divider" }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{COURSE_DETAIL.playlistTitle}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {course.lessons.length} {COURSE_DETAIL.typeLabels.video.toLowerCase()} lessons · {freeLessons} free
              </Typography>
            </Box>
            <Box sx={{ maxHeight: { md: 520 }, overflowY: "auto" }}>
              {course.lessons.map((lesson, idx) => {
                const Icon = lessonIcons[lesson.type];
                const iconColor = lessonIconColor[lesson.type];
                return (
                  <Box
                    key={lesson.id}
                    data-testid={`lesson-row-${lesson.id}`}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      px: { xs: 2.5, md: 3 },
                      py: 1.75,
                      gap: 2,
                      borderBottom: idx < course.lessons.length - 1 ? 1 : 0,
                      borderColor: "divider",
                      cursor: lesson.free ? "pointer" : "default",
                      transition: "bgcolor .15s ease",
                      "&:hover": lesson.free ? { bgcolor: "action.hover" } : {},
                    }}
                  >
                    {/* type icon */}
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 1.5,
                        bgcolor: iconColor + "15",
                        color: iconColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ fontSize: 18 }} />
                    </Box>

                    {/* title + meta */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, fontSize: "0.8125rem", lineHeight: 1.3, color: lesson.free ? "text.primary" : "text.secondary" }}
                        noWrap
                      >
                        {idx + 1}. {lesson.title}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.25 }}>
                        <Typography variant="caption" color="text.secondary">{COURSE_DETAIL.typeLabels[lesson.type]}</Typography>
                        <Typography variant="caption" color="text.secondary">·</Typography>
                        <Typography variant="caption" color="text.secondary">{lesson.duration}</Typography>
                      </Stack>
                    </Box>

                    {/* free / locked */}
                    {lesson.free ? (
                      <Chip label={COURSE_DETAIL.freeTag} size="small" color="success" sx={{ fontSize: 10, height: 20, fontWeight: 700 }} />
                    ) : (
                      <LockOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                    )}
                  </Box>
                );
              })}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

// keep enroll label co-located
const COURSES_PAGE_ENROLL = "Enroll now";
