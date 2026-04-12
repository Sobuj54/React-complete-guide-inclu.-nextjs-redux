"use client";

import { User, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthForm } from "@/hooks/useAuthForm";
import { LoginFormFields } from "@/types";

export default function AuthForm() {
  const { showPassword, setShowPassword, register, handleSubmit, errors } =
    useAuthForm();
  const { login, isLoading } = useAuth();

  const onSubmit = (data: LoginFormFields) => {
    login(data);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {/* UserName Field */}
      <div className="space-y-1">
        <div className="relative">
          <User
            className="absolute -translate-y-1/2 left-3 top-1/2 text-slate-400"
            size={18}
          />
          <input
            {...register("userName")}
            placeholder="Username"
            disabled={isLoading}
            className={`w-full py-3 pl-10 pr-4 bg-white border rounded-[5px] outline-none focus:border-blue-500 transition-all ${
              errors.userName
                ? "border-red-500 focus:ring-red-200"
                : "border-slate-200 focus:ring-orange-200"
            }`}
          />
        </div>
        {errors.userName && (
          <p className="text-xs text-red-500">{errors.userName.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-1">
        <div className="relative">
          <Lock
            className="absolute -translate-y-1/2 left-3 top-1/2 text-slate-400"
            size={18}
          />
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            disabled={isLoading}
            className={`w-full py-3 pl-10 pr-12 bg-white border rounded-[5px] outline-none focus:border-blue-500 transition-all ${
              errors.password
                ? "border-red-500 focus:ring-red-200"
                : "border-slate-200 focus:ring-orange-200"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute -translate-y-1/2 right-3 top-1/2 p-2 cursor-pointer text-slate-400 hover:text-blue-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center justify-center w-full gap-2 py-3 font-bold text-white transition-all bg-blue-500 shadow-lg hover:bg-blue-600 rounded-[5px] disabled:opacity-70 shadow-orange-600/20 group cursor-pointer"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </>
        )}
      </button>
    </form>
  );
}
