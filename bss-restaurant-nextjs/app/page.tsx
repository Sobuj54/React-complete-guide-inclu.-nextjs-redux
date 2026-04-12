import AuthForm from "@/components/features/auth/LoginForm";
import { ChefHat } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Sign In | BSS Restaurant",
  description: "BSS Resto app Sign In",
};

export default function Home() {
  return (
    <div className="flex w-full min-h-screen bg-slate-100">
      <div className="relative hidden w-1/2 overflow-hidden bg-orange-600 lg:flex">
        <div className="absolute inset-0 z-10 bg-black/40" />

        <Image
          src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=687&auto=format&fit=crop"
          alt="BSS Restaurant Interior"
          fill
          priority
          className="object-cover scale-110"
          sizes="50vw"
        />

        <div className="relative z-20 flex flex-col justify-between w-full p-12 text-white">
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <div className="p-2 text-white bg-blue-500 rounded-[5px]">
              <ChefHat size={28} />
            </div>
            <span>BSS Restaurant</span>
          </div>

          <h1 className="text-5xl font-extrabold leading-tight">
            Savor the flavor of <br />
            <span className="text-blue-400">effortless ordering.</span>
          </h1>

          <p className="text-sm text-slate-300">
            © {new Date().getFullYear()} BSS Restaurant Group
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full p-6 lg:w-1/2 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="mt-2 text-slate-500">
              Please enter your details to sign in.
            </p>
          </div>

          <AuthForm />
        </div>
      </div>
    </div>
  );
}
