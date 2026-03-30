export default function TableSelection({
  tablesQuery,
  selectedTable,
  setSelectedTable,
}) {
  console.log(tablesQuery.data);
  return (
    <div className="w-full lg:w-72 flex flex-col min-h-0">
      <h2 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex-shrink-0 px-2">
        Tables ({tablesQuery.data?.length || 0})
      </h2>
      <div className="flex-1 overflow-y-auto pr-2 flex lg:flex-col gap-4 no-scrollbar pb-10 ">
        {tablesQuery.isLoading
          ? [1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 bg-slate-200/40 rounded-[2.5rem] animate-pulse"
              />
            ))
          : tablesQuery.data?.map((table) => (
              <button
                key={table.id}
                onClick={() => setSelectedTable(table)}
                className={`flex-shrink-0 w-44 lg:w-full p-5 rounded-[2.5rem] border-[3px] transition-all duration-300 ${
                  selectedTable?.id === table.id
                    ? "bg-white border-green-500 shadow-xl scale-[1.02]"
                    : "bg-white border-white hover:border-slate-200"
                }`}
              >
                <div className="aspect-square bg-slate-50 rounded-[1.8rem] mb-4 flex items-center justify-center border border-slate-100 overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}/images/table/${table.image}`}
                    className=" object-cover"
                    alt={table.tableNumber}
                    onError={(e) =>
                      (e.target.src =
                        "https://images.unsplash.com/photo-1599458252573-56ae36120de1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
                    }
                  />
                </div>
                <p className="font-black text-slate-800 text-xs uppercase">
                  {table.tableNumber}
                </p>
                <p className="text-sm font-black text-slate-400 uppercase mt-1">
                  {table.numberOfSeats} Seats
                </p>
              </button>
            ))}
      </div>
    </div>
  );
}
