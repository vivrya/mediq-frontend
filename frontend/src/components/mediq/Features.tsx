import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  LinearProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import LayersIcon from "@mui/icons-material/Layers";
import TimerIcon from "@mui/icons-material/Timer";
import ShowChartIcon from "@mui/icons-material/ShowChart";

export function Features() {
  return (
    <Box component="section" id="features" sx={{ py: { xs: 10, md: 16 } }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 720, mb: 7 }}>
          <Chip
            icon={<AutoAwesomeIcon />}
            label="WHY MEDIQ"
            size="small"
            variant="outlined"
            sx={{ fontWeight: 600, letterSpacing: "0.15em", mb: 2.5 }}
          />
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 2 }}>
            A learning stack built for the medical marathon.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.125rem" }}>
            Seven years of syllabus. Millions of facts. One calm system that keeps
            your focus, memory and momentum high.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* ADHD big card */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card variant="outlined" sx={{ height: "100%", p: { xs: 3, md: 5 } }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: "primary.light",
                  color: "primary.dark",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PsychologyAltIcon />
              </Box>
              <Typography variant="h4" sx={{ mt: 3, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
                ADHD-friendly methods, by default
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 520 }}>
                Every module is chunked into 3–7 minute micro-lessons, gamified with
                streaks and dopamine loops, and paced with focus timers so your brain
                never gets bored — or burned out.
              </Typography>

              <Grid container spacing={1.5} sx={{ mt: 3 }}>
                {[
                  { k: "3–7 min", v: "Micro-lessons" },
                  { k: "25/5", v: "Focus sprints" },
                  { k: "Daily", v: "Dopamine loops" },
                ].map((s) => (
                  <Grid size={{ xs: 4 }} key={s.k}>
                    <Card variant="outlined" sx={{ p: 1.5 }}>
                      <Typography variant="h6">{s.k}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {s.v}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>

          {/* Video Chunks */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined" sx={{ height: "100%", p: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: "success.light",
                  color: "success.dark",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PlayCircleIcon />
              </Box>
              <Typography variant="h5" sx={{ mt: 2.5, fontSize: "1.25rem" }}>
                Video chunks, not lectures
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Binge-worthy clips that fit between classes, commutes and coffee.
              </Typography>
              <Box
                sx={{
                  mt: 3,
                  aspectRatio: "16 / 9",
                  borderRadius: 2,
                  border: 1,
                  borderColor: "divider",
                  position: "relative",
                  overflow: "hidden",
                  bgcolor: "action.hover",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 0.5,
                  p: 0.5,
                }}
              >
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      borderRadius: 1,
                      background: "linear-gradient(135deg, rgba(25,118,210,.25), rgba(46,125,50,.2))",
                      opacity: 0.4 + i * 0.1,
                    }}
                  />
                ))}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      bgcolor: "background.paper",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: 3,
                    }}
                  >
                    <PlayCircleIcon color="primary" />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Flashcards CSS mock */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card variant="outlined" sx={{ height: "100%", p: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: "primary.light",
                  color: "primary.dark",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LayersIcon />
              </Box>
              <Typography variant="h5" sx={{ mt: 2.5, fontSize: "1.25rem" }}>
                Spaced-repetition flashcards
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Proven to cut recall failures in half. Our engine adapts to your
                forgetting curve.
              </Typography>
              <Box
                sx={{
                  mt: 3,
                  position: "relative",
                  height: 200,
                  borderRadius: 2,
                  overflow: "hidden",
                  background: "linear-gradient(135deg, rgba(25,118,210,.15), rgba(46,125,50,.15))",
                }}
              >
                <Card
                  sx={{
                    position: "absolute",
                    left: 24,
                    top: 24,
                    width: 160,
                    p: 1.5,
                    transform: "rotate(-8deg)",
                    boxShadow: 3,
                  }}
                >
                  <Typography variant="overline" color="text.secondary" sx={{ fontSize: 9 }}>
                    Anatomy
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 12, mt: 0.5 }}>
                    Brachial plexus roots?
                  </Typography>
                  <LinearProgress variant="determinate" value={33} color="success" sx={{ mt: 1, height: 4, borderRadius: 2 }} />
                </Card>
                <Card
                  sx={{
                    position: "absolute",
                    right: 20,
                    top: 40,
                    width: 160,
                    p: 1.5,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    transform: "rotate(6deg)",
                    boxShadow: 3,
                  }}
                >
                  <Typography variant="overline" sx={{ fontSize: 9, opacity: 0.8 }}>
                    Pharma
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 12, mt: 0.5 }}>
                    β-lactams mechanism
                  </Typography>
                  <Box sx={{ mt: 1, height: 4, borderRadius: 2, bgcolor: "rgba(255,255,255,.2)" }}>
                    <Box sx={{ height: 4, borderRadius: 2, width: "66%", bgcolor: "success.light" }} />
                  </Box>
                </Card>
                <Card
                  sx={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    bottom: 20,
                    width: 190,
                    p: 1.5,
                    boxShadow: 3,
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="overline" color="text.secondary" sx={{ fontSize: 9 }}>
                      Physio · Due
                    </Typography>
                    <Typography variant="overline" color="success.main" sx={{ fontSize: 9, fontWeight: 700 }}>
                      +12 XP
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 12, mt: 0.5 }}>
                    Frank-Starling law in 1 line
                  </Typography>
                </Card>
              </Box>
            </Card>
          </Grid>

          {/* Focus timer */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Card variant="outlined" sx={{ height: "100%", p: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: "success.light",
                  color: "success.dark",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TimerIcon />
              </Box>
              <Typography variant="h5" sx={{ mt: 2.5, fontSize: "1.125rem" }}>
                Focus mode
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Distraction-free sessions with ambient cues.
              </Typography>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Box sx={{ position: "relative", width: 112, height: 112 }}>
                  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                    <circle cx={50} cy={50} r={44} fill="none" stroke="#e0e0e0" strokeWidth={6} />
                    <circle
                      cx={50}
                      cy={50}
                      r={44}
                      fill="none"
                      stroke="#2e7d32"
                      strokeWidth={6}
                      strokeDasharray="276"
                      strokeDashoffset="70"
                      strokeLinecap="round"
                    />
                  </svg>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ position: "absolute", inset: 0 }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      17:32
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: "0.2em" }}>
                      DEEP WORK
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Progress */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined" sx={{ height: "100%", p: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: "primary.light",
                  color: "primary.dark",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShowChartIcon />
              </Box>
              <Typography variant="h5" sx={{ mt: 2.5, fontSize: "1.25rem" }}>
                Progress you can feel
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Streaks, XP, mastery heatmaps — know exactly where to sharpen next.
              </Typography>
              <Stack direction="row" spacing={0.5} sx={{ mt: 3, height: 80, alignItems: "flex-end" }}>
                {[30, 55, 42, 70, 50, 88, 72, 95, 68, 82, 90, 100].map((h, i) => (
                  <Box
                    key={i}
                    sx={{
                      flex: 1,
                      height: `${h}%`,
                      borderRadius: "4px 4px 0 0",
                      background: "linear-gradient(to top, rgba(25,118,210,.3), #2e7d32)",
                    }}
                  />
                ))}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
