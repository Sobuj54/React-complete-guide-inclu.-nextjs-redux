// src/components/employees/employee-form.tsx
"use client";

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
import { employeeschema } from "@/lib/validation/employee-schema";
import { employee } from "@/types";
import MainButton from "@/components/ui/button/MainButton";

interface props {
  defaultValues?: Partial<employee>;
  onSubmit: (data: employee) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function EmployeeForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}: props) {
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeschema),
    defaultValues: defaultValues as employee,
  });

  const selectedImage = watch("image");

  // styling for fixed height and absolute error messages
  const inputStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    "& .MuiFormHelperText-root": {
      position: "absolute",
      bottom: "-20px",
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
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const existingImageName = defaultValues?.image;

  // image preview logic
  const preview = useMemo(() => {
    if (isImageDeleted) return null;
    if ((selectedImage?.[0] as any) instanceof File) {
      return URL.createObjectURL(selectedImage[0]);
    }
    return existingImageName
      ? `${process.env.NEXT_PUBLIC_IMG_URL}/images/user/${existingImageName}`
      : null;
  }, [selectedImage, existingImageName, isImageDeleted]);

  // cleanup for memory management
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <form
      id="table-modal-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 pt-3"
    >
      {/* top section: names & image upload */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        <div className="flex flex-col gap-7">
          <TextField
            fullWidth
            size="small"
            label="first name *"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message as string}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            size="small"
            label="middle name (optional)"
            {...register("middleName")}
            error={!!errors.middleName}
            helperText={errors.middleName?.message as string}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            size="small"
            label="last name *"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message as string}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <div className="flex flex-col">
          <Box
            sx={{
              border: "1px dashed #d9d9d9",
              borderRadius: "5px",
              height: "177px",
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
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    // 1. set the form value to null
                    setValue("image", null, { shouldValidate: true });
                    // 2. mark as deleted for the preview logic
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
                <Typography variant="body2">+ upload image</Typography>
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

      {/* grid: family details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-7">
        <TextField
          fullWidth
          label="spouse name *"
          size="small"
          {...register("spouseName")}
          error={!!errors.spouseName}
          helperText={errors.spouseName?.message as string}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="father's name *"
          size="small"
          {...register("fatherName")}
          error={!!errors.fatherName}
          helperText={errors.fatherName?.message as string}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="mother's name *"
          size="small"
          {...register("motherName")}
          error={!!errors.motherName}
          helperText={errors.motherName?.message as string}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
      </div>

      {/* grid: professional details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-7">
        <TextField
          fullWidth
          label="designation *"
          size="small"
          {...register("designation")}
          error={!!errors.designation}
          helperText={errors.designation?.message as string}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="email address *"
          size="small"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message as string}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="phone *"
          size="small"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message as string}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
      </div>

      {/* grid: identity & dates */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-7">
        <TextField
          select
          fullWidth
          label="gender *"
          size="small"
          {...register("gender")}
          error={!!errors.gender}
          helperText={errors.gender?.message as string}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        >
          <MenuItem value="">select gender</MenuItem>
          <MenuItem value="Male">male</MenuItem>
          <MenuItem value="Female">female</MenuItem>
        </TextField>
        <TextField
          fullWidth
          type="date"
          label="date of birth *"
          size="small"
          {...register("dob")}
          error={!!errors.dob}
          helperText={errors.dob?.message as string}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          type="date"
          label="join date *"
          size="small"
          {...register("joinDate")}
          error={!!errors.joinDate}
          helperText={errors.joinDate?.message as string}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="nid card *"
          size="small"
          {...register("nid")}
          error={!!errors.nid}
          helperText={errors.nid?.message as string}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />
      </div>

      {/* footer buttons */}
      <div className="flex justify-end gap-3 md:pt-4 border-t border-gray-100">
        <MainButton label="cancel" onClick={onCancel} color="secondary" />
        <MainButton
          type="submit"
          disabled={isLoading}
          label={
            isLoading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "save changes"
            )
          }
          color="primary"
        />
      </div>
    </form>
  );
}
