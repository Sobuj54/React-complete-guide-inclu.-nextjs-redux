"use client";
import { CircularProgress, Box, Typography, useTheme } from "@mui/material";

export default function DashboardLayoutSkeleton() {
  const theme = useTheme();

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          p: 4,
          textAlign: "center",
        }}
      >
        {/* Loader Container */}
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: theme.palette.primary.main,
              strokeLinecap: "round",
            }}
          />
        </Box>

        {/* Branding & Status */}
        <div className="space-y-1">
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              color: "text.primary",
              letterSpacing: "-0.02em",
              fontFamily: theme.typography.fontFamily,
            }}
          >
            BSS RESTO
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Setting up your kitchen...
          </Typography>
        </div>
      </Box>
    </div>
  );
}
