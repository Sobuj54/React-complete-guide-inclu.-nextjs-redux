const TableSkeleton = () => {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-4">
          <div className="w-32 h-4 rounded-full bg-slate-200" />
          <div className="w-64 h-10 bg-slate-200 rounded-2xl" />
          <div className="h-4 rounded-full w-80 bg-slate-100" />
        </div>
        <div className="flex gap-4">
          <div className="w-64 h-14 bg-slate-200 rounded-2xl" />
          <div className="w-40 h-14 bg-slate-200 rounded-2xl" />
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-32 bg-slate-100 rounded-[2.5rem] border-2 border-slate-50"
          />
        ))}
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white border-2 border-slate-50 rounded-[2.5rem] p-6 space-y-6"
          >
            <div className="h-48 bg-slate-100 rounded-[2rem]" />
            <div className="space-y-3">
              <div className="w-1/2 h-6 rounded-lg bg-slate-200" />
              <div className="w-1/3 h-4 rounded-lg bg-slate-100" />
            </div>
            <div className="flex gap-2">
              <div className="w-20 h-8 rounded-full bg-slate-100" />
              <div className="w-20 h-8 rounded-full bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
