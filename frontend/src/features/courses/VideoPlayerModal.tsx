import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  CircularProgress,
  Stack,
  Button,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import { useCoursesStore } from "@/store/coursesStore";

interface Props {
  open: boolean;
  onClose: () => void;
  courseId: string;
  lessonId: string;
  segmentId: string;
  segmentTitle: string;
  segmentType?: string;
}

export function VideoPlayerModal({
  open,
  onClose,
  courseId,
  lessonId,
  segmentId,
  segmentTitle,
  segmentType,
}: Props) {
  const { fetchSegmentVideo, videoBySegment, videoLoading, videoError } = useCoursesStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  const entry = videoBySegment[segmentId];
  const loading = videoLoading[segmentId] ?? false;
  const error = videoError[segmentId] ?? null;
  const videoUrl = entry?.url;

  useEffect(() => {
    if (open && segmentId) {
      fetchSegmentVideo(courseId, lessonId, segmentId);
    }
  }, [open, segmentId, courseId, lessonId, fetchSegmentVideo]);

  // pause video when modal closes
  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
    }
  }, [open]);

  function handleRetry() {
    // clear cache for this segment so it re-fetches
    useCoursesStore.setState((s) => {
      const { [segmentId]: _, ...rest } = s.videoBySegment;
      return { videoBySegment: rest };
    });
    fetchSegmentVideo(courseId, lessonId, segmentId);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 4, overflow: "hidden", bgcolor: "background.paper" } }}
    >
      {/* title bar */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          pr: 6,
          borderBottom: 1,
          borderColor: "divider",
          py: 2,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }} noWrap>
            {segmentTitle}
          </Typography>
          {segmentType && (
            <Chip
              label={segmentType}
              size="small"
              sx={{ mt: 0.5, height: 18, fontSize: 10, fontWeight: 600, textTransform: "capitalize" }}
            />
          )}
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: "absolute", right: 12, top: 12 }}
          data-testid="video-modal-close"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* loading */}
        {loading && (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 10, gap: 2 }}>
            <CircularProgress size={36} />
            <Typography variant="body2" color="text.secondary">
              Loading video…
            </Typography>
          </Stack>
        )}

        {/* error */}
        {!loading && error && (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 10, gap: 2, px: 4 }}>
            <Typography variant="body2" color="error.main" textAlign="center">
              {error}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ReplayIcon />}
              onClick={handleRetry}
            >
              Try again
            </Button>
          </Stack>
        )}

        {/* player */}
        {!loading && !error && videoUrl && (
          <Box sx={{ bgcolor: "#000", lineHeight: 0 }}>
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              style={{ width: "100%", maxHeight: "70vh", display: "block" }}
              data-testid="video-player"
            >
              <Typography variant="body2" sx={{ p: 2, color: "#fff" }}>
                Your browser does not support this video format.
              </Typography>
            </video>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
