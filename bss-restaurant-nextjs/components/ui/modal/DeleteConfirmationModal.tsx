import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { AlertTriangle, X } from "lucide-react";
import MainButton from "../button/MainButton";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  isLoading: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isLoading,
}: DeleteConfirmationModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={isLoading ? () => {} : onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "5px", // Theme-aligned
          p: 1,
          backgroundColor: "#ffffff",
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
          color: "#bfbfbf", // secondary.400
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
          {/* Warning Icon Container */}
          <Box
            sx={{
              width: 64,
              height: 64,
              bgcolor: "#fff1f0", // error.lighter
              color: "#ff4d4f", // error.main
              borderRadius: "5px",
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
            sx={{ fontWeight: 800, color: "#262626", mb: 1 }}
          >
            Are you absolutely sure?
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#8c8c8c", fontWeight: 500, lineHeight: 1.6 }}
          >
            You are about to remove{" "}
            <Box component="span" sx={{ color: "#000000", fontWeight: 800 }}>
              "{itemName}"
            </Box>
            . This action cannot be undone.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          flexDirection: "row",
          gap: 1.5,
          px: 3,
          pb: 3,
          pt: 1,
          // Ensure the children expand to fill the cross-axis
          alignItems: "stretch",
          width: "100%",
        }}
      >
        {/* Using MainButton for Delete Action */}

        <MainButton
          fullWidth
          label="Cancel"
          onClick={onClose}
          disabled={isLoading}
          color="secondary"
        />

        <MainButton
          fullWidth
          label={isLoading ? "Deleting..." : "Delete"}
          onClick={onConfirm}
          disabled={isLoading}
          color="primary"
        />
      </DialogActions>
    </Dialog>
  );
}
