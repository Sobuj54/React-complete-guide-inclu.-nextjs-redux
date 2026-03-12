import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X } from "lucide-react";
import { employeeSchema } from "../../validation/form-validation";
import { Input } from "../Input";

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

  useEffect(() => {
    setIsImageDeleted(false);
  }, [defaultValues]);

  const existingImageName = defaultValues?.image;

  const existingImageUrl = useMemo(() => {
    if (isImageDeleted) return null;

    return existingImageName
      ? `https://bssrms.runasp.net/images/user/${existingImageName}`
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <Input
            errors={errors}
            register={register}
            label="First Name"
            name="firstName"
          />
          <Input
            errors={errors}
            register={register}
            label="Middle Name"
            name="middleName"
            required={false}
          />
          <Input
            errors={errors}
            register={register}
            label="Last Name"
            name="lastName"
          />
        </div>

        {/* Image Upload with Live Preview */}
        <div className="space-y-2">
          <label className="text-sm font-black text-slate-700">
            Upload Image
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-lg h-[215px] flex flex-col items-center justify-center bg-white hover:bg-slate-100 transition-colors cursor-pointer relative overflow-hidden group">
            {preview ? (
              <div className="relative w-full h-full">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setValue("image", null);
                    setIsImageDeleted(true);
                  }}
                  className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-30"
                >
                  <X size={16} strokeWidth={3} />
                </button>
              </div>
            ) : (
              <>
                <div className="p-4 bg-slate-400 rounded-lg shadow-sm mb-2 text-white">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-mediuma">+ Select File</p>
              </>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Input
          errors={errors}
          register={register}
          label="Spouse Name"
          name="spouseName"
        />
        <Input
          errors={errors}
          register={register}
          label="Father's Name"
          name="fatherName"
        />
        <Input
          errors={errors}
          register={register}
          label="Mother's Name"
          name="motherName"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Input
          errors={errors}
          register={register}
          label="Designation"
          name="designation"
        />
        <Input
          errors={errors}
          register={register}
          label="Email Address"
          name="email"
          type="email"
        />
        <Input
          errors={errors}
          register={register}
          label="Phone Number"
          name="phone"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-black text-slate-700">
            <span className="text-red-500">*</span> Gender
          </label>
          <select
            {...register("gender")}
            className="w-full px-4 py-3 rounded-md border border-black outline-none transition-all text-sm font-medium bg-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && (
            <p className="text-[10px] font-black text-red-500 uppercase">
              {errors.gender.message}
            </p>
          )}
        </div>
        <Input
          errors={errors}
          register={register}
          label="Date of Birth"
          name="dob"
          type="date"
        />
        <Input
          errors={errors}
          register={register}
          label="Date of Join"
          name="joinDate"
          type="date"
        />
        <Input
          errors={errors}
          register={register}
          label="NID Card Number"
          name="nid"
        />
      </div>

      <div className="flex flex-col lg:flex-row justify-end gap-3 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-3.5 rounded-md font-black  transition-all text-center bg-slate-200  cursor-pointer hover:bg-slate-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-orange-600 hover:bg-orange-700 text-white px-10 py-3.5 rounded-md font-black transition-all active:scale-95 text-center cursor-pointer ${isLoading && "cursor-not-allowed"}`}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
