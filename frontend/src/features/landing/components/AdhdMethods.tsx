import { Box, Container, Typography, Card, Stack, Chip } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WavesIcon from "@mui/icons-material/Waves";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { SvgIconComponent } from "@mui/icons-material";
import { CellMitosis } from "@/components/animations/CellMitosis";
import { ADHD_METHODS } from "../constants";

const pillarIcons: SvgIconComponent[] = [PsychologyAltIcon, LocalFireDepartmentIcon, WavesIcon, GpsFixedIcon];

export function AdhdMethods() {
  const pillars = ADHD_METHODS.pillars.map((p, i) => ({ ...p, icon: pillarIcons[i] }));

  return (
    <Box component="section" id="adhd" sx={{ py: { xs: 10, md: 16 }, position: "relative", overflow: "hidden" }}>
      <Box sx={{ position: "absolute", left: -80, top: "50%", transform: "translateY(-50%)", width: 540, height: 540, pointerEvents: "none", display: { xs: "none", lg: "block" } }} aria-hidden>
        <CellMitosis opacity={0.55} />
      </Box>
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Grid container spacing={{ xs: 6, lg: 10 }} alignItems="flex-start">
          <Grid size={{ xs: 12, lg: 5 }}>
            <Box sx={{ position: { lg: "sticky" }, top: { lg: 112 } }}>
              <Chip label={ADHD_METHODS.badge} color="success" variant="outlined" size="small" sx={{ fontWeight: 600, letterSpacing: "0.15em", mb: 2 }} />
              <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 2.5 }}>
                {ADHD_METHODS.heading}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: "1.125rem", mb: 4 }}>
                {ADHD_METHODS.description}{" "}
                <Box component="em">{ADHD_METHODS.descriptionEmphasis}</Box>{" "}
                {ADHD_METHODS.descriptionSuffix}
              </Typography>
              <Card variant="outlined" sx={{ p: 2.5, bgcolor: "action.hover" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: "success.light", color: "success.dark", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <LocalFireDepartmentIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{ADHD_METHODS.statValue}</Typography>
                    <Typography variant="caption" color="text.secondary">{ADHD_METHODS.statCaption}</Typography>
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
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>{p.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{p.body}</Typography>
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
