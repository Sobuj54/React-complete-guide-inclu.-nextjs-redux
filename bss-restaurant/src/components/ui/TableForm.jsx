import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X, LayoutGrid } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  Box,
} from "@mui/material";
import { tableSchema } from "../../validation/form-validation";
import MainButton from "../MainButton";

export default function TableFormModal({
  isOpen,
  onClose,
  defaultValues,
  onSubmit,
  isLoading,
}) {
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tableSchema),
    defaultValues: defaultValues || { tableNumber: "", numberOfSeats: 1 },
  });

  const selectedImage = watch("image");

  // EXACT input style from your Employee Form
  const inputStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#d9d9d9",
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#bfbfbf",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1677ff",
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#8c8c8c",
      "&.Mui-focused": {
        color: "#1677ff",
      },
    },
    boxShadow: "none",
  };

  useEffect(() => {
    setIsImageDeleted(false);
    if (isOpen) {
      reset(defaultValues || { tableNumber: "", numberOfSeats: 1 });
    }
  }, [isOpen, defaultValues, reset]);

  const existingImageUrl = useMemo(() => {
    if (isImageDeleted || !defaultValues?.image) return null;
    return `https://restaurantapi.bssoln.com/images/table/${defaultValues.image}`;
  }, [defaultValues?.image, isImageDeleted]);

  const preview = useMemo(() => {
    if (selectedImage && selectedImage[0] instanceof File) {
      return URL.createObjectURL(selectedImage[0]);
    }
    return existingImageUrl;
  }, [selectedImage, existingImageUrl]);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "5px",
          p: 0, // Reduced padding to match the clean look
          backgroundImage: "none",
        },
      }}
    >
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 2.5 }}
      >
        <Box
          sx={{
            p: 1,
            bgcolor: "#1677ff",
            borderRadius: "5px",
            color: "white",
            display: "flex",
          }}
        >
          <LayoutGrid size={20} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
          {defaultValues?.id ? "Edit Table" : "Create New Table"}
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ ml: "auto" }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 4 }}>
        <form
          id="table-modal-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 pt-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-5">
              <TextField
                fullWidth
                label="Table Number"
                {...register("tableNumber")}
                error={!!errors.tableNumber}
                helperText={errors.tableNumber?.message}
                sx={inputStyle}
              />
              <TextField
                fullWidth
                label="Seating Capacity"
                {...register("numberOfSeats")}
                error={!!errors.numberOfSeats}
                helperText={errors.numberOfSeats?.message}
                sx={inputStyle}
              />
            </div>

            <div className="flex flex-col h-full">
              <div className="border border-dashed border-gray-300 rounded-[5px] h-[135px] flex flex-col items-center justify-center bg-white hover:bg-blue-50/30 transition-all cursor-pointer relative overflow-hidden group">
                {preview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setValue("image", null);
                        setIsImageDeleted(true);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center  p-4">
                    <Upload size={24} className="mb-2" />
                    <Typography variant="body2">
                      + Upload Table Image
                    </Typography>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  {...register("image")}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <MainButton
              label="CANCEL"
              onClick={onClose}
              sx={{
                bgcolor: "#f1f5f9", // Matches the gray in your screenshot
                color: "#475569",
                px: 4,
                fontWeight: 700,
                boxShadow: "none",
                borderRadius: "5px",
                "&:hover": { bgcolor: "#e2e8f0", boxShadow: "none" },
              }}
            />
            <MainButton
              type="submit"
              disabled={isLoading}
              label={
                isLoading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "SAVE TABLE"
                )
              }
              sx={{
                bgcolor: "#1677ff",
                color: "#ffffff",
                px: 5,
                fontWeight: 700,
                boxShadow: "none",
                borderRadius: "5px",
                "&:hover": { bgcolor: "#0958d9", boxShadow: "none" },
              }}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
