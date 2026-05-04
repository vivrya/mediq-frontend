import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  Chip,
  Button,
  Avatar,
  Divider,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { useRazorpay } from "@/hooks/useRazorpay";
import type { PlanOption } from "@/hooks/useRazorpay";

// ── Demo video data ────────────────────────────────────────────

const DEMO_VIDEOS = [
  {
    id: "v1",
    title: "Cranial Nerves in 7 Minutes",
    subject: "Anatomy · UG",
    duration: "7:12",
    color: "#10B981",
  },
  {
    id: "v2",
    title: "Beta Blockers — High Yield",
    subject: "Pharmacology · PG",
    duration: "5:45",
    color: "#EC4899",
  },
  {
    id: "v3",
    title: "Reading a Chest X-Ray",
    subject: "Radiology · UG",
    duration: "6:30",
    color: "#0F52BA",
  },
];

// ── How it works steps ─────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    icon: OndemandVideoOutlinedIcon,
    color: "#0F52BA",
    title: "Watch a chunk",
    body: "Short 5–7 min videos built around one concept. Pause, rewind, done.",
  },
  {
    icon: LayersOutlinedIcon,
    color: "#10B981",
    title: "Flip flashcards",
    body: "Active recall after every video. Rate each card — we schedule the next review automatically.",
  },
  {
    icon: CheckCircleOutlineIcon,
    color: "#F59E0B",
    title: "Test yourself",
    body: "Exam-style MCQs after each lesson. Instant feedback with explanations.",
  },
  {
    icon: InsightsOutlinedIcon,
    color: "#7C3AED",
    title: "Track progress",
    body: "See your streak, weak topics, and upcoming reviews on your personal dashboard.",
  },
];

// ── Pricing plans ──────────────────────────────────────────────

const PLANS: Array<PlanOption & {
  tag: string;
  priceLabel: string;
  cadence: string;
  features: string[];
  highlight: boolean;
  color: string;
}> = [
  {
    id: "ug",
    label: "UG Complete",
    tag: "For MBBS / BDS",
    amountInr: 999,
    description: "MediQ UG Complete — monthly subscription",
    priceLabel: "₹999",
    cadence: "/ month",
    features: [
      "All UG subjects & video chunks",
      "Adaptive flashcard decks",
      "Focus mode + streaks",
      "Export to Anki / Notion",
    ],
    highlight: true,
    color: "#0F52BA",
  },
  {
    id: "pg",
    label: "PG Complete",
    tag: "NEET PG · USMLE · PLAB",
    amountInr: 1999,
    description: "MediQ PG Complete — monthly subscription",
    priceLabel: "₹1,999",
    cadence: "/ month",
    features: [
      "All PG MCQ banks (20k+)",
      "Mock exams with analytics",
      "1:1 mentor sessions",
      "Priority support",
    ],
    highlight: false,
    color: "#7C3AED",
  },
];

// ── Flashcard flip demo ────────────────────────────────────────

function FlashcardDemo() {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box sx={{ perspective: 1400, maxWidth: 440, mx: "auto" }}>
      <Box
        onClick={() => setFlipped((v) => !v)}
        data-testid="demo-flashcard-flip"
        sx={{
          position: "relative",
          height: 220,
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
            boxShadow: 6,
            borderTop: "4px solid #0F52BA",
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: "0.2em", fontWeight: 600 }}
            >
              PHARMACOLOGY · SAMPLE
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "text.secondary" }}>
              <AutorenewIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption">Tap to flip</Typography>
            </Stack>
          </Stack>
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            What is the mechanism of action of penicillin?
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip label="Easy" size="small" color="success" sx={{ fontWeight: 700, fontSize: 10, height: 20 }} />
            <Chip label="β-lactam" size="small" variant="outlined" sx={{ fontSize: 10, height: 20 }} />
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
            boxShadow: 8,
          }}
        >
          <Typography variant="overline" sx={{ letterSpacing: "0.2em", fontWeight: 700, opacity: 0.8 }}>
            ANSWER
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.6 }}>
            Inhibits bacterial cell-wall synthesis by binding penicillin-binding proteins and blocking peptidoglycan cross-linking.
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip label="β-lactam" size="small" sx={{ bgcolor: "rgba(255,255,255,.2)", color: "#fff", fontWeight: 700 }} />
            <Chip label="Bactericidal" size="small" sx={{ bgcolor: "rgba(255,255,255,.2)", color: "#fff", fontWeight: 700 }} />
          </Stack>
        </Card>
      </Box>

      {/* Confidence buttons */}
      <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
        {["Hard", "Medium", "Easy"].map((l, i) => (
          <Button
            key={l}
            fullWidth
            variant={i === 2 ? "contained" : "outlined"}
            color={i === 2 ? "success" : "inherit"}
            size="small"
            sx={{ fontWeight: 700 }}
          >
            {l}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}

// ── Page ───────────────────────────────────────────────────────

export default function DemoPage() {
  const navigate = useNavigate();
  const { setSubscribed, setProfile, profile } = useUserStore();

  const { initiatePayment, loading: payLoading, error: payError } = useRazorpay(
    (_response, plan) => {
      setSubscribed(true);
      setProfile({
        ...profile,
        plan: plan.id as "ug" | "pg",
        planLabel: plan.label,
        isActive: true,
        planExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString().split("T")[0],
      });
      navigate("/dashboard");
    }
  );

  return (
    <Box>
      {/* ── Hero ── */}
      <Box
        sx={{
          background: (t) =>
            t.palette.mode === "light"
              ? "linear-gradient(135deg, #eff6ff 0%, #ecfdf5 100%)"
              : "linear-gradient(135deg, rgba(15,82,186,.15) 0%, rgba(16,185,129,.1) 100%)",
          borderBottom: 1,
          borderColor: "divider",
          py: { xs: 5, md: 7 },
          px: { xs: 3, md: 6 },
        }}
      >
        <Chip
          label="FREE PREVIEW"
          size="small"
          color="success"
          sx={{ fontWeight: 700, letterSpacing: "0.15em", mb: 2 }}
        />
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, maxWidth: 520, lineHeight: 1.2 }}>
          See how MediQ makes medical study actually work.
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 480, mb: 3, fontSize: "1rem" }}>
          Explore demo content below — video chunks, interactive flashcards, and the full learning flow.
          No subscription needed to preview.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<LockOpenOutlinedIcon />}
          onClick={() => initiatePayment(PLANS[0])}
          disabled={payLoading}
          data-testid="demo-get-access"
          sx={{ fontWeight: 700 }}
        >
          Get full access
        </Button>
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>

        {/* ── Demo Videos ── */}
        <Box sx={{ mb: 6 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.75 }}>
            <OndemandVideoOutlinedIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Demo Video Chunks
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Each topic broken into a focused 5–7 minute chunk. Watch a sample below.
          </Typography>

          <Grid container spacing={3}>
            {DEMO_VIDEOS.map((v) => (
              <Grid key={v.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  variant="outlined"
                  sx={{
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "box-shadow 0.2s, transform 0.2s",
                    "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
                  }}
                  data-testid={`demo-video-${v.id}`}
                >
                  {/* Thumbnail placeholder */}
                  <Box
                    sx={{
                      height: 140,
                      bgcolor: v.color + "18",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(135deg, ${v.color}22 0%, ${v.color}08 100%)`,
                      }}
                    />
                    <PlayCircleFilledIcon sx={{ fontSize: 52, color: v.color, opacity: 0.85, zIndex: 1 }} />
                    <Chip
                      label={v.duration}
                      size="small"
                      sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        bgcolor: "rgba(0,0,0,.55)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 11,
                        height: 22,
                      }}
                    />
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {v.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {v.subject}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ mb: 6 }} />

        {/* ── Flashcard Demo ── */}
        <Box sx={{ mb: 6 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.75 }}>
            <LayersOutlinedIcon sx={{ color: "success.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Interactive Flashcards
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Tap a card to reveal the answer. Rate your confidence — MediQ schedules the next review for you.
          </Typography>
          <FlashcardDemo />
        </Box>

        <Divider sx={{ mb: 6 }} />

        {/* ── How it works ── */}
        <Box sx={{ mb: 6 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.75 }}>
            <AutoAwesomeIcon sx={{ color: "warning.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              How learning works
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Four steps, built for busy medical students.
          </Typography>

          <Grid container spacing={3}>
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Grid key={step.title} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card variant="outlined" sx={{ p: 3, height: "100%" }}>
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                      <Avatar sx={{ bgcolor: step.color + "18", width: 40, height: 40 }}>
                        <Icon sx={{ fontSize: 20, color: step.color }} />
                      </Avatar>
                      <Chip
                        label={`Step ${i + 1}`}
                        size="small"
                        sx={{ fontWeight: 700, fontSize: 10, height: 20, bgcolor: step.color + "15", color: step.color }}
                      />
                    </Stack>
                    <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.75 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem", lineHeight: 1.6 }}>
                      {step.body}
                    </Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Divider sx={{ mb: 6 }} />

        {/* ── Pricing / Get Access ── */}
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.75 }}>
            <LockOpenOutlinedIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Get full access
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Unlock all video chunks, flashcard decks, MCQ banks, and progress tracking.
          </Typography>

          {payError && (
            <Alert severity="error" sx={{ mb: 3, maxWidth: 700 }}>
              {payError}
            </Alert>
          )}

          <Grid container spacing={3} sx={{ maxWidth: 700 }}>
            {PLANS.map((plan) => (
              <Grid key={plan.id} size={{ xs: 12, sm: 6 }}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderColor: plan.highlight ? "primary.main" : "divider",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {plan.highlight && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        bgcolor: plan.color,
                      }}
                    />
                  )}
                  {plan.highlight && (
                    <Chip
                      label="MOST POPULAR"
                      size="small"
                      color="primary"
                      sx={{ alignSelf: "flex-start", fontWeight: 700, fontSize: 10, mb: 1.5 }}
                    />
                  )}
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {plan.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 1.5 }}>
                    {plan.tag}
                  </Typography>
                  <Stack direction="row" alignItems="baseline" spacing={0.5} sx={{ mb: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                      {plan.priceLabel}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {plan.cadence}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.75} sx={{ flex: 1, mb: 2.5 }}>
                    {plan.features.map((f) => (
                      <Stack key={f} direction="row" spacing={1} alignItems="center">
                        <CheckCircleOutlineIcon sx={{ fontSize: 14, color: "success.main", flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                          {f}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    fullWidth
                    variant={plan.highlight ? "contained" : "outlined"}
                    color="primary"
                    size="large"
                    disabled={payLoading}
                    sx={{ fontWeight: 700 }}
                    onClick={() => initiatePayment(plan)}
                    data-testid={`demo-buy-${plan.id}`}
                  >
                    {payLoading ? "Opening payment…" : `Get started — ${plan.priceLabel}`}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>
    </Box>
  );
}
