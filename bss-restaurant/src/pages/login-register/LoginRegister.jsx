import { ChefHat, User, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useAuth } from "../../hooks/useAuth";

export default function AuthPage() {
  const { showPassword, setShowPassword, register, handleSubmit, errors } =
    useAuthForm();

  const { login, isLoading } = useAuth();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <>
      <title>Sign In</title>
      <meta name="description" content="BSS Resto app Sign In" />
      <div className="flex w-full min-h-screen bg-slate-50">
        {/* Left Side: Branding */}
        <div className="relative hidden w-1/2 overflow-hidden bg-orange-600 lg:flex">
          <div className="absolute inset-0 z-10 bg-black/40" />
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
            alt="BSS Restaurant Interior"
            className="absolute inset-0 object-cover w-full h-full scale-110"
          />
          <div className="relative z-20 flex flex-col justify-between w-full p-12 text-white">
            <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <div className="p-2 text-orange-600 bg-white rounded-xl">
                <ChefHat size={28} />
              </div>
              <span>BSS Restaurant</span>
            </div>
            <h1 className="text-5xl font-extrabold leading-tight">
              Savor the flavor of <br />
              <span className="text-orange-400">effortless ordering.</span>
            </h1>
            <p className="text-sm text-slate-300">
              © 2026 BSS Restaurant Group
            </p>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="flex flex-col items-center justify-center w-full p-6 lg:w-1/2 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-slate-900">
                Welcome Back
              </h2>
              <p className="mt-2 text-slate-500">
                Please enter your details to sign in.
              </p>
            </div>

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
                    className={`w-full py-3 pl-10 pr-4 bg-white border rounded-xl outline-none focus:ring-2 transition-all ${
                      errors.userName
                        ? "border-red-500 focus:ring-red-200"
                        : "border-slate-200 focus:ring-orange-200"
                    }`}
                  />
                </div>
                {errors.userName && (
                  <p className="text-xs text-red-500">
                    {errors.userName.message}
                  </p>
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
                    className={`w-full py-3 pl-10 pr-12 bg-white border rounded-xl outline-none focus:ring-2 transition-all ${
                      errors.password
                        ? "border-red-500 focus:ring-red-200"
                        : "border-slate-200 focus:ring-orange-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-400 hover:text-orange-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center w-full gap-2 py-3 font-bold text-white transition-all bg-orange-600 shadow-lg hover:bg-orange-700 rounded-xl disabled:opacity-70 shadow-orange-600/20 group cursor-pointer"
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
          </div>
        </div>
      </div>
    </>
  );
}
