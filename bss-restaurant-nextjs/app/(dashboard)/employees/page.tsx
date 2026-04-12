import { getEmployees } from "@/actions/employee-actions";
import TableShell from "@/components/features/employees/TableShell";

export default async function EmployeesPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; perPage?: string }>;
}) {
  const params = await searchParams;
  const Page = Number(params?.page) || 1;
  const PerPage = Number(params?.perPage) || 10;

  // server-side fetch
  const initialData = await getEmployees(Page, PerPage);

  return (
    <main className="">
      {/* pass data to client shell for interactivity */}
      <TableShell initialData={initialData} page={Page} perpage={PerPage} />
    </main>
  );
}
