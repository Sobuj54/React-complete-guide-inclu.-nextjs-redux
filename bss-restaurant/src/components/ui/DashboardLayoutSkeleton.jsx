export default function DashboardLayoutSkeleton() {
  return (
    <div className="flex min-h-screen bg-slate-50 animate-pulse">
      {/* --- Sidebar Skeleton --- */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 p-8 space-y-10">
        {/* Logo Placeholder */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-200 rounded-xl" />
          <div className="h-6 w-32 bg-slate-200 rounded-md" />
        </div>

        {/* Nav Links Placeholder */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 w-full bg-slate-100 rounded-2xl" />
          ))}
        </div>
      </aside>

      {/* --- Main Content Skeleton --- */}
      <div className="flex-1 flex flex-col">
        {/* Header Placeholder */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10">
          <div className="h-6 w-48 bg-slate-100 rounded-md lg:hidden" />{" "}
          {/* Mobile Menu */}
          <div className="ml-auto flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-full" />
            <div className="w-32 h-10 bg-slate-100 rounded-xl" />
          </div>
        </header>

        <main className="p-6 lg:p-10 space-y-10 max-w-7xl mx-auto w-full">
          {/* Title Placeholder */}
          <div className="space-y-3">
            <div className="h-8 w-64 bg-slate-200 rounded-lg" />
            <div className="h-4 w-96 bg-slate-100 rounded-md" />
          </div>

          {/* Stats Grid Placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 bg-white border border-slate-200 rounded-[2rem] p-6 space-y-4"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-xl" />
                <div className="h-4 w-20 bg-slate-200 rounded-md" />
              </div>
            ))}
          </div>

          {/* Table Placeholder */}
          <div className="bg-white border border-slate-200 rounded-[2rem] h-96 p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div className="h-6 w-40 bg-slate-200 rounded-md" />
              <div className="h-6 w-20 bg-slate-100 rounded-md" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 w-full bg-slate-50 rounded-xl" />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
