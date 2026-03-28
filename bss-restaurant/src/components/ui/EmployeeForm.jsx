import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X } from "lucide-react";
import {
  TextField,
  MenuItem,
  Typography,
  CircularProgress,
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

  // Input styling based on your new Primary Blue (#1677ff) palette
  const inputStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "5px", // Matching theme.shape.borderRadius
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#d9d9d9", // secondary.light
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#bfbfbf", // secondary.400
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1677ff", // primary.main
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#8c8c8c", // secondary.main
      "&.Mui-focused": {
        color: "#1677ff", // primary.main
      },
    },
    boxShadow: "none",
  };

  useEffect(() => {
    setIsImageDeleted(false);
  }, [defaultValues]);

  const existingImageName = defaultValues?.image;

  const existingImageUrl = useMemo(() => {
    if (isImageDeleted) return null;
    return existingImageName
      ? `https://restaurantapi.bssoln.com/images/user/${existingImageName}`
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

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form
      id="table-modal-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 pt-3"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-5">
          <TextField
            fullWidth
            label="First Name"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            sx={inputStyle}
          />
          <TextField
            fullWidth
            label="Middle Name"
            {...register("middleName")}
            error={!!errors.middleName}
            helperText={errors.middleName?.message}
            sx={inputStyle}
          />
          <TextField
            fullWidth
            label="Last Name"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            sx={inputStyle}
          />
        </div>

        <div className="flex flex-col">
          <div className="border border-dashed border-gray-300 rounded-[5px] h-[200px] max-h-[210px] md:h-full flex flex-col items-center justify-center bg-white hover:bg-blue-50/30 transition-all cursor-pointer relative overflow-hidden group">
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
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-700">
                <Upload size={24} className="mb-2" />
                <Typography variant="body2">+ Upload Image</Typography>
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

      {/* Grid: Secondary Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <TextField
          fullWidth
          label="Spouse Name"
          {...register("spouseName")}
          error={!!errors.spouseName}
          sx={inputStyle}
        />
        <TextField
          fullWidth
          label="Father's Name"
          {...register("fatherName")}
          error={!!errors.fatherName}
          sx={inputStyle}
        />
        <TextField
          fullWidth
          label="Mother's Name"
          {...register("motherName")}
          error={!!errors.motherName}
          sx={inputStyle}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <TextField
          fullWidth
          label="Designation"
          {...register("designation")}
          error={!!errors.designation}
          sx={inputStyle}
        />
        <TextField
          fullWidth
          label="Email Address"
          {...register("email")}
          error={!!errors.email}
          sx={inputStyle}
        />
        <TextField
          fullWidth
          label="Phone"
          {...register("phone")}
          error={!!errors.phone}
          sx={inputStyle}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <TextField
          select
          fullWidth
          label="Gender"
          defaultValue=""
          {...register("gender")}
          error={!!errors.gender}
          sx={inputStyle}
        >
          <MenuItem value="">Select Gender</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>
        <TextField
          fullWidth
          type="date"
          label="Date of Birth"
          InputLabelProps={{ shrink: true }}
          {...register("dob")}
          sx={inputStyle}
        />
        <TextField
          fullWidth
          type="date"
          label="Join Date"
          InputLabelProps={{ shrink: true }}
          {...register("joinDate")}
          sx={inputStyle}
        />
        <TextField
          fullWidth
          label="NID Card"
          {...register("nid")}
          sx={inputStyle}
        />
      </div>

      {/* Footer Buttons using MainButton */}
      <div className="flex justify-end gap-3 pt-4 pb-2 border-gray-100">
        <MainButton
          label="Cancel"
          onClick={onCancel}
          sx={{
            bgcolor: "secondary.main", // secondary.200
            px: 4,
            fontWeight: 600,
            boxShadow: "none",
            borderRadius: "5px",
            "&:hover": { bgcolor: "secondary.600", boxShadow: "none" },
          }}
        />
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
          sx={{
            bgcolor: "#1677ff", // primary.main
            color: "#ffffff",
            px: 5,
            fontWeight: 600,
            boxShadow: "none",
            borderRadius: "5px",
            "&:hover": { bgcolor: "#0958d9", boxShadow: "none" },
          }}
        />
      </div>
    </form>
  );
}
