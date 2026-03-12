import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isLoading,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={isLoading ? null : onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "10px", // Capped at 10px per instructions
          p: 1,
        },
      }}
      sx={{
        // Target the Paper component for the dialog box background
        "& .MuiPaper-root": {
          backgroundColor: "background.default", // Your desired color
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        disabled={isLoading}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
          color: (theme) => theme.palette.grey[400],
        }}
      >
        <X size={20} />
      </IconButton>

      <DialogContent sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Warning Icon */}
          <Box
            sx={{
              width: 64,
              height: 64,
              bgcolor: "#fef2f2", // red-50
              color: "#ef4444", // red-500
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <AlertTriangle size={32} strokeWidth={2.5} />
          </Box>

          <Typography
            variant="h6"
            sx={{ fontWeight: 900, color: "#0f172a", mb: 1 }}
          >
            Are you absolutely sure?
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#64748b", fontWeight: 500, lineHeight: 1.6 }}
          >
            You are about to remove{" "}
            <Box component="span" sx={{ color: "#0f172a", fontWeight: 900 }}>
              "{itemName}"
            </Box>
            . This action cannot be undone.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          flexDirection: "column",
          gap: 1.5,
          px: 3,
          pb: 3,
          pt: 1,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={onConfirm}
          disabled={isLoading}
          sx={{
            bgcolor: "#ef4444",
            "&:hover": { bgcolor: "#dc2626" },
            borderRadius: "8px",
            py: 1.5,
            fontWeight: 900,
            textTransform: "none",
            fontSize: "1rem",
            boxShadow: "none",
          }}
        >
          {isLoading ? "Deleting..." : "Yes, Delete Member"}
        </Button>

        <Button
          fullWidth
          variant="text"
          onClick={onClose}
          disabled={isLoading}
          sx={{
            color: "#64748b",
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "#d1d5dc" },
            borderRadius: "8px",
            py: 1.5,
            fontWeight: 900,
            textTransform: "none",
            fontSize: "1rem",
            m: "0 !important", // MUI override for column gap
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
