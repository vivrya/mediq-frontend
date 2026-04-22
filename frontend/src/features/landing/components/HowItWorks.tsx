import { Box, Container, Typography, Card, Stack, Chip } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExploreIcon from "@mui/icons-material/Explore";
import BoltIcon from "@mui/icons-material/Bolt";
import RepeatIcon from "@mui/icons-material/Repeat";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { SvgIconComponent } from "@mui/icons-material";
import { HOW_IT_WORKS } from "../constants";

const icons: SvgIconComponent[] = [ExploreIcon, BoltIcon, RepeatIcon, EmojiEventsIcon];

export function HowItWorks() {
  const steps = HOW_IT_WORKS.steps.map((s, i) => ({ ...s, icon: icons[i] }));

  return (
    <Box component="section" id="method" sx={{ py: { xs: 10, md: 16 }, bgcolor: "action.hover", borderTop: 1, borderBottom: 1, borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", lg: "row" }} justifyContent="space-between" alignItems={{ lg: "flex-end" }} spacing={3} sx={{ mb: 6 }}>
          <Box sx={{ maxWidth: 560 }}>
            <Chip label={HOW_IT_WORKS.badge} size="small" variant="outlined" sx={{ fontWeight: 600, letterSpacing: "0.15em", mb: 2 }} />
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
              {HOW_IT_WORKS.heading}
            </Typography>
          </Box>
          <Typography color="text.secondary" sx={{ maxWidth: 380 }}>
            {HOW_IT_WORKS.description}
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={s.title}>
                <Card variant="outlined" sx={{ p: 3, height: "100%" }} data-testid={`step-${i + 1}`}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>0{i + 1}</Typography>
                    <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: "primary.light", color: "primary.dark", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon fontSize="small" />
                    </Box>
                  </Stack>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{s.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{s.body}</Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
