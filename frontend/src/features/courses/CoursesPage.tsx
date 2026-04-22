import { Box, Container, Typography, Card, Stack, Chip, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import { COURSE_CATEGORIES, COURSES_PAGE, type Course } from "./constants";

const levelColor: Record<string, "success" | "warning" | "error"> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "error",
};

function CourseCard({ course }: { course: Course }) {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform .2s ease, box-shadow .2s ease",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
      }}
      onClick={() => navigate(`/dashboard/courses/${course.id}`)}
      data-testid={`course-card-${course.id}`}
    >
      {/* colour accent bar */}
      <Box sx={{ height: 5, bgcolor: course.color }} />

      <Stack sx={{ p: 2.5, flex: 1 }} spacing={0}>
        {/* icon + level */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: course.color + "18",
              color: course.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            {course.name[0]}
          </Box>
          <Chip label={course.level} color={levelColor[course.level]} size="small" sx={{ fontWeight: 700, fontSize: 11 }} />
        </Stack>

        {/* title + tagline */}
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.3 }}>
          {course.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2, fontSize: "0.8125rem", lineHeight: 1.5 }}>
          {course.tagline}
        </Typography>

        {/* instructor */}
        <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 2 }}>
          <PersonOutlineIcon sx={{ fontSize: 15, color: "text.secondary" }} />
          <Typography variant="caption" color="text.secondary">{course.instructor}</Typography>
        </Stack>

        {/* stats */}
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <LibraryBooksOutlinedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">{course.chapters} {COURSES_PAGE.chaptersLabel}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <AccessTimeIcon sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">{course.totalDuration}</Typography>
          </Stack>
        </Stack>

        {/* tags */}
        <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.75} sx={{ mb: 2.5 }}>
          {course.tags.map((t) => (
            <Chip key={t} label={t} size="small" variant="outlined" sx={{ fontSize: 10, height: 20, borderRadius: 1 }} />
          ))}
        </Stack>

        {/* cta */}
        <Box sx={{ mt: "auto" }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            color="primary"
            data-testid={`course-enroll-${course.id}`}
          >
            {COURSES_PAGE.viewLabel}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}

export default function CoursesPage() {
  const totalCourses = COURSE_CATEGORIES.reduce((sum, cat) => sum + cat.courses.length, 0);

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>
      {/* Page header */}
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 5 }} flexWrap="wrap" gap={2}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
            <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: "primary.light", color: "primary.dark", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SchoolOutlinedIcon fontSize="small" />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }} data-testid="courses-page-title">
              {COURSES_PAGE.title}
            </Typography>
          </Stack>
          <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
            {COURSES_PAGE.subtitle}
          </Typography>
        </Box>
        <Chip
          label={`${totalCourses} courses available`}
          variant="outlined"
          sx={{ fontWeight: 600, alignSelf: "center" }}
        />
      </Stack>

      {/* Categories */}
      {COURSE_CATEGORIES.map((cat) => (
        <Box key={cat.id} sx={{ mb: 6 }} data-testid={`courses-category-${cat.id}`}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.2em", fontWeight: 700 }}>
              {cat.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {cat.description}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {cat.courses.map((course) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
}
