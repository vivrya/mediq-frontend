import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  Chip,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { VideoPlayer } from "./VideoPlayer";
import { FlashcardDialog } from "./FlashcardDialog";
import { getFlashcardsForSegment } from "./flashcardsData";
import Grid from "@mui/material/Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import { useParams, useNavigate } from "react-router-dom";
import { COURSE_DETAIL } from "./constants";
import { useCoursesStore } from "@/store/coursesStore";
import type { ApiLesson, ApiSegment } from "@/types";

// ── Icon helpers ───────────────────────────────────────────────

const TYPE_ICON: Record<string, React.ElementType> = {
  video: PlayCircleOutlinedIcon,
  quiz: QuizOutlinedIcon,
  flashcard: LayersOutlinedIcon,
  default: OndemandVideoOutlinedIcon,
};

const TYPE_COLOR: Record<string, string> = {
  video: "#0F52BA",
  quiz: "#F59E0B",
  flashcard: "#10B981",
  default: "#6366F1",
};

function getTypeIcon(type?: string): React.ElementType {
  return TYPE_ICON[type ?? "default"] ?? TYPE_ICON.default;
}
function getTypeColor(type?: string): string {
  return TYPE_COLOR[type ?? "default"] ?? TYPE_COLOR.default;
}

const levelColor: Record<string, "success" | "warning" | "error"> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "error",
};

// ── Segment row ────────────────────────────────────────────────

function SegmentRow({
  segment,
  index,
  onClick,
}: {
  segment: ApiSegment;
  index: number;
  onClick: (segment: ApiSegment) => void;
}) {
  const Icon = getTypeIcon(segment.type);
  const color = getTypeColor(segment.type);
  return (
    <Tooltip title="Click to play" placement="left" arrow>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        onClick={() => onClick(segment)}
        sx={{
          py: 1.25,
          px: 1,
          borderRadius: 2,
          "&:hover": { bgcolor: "action.hover" },
          cursor: "pointer",
        }}
        data-testid={`segment-row-${segment.id}`}
      >
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: 1.5,
          bgcolor: color + "15",
          color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon sx={{ fontSize: 15 }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontSize: "0.8rem", fontWeight: 600 }} noWrap>
          {index + 1}. {segment.title}
        </Typography>
        {(segment.type || segment.duration) && (
          <Stack direction="row" spacing={0.75} alignItems="center">
            {segment.type && (
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                {segment.type}
              </Typography>
            )}
            {segment.type && segment.duration && (
              <Typography variant="caption" color="text.disabled">·</Typography>
            )}
            {segment.duration && (
              <Typography variant="caption" color="text.secondary">{segment.duration}</Typography>
            )}
          </Stack>
        )}
      </Box>
    </Stack>
    </Tooltip>
  );
}

// ── Lesson accordion ───────────────────────────────────────────

function LessonAccordion({
  lesson,
  index,
  courseId,
  expanded,
  onChange,
  onSegmentClick,
}: {
  lesson: ApiLesson;
  index: number;
  courseId: string;
  expanded: boolean;
  onChange: (lessonId: string, isExpanded: boolean) => void;
  onSegmentClick: (segment: ApiSegment, lessonId: string) => void;
}) {
  const { segmentsByLesson, segmentsLoading, segmentsError } = useCoursesStore();
  const segments = segmentsByLesson[lesson.id];
  const isLoadingSegments = segmentsLoading[lesson.id] ?? false;
  const segmentError = segmentsError[lesson.id];

  const Icon = getTypeIcon(lesson.type);
  const iconColor = getTypeColor(lesson.type);

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, isExpanded) => onChange(lesson.id, isExpanded)}
      disableGutters
      elevation={0}
      data-testid={`lesson-accordion-${lesson.id}`}
      sx={{
        bgcolor: "transparent",
        "&::before": { display: "none" },
        borderBottom: 1,
        borderColor: "divider",
        "&:last-child": { borderBottom: 0 },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ fontSize: 18, color: "text.secondary" }} />}
        sx={{ px: { xs: 2, md: 2.5 }, py: 0.5, minHeight: 56, "& .MuiAccordionSummary-content": { my: 1, mr: 1 } }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: 1.5,
              bgcolor: iconColor + "15",
              color: iconColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon sx={{ fontSize: 16 }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.8375rem" }} noWrap>
              {lesson.title}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.75}>
              {lesson.estimatedMinutes && (
                <Typography variant="caption" color="text.secondary">
                  ~{lesson.estimatedMinutes} min
                </Typography>
              )}
              {lesson.duration && (
                <Typography variant="caption" color="text.secondary">{lesson.duration}</Typography>
              )}
            </Stack>
          </Box>
          {lesson.free ? (
            <Chip label="FREE" size="small" color="success" sx={{ fontSize: 10, height: 20, fontWeight: 700, mr: 0.5 }} />
          ) : (
            <LockOutlinedIcon sx={{ fontSize: 15, color: "text.disabled", mr: 0.5 }} />
          )}
        </Stack>
      </AccordionSummary>

      <AccordionDetails sx={{ px: { xs: 2, md: 2.5 }, pb: 1.5, pt: 0 }}>
        {isLoadingSegments && (
          <Stack spacing={1} sx={{ py: 1 }}>
            {[1, 2, 3].map((i) => (
              <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                <Skeleton variant="rounded" width={30} height={30} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="65%" height={16} />
                  <Skeleton variant="text" width="35%" height={13} />
                </Box>
              </Stack>
            ))}
          </Stack>
        )}

        {segmentError && (
          <Typography variant="caption" color="error.main" sx={{ py: 1, display: "block" }}>
            {segmentError}
          </Typography>
        )}

        {!isLoadingSegments && !segmentError && segments && segments.length === 0 && (
          <Typography variant="caption" color="text.secondary" sx={{ py: 1, display: "block" }}>
            No segments available for this lesson yet.
          </Typography>
        )}

        {!isLoadingSegments && segments && segments.length > 0 && (
          <Box sx={{ pl: 0.5 }}>
            {segments.map((seg, i) => (
              <SegmentRow
                key={seg.id}
                segment={seg}
                index={i}
                onClick={(s) => onSegmentClick(s, lesson.id)}
              />
            ))}
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

// ── Page ───────────────────────────────────────────────────────

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const {
    getCourseById,
    fetchCourses,
    fetchLessons,
    fetchSegments,
    lessonsByCourse,
    lessonsLoading,
    lessonsError,
  } = useCoursesStore();

  const [expandedLesson, setExpandedLesson] = useState<string | false>(false);
  const [activeVideo, setActiveVideo] = useState<{
    segmentId: string;
    lessonId: string;
    title: string;
    type?: string;
  } | null>(null);
  const [flashcardSegmentId, setFlashcardSegmentId] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
    if (courseId) fetchLessons(courseId);
  }, [courseId, fetchCourses, fetchLessons]);

  const course = getCourseById(courseId ?? "");
  const lessons: ApiLesson[] = lessonsByCourse[courseId ?? ""] ?? [];
  const isLessonsLoading = lessonsLoading[courseId ?? ""] ?? false;
  const lessonError = lessonsError[courseId ?? ""];

  function handleAccordionChange(lessonId: string, isExpanded: boolean) {
    setExpandedLesson(isExpanded ? lessonId : false);
    if (isExpanded && courseId) {
      fetchSegments(courseId, lessonId);
    }
  }

  function handleSegmentClick(segment: ApiSegment, lessonId: string) {
    setActiveVideo({
      segmentId: segment.id,
      lessonId,
      title: segment.title,
      type: segment.type,
    });
  }

  if (!course) {
    return (
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 8, textAlign: "center" }}>
        <CircularProgress size={32} sx={{ mb: 3 }} />
        <Typography variant="h6" color="text.secondary">Loading course…</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/dashboard/courses")} sx={{ mt: 3 }}>
          {COURSE_DETAIL.backLabel}
        </Button>
      </Container>
    );
  }

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

      <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
        {/* left: video player (when active) OR course info card */}
        <Grid size={{ xs: 12, md: activeVideo ? 8 : 7 }}>
          {activeVideo ? (
            <VideoPlayer
              courseId={courseId ?? ""}
              lessonId={activeVideo.lessonId}
              segmentId={activeVideo.segmentId}
              segmentTitle={activeVideo.title}
              segmentType={activeVideo.type}
              onClose={() => setActiveVideo(null)}
              onSegmentComplete={(segmentId) => {
                const cards = getFlashcardsForSegment(segmentId);
                if (cards.length > 0) setFlashcardSegmentId(segmentId);
              }}
            />
          ) : (
            <Card variant="outlined" sx={{ p: { xs: 3, md: 4 }, overflow: "hidden" }}>
              <Box sx={{ height: 4, bgcolor: course.color, mx: -4, mt: -4, mb: 4 }} />

              <Stack direction="row" alignItems="flex-start" spacing={2} sx={{ mb: 3 }}>
                <Box sx={{ width: 56, height: 56, borderRadius: 2.5, bgcolor: course.color + "18", color: course.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 22, flexShrink: 0 }}>
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

              {/* stats */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {([
                  course.instructor ? { label: COURSE_DETAIL.instructorLabel, value: course.instructor, icon: PersonOutlineIcon } : null,
                  { label: COURSE_DETAIL.chaptersLabel, value: `${course.chapters}`, icon: LibraryBooksOutlinedIcon },
                  { label: COURSE_DETAIL.durationLabel, value: course.totalDuration, icon: AccessTimeIcon },
                  { label: COURSE_DETAIL.levelLabel, value: course.level, icon: CheckCircleOutlineIcon },
                ] as const).filter(Boolean).map(({ label, value, icon: Icon }) => (
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

              <Button variant="contained" color="primary" size="large" fullWidth data-testid="course-detail-enroll">
                Enroll now
              </Button>
            </Card>
          )}
        </Grid>

        {/* right: playlist */}
        <Grid size={{ xs: 12, md: activeVideo ? 4 : 5 }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <Box sx={{ p: { xs: 2.5, md: 3 }, borderBottom: 1, borderColor: "divider" }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{COURSE_DETAIL.playlistTitle}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {isLessonsLoading
                  ? "Loading lessons…"
                  : lessons.length > 0
                  ? `${lessons.length} lessons — click to expand`
                  : `${course.chapters} lessons`}
              </Typography>
            </Box>

            {/* loading skeletons */}
            {isLessonsLoading && (
              <Stack sx={{ p: 2 }} spacing={1}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Stack key={i} direction="row" spacing={1.5} alignItems="center" sx={{ py: 0.5 }}>
                    <Skeleton variant="rounded" width={34} height={34} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width="70%" height={18} />
                      <Skeleton variant="text" width="40%" height={14} />
                    </Box>
                    <Skeleton variant="rounded" width={40} height={20} />
                  </Stack>
                ))}
              </Stack>
            )}

            {/* error */}
            {lessonError && (
              <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="body2" color="error.main">{lessonError}</Typography>
                <Button size="small" sx={{ mt: 1 }} onClick={() => { if (courseId) { useCoursesStore.setState((s) => ({ lessonsByCourse: { ...s.lessonsByCourse, [courseId]: undefined as any } })); fetchLessons(courseId); } }}>
                  Retry
                </Button>
              </Box>
            )}

            {/* accordions */}
            {!isLessonsLoading && !lessonError && (
              <Box sx={{ maxHeight: { md: 600 }, overflowY: "auto" }}>
                {lessons.length === 0 && (
                  <Box sx={{ p: 4, textAlign: "center" }}>
                    <LibraryBooksOutlinedIcon sx={{ fontSize: 40, color: "text.disabled", mb: 1.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>No lessons yet</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Lessons will appear here once the course is published.
                    </Typography>
                  </Box>
                )}
                {lessons.map((lesson, idx) => (
                  <LessonAccordion
                    key={lesson.id}
                    lesson={lesson}
                    index={idx}
                    courseId={courseId ?? ""}
                    expanded={expandedLesson === lesson.id}
                    onChange={handleAccordionChange}
                    onSegmentClick={handleSegmentClick}
                  />
                ))}
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>

      {flashcardSegmentId && (
        <FlashcardDialog
          open={!!flashcardSegmentId}
          onClose={() => setFlashcardSegmentId(null)}
          flashcards={getFlashcardsForSegment(flashcardSegmentId)}
          segmentTitle={activeVideo?.title ?? ""}
        />
      )}
    </Container>
  );
}
