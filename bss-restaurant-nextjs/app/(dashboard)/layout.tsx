import DashboardLayout from "@/components/layout/DashboardLayout";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard | BSS Resto",
  description: "Dashboard analytics",
};

export async function getProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("bss_access_token")?.value;

  const res = await fetch(`${process.env.API_URL}/Auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
