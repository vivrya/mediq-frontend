import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  Chip,
  LinearProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { SvgIconComponent } from "@mui/icons-material";

const stats: { icon: SvgIconComponent; label: string; value: string; color: string }[] = [
  { icon: LocalFireDepartmentIcon, label: "CURRENT STREAK", value: "14 days", color: "#ed6c02" },
  { icon: EmojiEventsIcon, label: "TOTAL XP", value: "24,820", color: "#2e7d32" },
  { icon: TrendingUpIcon, label: "AVG ACCURACY", value: "88%", color: "#1976d2" },
  { icon: CalendarMonthIcon, label: "THIS WEEK", value: "6h 42m", color: "#616161" },
];

const subjects = [
  { name: "Anatomy", pct: 82, color: "primary" as const },
  { name: "Physiology", pct: 68, color: "success" as const },
  { name: "Pharmacology", pct: 54, color: "primary" as const },
  { name: "Pathology", pct: 41, color: "success" as const },
];

export function ProgressPreview() {
  const cells = Array.from({ length: 7 * 20 }, (_, i) => {
    const v = (Math.sin(i * 1.3) + Math.cos(i * 0.7)) * 50 + 50;
    return Math.max(0, Math.min(100, v));
  });
  const colorFor = (v: number) => {
    if (v < 15) return "rgba(0,0,0,.08)";
    if (v < 40) return "rgba(46,125,50,.25)";
    if (v < 65) return "rgba(46,125,50,.55)";
    if (v < 85) return "rgba(46,125,50,.8)";
    return "#2e7d32";
  };

  return (
    <Box component="section" id="progress" sx={{ py: { xs: 10, md: 16 }, bgcolor: "action.hover", borderTop: 1, borderBottom: 1, borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 620, mb: 6 }}>
          <Chip label="PROGRESS TRACKER" size="small" variant="outlined" sx={{ fontWeight: 600, letterSpacing: "0.15em", mb: 2 }} />
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 2 }}>
            The dashboard that keeps you coming back.
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "1.125rem" }}>
            No anxiety-inducing red dots. Just clear signal on what you've mastered,
            what's fading, and what's next.
          </Typography>
        </Box>

        <Card variant="outlined" sx={{ p: { xs: 3, md: 5 } }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Grid container spacing={2}>
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Grid size={{ xs: 6, lg: 12 }} key={s.label}>
                      <Card variant="outlined" sx={{ p: 2.5 }}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 2,
                            bgcolor: s.color + "22",
                            color: s.color,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon fontSize="small" />
                        </Box>
                        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.2em", fontWeight: 600, display: "block", mt: 2 }}>
                          {s.label}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                          {s.value}
                        </Typography>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>

            <Grid size={{ xs: 12, lg: 8 }}>
              <Stack spacing={3}>
                <Card variant="outlined" sx={{ p: 2.5 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Study activity · last 20 weeks
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Less → More
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      mt: 2,
                      display: "grid",
                      gridAutoFlow: "column",
                      gridTemplateRows: "repeat(7, 1fr)",
                      gap: 0.5,
                    }}
                  >
                    {cells.map((v, i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: 0.5,
                          backgroundColor: colorFor(v),
                        }}
                      />
                    ))}
                  </Box>
                </Card>

                <Card variant="outlined" sx={{ p: 2.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Subject mastery
                  </Typography>
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    {subjects.map((s) => (
                      <Box key={s.name}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {s.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                            {s.pct}%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={s.pct}
                          color={s.color}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}
