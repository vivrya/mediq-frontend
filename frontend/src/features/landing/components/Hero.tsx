import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Chip,
  Avatar,
  AvatarGroup,
  LinearProgress,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckIcon from "@mui/icons-material/Check";
import { NeuralNet } from "@/components/animations/NeuralNet";
import { WaitlistForm } from "@/components/shared/WaitlistForm";

const HERO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/6884ab8f-c36c-4a9c-aa44-f69c2646dc8a/images/887afc6ba91775830fc0d3e48d9c29d0e943f11dc8b671f42a1a3d84fa78bdd9.png";

export function Hero() {
  return (
    <Box
      id="top"
      component="section"
      sx={{
        position: "relative",
        pt: { xs: 14, md: 18 },
        pb: { xs: 8, md: 14 },
        overflow: "hidden",
      }}
    >
      <NeuralNet density={26} opacity={0.28} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 6, lg: 10 }}
          alignItems="center"
        >
          <Box sx={{ flex: 1.2 }}>
            <Chip
              icon={<AutoAwesomeIcon />}
              label="NEW · ADHD-FOCUSED ENGINE"
              color="success"
              variant="outlined"
              data-testid="hero-badge"
              sx={{ fontWeight: 600, letterSpacing: "0.1em", mb: 3 }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3rem", md: "3.75rem", lg: "4.25rem" },
                lineHeight: 1.05,
                mb: 3,
              }}
            >
              Study medicine the way your{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                brain actually learns.
              </Box>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.125rem", maxWidth: 560, mb: 4 }}>
              Mediq turns the entire UG & PG syllabus into bite-sized video chunks,
              adaptive flashcards and focus sprints — engineered for ADHD minds,
              loved by every medic.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start" sx={{ mb: 3 }}>
              <WaitlistForm source="hero" testIdPrefix="hero-waitlist" ctaLabel="Get early access" />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 0 }}>
              <Button
                variant="text"
                size="small"
                href="#video-demo"
                data-testid="hero-cta-secondary"
                startIcon={
                  <Avatar sx={{ bgcolor: "success.main", width: 24, height: 24 }}>
                    <PlayArrowIcon sx={{ fontSize: 14, color: "#fff" }} />
                  </Avatar>
                }
                sx={{ color: "text.secondary", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                Or watch the 60-sec demo
              </Button>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 5 }}>
              <AvatarGroup max={4}>
                {["#e11d48", "#1976d2", "#2e7d32", "#f59e0b"].map((c, i) => (
                  <Avatar key={i} sx={{ bgcolor: c, width: 32, height: 32 }}>
                    {" "}
                  </Avatar>
                ))}
              </AvatarGroup>
              <Typography variant="body2" color="text.secondary">
                <Box component="strong" sx={{ color: "text.primary" }}>
                  12,400+
                </Box>{" "}
                students preparing with Mediq
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ flex: 1, position: "relative", width: "100%", maxWidth: 460 }}>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: 6,
                background:
                  "linear-gradient(135deg, rgba(25,118,210,.22), transparent 60%, rgba(46,125,50,.2))",
                filter: "blur(30px)",
              }}
            />
            <Box
              sx={{
                position: "relative",
                aspectRatio: "1 / 1",
                borderRadius: 6,
                overflow: "hidden",
                border: 1,
                borderColor: "divider",
                boxShadow: 6,
              }}
            >
              <Box
                component="img"
                src={HERO_IMG}
                alt="Focused neural network illustrating ADHD-friendly learning"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  animation: "mediq-float 6s ease-in-out infinite",
                }}
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: 40,
                left: -24,
                bgcolor: "background.paper",
                borderRadius: 3,
                border: 1,
                borderColor: "divider",
                boxShadow: 4,
                px: 1.5,
                py: 1,
                animation: "mediq-float-slow 8s ease-in-out infinite",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <Avatar sx={{ bgcolor: "success.light", width: 32, height: 32 }}>
                  <CheckIcon sx={{ fontSize: 16, color: "success.dark" }} />
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Today
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    +248 XP · Streak 14🔥
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: 40,
                right: -16,
                bgcolor: "background.paper",
                borderRadius: 3,
                border: 1,
                borderColor: "divider",
                boxShadow: 4,
                px: 1.5,
                py: 1,
                animation: "mediq-float 7s ease-in-out infinite",
                minWidth: 140,
              }}
            >
              <Typography
                variant="caption"
                sx={{ letterSpacing: "0.15em", fontWeight: 700, color: "text.secondary" }}
              >
                RECALL
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.25 }}>
                94%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={94}
                color="success"
                sx={{ mt: 0.5, height: 6, borderRadius: 3 }}
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
