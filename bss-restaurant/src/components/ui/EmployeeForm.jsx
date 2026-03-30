import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X } from "lucide-react";
import {
  TextField,
  MenuItem,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { employeeSchema } from "../../validation/form-validation";
import MainButton from "../MainButton";

export default function EmployeeForm({
  defaultValues,
  onSubmit,
  onCancel,
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
    resolver: zodResolver(employeeSchema),
    defaultValues: defaultValues || {},
  });

  const selectedImage = watch("image");

  // Input styling with absolute error positioning to prevent layout shift
  const inputStyle = {
    backgroundColor: "#ffffff",
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
  };

  useEffect(() => {
    setIsImageDeleted(false);
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const existingImageName = defaultValues?.image;

  const existingImageUrl = useMemo(() => {
    if (isImageDeleted) return null;
    return existingImageName
      ? `${import.meta.env.VITE_IMG_URL}/images/user/${existingImageName}`
      : null;
  }, [existingImageName, isImageDeleted]);

  const preview = useMemo(() => {
    if (selectedImage && selectedImage[0] instanceof File) {
      return URL.createObjectURL(selectedImage[0]);
    }
    return existingImageUrl;
  }, [selectedImage, existingImageUrl]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <form
      id="table-modal-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 pt-3"
    >
      {/* Top Section: Names & Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          <TextField
            fullWidth
            label="First Name *"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Middle Name (Optional)"
            {...register("middleName")}
            error={!!errors.middleName}
            helperText={errors.middleName?.message}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Last Name *"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <div className="flex flex-col">
          <Box
            sx={{
              border: "1px dashed #d9d9d9",
              borderRadius: "5px",
              height: "235px",
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
                  <X size={16} />
                </button>
              </Box>
            ) : (
              <Box sx={{ textAlign: "center" }}>
                <Upload size={24} className="mb-2 mx-auto" />
                <Typography variant="body2">+ Upload Image</Typography>
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

      {/* Grid: Family Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-8">
        <TextField
          fullWidth
          label="Spouse Name *"
          {...register("spouseName")}
          error={!!errors.spouseName}
          helperText={errors.spouseName?.message}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Father's Name *"
          {...register("fatherName")}
          error={!!errors.fatherName}
          helperText={errors.fatherName?.message}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Mother's Name *"
          {...register("motherName")}
          error={!!errors.motherName}
          helperText={errors.motherName?.message}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
      </div>

      {/* Grid: Professional Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-8">
        <TextField
          fullWidth
          label="Designation *"
          {...register("designation")}
          error={!!errors.designation}
          helperText={errors.designation?.message}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Email Address *"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Phone *"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
      </div>

      {/* Grid: Identity & Dates */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-8">
        <TextField
          select
          fullWidth
          label="Gender *"
          defaultValue=""
          {...register("gender")}
          error={!!errors.gender}
          helperText={errors.gender?.message}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        >
          <MenuItem value="">Select Gender</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>
        <TextField
          fullWidth
          type="date"
          label="Date of Birth *"
          InputLabelProps={{ shrink: true }}
          {...register("dob")}
          error={!!errors.dob}
          helperText={errors.dob?.message}
          sx={inputStyle}
        />
        <TextField
          fullWidth
          type="date"
          label="Join Date *"
          InputLabelProps={{ shrink: true }}
          {...register("joinDate")}
          error={!!errors.joinDate}
          helperText={errors.joinDate?.message}
          sx={inputStyle}
        />
        <TextField
          fullWidth
          label="NID Card *"
          {...register("nid")}
          error={!!errors.nid}
          helperText={errors.nid?.message}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <MainButton label="Cancel" onClick={onCancel} color="secondary" />
        <MainButton
          type="submit"
          disabled={isLoading}
          label={
            isLoading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Save Changes"
            )
          }
          color="primary"
        />
      </div>
    </form>
  );
}
