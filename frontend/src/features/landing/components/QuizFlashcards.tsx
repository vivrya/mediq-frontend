import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  Chip,
  Button,
  Alert,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const choices = [
  { id: "a", text: "Inhibits DNA gyrase" },
  { id: "b", text: "Blocks 50S ribosomal subunit" },
  { id: "c", text: "Inhibits cell-wall peptidoglycan synthesis", correct: true },
  { id: "d", text: "Inhibits dihydrofolate reductase" },
];

export function QuizFlashcards() {
  const [flipped, setFlipped] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <Box component="section" id="quiz" sx={{ py: { xs: 10, md: 16 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, lg: 10 }} alignItems="center">
          <Grid size={{ xs: 12, lg: 5 }}>
            <Chip label="QUIZZES & FLASHCARDS" size="small" variant="outlined" sx={{ fontWeight: 600, letterSpacing: "0.15em", mb: 2 }} />
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 2 }}>
              Active recall, rendered beautifully.
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "1.125rem", mb: 3 }}>
              Tap to flip. Rate your confidence. Mediq schedules the next review at
              the perfect moment — never too early, never too late.
            </Typography>
            <Stack spacing={1.5}>
              {["Thousands of exam-style MCQs", "Auto-generated from lecture chunks", "Confidence-weighted spaced repetition"].map((x) => (
                <Stack key={x} direction="row" spacing={1.5} alignItems="center">
                  <Avatar sx={{ bgcolor: "success.light", width: 24, height: 24 }}>
                    <CheckIcon sx={{ fontSize: 14, color: "success.dark" }} />
                  </Avatar>
                  <Typography variant="body2">{x}</Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }}>
            <Grid container spacing={3}>
              {/* Flashcard */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.2em", fontWeight: 600, display: "block", mb: 1.5 }}>
                  FLASHCARD
                </Typography>
                <Box sx={{ perspective: 1400 }}>
                  <Box
                    onClick={() => setFlipped((v) => !v)}
                    data-testid="flashcard-flip"
                    sx={{
                      position: "relative",
                      height: 280,
                      width: "100%",
                      cursor: "pointer",
                      transformStyle: "preserve-3d",
                      transition: "transform .7s cubic-bezier(.22,1,.36,1)",
                      transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
                    }}
                  >
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
                        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.2em", fontWeight: 600 }}>
                          MICROBIOLOGY · 1 / 24
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "text.secondary" }}>
                          <AutorenewIcon sx={{ fontSize: 14 }} />
                          <Typography variant="caption">Tap to flip</Typography>
                        </Stack>
                      </Stack>
                      <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                        What is the mechanism of action of penicillin?
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip label="Due today" size="small" color="default" />
                        <Typography variant="caption" color="text.secondary">· Easy</Typography>
                      </Stack>
                    </Card>
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
                      <Typography variant="overline" sx={{ letterSpacing: "0.2em", fontWeight: 600, opacity: 0.85 }}>
                        ANSWER
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.35 }}>
                        Inhibits bacterial cell-wall synthesis by binding
                        penicillin-binding proteins and blocking peptidoglycan
                        cross-linking.
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip label="β-lactam" size="small" sx={{ bgcolor: "rgba(255,255,255,.2)", color: "#fff" }} />
                        <Chip label="Bactericidal" size="small" sx={{ bgcolor: "rgba(255,255,255,.2)", color: "#fff" }} />
                      </Stack>
                    </Card>
                  </Box>
                </Box>
                <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                  {["Again", "Hard", "Good", "Easy"].map((l, i) => (
                    <Button
                      key={l}
                      fullWidth
                      variant={i === 2 ? "contained" : "outlined"}
                      color={i === 2 ? "success" : "inherit"}
                      size="small"
                      data-testid={`confidence-${l.toLowerCase()}`}
                      sx={{ fontWeight: 600 }}
                    >
                      {l}
                    </Button>
                  ))}
                </Stack>
              </Grid>

              {/* MCQ */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined" sx={{ p: 3 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.2em", fontWeight: 600 }}>
                      MCQ · PHARMACOLOGY
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Q 7 / 20
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1.5 }}>
                    Penicillins exert their antibacterial effect by which of the
                    following mechanisms?
                  </Typography>
                  <Stack spacing={1.25} sx={{ mt: 2.5 }}>
                    {choices.map((c) => {
                      const isPicked = picked === c.id;
                      const show = picked !== null;
                      const correct = show && c.correct;
                      const wrong = show && isPicked && !c.correct;
                      return (
                        <Card
                          key={c.id}
                          variant="outlined"
                          onClick={() => setPicked(c.id)}
                          data-testid={`mcq-option-${c.id}`}
                          sx={{
                            p: 1.5,
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            cursor: "pointer",
                            transition: "all .2s ease",
                            ...(correct
                              ? { borderColor: "success.main", bgcolor: "success.light" }
                              : wrong
                              ? { borderColor: "error.main", bgcolor: "error.light" }
                              : { "&:hover": { bgcolor: "action.hover" } }),
                          }}
                        >
                          <Avatar
                            variant="rounded"
                            sx={{
                              width: 28,
                              height: 28,
                              fontSize: 12,
                              fontWeight: 700,
                              bgcolor: correct ? "success.main" : wrong ? "error.main" : "action.selected",
                              color: correct || wrong ? "#fff" : "text.secondary",
                            }}
                          >
                            {correct ? <CheckIcon sx={{ fontSize: 16 }} /> : wrong ? <CloseIcon sx={{ fontSize: 16 }} /> : c.id.toUpperCase()}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {c.text}
                          </Typography>
                        </Card>
                      );
                    })}
                  </Stack>
                  {picked && (
                    <Alert
                      icon={<ThumbUpIcon fontSize="small" />}
                      severity="success"
                      sx={{ mt: 2, py: 0.5 }}
                    >
                      Logged. Next review in 2 days.
                    </Alert>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
