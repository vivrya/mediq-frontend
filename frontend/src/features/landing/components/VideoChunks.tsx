import { Box, Container, Typography, Card, Stack, Chip, LinearProgress, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { VIDEO_CHUNKS } from "../constants";

export function VideoChunks() {
  return (
    <Box component="section" id="video-demo" sx={{ py: { xs: 10, md: 16 }, bgcolor: "action.hover", borderTop: 1, borderBottom: 1, borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 620, mb: 6 }}>
          <Chip label={VIDEO_CHUNKS.badge} size="small" variant="outlined" sx={{ fontWeight: 600, letterSpacing: "0.15em", mb: 2 }} />
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 2 }}>
            {VIDEO_CHUNKS.heading}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "1.125rem" }}>
            {VIDEO_CHUNKS.description}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Card sx={{ position: "relative", aspectRatio: "16 / 9", borderRadius: 4, overflow: "hidden", background: "linear-gradient(135deg, #1976d2, #2e7d32)", boxShadow: 6 }}>
              <Stack direction="row" justifyContent="space-between" sx={{ position: "absolute", top: 16, left: 16, right: 16 }}>
                <Chip label={VIDEO_CHUNKS.liveBadge} size="small" sx={{ bgcolor: "rgba(0,0,0,.35)", color: "#fff", fontWeight: 700 }} />
                <Chip icon={<AccessTimeIcon sx={{ color: "#fff !important" }} />} label={VIDEO_CHUNKS.featuredDuration} size="small" sx={{ bgcolor: "rgba(0,0,0,.35)", color: "#fff", fontWeight: 700 }} />
              </Stack>
              <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconButton data-testid="video-play-mock" sx={{ width: 80, height: 80, bgcolor: "rgba(255,255,255,.95)", boxShadow: 6, "&:hover": { bgcolor: "#fff", transform: "scale(1.05)" } }}>
                  <PlayArrowIcon sx={{ fontSize: 40, color: "primary.main" }} />
                </IconButton>
              </Box>
              <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: 3 }}>
                <Typography variant="overline" sx={{ color: "rgba(255,255,255,.8)", letterSpacing: "0.2em", fontWeight: 700 }}>
                  {VIDEO_CHUNKS.featuredTag}
                </Typography>
                <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
                  {VIDEO_CHUNKS.featuredTitle}
                </Typography>
                <LinearProgress variant="determinate" value={33} sx={{ mt: 1.5, height: 6, borderRadius: 3, bgcolor: "rgba(255,255,255,.25)", "& .MuiLinearProgress-bar": { bgcolor: "#fff" } }} />
              </Box>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Card variant="outlined" sx={{ p: 2.5, height: "100%" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{VIDEO_CHUNKS.playlistTitle}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{VIDEO_CHUNKS.playlistMeta}</Typography>
              </Stack>
              <Stack spacing={1} sx={{ mt: 2 }}>
                {VIDEO_CHUNKS.chunks.map((c, i) => (
                  <Card
                    key={i}
                    variant="outlined"
                    data-testid={`playlist-item-${i}`}
                    sx={{
                      p: 1.5, display: "flex", alignItems: "center", gap: 2, cursor: "pointer",
                      ...(c.active ? { borderColor: "primary.main", bgcolor: "primary.light" } : { "&:hover": { bgcolor: "action.hover" } }),
                    }}
                  >
                    <Box sx={{ width: 40, height: 40, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, bgcolor: c.done ? "success.light" : "action.selected", color: c.done ? "success.dark" : "text.secondary" }}>
                      {c.done ? <CheckCircleIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{c.tag}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{c.duration}</Typography>
                  </Card>
                ))}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
