import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { DashboardHeader } from "./components/DashboardHeader";

export default function DashboardLayout() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", display: "flex" }}>
      <DashboardSidebar />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <DashboardHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
