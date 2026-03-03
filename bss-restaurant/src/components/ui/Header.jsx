import { Menu, X, Bell } from "lucide-react";

function Header({ toggleSidebar, isSidebarOpen, user }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b bg-white/80 backdrop-blur-md border-slate-200 lg:px-10">
      <button
        className="p-2 -ml-2 transition-colors rounded-lg lg:hidden text-slate-600 hover:bg-slate-100 cursor-pointer"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex items-center gap-5 ml-auto">
        <button className="relative hidden p-2 transition-colors text-slate-400 hover:text-orange-600 sm:block cursor-pointer">
          <Bell size={22} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3.5 pl-5 border-l border-slate-200">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-bold text-slate-900">
              {user?.fullName || "Admin User"}
            </p>
            <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md inline-block">
              {user?.role || "Admin"}
            </p>
          </div>
          <div className="flex items-center justify-center font-bold text-white shadow-lg w-11 h-11 rounded-2xl bg-slate-900 shadow-slate-200">
            {user?.userName?.[0].toUpperCase() || "A"}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
