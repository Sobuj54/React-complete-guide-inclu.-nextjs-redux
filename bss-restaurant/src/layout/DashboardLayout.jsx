import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  ClipboardList,
  PlusCircle,
  LogOut,
  Menu,
  X,
  ChefHat,
  Bell,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "New Order", path: "/new-order", icon: PlusCircle },
  { name: "Orders", path: "/orders", icon: ClipboardList },
  { name: "Foods", path: "/foods", icon: UtensilsCrossed },
  { name: "Tables", path: "/tables", icon: ClipboardList },
  { name: "Employees", path: "/employees", icon: Users },
];

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* --- Mobile Sidebar Overlay --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* --- Sidebar --- */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="flex items-center gap-3 px-8 py-10">
            <div className="p-2.5 text-white bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg shadow-orange-200">
              <ChefHat size={26} />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              BSS Resto
            </span>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-200 ${
                    isActive
                      ? "bg-orange-600 text-white shadow-md shadow-orange-200"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Logout */}
          <div className="p-6 mt-auto border-t border-slate-100">
            <button
              onClick={logout}
              className="flex items-center w-full gap-3 px-4 py-3.5 text-sm font-bold text-red-500 transition-all rounded-2xl hover:bg-red-50"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b bg-white/80 backdrop-blur-md border-slate-200 lg:px-10">
          <button
            className="p-2 -ml-2 transition-colors rounded-lg lg:hidden text-slate-600 hover:bg-slate-100"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-5 ml-auto">
            <button className="relative hidden p-2 transition-colors text-slate-400 hover:text-orange-600 sm:block">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3.5 pl-5 border-l border-slate-200">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-slate-900">
                  {user?.userName || "Admin User"}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md inline-block">
                  {user?.role || "Manager"}
                </p>
              </div>
              <div className="flex items-center justify-center font-bold text-white shadow-lg w-11 h-11 rounded-2xl bg-slate-900 shadow-slate-200">
                {user?.userName?.[0].toUpperCase() || "A"}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 w-full p-6 mx-auto lg:p-10 max-w-7xl">
          {children}
        </main>
      </div>
    </div>
  );
}
