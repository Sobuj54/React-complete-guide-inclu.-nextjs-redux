"use client";

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
import { TableForm, tableSchema } from "@/lib/validation/tables-schema";
import MainButton from "@/components/ui/button/MainButton";

interface TableFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: TableForm | null;
  onSubmit: (data: TableForm) => Promise<void>;
  isLoading: boolean;
}

export default function TableFormModal({
  isOpen,
  onClose,
  defaultValues,
  onSubmit,
  isLoading,
}: TableFormModalProps) {
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TableForm>({
    resolver: zodResolver(tableSchema),
    defaultValues: defaultValues || { tableNumber: "", numberOfSeats: 1 },
  });

  const selectedImage = watch("image") as any;

  const inputStyle = {
    backgroundColor: "white",
    borderRadius: "5px",
    "& .MuiFormHelperText-root": {
      position: "absolute",
      bottom: "-20px",
      fontSize: "0.75rem",
      margin: 0,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "secondary.300",
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#bfbfbf",
      },
      "&.Mui-focused fieldset": {
        borderColor: "primary.main",
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      color: "secondary.dark",
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
    // If the image was deleted or no image exists in defaultValues, return null
    if (
      isImageDeleted ||
      !defaultValues?.image ||
      typeof defaultValues.image !== "string"
    )
      return null;
    return `${process.env.NEXT_PUBLIC_IMG_URL}/images/table/${defaultValues.image}`;
  }, [defaultValues?.image, isImageDeleted]);

  const preview = useMemo(() => {
    if (
      typeof window !== "undefined" &&
      selectedImage instanceof FileList &&
      selectedImage[0]
    ) {
      return URL.createObjectURL(selectedImage[0]);
    }

    return existingImageUrl;
  }, [selectedImage, existingImageUrl]);

  useEffect(() => {
    // Memory cleanup: Revokes the temporary URL created for the image preview.
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
          p: 0,
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
          {defaultValues?.tableNumber ? "Edit Table" : "Create New Table"}
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ ml: "auto" }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 4 }}>
        <form
          id="table-modal-form"
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log("validation err", err);
          })}
          className="space-y-8 pt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div className="flex flex-col gap-8">
              <TextField
                fullWidth
                size="small"
                label="Table Number *"
                {...register("tableNumber")}
                error={!!errors.tableNumber}
                helperText={errors.tableNumber?.message}
                sx={inputStyle}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                size="small"
                label="Seating Capacity *"
                type="number"
                {...register("numberOfSeats", { valueAsNumber: true })}
                error={!!errors.numberOfSeats}
                helperText={errors.numberOfSeats?.message}
                sx={inputStyle}
                InputLabelProps={{ shrink: true }}
              />
            </div>

            <div className="flex flex-col">
              <Box
                sx={{
                  border: "1px dashed ",
                  borderColor: "secondary.light",
                  borderRadius: "5px",
                  height: "115px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#ffffff",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": { bgcolor: "#f0f7ff" },
                  transition: "all 0.3s",
                }}
              >
                {preview ? (
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      p: 1,
                    }}
                  >
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
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full z-20"
                    >
                      <X size={14} />
                    </button>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center", color: "#8c8c8c", p: 4 }}>
                    <Upload size={24} className="mb-2 mx-auto" />
                    <Typography variant="body2">
                      + Upload Table Image
                    </Typography>
                  </Box>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  {...register("image")}
                />
              </Box>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <MainButton label="Cancel" onClick={onClose} color="secondary" />
            <MainButton
              type="submit"
              disabled={isLoading}
              label={
                isLoading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "Save Table"
                )
              }
              color="primary"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
