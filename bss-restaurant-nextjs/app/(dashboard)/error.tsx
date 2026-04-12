"use client";

import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();
  return (
    <div className="min-h-100 w-full flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
      <div className="max-w-md w-full bg-white border-2 border-slate-100 rounded-[5px] p-10 shadow-sm text-center">
        {/* Icon with "Chunky" Background */}
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[5px] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-100/50"></div>

        {/* Error Text */}
        <h2 className="text-2xl font-black text-slate-900 mb-2">
          Oops! Data Error
        </h2>
        <p className="text-slate-500 font-medium mb-8 leading-relaxed">
          "Something went wrong while loading the data."
        </p>

        {/* Actions */}
        <div>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center justify-center gap-2 w-full bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-600 px-6 py-4 rounded-[5px] font-black transition-all active:scale-[0.98] cursor-pointer"
          >
            <Home size={18} strokeWidth={3} />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
