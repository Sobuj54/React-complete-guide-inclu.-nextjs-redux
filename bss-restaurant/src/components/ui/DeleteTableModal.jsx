import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Zoom,
} from "@mui/material";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteTableModal({
  isOpen,
  onClose,
  onConfirm,
  tableName,
  isDeleting,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Zoom}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 2, // Material standard rounding
          p: 1,
        },
      }}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "grey.100", // Change to your desired color
        },
      }}
    >
      {/* Close Button */}
      <Box sx={{ position: "absolute", right: 12, top: 12 }}>
        <IconButton onClick={onClose} size="small" disabled={isDeleting}>
          <X size={20} />
        </IconButton>
      </Box>

      <DialogContent sx={{ textAlign: "center", pt: 4, pb: 2 }}>
        {/* Warning Icon Container */}
        <Box
          sx={{
            width: 80,
            height: 80,
            bgcolor: "#fef2f2",
            color: "#ef4444",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
            border: "2px solid #fee2e2",
          }}
        >
          <AlertTriangle size={40} strokeWidth={2.5} />
        </Box>

        {/* Text Content */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 900, color: "#0f172a", mb: 1 }}
        >
          Are you sure?
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "#64748b", fontWeight: 700, px: 2 }}
        >
          Deleting{" "}
          <Typography
            component="span"
            sx={{ color: "#0f172a", fontWeight: 900 }}
          >
            "{tableName}"
          </Typography>{" "}
          is permanent. This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          onClick={onClose}
          fullWidth
          disabled={isDeleting}
          variant="outlined"
          sx={{
            py: 1.5,
            fontWeight: 900,
            color: "#64748b",
            letterSpacing: 1,
            fontSize: "0.75rem",
            "&:hover": { bgcolor: "#f1f5f9" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isDeleting}
          variant="contained"
          fullWidth
          disableElevation
          sx={{
            py: 1.5,
            bgcolor: "#ef4444",
            fontWeight: 900,
            borderRadius: 1.5,
            "&:hover": { bgcolor: "#dc2626" },
            "&:disabled": { bgcolor: "#fca5a5" },
          }}
        >
          {isDeleting ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "Yes, Delete"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
