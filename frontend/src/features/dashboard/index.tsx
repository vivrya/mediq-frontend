import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Card,
  Chip,
  LinearProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { AvailablePlans } from "./components/AvailablePlans";
import { SectionHeader } from "./components/SectionHeader";
import { WELCOME, MY_COURSES, CONTINUE_LEARNING, FLASHCARDS_PREVIEW } from "./constants";

export default function DashboardPage() {
  return (
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>
          {/* Welcome */}
          <Box sx={{ mb: 5 }} data-testid="dash-welcome">
            <Chip
              icon={<AutoAwesomeIcon />}
              label={WELCOME.badge}
              color="success"
              variant="outlined"
              size="small"
              sx={{ mb: 2, letterSpacing: "0.15em" }}
            />
            <Typography variant="h3" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: 700 }}>
              {WELCOME.heading}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1.5, fontSize: "1.125rem", maxWidth: 560 }}>
              {WELCOME.description}
            </Typography>
          </Box>

          {/* My Courses */}
          <Box sx={{ mb: 6 }} data-testid="dash-my-courses">
            <SectionHeader title={MY_COURSES.title} subtitle={MY_COURSES.subtitle} />
            <Card
              variant="outlined"
              sx={{ p: { xs: 4, md: 6 }, textAlign: "center", borderStyle: "dashed", borderWidth: 2, bgcolor: "action.hover" }}
              data-testid="dash-courses-empty"
            >
              <Box
                sx={{
                  width: 72, height: 72, borderRadius: 3,
                  bgcolor: "primary.light", color: "primary.dark",
                  mx: "auto", display: "flex", alignItems: "center", justifyContent: "center", mb: 2.5,
                }}
              >
                <MenuBookOutlinedIcon sx={{ fontSize: 36 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {MY_COURSES.emptyHeading}
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 460, mx: "auto", mt: 1 }}>
                {MY_COURSES.emptyDescription}
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center" sx={{ mt: 3 }}>
                <Button variant="outlined" color="inherit" href="#plans" data-testid="dash-view-courses" sx={{ borderColor: "divider" }}>
                  {MY_COURSES.viewCoursesBtn}
                </Button>
                <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} href="#plans" data-testid="dash-get-access">
                  {MY_COURSES.getAccessBtn}
                </Button>
              </Stack>
            </Card>
          </Box>

          <AvailablePlans />

          {/* Continue learning + Flashcards preview */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Card variant="outlined" sx={{ p: { xs: 3, md: 4 }, height: "100%" }} data-testid="dash-continue-learning">
                <SectionHeader title={CONTINUE_LEARNING.title} subtitle={CONTINUE_LEARNING.subtitle} compact />
                <Box sx={{ mt: 2, p: 4, borderRadius: 3, border: 1, borderColor: "divider", bgcolor: "action.hover", textAlign: "center" }}>
                  <LockOutlinedIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {CONTINUE_LEARNING.heading}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 420, mx: "auto" }}>
                    {CONTINUE_LEARNING.description}
                  </Typography>
                  <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} href="#plans" sx={{ mt: 2.5 }} data-testid="dash-continue-unlock">
                    {CONTINUE_LEARNING.button}
                  </Button>
                </Box>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Card variant="outlined" sx={{ p: { xs: 3, md: 4 }, height: "100%" }} data-testid="dash-flashcards-preview">
                <SectionHeader title={FLASHCARDS_PREVIEW.title} subtitle={FLASHCARDS_PREVIEW.subtitle} compact />
                <Box sx={{ position: "relative", mt: 2, minHeight: 240 }}>
                  <Box
                    sx={{
                      position: "absolute", inset: 0, borderRadius: 3, filter: "blur(2px)",
                      background: (t) =>
                        t.palette.mode === "light"
                          ? "linear-gradient(135deg, rgba(15,82,186,.14), rgba(16,185,129,.14))"
                          : "linear-gradient(135deg, rgba(59,130,246,.18), rgba(16,185,129,.18))",
                    }}
                  />
                  <Card sx={{ position: "absolute", top: 16, left: 16, width: 170, p: 1.5, transform: "rotate(-6deg)", boxShadow: 3, filter: "blur(1px)", opacity: 0.85 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ fontSize: 9 }}>{FLASHCARDS_PREVIEW.card1Subject}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 12, mt: 0.5 }}>{FLASHCARDS_PREVIEW.card1Question}</Typography>
                    <LinearProgress variant="determinate" value={33} color="success" sx={{ mt: 1, height: 4, borderRadius: 2 }} />
                  </Card>
                  <Card sx={{ position: "absolute", top: 48, right: 12, width: 170, p: 1.5, bgcolor: "primary.main", color: "primary.contrastText", transform: "rotate(5deg)", boxShadow: 4, filter: "blur(1px)", opacity: 0.85 }}>
                    <Typography variant="overline" sx={{ fontSize: 9, opacity: 0.85 }}>{FLASHCARDS_PREVIEW.card2Subject}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 12, mt: 0.5 }}>{FLASHCARDS_PREVIEW.card2Answer}</Typography>
                  </Card>
                  <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", p: 3, zIndex: 2 }}>
                    <Box sx={{ width: 56, height: 56, borderRadius: "50%", bgcolor: "background.paper", boxShadow: 4, display: "flex", alignItems: "center", justifyContent: "center", mb: 1.5, border: 1, borderColor: "divider" }}>
                      <LockOutlinedIcon color="primary" />
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 700, maxWidth: 260 }}>
                      {FLASHCARDS_PREVIEW.heading}
                    </Typography>
                    <Button variant="contained" color="primary" size="small" sx={{ mt: 2 }} href="#plans" data-testid="dash-flashcards-unlock">
                      {FLASHCARDS_PREVIEW.button}
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
  );
}
