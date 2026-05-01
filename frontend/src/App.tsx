import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppThemeProvider } from "@/providers/ThemeProvider";
import LandingPage from "@/features/landing";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import DashboardPage from "@/features/dashboard";
import MyCoursesPage from "@/features/dashboard/MyCoursesPage";
import LearningPage from "@/features/dashboard/LearningPage";
import CoursesPage from "@/features/courses/CoursesPage";
import CourseDetailPage from "@/features/courses/CourseDetailPage";
import DecksPage from "@/features/flashcards/DecksPage";
import FlashcardsCarouselPage from "@/features/flashcards/FlashcardsCarouselPage";
import DemoPage from "@/features/demo/DemoPage";

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="my-courses" element={<MyCoursesPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="courses/:courseId" element={<CourseDetailPage />} />
            <Route path="flashcards" element={<DecksPage />} />
            <Route path="flashcards/:deckId" element={<FlashcardsCarouselPage />} />
            <Route path="progress" element={<LearningPage />} />
            <Route path="demo" element={<DemoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
