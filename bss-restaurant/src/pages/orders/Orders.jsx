import { useState, useEffect } from "react";
import { Search, ChevronDown, AlertCircle, Loader2 } from "lucide-react";
import { useOrders, useOrderMutations } from "../../hooks/useOrders";
import OrderSkeleton from "../../components/ui/OrderSkeleton";
import OrderCard, { STATUS_CONFIG } from "../../components/ui/OrderCard";
import Pagination from "../../components/Pagination";
import EditOrderModal from "../../components/ui/EditOrderModal";

export default function Orders() {
  const [filters, setFilters] = useState({
    Page: 1,
    Per_Page: 12,
    Search: "",
    Sort: "-createdat",
  });
  const [searchInput, setSearchInput] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [modals, setModals] = useState({
    edit: false,
    status: false,
    delete: false,
  });

  const { data: response, isLoading } = useOrders(filters);
  const { deleteOrder, updateOrder, updateStatus } = useOrderMutations();

  useEffect(() => {
    const delay = setTimeout(
      () => setFilters((p) => ({ ...p, Search: searchInput, Page: 1 })),
      500,
    );
    return () => clearTimeout(delay);
  }, [searchInput]);

  const toggleModal = (type, order = null) => {
    setSelectedOrder(order);
    setModals((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleStatusChange = (newStatus) => {
    updateStatus.mutate(
      { id: selectedOrder.id, status: newStatus },
      { onSuccess: () => toggleModal("status") },
    );
  };

  const confirmDelete = () => {
    deleteOrder.mutate(selectedOrder.id, {
      onSuccess: () => toggleModal("delete"),
    });
  };

  return (
    <div className="p-2 lg:p-4 space-y-10">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <h1 className="text-3xl lg:text-5xl font-black tracking-tighter text-slate-900 uppercase">
          Orders
        </h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative w-full md:w-auto">
            <select
              value={filters.Per_Page}
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  Per_Page: Number(e.target.value),
                  Page: 1,
                }))
              }
              className="pl-5 pr-10 py-4 bg-white border-[3px] border-slate-100 rounded-[1.5rem] font-black appearance-none outline-none focus:border-orange-500 transition-all w-full md:w-auto"
            >
              {[6, 12, 24].map((n) => (
                <option key={n} value={n}>
                  {n} / page
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={18}
            />
          </div>
          <div className="relative flex-1 min-w-[300px]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-[3px] border-slate-100 rounded-[1.5rem] font-bold focus:border-orange-500 outline-none transition-all"
            />
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <OrderSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {response?.data?.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onDelete={() => toggleModal("delete", order)}
                onEdit={() => toggleModal("edit", order)}
                onUpdateStatus={() => toggleModal("status", order)}
              />
            ))}
          </div>
          <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] mt-12 overflow-hidden">
            <Pagination
              currentPage={response?.current_page}
              lastPage={response?.last_page}
              totalEntries={response?.total}
              onPageChange={(p) => setFilters((prev) => ({ ...prev, Page: p }))}
            />
          </div>
        </>
      )}

      {modals.status && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
            onClick={() => toggleModal("status")}
          />
          <div className="relative bg-white border-[6px] border-slate-100 rounded-[3rem] w-full max-w-xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center mb-8">
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-orange-200 mb-4">
                Management
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter">
                Update Status
              </h2>
              <p className="text-slate-400 font-bold text-sm">
                Order #{selectedOrder?.orderNumber}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.keys(STATUS_CONFIG).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`group p-5 rounded-[2rem] border-[3px] transition-all active:scale-95 flex flex-col items-center gap-2 ${
                    selectedOrder?.orderStatus === status
                      ? "border-orange-500 bg-orange-50"
                      : "border-slate-50 hover:border-orange-200 bg-white"
                  }`}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {STATUS_CONFIG[status].icon}
                  </span>
                  <span
                    className={`font-black text-[10px] uppercase tracking-widest ${selectedOrder?.orderStatus === status ? "text-orange-600" : "text-slate-500"}`}
                  >
                    {status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {modals.delete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-red-900/20 backdrop-blur-md"
            onClick={() => toggleModal("delete")}
          />
          <div className="relative bg-white border-[6px] border-slate-100 rounded-[3rem] w-full max-w-md p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center border-4 border-red-100 rotate-3">
                <AlertCircle size={40} strokeWidth={3} />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black uppercase tracking-tighter">
                  Are you sure?
                </h3>
                <p className="text-slate-400 font-bold text-sm">
                  You are deleting order{" "}
                  <span className="text-red-500 font-black">
                    #{selectedOrder?.orderNumber}
                  </span>
                  . This is permanent.
                </p>
              </div>
              <div className="flex flex-col w-full gap-3 pt-4">
                <button
                  onClick={confirmDelete}
                  className="w-full py-5 bg-red-500 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-red-600 shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {deleteOrder.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Yes, Delete Order"
                  )}
                </button>
                <button
                  onClick={() => toggleModal("delete")}
                  className="w-full py-5 bg-slate-100 text-slate-500 font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <EditOrderModal
        isOpen={modals.edit}
        onClose={() => toggleModal("edit")}
        order={selectedOrder}
        onUpdate={({ id, payload }) =>
          updateOrder.mutate(
            { id, payload },
            { onSuccess: () => toggleModal("edit") },
          )
        }
        isSubmitting={updateOrder.isPending}
      />
    </div>
  );
}
