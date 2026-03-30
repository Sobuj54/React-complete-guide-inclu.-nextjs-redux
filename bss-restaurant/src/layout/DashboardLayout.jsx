import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router";
import Sidebar from "../components/ui/Sidebar";
import Header from "../components/ui/Header";

export default function DashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  // Default open on desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", bgcolor: "secondary.lighter" }}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          // Removed ml: { lg: ... } to fix the huge gap
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        <Box
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
            pt: { xs: 2, sm: 3, md: 4 },
            flexGrow: 1,
          }}
          className="bg-slate-100"
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
