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
    <label className="text-sm font-medium flex gap-1">
      {required && <span className="text-red-500">*</span>} {label}
    </label>
    <input
      {...register(name)}
      type={type}
      placeholder={placeholder || label}
      className={`w-full px-4 py-3 rounded-md border border-black/90 bg-white ${
        errors[name] ? "border-red-500 focus:ring-red-600" : ""
      } focus:outline-none focus:ring-1 transition-all text-sm font-medium text-black`}
    />
    {errors[name] && (
      <p className="text-[10px] font-black text-red-500 uppercase">
        {errors[name].message}
      </p>
    )}
  </div>
);
