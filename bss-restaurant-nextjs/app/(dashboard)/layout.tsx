import ProtectedRoute from "@/components/AuthGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | BSS Resto",
  description: "Dashboard analytics",
};

export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProtectedRoute>
        <DashboardLayout>{children}</DashboardLayout>
      </ProtectedRoute>
    </>
  );
}
