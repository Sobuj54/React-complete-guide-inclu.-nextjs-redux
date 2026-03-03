import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { employeeSchema } from "../../validation/form-validation";

export default function EmployeeForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: defaultValues || {},
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const Input = ({
    label,
    name,
    type = "text",
    required = true,
    placeholder,
  }) => (
    <div className="space-y-1.5">
      <label className="text-sm font-black text-slate-700 flex gap-1">
        {required && <span className="text-red-500">*</span>} {label}
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder || label}
        className={`w-full px-4 py-3 rounded-xl border ${errors[name] ? "border-red-500 focus:ring-red-100" : "border-slate-200 focus:ring-orange-100"} focus:outline-none focus:ring-4 transition-all text-sm font-medium`}
      />
      {errors[name] && (
        <p className="text-[10px] font-black text-red-500 uppercase">
          {errors[name].message}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <Input label="First Name" name="firstName" />
          <Input label="Middle Name" name="middleName" required={false} />
          <Input label="Last Name" name="lastName" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-black text-slate-700">
            Upload Image
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-[2rem] h-[215px] flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              {...register("image")}
            />
            <div className="p-4 bg-white rounded-2xl shadow-sm mb-2 text-slate-400">
              <Upload size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              + Select File
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Input label="Spouse Name" name="spouseName" />
        <Input label="Father's Name" name="fatherName" />
        <Input label="Mother's Name" name="motherName" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Input label="Designation" name="designation" />
        <Input label="Email Address" name="email" type="email" />
        <Input label="Phone Number" name="phone" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-black text-slate-700">
            <span className="text-red-500">*</span> Gender
          </label>
          <select
            {...register("gender")}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none transition-all text-sm font-medium bg-white"
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
        <Input label="Date of Birth" name="dob" type="date" />
        <Input label="Date of Join" name="joinDate" type="date" />
        <Input label="NID Card Number" name="nid" />
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-3.5 rounded-2xl font-black text-slate-500 hover:bg-slate-100 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-3.5 rounded-2xl font-black shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center gap-2"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
