import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Link as MuiLink,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Logo } from "@/components/mediq/Logo";

const cols = [
  { title: "Product", links: ["Features", "ADHD Method", "Video chunks", "Progress", "Pricing"] },
  { title: "Exams", links: ["MBBS (UG)", "USMLE", "NEET PG", "PLAB", "AMC"] },
  { title: "Company", links: ["About", "Manifesto", "Careers", "Press", "Contact"] },
  { title: "Resources", links: ["Blog", "Research", "Study guide", "Help center", "Status"] },
];

const socials = [TwitterIcon, InstagramIcon, LinkedInIcon, YouTubeIcon];

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "action.hover", borderTop: 1, borderColor: "divider", pt: 10, pb: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Logo />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, maxWidth: 300 }}>
              The calm, focused way to prepare for medicine. Built with ADHD
              medics, loved by every student.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              {socials.map((Icon, i) => (
                <IconButton
                  key={i}
                  data-testid={`social-${i}`}
                  aria-label="Social link"
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    width: 36,
                    height: 36,
                    color: "text.secondary",
                    "&:hover": { color: "text.primary", bgcolor: "action.selected" },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {cols.map((c) => (
            <Grid size={{ xs: 6, md: 2 }} key={c.title}>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ letterSpacing: "0.2em", fontWeight: 600 }}
              >
                {c.title}
              </Typography>
              <Stack spacing={1.25} sx={{ mt: 2 }}>
                {c.links.map((l) => (
                  <MuiLink
                    key={l}
                    href="#"
                    underline="hover"
                    color="text.primary"
                    variant="body2"
                  >
                    {l}
                  </MuiLink>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 5 }} />
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ md: "center" }}
          spacing={2}
        >
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Mediq Learning Labs · All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2.5} flexWrap="wrap">
            {["Privacy", "Terms", "Security", "Cookies"].map((x) => (
              <MuiLink key={x} href="#" underline="hover" color="text.secondary" variant="caption">
                {x}
              </MuiLink>
            ))}
          </Stack>
        </Stack>

        <Typography
          align="center"
          sx={{
            mt: 6,
            fontSize: "22vw",
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            background: "linear-gradient(90deg, #1976d2, #2e7d32)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            userSelect: "none",
            overflow: "hidden",
          }}
        >
          Mediq
        </Typography>
      </Container>
    </Box>
  );
}
