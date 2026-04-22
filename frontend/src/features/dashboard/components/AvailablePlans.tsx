import { Box, Typography, Card, Stack, Chip, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { SectionHeader } from "./SectionHeader";

const fullPlans = [
  {
    id: "ug",
    name: "UG Complete Plan",
    tag: "For MBBS UG",
    price: "$12",
    cadence: "/ month",
    features: ["All UG subjects & chunks", "Adaptive flashcards", "Focus mode + streaks", "Export to Anki / Notion"],
    highlight: true,
  },
  {
    id: "pg",
    name: "PG Complete Plan",
    tag: "USMLE · NEET PG · PLAB",
    price: "$29",
    cadence: "/ month",
    features: ["All PG MCQ banks (20k+)", "Mock exams with analytics", "1:1 mentor sessions", "Priority support"],
  },
];

const subjectPlans = [
  { id: "anatomy", name: "Anatomy", chapters: 42, price: "$6", color: "#0F52BA" },
  { id: "pharmacology", name: "Pharmacology", chapters: 38, price: "$6", color: "#10B981" },
  { id: "pathology", name: "Pathology", chapters: 35, price: "$6", color: "#7C3AED" },
  { id: "medicine", name: "Medicine", chapters: 64, price: "$8", color: "#F59E0B" },
];

export function AvailablePlans() {
  return (
    <Box sx={{ mb: 6 }} id="plans" data-testid="dash-available-plans">
      <SectionHeader title="Available plans" subtitle="Full plans or single subjects — pick your pace" />

      <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.15em", display: "block", mb: 1.5 }}>
        FULL PLANS
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {fullPlans.map((p) => (
          <Grid size={{ xs: 12, md: 6 }} key={p.id}>
            <Card
              variant={p.highlight ? "elevation" : "outlined"}
              elevation={p.highlight ? 6 : 0}
              sx={{
                p: { xs: 3, md: 4 },
                height: "100%",
                position: "relative",
                ...(p.highlight ? { borderTop: 4, borderColor: "primary.main" } : {}),
              }}
              data-testid={`dash-plan-${p.id}`}
            >
              {p.highlight && (
                <Chip
                  label="MOST POPULAR"
                  color="primary"
                  size="small"
                  sx={{ position: "absolute", top: 16, right: 16, fontWeight: 700, letterSpacing: "0.1em" }}
                />
              )}
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.2em", fontWeight: 600 }}>
                {p.tag}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
                {p.name}
              </Typography>
              <Stack direction="row" alignItems="flex-end" spacing={0.75} sx={{ mt: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, fontSize: "2.75rem", lineHeight: 1 }}>
                  {p.price}
                </Typography>
                <Typography color="text.secondary" sx={{ pb: 1 }}>
                  {p.cadence}
                </Typography>
              </Stack>
              <Stack spacing={1.25} sx={{ mt: 2.5 }}>
                {p.features.map((f) => (
                  <Stack key={f} direction="row" spacing={1.25} alignItems="center">
                    <CheckCircleOutlineIcon color="success" sx={{ fontSize: 18 }} />
                    <Typography variant="body2">{f}</Typography>
                  </Stack>
                ))}
              </Stack>
              <Button
                fullWidth
                size="large"
                variant={p.highlight ? "contained" : "outlined"}
                color={p.highlight ? "primary" : "inherit"}
                sx={{ mt: 3 }}
                data-testid={`dash-plan-${p.id}-buy`}
              >
                Buy now
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.15em", display: "block", mb: 1.5 }}>
        SUBJECT-WISE PLANS
      </Typography>
      <Grid container spacing={2.5}>
        {subjectPlans.map((s) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={s.id}>
            <Card
              variant="outlined"
              sx={{
                p: 2.5,
                height: "100%",
                transition: "transform .2s ease, box-shadow .2s ease",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
              }}
              data-testid={`dash-subject-${s.id}`}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  bgcolor: s.color + "20",
                  color: s.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 18,
                }}
              >
                {s.name[0]}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }}>
                {s.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {s.chapters} chapters · 3-7 min chunks
              </Typography>
              <Stack direction="row" alignItems="flex-end" spacing={0.5} sx={{ mt: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {s.price}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ pb: 0.4 }}>
                  / month
                </Typography>
              </Stack>
              <Button
                fullWidth
                size="small"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                data-testid={`dash-subject-${s.id}-buy`}
              >
                Buy now
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
