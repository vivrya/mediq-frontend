import { useState } from "react";
import { Box, Container, Typography, Card, Stack, Chip, Button, ToggleButton, ToggleButtonGroup, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star";
import { PRICING } from "../constants";

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  const plans = PRICING.plans(yearly);

  return (
    <Box component="section" id="pricing" sx={{ py: { xs: 10, md: 16 } }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" textAlign="center" sx={{ mb: 6 }}>
          <Chip label={PRICING.badge} size="small" variant="outlined" sx={{ fontWeight: 600, letterSpacing: "0.15em", mb: 2 }} />
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 2, maxWidth: 720 }}>
            {PRICING.heading}
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 520, mb: 3.5 }}>{PRICING.description}</Typography>
          <ToggleButtonGroup
            exclusive
            value={yearly ? "yearly" : "monthly"}
            onChange={(_, v) => v && setYearly(v === "yearly")}
            size="small"
            sx={{ bgcolor: "background.paper", borderRadius: 999, p: 0.5, border: 1, borderColor: "divider" }}
          >
            <ToggleButton value="monthly" data-testid="billing-monthly" sx={{ border: 0, borderRadius: "999px !important", px: 3, py: 1, fontWeight: 600 }}>
              {PRICING.billingToggle.monthly}
            </ToggleButton>
            <ToggleButton value="yearly" data-testid="billing-yearly" sx={{ border: 0, borderRadius: "999px !important", px: 3, py: 1, fontWeight: 600 }}>
              {PRICING.billingToggle.yearly}
              <Chip label={PRICING.billingToggle.savingsChip} size="small" color="success" sx={{ ml: 1, height: 18, fontSize: 10, fontWeight: 700 }} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Grid container spacing={3} alignItems="stretch">
          {plans.map((p) => (
            <Grid size={{ xs: 12, md: 4 }} key={p.name}>
              <Card
                variant={p.highlight ? "elevation" : "outlined"}
                elevation={p.highlight ? 8 : 0}
                sx={{ p: { xs: 3, md: 5 }, height: "100%", display: "flex", flexDirection: "column", position: "relative", ...(p.highlight ? { borderTop: 4, borderColor: "primary.main", transform: { lg: "translateY(-12px)" } } : {}) }}
              >
                {p.highlight && (
                  <Chip icon={<StarIcon sx={{ fontSize: 14, color: "#fff !important" }} />} label={PRICING.highlightBadge} color="primary" size="small" sx={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", fontWeight: 700, letterSpacing: "0.1em" }} />
                )}
                <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.2em", fontWeight: 600 }}>{p.name.toUpperCase()}</Typography>
                <Stack direction="row" alignItems="flex-end" spacing={1} sx={{ mt: 2 }}>
                  <Typography variant="h2" sx={{ fontSize: "3rem", fontWeight: 700, lineHeight: 1 }}>{p.price}</Typography>
                  <Typography color="text.secondary" sx={{ pb: 1 }}>{p.cadence}</Typography>
                </Stack>
                {p.sub && <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>{p.sub}</Typography>}
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>{p.description}</Typography>
                <List dense sx={{ mt: 2, flex: 1 }}>
                  {p.features.map((f) => (
                    <ListItem key={f} disableGutters sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}><CheckIcon fontSize="small" color="success" /></ListItemIcon>
                      <ListItemText primary={f} primaryTypographyProps={{ variant: "body2" }} />
                    </ListItem>
                  ))}
                </List>
                <Button fullWidth variant={p.highlight ? "contained" : "outlined"} color={p.highlight ? "primary" : "inherit"} size="large" data-testid={`${p.testid}-cta`} sx={{ mt: 2 }}>
                  {p.cta}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography align="center" variant="caption" color="text.secondary" sx={{ display: "block", mt: 3 }}>
          {PRICING.footer}
        </Typography>
      </Container>
    </Box>
  );
}
