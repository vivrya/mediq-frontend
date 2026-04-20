import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/mediq/ThemeProvider";
import { Nav } from "./components/mediq/Nav";
import { Hero } from "./components/mediq/Hero";
import { TrustBar } from "./components/mediq/TrustBar";
import { Features } from "./components/mediq/Features";
import { HowItWorks } from "./components/mediq/HowItWorks";
import { AdhdMethods } from "./components/mediq/AdhdMethods";
import { VideoChunks } from "./components/mediq/VideoChunks";
import { QuizFlashcards } from "./components/mediq/QuizFlashcards";
import { ProgressPreview } from "./components/mediq/ProgressPreview";
import { Testimonials } from "./components/mediq/Testimonials";
import { Pricing } from "./components/mediq/Pricing";
import { FAQ } from "./components/mediq/FAQ";
import { FinalCTA } from "./components/mediq/FinalCTA";
import { Footer } from "./components/mediq/Footer";

function Landing() {
  return (
    <div className="App min-h-screen bg-background text-foreground">
      <Nav />
      <main>
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
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
