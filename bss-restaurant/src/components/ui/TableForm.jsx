import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { tableSchema } from "../../validation/form-validation";

export default function TableForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}) {
  const [preview, setPreview] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tableSchema),
    defaultValues: defaultValues || { tableNumber: "", numberOfSeats: 1 },
  });

  const imageWatcher = watch("image");

  useEffect(() => {
    if (imageWatcher && imageWatcher[0] instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(imageWatcher[0]);
    } else if (defaultValues?.image) {
      setPreview(
        `https://bssrms.runasp.net/images/table/${defaultValues.image}`,
      );
    }
  }, [imageWatcher, defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-black uppercase text-slate-700">
              Table Name/Number
            </label>
            <input
              {...register("tableNumber")}
              className="w-full px-5 py-4 font-bold transition-all border-2 outline-none rounded-2xl border-slate-100 focus:border-orange-500"
              placeholder="e.g. T-101"
            />
            {errors.tableNumber && (
              <p className="text-[10px] font-black text-red-500 uppercase">
                {errors.tableNumber.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-black uppercase text-slate-700">
              Total Seats
            </label>
            <input
              type="number"
              {...register("numberOfSeats")}
              className="w-full px-5 py-4 font-bold transition-all border-2 outline-none rounded-2xl border-slate-100 focus:border-orange-500"
            />
            {errors.numberOfSeats && (
              <p className="text-[10px] font-black text-red-500 uppercase">
                {errors.numberOfSeats.message}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-black uppercase text-slate-700">
            Display Image
          </label>
          <div className="relative h-[190px] w-full rounded-[2rem] border-4 border-dashed border-slate-100 bg-slate-50 overflow-hidden flex flex-col items-center justify-center group">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="p-4 text-center">
                <Upload className="mx-auto mb-2 text-slate-300" size={32} />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Select Image
                </span>
              </div>
            )}
            <input
              type="file"
              {...register("image")}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-6 border-t border-slate-50">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-xs font-black uppercase cursor-pointer text-slate-400"
        >
          Cancel
        </button>
        <button
          disabled={isLoading}
          className="px-10 py-4 font-black text-white transition-all bg-orange-500 shadow-lg rounded-2xl hover:bg-orange-600 active:scale-95 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Table Details"}
        </button>
      </div>
    </form>
  );
}
