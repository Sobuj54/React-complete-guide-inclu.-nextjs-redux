import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Sidebar from "../components/ui/Sidebar";
import { Outlet } from "react-router";
import Header from "../components/ui/Header";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuthContext();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen font-sans bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top Header */}
        <Header
          user={user}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 w-full p-6 mx-auto lg:p-10 max-w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
