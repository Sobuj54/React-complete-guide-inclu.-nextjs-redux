import { useState, useEffect } from "react";
import { Plus, LayoutGrid, Search, ChevronDown } from "lucide-react";
import { useTables, useTable, useTableMutations } from "../../hooks/useTables";
import { toBase64 } from "../../utils/to-base64";

import TableCard from "../../components/ui/TableCard";
import TableSkeleton from "../../components/ui/TableSkeleton";
import Pagination from "../../components/Pagination";
import TableForm from "../../components/ui/TableForm";
import Modal from "../../components/ui/Modal";
import ErrorState from "../../components/ErrorState";

export default function Tables() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const {
    data: response,
    isLoading,
    isError,
  } = useTables(page, perPage, debouncedSearch);
  const { data: tableDetails, isFetching: isFetchingDetails } =
    useTable(selectedId);
  const { createTable, updateTable } = useTableMutations();

  const handleEdit = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const onFormSubmit = async (data) => {
    try {
      const hasFile = data.image && data.image[0] instanceof File;
      const payload = {
        tableNumber: data.tableNumber,
        numberOfSeats: Number(data.numberOfSeats),
        image: hasFile ? data.image[0].name : tableDetails?.image || "",
        base64: hasFile ? await toBase64(data.image[0]) : "",
      };

      const action = selectedId
        ? updateTable.mutateAsync({ id: selectedId, payload })
        : createTable.mutateAsync(payload);

      await action;
      setIsModalOpen(false);
      setSelectedId(null);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  if (isLoading) return <TableSkeleton />;

  if (isError) return <ErrorState />;

  return (
    <div className="p-2 space-y-10 duration-500 animate-in fade-in">
      <title>BSS Resto | Tables</title>

      {/* Header & Controls */}
      <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Tables Plan
          </h1>
          <p className="mt-1 font-bold text-slate-400">
            Manage restaurant seating and assignments
          </p>
        </div>

        <div className="flex flex-col items-center w-full gap-4 sm:flex-row md:w-auto">
          {/* Per Page Selector */}
          <div className="relative w-full sm:w-auto group">
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="w-full py-4 pl-5 pr-12 font-black transition-all bg-white border-2 outline-none appearance-none cursor-pointer sm:w-auto text-slate-700 border-slate-100 rounded-2xl focus:border-orange-500"
            >
              {[6, 12, 24, 48].map((num) => (
                <option key={num} value={num}>
                  {num} Items
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute transition-colors -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400 group-hover:text-orange-500"
              strokeWidth={3}
            />
          </div>

          {/* Search Input */}
          <div className="relative flex-1 w-full sm:w-64">
            <Search
              className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tables..."
              className="w-full py-4 pl-12 pr-4 font-bold transition-all bg-white border-2 outline-none border-slate-100 rounded-2xl focus:border-orange-500 placeholder:text-slate-300"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={() => {
              setSelectedId(null);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center w-full gap-2 p-4 font-black text-white transition-all bg-orange-500 shadow-xl cursor-pointer sm:w-auto rounded-2xl hover:bg-orange-600 active:scale-95"
          >
            <Plus size={24} strokeWidth={3} /> <span>Add New Table</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {response?.data?.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            onEdit={() => handleEdit(table.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {!isLoading && response?.data?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-100">
          <LayoutGrid size={64} className="mb-4 text-slate-200" />
          <p className="text-xl font-black text-slate-400">No tables found</p>
        </div>
      )}

      {/* Pagination Footer */}
      <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden mt-12 shadow-sm">
        <Pagination
          currentPage={response?.current_page}
          lastPage={response?.last_page}
          totalEntries={response?.total}
          onPageChange={(p) => {
            setPage(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedId ? "Update Table Information" : "Add New Table"}
        style="max-w-3xl"
      >
        {selectedId && isFetchingDetails ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <div className="w-12 h-12 border-4 rounded-full border-slate-100 border-t-orange-600 animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Fetching details...
            </p>
          </div>
        ) : (
          <TableForm
            defaultValues={tableDetails}
            onSubmit={onFormSubmit}
            onCancel={() => setIsModalOpen(false)}
            isLoading={createTable.isPending || updateTable.isPending}
          />
        )}
      </Modal>
    </div>
  );
}
