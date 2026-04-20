import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { AppThemeProvider } from "@/components/mediq/ThemeProvider";
import { Nav } from "@/components/mediq/Nav";
import { Hero } from "@/components/mediq/Hero";
import { TrustBar } from "@/components/mediq/TrustBar";
import { Features } from "@/components/mediq/Features";
import { HowItWorks } from "@/components/mediq/HowItWorks";
import { AdhdMethods } from "@/components/mediq/AdhdMethods";
import { VideoChunks } from "@/components/mediq/VideoChunks";
import { QuizFlashcards } from "@/components/mediq/QuizFlashcards";
import { ProgressPreview } from "@/components/mediq/ProgressPreview";
import { Testimonials } from "@/components/mediq/Testimonials";
import { Pricing } from "@/components/mediq/Pricing";
import { FAQ } from "@/components/mediq/FAQ";
import { FinalCTA } from "@/components/mediq/FinalCTA";
import { Footer } from "@/components/mediq/Footer";

function Landing() {
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
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </Box>
      <Footer />
    </Box>
  );
}

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
