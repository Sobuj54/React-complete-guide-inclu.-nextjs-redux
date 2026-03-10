export default function OrderSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full animate-pulse">
      {/* Table Skeletons */}
      <div className="w-full lg:w-72 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-44 bg-slate-200 rounded-[2rem] border-[3px] border-slate-100"
          />
        ))}
      </div>
      {/* Food Skeletons */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-6 content-start">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-32 bg-slate-200 rounded-[2.5rem] border-[3px] border-slate-50"
          />
        ))}
      </div>
    </div>
  );
}
