"use client";
import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
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
          {children}
        </Box>
      </Box>
    </Box>
  );
}
