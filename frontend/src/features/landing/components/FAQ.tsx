import { Box, Container, Typography, Chip, Accordion, AccordionSummary, AccordionDetails, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FAQ as FAQ_CONTENT } from "../constants";

export function FAQ() {
  return (
    <Box component="section" id="faq" sx={{ py: { xs: 10, md: 16 }, bgcolor: "action.hover", borderTop: 1, borderBottom: 1, borderColor: "divider" }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Chip label={FAQ_CONTENT.badge} size="small" variant="outlined" sx={{ fontWeight: 600, letterSpacing: "0.15em", mb: 2 }} />
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
            {FAQ_CONTENT.heading}
          </Typography>
        </Box>
        <Paper variant="outlined" sx={{ borderRadius: 4, px: { xs: 2, md: 4 } }}>
          {FAQ_CONTENT.items.map((f, i) => (
            <Accordion
              key={i}
              disableGutters
              elevation={0}
              sx={{ bgcolor: "transparent", "&::before": { display: "none" }, borderBottom: i === FAQ_CONTENT.items.length - 1 ? 0 : 1, borderColor: "divider" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} data-testid={`faq-trigger-${i}`} sx={{ py: 1.5, "& .MuiAccordionSummary-content": { my: 1.5 } }}>
                <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.125rem" }, fontWeight: 600 }}>{f.q}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pb: 3 }}>
                <Typography color="text.secondary">{f.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Container>
    </Box>
  );
}
