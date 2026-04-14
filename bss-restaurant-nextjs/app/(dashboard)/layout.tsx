import { getCurrentUserProfile } from "@/actions/auth-actions";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | BSS Restaurant",
  description: "Dashboard analytics",
};

export default async function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currenUserProfile = await getCurrentUserProfile();

  return (
    <DashboardLayout userProfile={currenUserProfile}>
      {children}
    </DashboardLayout>
  );
}
