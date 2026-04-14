import { getEmployees } from "@/actions/employee-actions";
import { getTablesAction } from "@/actions/table-actions";
import TablesClient from "@/components/features/tables/TablesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tables | BSS Restaurant",
  description: "BSS restaurant tables and assigned employees",
};

export default async function TablesPage() {
  const [tablesData, employeesData] = await Promise.all([
    getTablesAction(1, 10),
    getEmployees(1, 100),
  ]);

  return (
    <TablesClient initialTables={tablesData} initialEmployees={employeesData} />
  );
}
