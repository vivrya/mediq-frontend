import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  Chip,
  Button,
  OutlinedInput,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Skeleton,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import { useCoursesStore } from "@/store/coursesStore";
import { COURSES_PAGE, type Course } from "./constants";

const levelColor: Record<string, "success" | "warning" | "error"> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "error",
};

// ── Course card ────────────────────────────────────────────────

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
      <Box sx={{ height: 5, bgcolor: course.color }} />
      <Stack sx={{ p: 2.5, flex: 1 }} spacing={0}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: course.color + "18", color: course.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18 }}>
            {course.name[0]}
          </Box>
          <Chip label={course.level} color={levelColor[course.level]} size="small" sx={{ fontWeight: 700, fontSize: 11 }} />
        </Stack>

        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.3 }}>
          {course.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2, fontSize: "0.8125rem", lineHeight: 1.5 }}>
          {course.tagline}
        </Typography>

        {course.instructor && (
          <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 2 }}>
            <PersonOutlineIcon sx={{ fontSize: 15, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">{course.instructor}</Typography>
          </Stack>
        )}

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

        <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.75} sx={{ mb: 2.5 }}>
          {course.tags.map((t) => (
            <Chip key={t} label={t} size="small" variant="outlined" sx={{ fontSize: 10, height: 20, borderRadius: 1 }} />
          ))}
        </Stack>

        <Box sx={{ mt: "auto" }}>
          <Button fullWidth variant="outlined" size="small" color="primary" data-testid={`course-enroll-${course.id}`}>
            {COURSES_PAGE.viewLabel}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}

// ── Skeleton card ──────────────────────────────────────────────

function CourseCardSkeleton() {
  return (
    <Card variant="outlined" sx={{ overflow: "hidden" }}>
      <Skeleton variant="rectangular" height={5} />
      <Stack sx={{ p: 2.5 }} spacing={1.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Skeleton variant="rounded" width={44} height={44} />
          <Skeleton variant="rounded" width={80} height={24} />
        </Stack>
        <Skeleton variant="text" width="70%" height={24} />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="rounded" height={32} />
      </Stack>
    </Card>
  );
}

// ── Helpers ────────────────────────────────────────────────────

function matchesSearch(course: Course, q: string): boolean {
  const lower = q.toLowerCase();
  return (
    course.name.toLowerCase().includes(lower) ||
    course.tagline.toLowerCase().includes(lower) ||
    course.category.toLowerCase().includes(lower) ||
    (course.instructor?.toLowerCase().includes(lower) ?? false) ||
    course.tags.some((t) => t.toLowerCase().includes(lower))
  );
}

// ── Page ───────────────────────────────────────────────────────

export default function CoursesPage() {
  const { courses, loading, error, fetched, fetchCourses } = useCoursesStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // group courses by category (preserves API order, dedupes categories)
  const categories = useMemo(() => {
    const map = new Map<string, Course[]>();
    courses.forEach((c) => {
      if (!map.has(c.category)) map.set(c.category, []);
      map.get(c.category)!.push(c);
    });
    return Array.from(map.entries()).map(([label, cats]) => ({
      id: label.toLowerCase().replace(/\s+/g, "-"),
      label,
      courses: cats,
    }));
  }, [courses]);

  const filteredCategories = useMemo(() => {
    return categories
      .map((cat) => ({
        ...cat,
        courses: cat.courses.filter((c) => {
          const catMatch = activeCategory === "all" || cat.id === activeCategory;
          const searchMatch = search.trim() === "" || matchesSearch(c, search.trim());
          return catMatch && searchMatch;
        }),
      }))
      .filter((cat) => cat.courses.length > 0);
  }, [categories, search, activeCategory]);

  const totalVisible = filteredCategories.reduce((sum, cat) => sum + cat.courses.length, 0);
  const isFiltered = search.trim() !== "" || activeCategory !== "all";

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>
      {/* Header */}
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 4 }} flexWrap="wrap" gap={2}>
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
        {!loading && fetched && (
          <Chip label={`${courses.length} courses available`} variant="outlined" sx={{ fontWeight: 600, alignSelf: "center" }} />
        )}
      </Stack>

      {/* Error */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 4, borderRadius: 3 }}
          action={
            <Button size="small" startIcon={<RefreshIcon />} onClick={() => { useCoursesStore.setState({ fetched: false }); fetchCourses(); }}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Search + filter */}
      {!error && (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ sm: "center" }}
          sx={{ mb: 1.5, p: 2, borderRadius: 3, border: 1, borderColor: "divider", bgcolor: "background.paper" }}
        >
          <OutlinedInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, topic, exam or instructor…"
            startAdornment={<InputAdornment position="start"><SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} /></InputAdornment>}
            sx={{ flex: 1, fontSize: "0.9rem", "& .MuiOutlinedInput-notchedOutline": { border: 0 }, "&:hover .MuiOutlinedInput-notchedOutline": { border: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 }, bgcolor: "action.hover", borderRadius: 2, px: 1 }}
            inputProps={{ "data-testid": "courses-search-input" }}
          />
          <Box sx={{ flexShrink: 0 }}>
            <ToggleButtonGroup
              exclusive
              value={activeCategory}
              onChange={(_, v) => v && setActiveCategory(v)}
              size="small"
              sx={{ bgcolor: "action.hover", borderRadius: 2, p: 0.5, border: 1, borderColor: "divider" }}
            >
              <ToggleButton value="all" data-testid="filter-all" sx={{ border: 0, borderRadius: "8px !important", px: 2, py: 0.75, fontWeight: 600, fontSize: 13 }}>
                All
              </ToggleButton>
              {categories.map((cat) => (
                <ToggleButton key={cat.id} value={cat.id} data-testid={`filter-${cat.id}`} sx={{ border: 0, borderRadius: "8px !important", px: 2, py: 0.75, fontWeight: 600, fontSize: 13 }}>
                  {cat.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Stack>
      )}

      {/* Results summary */}
      {!loading && !error && fetched && (
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Typography variant="body2" color="text.secondary">
            {isFiltered
              ? `${totalVisible} result${totalVisible !== 1 ? "s" : ""}${search.trim() ? ` for "${search.trim()}"` : ""}`
              : `${courses.length} courses across ${categories.length} categories`}
          </Typography>
          {isFiltered && (
            <Button size="small" variant="text" color="inherit" onClick={() => { setSearch(""); setActiveCategory("all"); }} sx={{ color: "text.secondary", fontSize: 13 }} data-testid="courses-clear-filters">
              Clear filters
            </Button>
          )}
        </Stack>
      )}

      {/* Loading skeletons */}
      {loading && (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <CourseCardSkeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Empty state */}
      {!loading && !error && fetched && filteredCategories.length === 0 && (
        <Box sx={{ textAlign: "center", py: 10 }} data-testid="courses-empty-state">
          <SearchOffIcon sx={{ fontSize: 56, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>No courses found</Typography>
          <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 380, mx: "auto" }}>
            Try a different keyword or category, or clear your filters.
          </Typography>
          <Button variant="outlined" color="inherit" sx={{ mt: 3, borderColor: "divider" }} onClick={() => { setSearch(""); setActiveCategory("all"); }}>
            Clear filters
          </Button>
        </Box>
      )}

      {/* Category sections */}
      {!loading && filteredCategories.map((cat) => (
        <Box key={cat.id} sx={{ mb: 6 }} data-testid={`courses-category-${cat.id}`}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.2em", fontWeight: 700 }}>
              {cat.label}
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
