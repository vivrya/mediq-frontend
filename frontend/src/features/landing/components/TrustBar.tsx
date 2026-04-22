import { Box, Container, Typography, Stack } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BiotechIcon from "@mui/icons-material/Biotech";
import { SvgIconComponent } from "@mui/icons-material";
import { TRUST_BAR } from "../constants";

const icons: SvgIconComponent[] = [
  ApartmentIcon, MedicalServicesIcon, SchoolIcon, FavoriteIcon, LocalHospitalIcon, BiotechIcon,
];

export function TrustBar() {
  const items = TRUST_BAR.institutions.map((name, i) => ({ name, icon: icons[i] }));
  const loop = [...items, ...items];

  return (
    <Box component="section" data-testid="trust-bar" sx={{ borderTop: 1, borderBottom: 1, borderColor: "divider", bgcolor: "background.paper", py: 5 }}>
      <Container maxWidth="lg">
        <Typography align="center" variant="overline" color="text.secondary" sx={{ letterSpacing: "0.25em", fontWeight: 600 }}>
          {TRUST_BAR.label}
        </Typography>
        <Box sx={{ position: "relative", mt: 3, overflow: "hidden" }}>
          <Stack direction="row" spacing={8} alignItems="center" sx={{ width: "200%", animation: "mediq-marquee 38s linear infinite" }}>
            {loop.map((it, i) => {
              const Icon = it.icon;
              return (
                <Stack key={i} direction="row" spacing={1.5} alignItems="center" sx={{ opacity: 0.55, filter: "grayscale(1)", flexShrink: 0 }}>
                  <Icon fontSize="small" />
                  <Typography variant="h6" sx={{ fontWeight: 600, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>
                    {it.name}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
