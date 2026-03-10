// Individual Row Skeleton
const EmployeeRowSkeleton = () => (
  <tr className="border-b border-slate-50">
    {/* Profile & Name */}
    <td className="px-8 py-5">
      <div className="flex items-center gap-4 animate-pulse">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 shrink-0" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-slate-200 rounded-md" />
          <div className="h-3 w-24 bg-slate-100 rounded-md" />
        </div>
      </div>
    </td>
    {/* Designation */}
    <td className="px-8 py-5">
      <div className="flex justify-center animate-pulse">
        <div className="h-7 w-24 bg-slate-100 rounded-full" />
      </div>
    </td>
    {/* Join Date */}
    <td className="px-8 py-5">
      <div className="space-y-2 animate-pulse">
        <div className="h-4 w-20 bg-slate-100 rounded-md" />
        <div className="h-3 w-16 bg-slate-50 rounded-md" />
      </div>
    </td>
    {/* Action Buttons */}
    <td className="px-8 py-5">
      <div className="flex justify-end gap-2 animate-pulse">
        <div className="w-10 h-10 bg-slate-100 rounded-xl" />
        <div className="w-10 h-10 bg-slate-100 rounded-xl" />
      </div>
    </td>
  </tr>
);

export default function EmployeeTableSkeleton() {
  return (
    <div className="space-y-8">
      {/* Table Container Skeleton */}
      <div className="bg-white border border-slate-200 rounded-4xl overflow-hidden shadow-sm">
        {/* Table Controls (Per Page) */}
        <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center gap-3 animate-pulse">
          <div className="h-4 w-10 bg-slate-100 rounded" />
          <div className="h-10 w-20 bg-slate-200 rounded-xl" />
          <div className="h-4 w-14 bg-slate-100 rounded" />
        </div>

        {/* Table Rows */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                {[...Array(4)].map((_, i) => (
                  <th key={i} className="px-8 py-5">
                    <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <EmployeeRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer Skeleton */}
        <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="h-4 w-48 bg-slate-100 rounded-md" />
          <div className="flex gap-3">
            <div className="h-10 w-24 bg-slate-200 rounded-xl" />
            <div className="h-10 w-24 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
