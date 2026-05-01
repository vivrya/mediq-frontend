import { useEffect, useRef } from "react";
import {
  Box,
  Card,
  Stack,
  Typography,
  Chip,
  IconButton,
  CircularProgress,
  Button,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReplayIcon from "@mui/icons-material/Replay";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import { useCoursesStore } from "@/store/coursesStore";

interface Props {
  courseId: string;
  lessonId: string;
  segmentId: string;
  segmentTitle: string;
  segmentType?: string;
  onClose: () => void;
  onSegmentComplete?: (segmentId: string) => void;
}

export function VideoPlayer({
  courseId,
  lessonId,
  segmentId,
  segmentTitle,
  segmentType,
  onClose,
  onSegmentComplete,
}: Props) {
  const { fetchSegmentVideo, videoBySegment, videoLoading, videoError } = useCoursesStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  const entry = videoBySegment[segmentId];
  const loading = videoLoading[segmentId] ?? false;
  const error = videoError[segmentId] ?? null;
  const videoUrl = entry?.url;

  useEffect(() => {
    fetchSegmentVideo(courseId, lessonId, segmentId);
  }, [courseId, lessonId, segmentId, fetchSegmentVideo]);

  function handleRetry() {
    useCoursesStore.setState((s) => {
      const { [segmentId]: _, ...rest } = s.videoBySegment;
      return { videoBySegment: rest };
    });
    fetchSegmentVideo(courseId, lessonId, segmentId);
  }

  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      {/* header */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{ px: 2.5, py: 1.75, borderBottom: 1, borderColor: "divider", flexShrink: 0 }}
      >
        <Tooltip title="Back to course info" arrow>
          <IconButton size="small" onClick={onClose} data-testid="video-player-back">
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.3 }}
            noWrap
          >
            {segmentTitle}
          </Typography>
          {segmentType && (
            <Chip
              label={segmentType}
              size="small"
              sx={{ mt: 0.25, height: 16, fontSize: 9, fontWeight: 700, textTransform: "capitalize" }}
            />
          )}
        </Box>
      </Stack>

      {/* video area */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 280,
          position: "relative",
        }}
      >
        {loading && (
          <Stack alignItems="center" spacing={2}>
            <CircularProgress size={36} sx={{ color: "#fff" }} />
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,.7)" }}>
              Loading video…
            </Typography>
          </Stack>
        )}

        {!loading && error && (
          <Stack alignItems="center" spacing={2} sx={{ px: 4, textAlign: "center" }}>
            <PlayCircleOutlinedIcon sx={{ fontSize: 48, color: "rgba(255,255,255,.3)" }} />
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,.7)" }}>
              {error}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ReplayIcon />}
              onClick={handleRetry}
              sx={{ color: "#fff", borderColor: "rgba(255,255,255,.4)", "&:hover": { borderColor: "#fff" } }}
            >
              Try again
            </Button>
          </Stack>
        )}

        {!loading && !error && videoUrl && (
          <video
            ref={videoRef}
            key={videoUrl}
            src={videoUrl}
            controls
            autoPlay
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            onEnded={() => onSegmentComplete?.(segmentId)}
            style={{ width: "100%", height: "100%", maxHeight: 480, display: "block", objectFit: "contain" }}
            data-testid="video-player"
          />
        )}
      </Box>
    </Card>
  );
}
