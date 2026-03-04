export const Input = ({
  label,
  name,
  type = "text",
  required = true,
  placeholder,
  register,
  errors,
}) => (
  <div className="space-y-1.5">
    <label className="text-sm font-black text-slate-700 flex gap-1">
      {required && <span className="text-red-500">*</span>} {label}
    </label>
    <input
      {...register(name)}
      type={type}
      placeholder={placeholder || label}
      className={`w-full px-4 py-3 rounded-xl border ${
        errors[name]
          ? "border-red-500 focus:ring-red-100"
          : "border-slate-200 focus:ring-orange-100"
      } focus:outline-none focus:ring-4 transition-all text-sm font-medium`}
    />
    {errors[name] && (
      <p className="text-[10px] font-black text-red-500 uppercase">
        {errors[name].message}
      </p>
    )}
  </div>
);
