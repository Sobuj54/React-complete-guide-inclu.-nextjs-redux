import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, X } from "lucide-react";

export default function FoodForm({
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
    defaultValues: defaultValues || {
      discountType: "Percentage",
      discount: 0,
      price: 0,
    },
  });

  const selectedImage = watch("image");
  const price = watch("price") || 0;
  const discountType = watch("discountType");
  const discount = watch("discount") || 0;

  // Sync form when defaultValues (edit mode) change
  useEffect(() => {
    setIsImageDeleted(false);
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  // Calculate Discounted Price dynamically
  const discountedPrice = useMemo(() => {
    const basePrice = Number(price);
    const discVal = Number(discount);

    if (discountType === "Percentage") {
      return basePrice - basePrice * (discVal / 100);
    }
    if (discountType === "Flat") {
      return Math.max(0, basePrice - discVal);
    }
    return basePrice;
  }, [price, discountType, discount]);

  const preview = useMemo(() => {
    if (selectedImage?.[0] instanceof File)
      return URL.createObjectURL(selectedImage[0]);
    if (isImageDeleted) return null;
    return defaultValues?.image
      ? `https://restaurantapi.bssoln.com/images/food/${defaultValues.image}`
      : null;
  }, [selectedImage, defaultValues, isImageDeleted]);

  const labelStyle = "text-sm font-bold  mb-1.5 inline-block";
  const inputStyle =
    "w-full px-4 py-2.5 rounded-[5px] border border-slate-700 bg-white  outline-none transition-all text-sm font-medium";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelStyle}>
              <span className="text-red-500 mr-1">*</span>Food Name
            </label>
            <input
              {...register("name", { required: true })}
              className={inputStyle}
              placeholder="Enter food name"
            />
          </div>

          <div>
            <label className={labelStyle}>
              <span className="text-red-500 mr-1">*</span>Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className={`${inputStyle} min-h-[150px] resize-none`}
              placeholder="Describe the dish..."
            />
          </div>
        </div>

        <div>
          <label className={labelStyle}>Food Image</label>
          <div className="border-2 border-dashed border-slate-200 rounded-[5px] h-[225px] flex flex-col items-center justify-center bg-white relative overflow-hidden group">
            {preview ? (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain shadow-sm border border-slate-200 bg-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    setValue("image", null);
                    setIsImageDeleted(true);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-[5px] opacity-0 group-hover:opacity-100 transition-opacity z-30"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="text-center p-6 cursor-pointer">
                <Upload size={32} className="mx-auto text-slate-300 mb-2" />
                <p className="text-xs font-bold text-slate-400">
                  Click or drag to upload image
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              {...register("image")}
            />
          </div>
        </div>
      </div>

      {/* Bottom Section: Pricing Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className={labelStyle}>
            <span className="text-red-500 mr-1">*</span>Price
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Select Discount Type</label>
          <select {...register("discountType")} className={inputStyle}>
            <option value="None">None</option>
            <option value="Percentage">Percentage</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div>
          <label className={labelStyle}>
            Discount In {discountType === "Percentage" ? "%" : "৳"}
          </label>
          <input
            type="number"
            {...register("discount")}
            className={inputStyle}
            disabled={discountType === "None"}
          />
        </div>

        <div>
          <label className={labelStyle}>Discounted Price</label>
          <input
            type="text"
            readOnly
            value={discountedPrice}
            className={`${inputStyle} bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed`}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-3 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-[5px] font-bold text-slate-600 border bg-white border-slate-200 hover:bg-slate-50 transition-colors text-sm cursor pointer"
        >
          Cancel Operation
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-[5px] font-bold transition-all active:scale-95 disabled:opacity-50 text-sm shadow-sm cursor-pointer"
        >
          {isLoading
            ? "Processing..."
            : defaultValues
              ? "Update Food Item"
              : "Add Food Item"}
        </button>
      </div>
    </form>
  );
}
