import { Box, Container, Typography, Button, Chip, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { OrbitParticles } from "@/components/mediq/animations/OrbitParticles";

export function FinalCTA() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 6,
            p: { xs: 5, md: 10 },
            bgcolor: "grey.900",
            color: "grey.100",
            boxShadow: 8,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -96,
              right: -96,
              width: 560,
              height: 560,
              pointerEvents: "none",
              display: { xs: "none", md: "block" },
            }}
            aria-hidden
          >
            <OrbitParticles opacity={0.6} />
          </Box>

          <Box sx={{ position: "relative", maxWidth: 720 }}>
            <Chip
              label="READY WHEN YOU ARE"
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,.08)",
                color: "grey.300",
                fontWeight: 600,
                letterSpacing: "0.15em",
                border: 1,
                borderColor: "rgba(255,255,255,.15)",
                mb: 3,
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", md: "3.5rem", lg: "4rem" },
                lineHeight: 1.05,
                mb: 3,
                color: "#fff",
              }}
            >
              Your next 60 minutes of study could be your{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg, #82e9b0, #90caf9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                best ever.
              </Box>
            </Typography>
            <Typography sx={{ color: "grey.400", fontSize: "1.125rem", maxWidth: 540, mb: 4 }}>
              Join 12,400+ UG and PG medical students who replaced burnout with a
              calm, focused rhythm.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} alignItems={{ sm: "center" }}>
              <Button
                variant="contained"
                size="large"
                color="inherit"
                endIcon={<ArrowForwardIcon />}
                data-testid="final-cta-primary"
                sx={{ bgcolor: "#fff", color: "grey.900", "&:hover": { bgcolor: "grey.100" }, px: 3.5, py: 1.25 }}
              >
                Start free — no card needed
              </Button>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ color: "grey.400" }}>
                <VerifiedUserIcon fontSize="small" sx={{ color: "success.light" }} />
                <Typography variant="body2">30-day money-back guarantee</Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              flexWrap="wrap"
              useFlexGap
              spacing={2}
              sx={{
                mt: 7,
                color: "rgba(255,255,255,.35)",
                fontSize: 11,
                letterSpacing: "0.25em",
                fontWeight: 600,
              }}
            >
              <span>UG · MBBS</span><span>·</span>
              <span>USMLE</span><span>·</span>
              <span>NEET PG</span><span>·</span>
              <span>PLAB</span><span>·</span>
              <span>AMC</span>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
