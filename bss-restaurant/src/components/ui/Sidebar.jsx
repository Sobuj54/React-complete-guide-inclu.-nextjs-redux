import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  ClipboardList,
  PlusCircle,
  LogOut,
  ChefHat,
  Table,
} from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Employees", path: "employees", icon: Users },
  { name: "Tables", path: "tables", icon: Table },
  { name: "Orders", path: "orders", icon: ClipboardList },
  { name: "New Order", path: "new-order", icon: PlusCircle },
  { name: "Foods", path: "foods", icon: UtensilsCrossed },
];

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuthContext();
  const location = useLocation();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-700 border-r border-slate-500 
        transform transition-transform duration-300 ease-in-out 
        lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Logo Area */}
        <div className="flex items-center gap-3 px-8 py-10">
          <div className="p-2.5 text-white bg-linear-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg ">
            <ChefHat size={26} />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            BSS Resto
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname.endsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-orange-600 text-white "
                    : "text-white/80 hover:bg-slate-100 hover:text-slate-900"
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
            className="flex items-center w-full gap-3 px-4 py-3.5 text-sm font-bold text-orange-500 transition-all rounded-2xl hover:bg-white/90 cursor-pointer"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
