import { Link, useNavigate } from "react-router";
import { ChefHat, ArrowLeft, Home, Utensils, Search } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-slate-50">
      <div className="w-full max-w-2xl space-y-8 text-center duration-500 animate-in fade-in zoom-in">
        <div className="relative flex justify-center">
          <div className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 bg-orange-100 rounded-full opacity-50 top-1/2 left-1/2 blur-3xl" />

          <div className="relative bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
            <div className="flex items-center justify-center gap-4 mb-2 text-orange-600">
              <Utensils size={40} className="rotate-12" />
              <ChefHat size={64} strokeWidth={1.5} />
              <Search size={40} className="-rotate-12" />
            </div>
            <h1 className="font-black tracking-tighter text-9xl text-slate-900">
              404
            </h1>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Page Not Found!
          </h2>
          <p className="max-w-md mx-auto font-medium leading-relaxed text-slate-500">
            Sorry, the page you are looking for seems to have been taken off the
            menu. It might have been moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-8 py-4 font-bold transition-all bg-white border-2 text-slate-900 rounded-2xl border-slate-200 hover:border-orange-600 hover:text-orange-600 active:scale-95 group"
          >
            <ArrowLeft
              size={20}
              className="transition-transform group-hover:-translate-x-1"
            />
            Go Back
          </button>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-8 py-4 font-bold text-white transition-all bg-orange-600 shadow-lg rounded-2xl shadow-orange-200 hover:bg-orange-700 hover:shadow-orange-300 active:scale-95 group"
          >
            <Home size={20} />
            Back to Dashboard
          </Link>
        </div>

        <div className="pt-12">
          <p className="text-xs font-bold tracking-widest uppercase text-slate-300">
            BSS Restaurant Management System
          </p>
        </div>
      </div>
    </div>
  );
}
