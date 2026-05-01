import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  Chip,
  Button,
  IconButton,
  LinearProgress,
  Skeleton,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useParams, useNavigate } from "react-router-dom";
import { useDecksStore, getDeckColor } from "@/store/decksStore";
import type { ApiFlashcard } from "@/types";

type Difficulty = "easy" | "medium" | "hard";

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; color: "success" | "warning" | "error" }> = {
  easy: { label: "Easy", color: "success" },
  medium: { label: "Medium", color: "warning" },
  hard: { label: "Hard", color: "error" },
};

function FlipCard({
  card,
  index,
  total,
  color,
}: {
  card: ApiFlashcard;
  index: number;
  total: number;
  color: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const diffCfg = DIFFICULTY_CONFIG[card.difficulty];

  // Reset flip when card changes
  useEffect(() => {
    setFlipped(false);
  }, [card.id]);

  return (
    <Box sx={{ perspective: 1400 }}>
      <Box
        onClick={() => setFlipped((v) => !v)}
        data-testid="carousel-flashcard-flip"
        sx={{
          position: "relative",
          height: { xs: 260, md: 300 },
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
            p: { xs: 3, md: 4 },
            backfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: 6,
            borderTop: `4px solid ${color}`,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: "0.2em", fontWeight: 600 }}
            >
              CARD {index + 1} / {total}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "text.secondary" }}>
              <AutorenewIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption">Tap to flip</Typography>
            </Stack>
          </Stack>

          <Typography
            variant="h6"
            sx={{ fontWeight: 700, lineHeight: 1.35, fontSize: { xs: "1rem", md: "1.15rem" } }}
          >
            {card.question}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={diffCfg.label}
              size="small"
              color={diffCfg.color}
              sx={{ fontWeight: 700, fontSize: 10, height: 20 }}
            />
            {card.tags.map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                variant="outlined"
                sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
              />
            ))}
          </Stack>
        </Card>

        {/* Back */}
        <Card
          sx={{
            position: "absolute",
            inset: 0,
            p: { xs: 3, md: 4 },
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: 8,
          }}
        >
          <Typography
            variant="overline"
            sx={{ letterSpacing: "0.2em", fontWeight: 700, opacity: 0.8 }}
          >
            ANSWER
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, lineHeight: 1.6, fontSize: { xs: "0.9rem", md: "1rem" } }}
          >
            {card.answer}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {card.tags.map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,.2)", color: "#fff", fontWeight: 700, fontSize: 10 }}
              />
            ))}
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}

export default function FlashcardsCarouselPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const {
    fetchDecks,
    fetchDeckFlashcards,
    getDeckById,
    flashcardsByDeck,
    flashcardsLoading,
    flashcardsError,
  } = useDecksStore();

  const [index, setIndex] = useState(0);
  const [userRatings, setUserRatings] = useState<Record<string, Difficulty>>({});
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchDecks();
    if (deckId) fetchDeckFlashcards(deckId);
  }, [deckId, fetchDecks, fetchDeckFlashcards]);

  const deck = getDeckById(deckId ?? "");
  const flashcards: ApiFlashcard[] = flashcardsByDeck[deckId ?? ""] ?? [];
  const isLoading = flashcardsLoading[deckId ?? ""] ?? false;
  const fetchError = flashcardsError[deckId ?? ""];
  const total = flashcards.length;
  const card = flashcards[index];
  const color = getDeckColor(deck?.courseId ?? "");
  const userRating = card ? userRatings[card.id] : undefined;

  function goTo(next: number) {
    setIndex(next);
  }

  function handleFinish() {
    setCompleted(true);
  }

  function handleRestart() {
    setIndex(0);
    setUserRatings({});
    setCompleted(false);
  }

  // ── Loading ──────────────────────────────────────────────────

  if (isLoading || (!deck && !fetchError)) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Skeleton variant="text" width={120} height={36} sx={{ mb: 3 }} />
        <Skeleton variant="rounded" width="100%" height={300} sx={{ mb: 3 }} />
        <Skeleton variant="rounded" width="100%" height={80} />
      </Container>
    );
  }

  // ── Completed screen ─────────────────────────────────────────

  if (completed) {
    const rated = Object.values(userRatings);
    const counts = { easy: 0, medium: 0, hard: 0 } as Record<Difficulty, number>;
    rated.forEach((r) => { counts[r] = (counts[r] ?? 0) + 1; });

    return (
      <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 }, textAlign: "center" }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 72, color: "success.main", mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Deck complete!
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          You reviewed all {total} cards in <strong>{deck?.title}</strong>.
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 4 }}>
          {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
            <Box key={d} sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: `${DIFFICULTY_CONFIG[d].color}.main` }}>
                {counts[d]}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                {d}
              </Typography>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" onClick={handleRestart}>
            Study again
          </Button>
          <Button variant="contained" onClick={() => navigate("/dashboard/flashcards")}>
            Back to decks
          </Button>
        </Stack>
      </Container>
    );
  }

  // ── Main carousel ────────────────────────────────────────────

  return (
    <Container maxWidth="md" sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>
      {/* Back */}
      <Button
        startIcon={<ArrowBackIcon />}
        variant="text"
        color="inherit"
        onClick={() => navigate("/dashboard/flashcards")}
        sx={{ mb: 3, color: "text.secondary", pl: 0, "&:hover": { bgcolor: "transparent", color: "text.primary" } }}
        data-testid="carousel-back"
      >
        All decks
      </Button>

      {/* Deck title + progress */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {deck?.title ?? deckId}
          </Typography>
          {deck?.courseName && (
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {deck.courseName}
            </Typography>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, flexShrink: 0 }}>
          {index + 1} / {total}
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={total > 0 ? ((index + 1) / total) * 100 : 0}
        sx={{ height: 5, borderRadius: 3, mb: 3 }}
      />

      {/* Error */}
      {fetchError && (
        <Typography color="error.main" variant="body2" sx={{ mb: 2 }}>
          {fetchError}
        </Typography>
      )}

      {/* Carousel row */}
      {card && (
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, md: 2 }}>
          <Tooltip title="Previous card" arrow>
            <span>
              <IconButton
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                size="small"
                data-testid="carousel-prev"
                sx={{ flexShrink: 0 }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </span>
          </Tooltip>

          <Box sx={{ flex: 1 }}>
            <FlipCard card={card} index={index} total={total} color={color} />
          </Box>

          <Tooltip title="Next card" arrow>
            <span>
              <IconButton
                onClick={() => index < total - 1 ? goTo(index + 1) : handleFinish()}
                size="small"
                data-testid="carousel-next"
                sx={{ flexShrink: 0 }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      )}

      {/* Dot indicators */}
      {total > 0 && (
        <Stack direction="row" justifyContent="center" spacing={0.75} sx={{ mt: 2.5 }}>
          {flashcards.map((fc, i) => (
            <Box
              key={fc.id}
              onClick={() => goTo(i)}
              sx={{
                width: i === index ? 20 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: i === index ? color : "action.disabled",
                cursor: "pointer",
                transition: "all 0.25s",
              }}
            />
          ))}
        </Stack>
      )}

      {/* Answer input + confidence rating */}
      {card && (
        <Box sx={{ mt: 3.5 }}>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 1.25, fontWeight: 600 }}
            >
              How did you find this card?
            </Typography>
            <Stack direction="row" spacing={1.5}>
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
                    onClick={() =>
                      setUserRatings((prev) => ({ ...prev, [card.id]: d }))
                    }
                    sx={{ fontWeight: 700, textTransform: "capitalize" }}
                    data-testid={`carousel-rate-${d}`}
                  >
                    {cfg.label}
                  </Button>
                );
              })}
            </Stack>
          </Box>

          {/* Bottom nav */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
            <Button
              startIcon={<ArrowBackIosNewIcon sx={{ fontSize: "0.75rem !important" }} />}
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              size="small"
              variant="outlined"
              data-testid="carousel-prev-btn"
            >
              Previous
            </Button>

            {index < total - 1 ? (
              <Button
                endIcon={<ArrowForwardIosIcon sx={{ fontSize: "0.75rem !important" }} />}
                onClick={() => goTo(index + 1)}
                size="small"
                variant="contained"
                data-testid="carousel-next-btn"
              >
                Next card
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                size="small"
                variant="contained"
                color="success"
                data-testid="carousel-finish-btn"
              >
                Finish deck
              </Button>
            )}
          </Stack>
        </Box>
      )}
    </Container>
  );
}
