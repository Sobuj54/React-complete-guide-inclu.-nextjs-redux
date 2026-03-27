import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Grid,
  CircularProgress,
  Stack,
} from "@mui/material";
import { X, LayoutGrid, Upload } from "lucide-react";
import { tableSchema } from "../../validation/form-validation";

const cleanInputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    "& fieldset": { borderColor: "#e2e8f0" },
    "&.Mui-focused fieldset": { borderColor: "#f97316" },
  },
  "& .MuiInputLabel-root": {
    fontWeight: "700",
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#f97316" },
};

export default function TableFormModal({
  isOpen,
  onClose,
  defaultValues,
  onSubmit,
  isLoading,
}) {
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tableSchema),
    defaultValues: defaultValues || { tableNumber: "", numberOfSeats: 1 },
  });

  const imageWatcher = watch("image");

  useEffect(() => {
    if (isOpen) reset(defaultValues || { tableNumber: "", numberOfSeats: 1 });
  }, [isOpen, defaultValues, reset]);

  useEffect(() => {
    if (imageWatcher && imageWatcher[0] instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(imageWatcher[0]);
    } else {
      setPreview(
        defaultValues?.image
          ? `https://bssrms.runasp.net/images/table/${defaultValues.image}`
          : null,
      );
    }
  }, [imageWatcher, defaultValues]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md" // Changed from xs to sm to allow proper expansion
      PaperProps={{
        sx: {
          borderRadius: "10px", // Consistent with your UI design
          margin: { xs: 2, sm: "auto" }, // Adds margin on very small devices
          width: { xs: "calc(100% - 32px)", sm: "auto" }, // Forces full width on mobile
        },
      }}
    >
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", gap: 2, pb: 3 }}
      >
        <Box
          sx={{
            p: 1,
            bgcolor: "#f97316",
            borderRadius: "0.5rem",
            color: "white",
            display: "flex",
          }}
        >
          <LayoutGrid size={20} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 900, fontStyle: "black" }}>
          {defaultValues?.id ? "Edit Table" : "Create New Table"}
        </Typography>
        <IconButton onClick={onClose} sx={{ ml: "auto" }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ overflowX: "hidden", px: { xs: 2, sm: 10 } }}>
        <Box
          component="form"
          id="table-form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ pt: 2 }}
        >
          <Grid container spacing={2}>
            {/* Input Section */}
            <Grid item xs={12} sm={6}>
              <Stack spacing={4}>
                <TextField
                  label="Table Number"
                  variant="outlined"
                  fullWidth
                  placeholder="e.g. T-101"
                  defaultValue={defaultValues?.tableNumber}
                  {...register("tableNumber")}
                  error={!!errors.tableNumber}
                  helperText={errors.tableNumber?.message}
                  sx={cleanInputStyle}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Seating Capacity"
                  variant="outlined"
                  type="number"
                  fullWidth
                  {...register("numberOfSeats")}
                  error={!!errors.numberOfSeats}
                  helperText={errors.numberOfSeats?.message}
                  sx={cleanInputStyle}
                />
              </Stack>
            </Grid>

            {/* Image Section */}
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: "100%", sm: "100%" },
                  minHeight: "full",
                  borderRadius: "1rem",
                  border: "2px dashed #cbd5e1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  bgcolor: "#f8fafc",
                  overflow: "hidden",
                }}
              >
                {preview ? (
                  <Box
                    component="img"
                    src={preview}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Upload
                      size={24}
                      color="#94a3b8"
                      style={{ margin: "0 auto" }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#94a3b8",
                        display: "block",
                        mt: 1,
                        fontWeight: 900,
                      }}
                    >
                      UPLOAD IMAGE
                    </Typography>
                  </Box>
                )}
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0,
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            flex: 1, // Makes buttons equal width on mobile
            bgcolor: "#f1f5f9",
            borderRadius: "7px",
            color: "#64748b",
            fontWeight: 900,
            textTransform: "none",
            "&:hover": { bgcolor: "#e2e8f0" },
          }}
        >
          Discard
        </Button>
        <Button
          form="table-form"
          type="submit"
          variant="contained"
          disabled={isLoading}
          disableElevation
          sx={{
            flex: 1, // Makes buttons equal width on mobile
            bgcolor: "#f97316",
            color: "white",
            borderRadius: "7px",
            fontWeight: 900,
            textTransform: "none",
            "&:hover": { bgcolor: "#ea580c" },
          }}
        >
          {isLoading ? <CircularProgress size={22} color="inherit" /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
