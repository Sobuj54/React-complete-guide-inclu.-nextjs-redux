export default function Pagination({
  currentPage,
  lastPage,
  onPageChange,
  totalEntries,
  className = "",
}) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage || lastPage === 0;

  return (
    <div
      className={`p-8 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between ${className}`}
    >
      <div className="flex flex-col">
        <p className="text-xs font-black tracking-wider uppercase text-slate-600">
          Page {currentPage} of {lastPage || 1}
        </p>
        {totalEntries && (
          <span className="text-[10px] font-bold text-slate-500 uppercase">
            Total {totalEntries} Records
          </span>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={`px-6 py-2 text-xs font-black uppercase transition-all bg-white border shadow-sm  rounded-xl border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white active:scale-95 ${isFirstPage ? "cursor-not-allowed" : " cursor-pointer"}`}
        >
          Prev
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className={`px-6 py-2 text-xs font-black uppercase transition-all bg-white border shadow-sm  rounded-xl border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white active:scale-95 ${isLastPage ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
