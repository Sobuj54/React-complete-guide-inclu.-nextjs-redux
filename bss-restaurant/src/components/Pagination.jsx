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
      className={`p-8 border-t border-slate-100 bg-slate-50/30 flex flex-col md:flex-row items-center gap-5 md:gap-0 justify-between ${className}`}
    >
      <div className="flex flex-col">
        <p className="text-base font-semibold text-black/50">
          Showing page {currentPage} of {lastPage || 1}
        </p>
        {/* {totalEntries && (
          <span className="text-base font-semibold text-black/80">
            Total {totalEntries} Records
          </span>
        )} */}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={`px-3 py-1 rounded-sm text-sm text-black transition-all bg-white border hover:bg-slate-50 disabled:opacity-30 ${isFirstPage ? "cursor-not-allowed" : " cursor-pointer"}`}
        >
          Previous
        </button>
        <span className="bg-gray-700 text-white inline-block px-2 text-center py-1 rounded-sm">
          {currentPage}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className={`px-3 py-1 rounded-sm text-sm text-black transition-all bg-white border hover:bg-slate-50 disabled:opacity-30 ${isLastPage ? "cursor-not-allowed" : "cursor-pointer hover:bg-slate-100"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
