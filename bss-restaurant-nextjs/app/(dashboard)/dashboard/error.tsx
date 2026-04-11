"use client";
import { Box } from "@mui/material";

export default function Error() {
  return (
    <Box sx={{ p: 10, color: "error.main", fontWeight: 900 }}>
      Error loading analytics...
    </Box>
  );
}
