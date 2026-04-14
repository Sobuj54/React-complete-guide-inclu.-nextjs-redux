import { getEmployees } from "@/actions/employee-actions";
import { getTablesAction } from "@/actions/table-actions";
import TablesClient from "@/components/features/tables/TablesClient";

export default async function TablesPage() {
  // Initial parallel data fetching
  const [tablesData, employeesData] = await Promise.all([
    getTablesAction(1, 10),
    getEmployees(1, 100),
  ]);

  return (
    <TablesClient initialTables={tablesData} initialEmployees={employeesData} />
  );
}
