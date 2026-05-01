import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  IconButton,
  Card,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import type { Flashcard, Difficulty } from "./flashcardsData";

interface Props {
  open: boolean;
  onClose: () => void;
  flashcards: Flashcard[];
  segmentTitle: string;
}

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; color: "success" | "warning" | "error" }> = {
  easy: { label: "Easy", color: "success" },
  medium: { label: "Medium", color: "warning" },
  hard: { label: "Hard", color: "error" },
};

export function FlashcardDialog({ open, onClose, flashcards, segmentTitle }: Props) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [userRatings, setUserRatings] = useState<Record<string, Difficulty>>({});

  const card = flashcards[index];
  const total = flashcards.length;
  const userAnswer = card ? (userAnswers[card.id] ?? "") : "";
  const userRating = card ? userRatings[card.id] : undefined;

  function goTo(next: number) {
    setIndex(next);
    setFlipped(false);
  }

  function handleRate(d: Difficulty) {
    if (!card) return;
    setUserRatings((prev) => ({ ...prev, [card.id]: d }));
  }

  function handleClose() {
    setIndex(0);
    setFlipped(false);
    setUserAnswers({});
    setUserRatings({});
    onClose();
  }

  // Prevent close on backdrop click or Escape key
  function handleDialogClose(_: unknown, reason: string) {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    handleClose();
  }

  if (!card) return null;
  const diffCfg = DIFFICULTY_CONFIG[card.difficulty];

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      disableEscapeKeyDown
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 4, overflow: "hidden" } }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          pr: 6,
          borderBottom: 1,
          borderColor: "divider",
          py: 2,
          bgcolor: "action.hover",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.875rem" }} noWrap>
            Flashcards — {segmentTitle}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {index + 1} of {total}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{ position: "absolute", right: 12, top: 12 }}
          data-testid="flashcard-close"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <LinearProgress
        variant="determinate"
        value={((index + 1) / total) * 100}
        sx={{ height: 3 }}
      />

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        {/* 3-D flip card — identical visual to landing page */}
        <Box sx={{ perspective: 1400 }}>
          <Box
            onClick={() => setFlipped((v) => !v)}
            data-testid="flashcard-flip"
            sx={{
              position: "relative",
              height: 240,
              width: "100%",
              cursor: "pointer",
              transformStyle: "preserve-3d",
              transition: "transform .7s cubic-bezier(.22,1,.36,1)",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
            }}
          >
            {/* Front */}
            <Card
              sx={{
                position: "absolute",
                inset: 0,
                p: 3,
                backfaceVisibility: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 4,
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ letterSpacing: "0.2em", fontWeight: 600 }}
                >
                  FLASHCARD · {index + 1} / {total}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "text.secondary" }}>
                  <AutorenewIcon sx={{ fontSize: 14 }} />
                  <Typography variant="caption">Tap to flip</Typography>
                </Stack>
              </Stack>

              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                {card.question}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={diffCfg.label}
                  size="small"
                  color={diffCfg.color}
                  sx={{ fontWeight: 700, fontSize: 10, height: 20 }}
                />
                <Typography variant="caption" color="text.secondary">
                  Card difficulty
                </Typography>
              </Stack>
            </Card>

            {/* Back */}
            <Card
              sx={{
                position: "absolute",
                inset: 0,
                p: 3,
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
              <Typography
                variant="overline"
                sx={{ letterSpacing: "0.2em", fontWeight: 600, opacity: 0.85 }}
              >
                ANSWER
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.55 }}>
                {card.answer}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip
                  label={diffCfg.label}
                  size="small"
                  sx={{ bgcolor: "rgba(255,255,255,.2)", color: "#fff", fontWeight: 700 }}
                />
              </Stack>
            </Card>
          </Box>
        </Box>

        {/* User answer input */}
        <TextField
          label="Your answer"
          multiline
          minRows={2}
          maxRows={4}
          fullWidth
          value={userAnswer}
          onChange={(e) =>
            setUserAnswers((prev) => ({ ...prev, [card.id]: e.target.value }))
          }
          placeholder="Type your answer, then tap the card to reveal…"
          variant="outlined"
          size="small"
          sx={{ mt: 2.5 }}
          data-testid="flashcard-answer-input"
        />

        {/* Confidence rating */}
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mb: 1.25, fontWeight: 600 }}
          >
            How did you find this card?
          </Typography>
          <Stack direction="row" spacing={1}>
            {(["easy", "medium", "hard"] as Difficulty[]).map((d) => {
              const cfg = DIFFICULTY_CONFIG[d];
              const selected = userRating === d;
              return (
                <Button
                  key={d}
                  fullWidth
                  variant={selected ? "contained" : "outlined"}
                  color={selected ? cfg.color : "inherit"}
                  size="small"
                  onClick={() => handleRate(d)}
                  sx={{ fontWeight: 700, textTransform: "capitalize" }}
                  data-testid={`flashcard-rate-${d}`}
                >
                  {cfg.label}
                </Button>
              );
            })}
          </Stack>
        </Box>
      </DialogContent>

      {/* Navigation */}
      <DialogActions
        sx={{
          justifyContent: "space-between",
          px: 3,
          py: 2,
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Button
          startIcon={<ArrowBackIosNewIcon sx={{ fontSize: "0.75rem !important" }} />}
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          size="small"
          variant="outlined"
          data-testid="flashcard-prev"
        >
          Previous
        </Button>

        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
          {index + 1} / {total}
        </Typography>

        {index < total - 1 ? (
          <Button
            endIcon={<ArrowForwardIosIcon sx={{ fontSize: "0.75rem !important" }} />}
            onClick={() => goTo(index + 1)}
            size="small"
            variant="contained"
            data-testid="flashcard-next"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleClose}
            size="small"
            variant="contained"
            color="success"
            data-testid="flashcard-done"
          >
            Done
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
