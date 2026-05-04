import { Box } from "@mui/material";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TrustBar } from "./components/TrustBar";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { AdhdMethods } from "./components/AdhdMethods";
import { VideoChunks } from "./components/VideoChunks";
import { QuizFlashcards } from "./components/QuizFlashcards";
import { ProgressPreview } from "./components/ProgressPreview";
import { BrainSection } from "./components/BrainSection";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      <Nav />
      <Box component="main">
        <Hero />
        <TrustBar />
        <Features />
        <HowItWorks />
        <AdhdMethods />
        <VideoChunks />
        <QuizFlashcards />
        <ProgressPreview />
        <BrainSection />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </Box>
      <Footer />
    </Box>
  );
}
