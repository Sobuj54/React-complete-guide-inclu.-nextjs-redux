import { Loader2 } from "lucide-react";
import Modal from "./Modal";
import { useOrderMutations } from "../../hooks/useOrders";

const STATUS_OPTIONS = [
  "Pending",
  "Confirmed",
  "Preparing",
  "PreparedToServe",
  "Served",
  "Paid",
  "Cancelled",
];

export default function UpdateStatusModal({ isOpen, onClose, order }) {
  const { updateStatus } = useOrderMutations();

  const handleUpdate = (newStatus) => {
    updateStatus.mutate(
      { id: order.id, status: newStatus },
      {
        onSuccess: () => onClose(), // Close modal on success
      },
    );
  };

  if (!order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Order Status"
      style="max-w-md"
    >
      <div className="grid grid-cols-1 gap-3 p-2">
        {STATUS_OPTIONS.map((status) => {
          const config = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
          const isCurrent = order.orderStatus === status;

          return (
            <button
              key={status}
              disabled={updateStatus.isPending}
              onClick={() => handleUpdate(status)}
              className={`flex items-center justify-between p-4 rounded-[1.5rem] border-2 transition-all font-black uppercase text-xs tracking-widest cursor-pointer active:scale-95 ${
                isCurrent
                  ? "border-orange-500 bg-orange-50 text-orange-600"
                  : "border-slate-100 bg-white hover:border-slate-300 text-slate-500"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{config.icon}</span>
                {status}
              </div>

              {updateStatus.isPending && (
                <Loader2 size={16} className="animate-spin" />
              )}
              {isCurrent && !updateStatus.isPending && (
                <span className="text-[10px] bg-orange-500 text-white px-2 py-1 rounded-lg">
                  Current
                </span>
              )}
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
