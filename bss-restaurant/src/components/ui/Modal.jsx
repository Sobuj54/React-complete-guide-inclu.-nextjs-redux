import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children, style }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "10px",
          // backgroundColor: "gray.500",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          ...style,
        },
      }}
      sx={{
        // Target the Paper component for the dialog box background
        "& .MuiPaper-root": {
          backgroundColor: "#E2E8F0", // Your desired color
        },
      }}
    >
      {/* Header Section */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 6,
          pb: 2,
          bgcolor: "#f8fafc",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900, // font-black
              color: "#0f172a", // slate-900
              letterSpacing: "-0.025em",
            }}
          >
            {title}
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{
            p: 2,
            // bgcolor: "#f1f5f9", // slate-100
            borderRadius: "1.25rem",
            color: "#64748b",
            "&:hover": {
              bgcolor: "#fef2f2",
              color: "#ef4444",
            },
          }}
        >
          <X size={24} strokeWidth={3} />
        </IconButton>
      </DialogTitle>

      {/* Content Section */}
      <DialogContent
        sx={{
          p: 6,
          pt: 1,
          bgcolor: "#f8fafc",
          // Scrollbar styling to maintain the "Heavy" look
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e1",
            borderRadius: "10px",
          },
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
