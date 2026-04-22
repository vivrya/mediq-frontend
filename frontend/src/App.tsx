import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppThemeProvider } from "@/providers/ThemeProvider";
import LandingPage from "@/features/landing";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import DashboardPage from "@/features/dashboard";
import CoursesPage from "@/features/courses/CoursesPage";
import CourseDetailPage from "@/features/courses/CourseDetailPage";

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="courses/:courseId" element={<CourseDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
