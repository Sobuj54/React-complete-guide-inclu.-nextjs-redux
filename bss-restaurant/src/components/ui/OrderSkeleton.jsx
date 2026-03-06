export default function OrderSkeleton() {
  return (
    <div className="bg-white border-[3px] border-slate-100 rounded-[2.5rem] p-6 animate-pulse">
      {/* Status Badge Skeleton */}
      <div className="flex justify-between items-start mb-6">
        <div className="h-8 w-24 bg-slate-100 rounded-full border-2 border-slate-50" />
        <div className="h-8 w-8 bg-slate-100 rounded-lg" />
      </div>

      <div className="space-y-6">
        {/* Order ID Section */}
        <div className="space-y-2">
          <div className="h-3 w-20 bg-slate-50 rounded-full" />
          <div className="h-6 w-48 bg-slate-100 rounded-xl" />
        </div>

        {/* Grid Stats Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-slate-50 rounded-[2rem] border-2 border-slate-100/50" />
          <div className="h-20 bg-slate-50 rounded-[2rem] border-2 border-slate-100/50" />
        </div>

        {/* Time Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-slate-100 rounded-full" />
          <div className="h-3 w-32 bg-slate-50 rounded-full" />
        </div>
      </div>

      {/* Buttons Skeleton */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="h-12 bg-slate-100 rounded-2xl border-2 border-slate-50" />
        <div className="h-12 bg-orange-100/50 rounded-2xl border-2 border-orange-50" />
      </div>
    </div>
  );
}
