import { Box, Container, Typography, Card, Stack, Chip } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WavesIcon from "@mui/icons-material/Waves";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { CellMitosis } from "@/components/mediq/animations/CellMitosis";

const pillars = [
  { icon: PsychologyAltIcon, title: "Chunked cognition", body: "Lessons under 7 minutes match a distractible attention span — without losing depth." },
  { icon: LocalFireDepartmentIcon, title: "Dopamine loops", body: "Micro-rewards after every task keep motivation high and shame spirals out." },
  { icon: WavesIcon, title: "Calm, predictable UI", body: "No flashy noise. A quiet, structured interface so your brain can finally rest and learn." },
  { icon: GpsFixedIcon, title: "One next action", body: "You always know the single most important thing to do next — never a blank page." },
];

export function AdhdMethods() {
  return (
    <Box component="section" id="adhd" sx={{ py: { xs: 10, md: 16 }, position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute",
          left: -80,
          top: "50%",
          transform: "translateY(-50%)",
          width: 540,
          height: 540,
          pointerEvents: "none",
          display: { xs: "none", lg: "block" },
        }}
        aria-hidden
      >
        <CellMitosis opacity={0.55} />
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Grid container spacing={{ xs: 6, lg: 10 }} alignItems="flex-start">
          <Grid size={{ xs: 12, lg: 5 }}>
            <Box sx={{ position: { lg: "sticky" }, top: { lg: 112 } }}>
              <Chip label="ADHD-FIRST DESIGN" color="success" variant="outlined" size="small" sx={{ fontWeight: 600, letterSpacing: "0.15em", mb: 2 }} />
              <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 2.5 }}>
                Built with neurodivergent medics, not around them.
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: "1.125rem", mb: 4 }}>
                Traditional textbooks weren't built for variable focus. Mediq is
                engineered on four science-backed principles — so attention,
                motivation and memory finally work <Box component="em">for</Box> you.
              </Typography>
              <Card variant="outlined" sx={{ p: 2.5, bgcolor: "action.hover" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: "success.light", color: "success.dark", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <LocalFireDepartmentIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      63% more study minutes per week
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Reported by Mediq beta users after 30 days.
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }}>
            <Grid container spacing={2.5}>
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <Grid size={{ xs: 12, sm: 6 }} key={p.title}>
                    <Card variant="outlined" sx={{ p: 3, height: "100%", transition: "transform .2s ease, box-shadow .2s ease", "&:hover": { transform: "translateY(-4px)", boxShadow: 4 } }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: "primary.light", color: "primary.dark", display: "inline-flex", alignItems: "center", justifyContent: "center", mb: 2.5 }}>
                        <Icon />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {p.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {p.body}
                      </Typography>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
