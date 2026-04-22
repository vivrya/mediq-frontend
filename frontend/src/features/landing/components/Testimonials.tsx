import { Box, Container, Typography, Card, Stack, Avatar, Chip, Rating } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { TESTIMONIALS } from "../constants";

const avatarImgs = [
  "https://images.unsplash.com/photo-1766297248122-5957c51b1f7c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwc3R1ZGVudCUyMHN0dWR5aW5nfGVufDB8fHx8MTc3NjcwOTI0OXww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwyfHxtZWRpY2FsJTIwc3R1ZGVudCUyMHN0dWR5aW5nfGVufDB8fHx8MTc3NjcwOTI0OXww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1766297248122-5957c51b1f7c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwc3R1ZGVudCUyMHN0dWR5aW5nfGVufDB8fHx8MTc3NjcwOTI0OXww&ixlib=rb-4.1.0&q=85",
];

export function Testimonials() {
  return (
    <Box component="section" id="stories" sx={{ py: { xs: 10, md: 16 } }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", lg: "row" }} justifyContent="space-between" alignItems={{ lg: "flex-end" }} spacing={3} sx={{ mb: 6 }}>
          <Box sx={{ maxWidth: 620 }}>
            <Chip label={TESTIMONIALS.badge} size="small" variant="outlined" sx={{ fontWeight: 600, letterSpacing: "0.15em", mb: 2 }} />
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
              {TESTIMONIALS.heading}
            </Typography>
          </Box>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Rating value={5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              <Box component="strong" sx={{ color: "text.primary" }}>{TESTIMONIALS.ratingValue}</Box> · {TESTIMONIALS.ratingCount}
            </Typography>
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {TESTIMONIALS.items.map((t, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Card variant="outlined" data-testid={`testimonial-${i}`} sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", transition: "transform .2s, box-shadow .2s", "&:hover": { transform: "translateY(-4px)", boxShadow: 4 } }}>
                <FormatQuoteIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 500, lineHeight: 1.4, mt: 1, mb: "auto" }}>{t.quote}</Typography>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: "divider" }}>
                  <Avatar src={avatarImgs[i]} alt={t.name} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{t.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{t.role}</Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
