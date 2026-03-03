const StatCardSkeleton = () => (
  <div className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex flex-col items-center justify-center md:items-start animate-pulse">
    <div className="w-12 h-12 rounded-2xl bg-slate-200 mb-4" />
    <div className="h-3 w-20 bg-slate-100 rounded-full mb-3" />
    <div className="h-8 w-28 bg-slate-200 rounded-lg" />
  </div>
);

const OrderRowSkeleton = () => (
  <tr className="border-b border-slate-50">
    <td className="px-8 py-5">
      <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
      <div className="h-3 w-16 bg-slate-100 rounded" />
    </td>
    <td className="px-8 py-5">
      <div className="h-4 w-20 bg-slate-100 rounded" />
    </td>
    <td className="px-8 py-5">
      <div className="flex justify-center">
        <div className="h-6 w-16 bg-slate-100 rounded-full" />
      </div>
    </td>
  </tr>
);

const TopSellerSkeleton = () => (
  <div className="flex items-center gap-4 animate-pulse">
    <div className="w-14 h-14 rounded-2xl bg-slate-200 shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 w-3/4 bg-slate-200 rounded" />
      <div className="h-3 w-1/2 bg-slate-100 rounded" />
    </div>
    <div className="h-4 w-12 bg-slate-100 rounded" />
  </div>
);

export default function DashboardSkeleton() {
  return (
    <div className="space-y-10">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 animate-pulse">
        <div className="h-10 w-64 bg-slate-200 rounded-xl" />
        <div className="h-5 w-48 bg-slate-100 rounded-lg" />
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Table Skeleton */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <div className="h-7 w-40 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-6 w-24 bg-slate-100 rounded-full animate-pulse" />
          </div>
          <table className="w-full">
            <tbody className="animate-pulse">
              {[...Array(5)].map((_, i) => (
                <OrderRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Sellers Skeleton */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
          <div className="h-7 w-32 bg-slate-200 rounded-lg animate-pulse" />
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <TopSellerSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
