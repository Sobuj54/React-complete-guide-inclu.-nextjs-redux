import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useOrders, useOrderMutations } from "../../hooks/useOrders";
import OrderSkeleton from "../../components/ui/OrderSkeleton";
import OrderCard from "../../components/ui/OrderCard";
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: response, isLoading } = useOrders(filters);
  const { deleteOrder, updateOrder } = useOrderMutations();

  console.log(response);

  // Debounced search logic
  useEffect(() => {
    const delay = setTimeout(
      () => setFilters((p) => ({ ...p, Search: searchInput, Page: 1 })),
      500,
    );
    return () => clearTimeout(delay);
  }, [searchInput]);

  // Industry standard: Close modal on successful mutation
  const handleUpdate = ({ id, payload }) => {
    updateOrder.mutate(
      { id, payload },
      {
        onSuccess: () => {
          setIsEditModalOpen(false); // Modal closes automatically
          setSelectedOrder(null);
        },
      },
    );
  };

  return (
    <div className="p-4 space-y-10">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 uppercase">
          Orders
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <select
              value={filters.Per_Page}
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  Per_Page: Number(e.target.value),
                  Page: 1,
                }))
              }
              className="pl-5 pr-10 py-4 bg-white border-[3px] border-slate-100 rounded-[1.5rem] font-black text-slate-700 appearance-none outline-none focus:border-orange-500"
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
              className="w-full pl-12 pr-4 py-4 bg-white border-[3px] border-slate-100 rounded-[1.5rem] font-bold focus:border-orange-500 outline-none"
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
                onDelete={(id) => deleteOrder.mutate(id)}
                onEdit={(o) => {
                  setSelectedOrder(o);
                  setIsEditModalOpen(true);
                }}
              />
            ))}
          </div>

          <div className="bg-white border-[3px] border-slate-100 rounded-[2.5rem] p-4">
            <Pagination
              currentPage={response?.current_page}
              lastPage={response?.last_page}
              totalEntries={response?.total}
              onPageChange={(p) => setFilters((prev) => ({ ...prev, Page: p }))}
            />
          </div>
        </>
      )}

      <EditOrderModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        order={selectedOrder}
        onUpdate={handleUpdate}
        isSubmitting={updateOrder.isPending}
      />
    </div>
  );
}
