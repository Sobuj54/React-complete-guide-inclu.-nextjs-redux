import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
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
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "oklch(86.9% 0.022 252.894)",
          borderRadius: "5px", // Slightly smoother corners
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "oklch(96.8% 0.007 247.896)",

          pb: 2,
          pt: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#0f172a",
            letterSpacing: "-0.025em",
          }}
        >
          {title}
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          bgcolor: "oklch(96.8% 0.007 247.896)",
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e1",
            borderRadius: "5px",
          },
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
