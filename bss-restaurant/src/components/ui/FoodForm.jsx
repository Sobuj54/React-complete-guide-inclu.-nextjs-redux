import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, X } from "lucide-react";
import {
  TextField,
  MenuItem,
  Typography,
  CircularProgress,
  Box,
  InputAdornment,
  useTheme,
} from "@mui/material";
import MainButton from "../MainButton";

export default function FoodForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}) {
  const theme = useTheme();
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {
      name: "",
      description: "",
      discountType: "None",
      discount: 0,
      price: 0,
    },
  });

  const selectedImage = watch("image");
  const price = watch("price") || 0;
  const discountType = watch("discountType");
  const discount = watch("discount") || 0;

  const getDiscountLabel = () => {
    if (discountType === "Percentage") return "Discount (%)";
    if (discountType === "Flat") return "Discount (৳)";
    return "Discount";
  };

  const inputStyle = {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    // FIX: Absolute positioning prevents the error from pushing other elements
    "& .MuiFormHelperText-root": {
      position: "absolute",
      bottom: "-20px",
      fontSize: "0.75rem",
      margin: 0,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.secondary[400],
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.secondary.dark,
      "&.Mui-focused": {
        color: theme.palette.primary.main,
      },
    },
  };

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        discountType: defaultValues.discountType || "None",
      });
    }
    setIsImageDeleted(false);
  }, [defaultValues, reset]);

  const discountedPrice = useMemo(() => {
    const basePrice = Number(price);
    const discVal = Number(discount);
    if (discountType === "Percentage")
      return basePrice - basePrice * (discVal / 100);
    if (discountType === "Flat") return Math.max(0, basePrice - discVal);
    return basePrice;
  }, [price, discountType, discount]);

  const preview = useMemo(() => {
    if (selectedImage?.[0] instanceof File)
      return URL.createObjectURL(selectedImage[0]);
    if (isImageDeleted) return null;
    return defaultValues?.image
      ? `${import.meta.env.VITE_IMG_URL}/images/food/${defaultValues.image}`
      : null;
  }, [selectedImage, defaultValues, isImageDeleted]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pt-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          <TextField
            fullWidth
            label="Food Name *"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            multiline
            rows={5}
            label="Description *"
            {...register("description", {
              required: "Description is required",
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <div className="flex flex-col">
          <Box
            sx={{
              border: `1px dashed ${theme.palette.secondary.light}`,
              borderRadius: `${theme.shape.borderRadius}px`,
              height: "235px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: theme.palette.background.paper,
              position: "relative",
              overflow: "hidden",
              "&:hover": { bgcolor: theme.palette.primary.lighter },
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
                  onClick={() => {
                    setValue("image", null, { shouldValidate: true });
                    setIsImageDeleted(true);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full z-20"
                >
                  <X size={16} />
                </button>
              </Box>
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  color: theme.palette.secondary.main,
                }}
              >
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-8">
        <TextField
          fullWidth
          label="Price *"
          type="number"
          {...register("price", {
            required: "Price is required.",
            min: { value: 0.01, message: "Must be > 0" },
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: <InputAdornment position="end">৳</InputAdornment>,
          }}
        />

        <TextField
          select
          fullWidth
          label="Discount Type"
          value={discountType || "None"}
          {...register("discountType")}
          onChange={(e) => setValue("discountType", e.target.value)}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Percentage">Percentage</MenuItem>
          <MenuItem value="Flat">Flat</MenuItem>
        </TextField>

        <TextField
          fullWidth
          label={getDiscountLabel()}
          type="number"
          disabled={discountType === "None"}
          {...register("discount")}
          sx={inputStyle}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          label="Final Price"
          value={discountedPrice}
          InputProps={{ readOnly: true }}
          sx={{
            ...inputStyle,
            "& .MuiOutlinedInput-root": {
              bgcolor: theme.palette.secondary.lighter,
            },
          }}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <div
        className="flex justify-end gap-3 pt-4 border-t"
        style={{ borderColor: theme.palette.divider }}
      >
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
