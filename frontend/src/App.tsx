import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppThemeProvider } from "@/providers/ThemeProvider";
import LandingPage from "@/features/landing";
import DashboardPage from "@/features/dashboard";

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
