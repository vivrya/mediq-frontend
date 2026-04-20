import {
  Box,
  Container,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  { q: "Is Mediq only for students with ADHD?", a: "No. Mediq is built on ADHD-friendly learning science — short chunks, frequent rewards, clear next steps — which research shows benefits every learner. Neurodivergent students simply feel the difference first." },
  { q: "Which exams and curricula are covered?", a: "UG covers MBBS years 1–5 (Indian MCI, UK GMC, US step-1 fundamentals). PG covers USMLE Step 1 & 2, NEET PG, PLAB 1, FRCP introductory, and AMC Part 1. More are added every month." },
  { q: "How are video chunks different from YouTube?", a: "Each chunk is tightly 3–7 minutes, scripted by clinicians, paired with an instant quiz, and fed into your spaced-repetition schedule. No rabbit holes, no autoplay traps." },
  { q: "Can I import my existing Anki deck?", a: "Yes. Pro and PG Premium tiers support one-click import of Anki .apkg decks, and we automatically map cards to our mastery graph." },
  { q: "Does Mediq work offline?", a: "You can download any chunk or deck for offline study on iOS and Android. Progress syncs the moment you're back online." },
  { q: "Is there a student discount?", a: "Absolutely. Verify your .edu (or equivalent) email and receive 40% off Pro and PG Premium. We also have scholarship slots each month — write to us." },
];

export function FAQ() {
  return (
    <Box component="section" id="faq" sx={{ py: { xs: 10, md: 16 }, bgcolor: "action.hover", borderTop: 1, borderBottom: 1, borderColor: "divider" }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Chip label="FAQ" size="small" variant="outlined" sx={{ fontWeight: 600, letterSpacing: "0.15em", mb: 2 }} />
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
            Questions, answered calmly.
          </Typography>
        </Box>
        <Paper variant="outlined" sx={{ borderRadius: 4, px: { xs: 2, md: 4 } }}>
          {faqs.map((f, i) => (
            <Accordion
              key={i}
              disableGutters
              elevation={0}
              sx={{
                bgcolor: "transparent",
                "&::before": { display: "none" },
                borderBottom: i === faqs.length - 1 ? 0 : 1,
                borderColor: "divider",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                data-testid={`faq-trigger-${i}`}
                sx={{ py: 1.5, "& .MuiAccordionSummary-content": { my: 1.5 } }}
              >
                <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.125rem" }, fontWeight: 600 }}>
                  {f.q}
                </Typography>
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
