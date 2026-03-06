import { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Search, ChevronDown } from "lucide-react";
import {
  useTables,
  useTable,
  useTableMutations,
  useUnassignedEmployees,
} from "../../hooks/useTables";
import { toBase64 } from "../../utils/to-base64";

// Components
import TableCard from "../../components/ui/TableCard";
import TableSkeleton from "../../components/ui/TableSkeleton";
import Pagination from "../../components/Pagination";
import ErrorState from "../../components/ErrorState";
import TableForm from "../../components/ui/TableForm";
import Modal from "../../components/ui/Modal";
import AssignStaffModal from "../../components/ui/AssignStaffModal";
import DeleteTableModal from "../../components/ui/DeleteTableModal";

export default function Tables() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Selection States
  const [selectedId, setSelectedId] = useState(null);
  const [tableToDelete, setTableToDelete] = useState(null);
  const [assigningTableId, setAssigningTableId] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Data
  const {
    data: response,
    isLoading,
    isError,
  } = useTables(page, perPage, debouncedSearch);
  const { data: tableDetails, isFetching: isFetchingDetails } =
    useTable(selectedId);
  const { data: unassignedStaff, isLoading: isLoadingStaff } =
    useUnassignedEmployees(assigningTableId);
  const { createTable, updateTable, deleteTable, assignEmployees } =
    useTableMutations();

  // Handlers
  const handleEdit = useCallback((table) => {
    setSelectedId(table.id);
    setIsModalOpen(true);
  }, []);
  const handleDeleteClick = useCallback((table) => {
    setTableToDelete(table);
    setIsDeleteModalOpen(true);
  }, []);

  const handleOpenAssign = useCallback((id) => {
    setAssigningTableId(id);
    setSelectedEmployees([]);
    setIsAssignModalOpen(true);
  }, []);

  const toggleEmployeeSelection = useCallback((empId) => {
    if (!empId) return;
    setSelectedEmployees((prev) =>
      prev.includes(empId)
        ? prev.filter((id) => id !== empId)
        : [...prev, empId],
    );
  }, []);

  const handleConfirmAssignment = async () => {
    const payload = selectedEmployees.map((empId) => ({
      employeeId: empId,
      tableId: assigningTableId,
    }));
    await assignEmployees.mutateAsync(payload);
    setIsAssignModalOpen(false);
  };

  const onConfirmDelete = async () => {
    if (tableToDelete) {
      await deleteTable.mutateAsync(tableToDelete.id);
      setIsDeleteModalOpen(false);
    }
  };

  const onFormSubmit = async (data) => {
    const hasFile = data.image && data.image[0] instanceof File;
    const payload = {
      tableNumber: data.tableNumber,
      numberOfSeats: Number(data.numberOfSeats),
      image: hasFile ? data.image[0].name : tableDetails?.image || "",
      base64: hasFile ? await toBase64(data.image[0]) : "",
    };
    selectedId
      ? await updateTable.mutateAsync({ id: selectedId, payload })
      : await createTable.mutateAsync(payload);
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const renderedTableCards = useMemo(
    () =>
      response?.data?.map((table) => (
        <TableCard
          key={table.id}
          table={table}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onAddEmployee={handleOpenAssign}
        />
      )),
    [response?.data, handleEdit, handleDeleteClick, handleOpenAssign],
  );

  if (isLoading) return <TableSkeleton />;
  if (isError) return <ErrorState />;

  return (
    <div className="p-2 space-y-10 duration-500 animate-in fade-in">
      <title>BSS Resto | Tables Plan</title>

      {/* Header section... (keep your existing header HTML) */}
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
          <div className="relative w-full sm:w-auto group">
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="w-full py-4 pl-5 pr-12 font-black bg-white border-2 border-slate-100 rounded-2xl appearance-none outline-none cursor-pointer"
            >
              {[6, 12, 24, 48].map((num) => (
                <option key={num} value={num}>
                  {num} Items
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400 pointer-events-none"
            />
          </div>
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
              className="w-full py-4 pl-12 pr-4 font-bold bg-white border-2 border-slate-100 rounded-2xl outline-none"
            />
          </div>
          <button
            onClick={() => {
              setSelectedId(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 p-4 font-black text-white bg-orange-500 shadow-xl rounded-2xl hover:bg-orange-600 transition-all cursor-pointer"
          >
            <Plus size={24} strokeWidth={3} /> <span>Add Table</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {renderedTableCards}
      </div>

      <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] mt-12 overflow-hidden">
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

      {/* RENDERED MODALS */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedId(null);
        }}
        title={selectedId ? "Update Table" : "Add New Table"}
        style="max-w-3xl"
      >
        {selectedId && isFetchingDetails ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-orange-600 rounded-full animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Fetching Details...
            </p>
          </div>
        ) : (
          <TableForm
            defaultValues={tableDetails}
            onSubmit={onFormSubmit}
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedId(null);
            }}
            isLoading={createTable.isPending || updateTable.isPending}
          />
        )}
      </Modal>

      <AssignStaffModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        isLoading={isLoadingStaff}
        staff={unassignedStaff}
        selectedEmployees={selectedEmployees}
        onToggle={toggleEmployeeSelection}
        onConfirm={handleConfirmAssignment}
        isSubmitting={assignEmployees.isPending}
      />

      <DeleteTableModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onConfirmDelete}
        tableName={tableToDelete?.tableNumber}
        isDeleting={deleteTable.isPending}
      />
    </div>
  );
}
