import { Box, Container, Typography, Chip, Stack } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { OrbitParticles } from "@/components/animations/OrbitParticles";
import { WaitlistForm } from "@/components/shared/WaitlistForm";
import { FINAL_CTA } from "../constants";

export function FinalCTA() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 } }}>
      <Container maxWidth="lg">
        <Box sx={{ position: "relative", overflow: "hidden", borderRadius: 6, p: { xs: 5, md: 10 }, bgcolor: "grey.900", color: "grey.100", boxShadow: 8 }}>
          <Box sx={{ position: "absolute", top: -96, right: -96, width: 560, height: 560, pointerEvents: "none", display: { xs: "none", md: "block" } }} aria-hidden>
            <OrbitParticles opacity={0.6} />
          </Box>
          <Box sx={{ position: "relative", maxWidth: 720 }}>
            <Chip label={FINAL_CTA.badge} size="small" sx={{ bgcolor: "rgba(255,255,255,.08)", color: "grey.300", fontWeight: 600, letterSpacing: "0.15em", border: 1, borderColor: "rgba(255,255,255,.15)", mb: 3 }} />
            <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "3.5rem", lg: "4rem" }, lineHeight: 1.05, mb: 3, color: "#fff" }}>
              {FINAL_CTA.heading}{" "}
              <Box component="span" sx={{ background: "linear-gradient(90deg, #82e9b0, #90caf9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {FINAL_CTA.headingAccent}
              </Box>
            </Typography>
            <Typography sx={{ color: "grey.400", fontSize: "1.125rem", maxWidth: 540, mb: 4 }}>
              {FINAL_CTA.description}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <WaitlistForm source="final-cta" dark testIdPrefix="final-waitlist" ctaLabel="Claim my spot" />
            </Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ color: "grey.400" }}>
              <VerifiedUserIcon fontSize="small" sx={{ color: "success.light" }} />
              <Typography variant="body2" data-testid="final-cta-primary">{FINAL_CTA.guarantee}</Typography>
            </Stack>
            <Stack direction="row" flexWrap="wrap" useFlexGap spacing={2} sx={{ mt: 7, color: "rgba(255,255,255,.35)", fontSize: 11, letterSpacing: "0.25em", fontWeight: 600 }}>
              {FINAL_CTA.examTags.map((tag, i) => (
                <span key={tag}>{tag}{i < FINAL_CTA.examTags.length - 1 && <span style={{ marginLeft: 8 }}>·</span>}</span>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
