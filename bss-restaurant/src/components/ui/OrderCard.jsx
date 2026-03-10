import {
  Clock,
  Hash,
  Trash2,
  Edit3,
  ChevronRight,
  Loader2,
  ShoppingBag,
  User,
  Coffee,
} from "lucide-react";
import { useOrderMutations } from "../../hooks/useOrders";

export const STATUS_CONFIG = {
  Pending: {
    color: "bg-amber-100 text-amber-600 border-amber-200",
    icon: "⏳",
  },
  Confirmed: { color: "bg-blue-100 text-blue-600 border-blue-200", icon: "✅" },
  Preparing: {
    color: "bg-indigo-100 text-indigo-600 border-indigo-200",
    icon: "👨‍🍳",
  },
  PreparedToServe: {
    color: "bg-purple-100 text-purple-600 border-purple-200",
    icon: "🔔",
  },
  Served: { color: "bg-teal-100 text-teal-600 border-teal-200", icon: "🍽️" },
  Paid: {
    color: "bg-emerald-100 text-emerald-600 border-emerald-200",
    icon: "💰",
  },
  Cancelled: { color: "bg-red-100 text-red-600 border-red-200", icon: "❌" },
};

export default function OrderCard({ order, onUpdateStatus, onDelete, onEdit }) {
  const config = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG.Pending;
  const { updateStatus } = useOrderMutations();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(order.orderTime));

  return (
    <div className="group bg-white border-[3px] border-slate-100 rounded-[2.5rem] p-3 md:p-6 transition-all hover:shadow-2xl hover:shadow-orange-100/50 flex flex-col h-full shadow-xl">
      <div className="flex justify-between items-start mb-5">
        <div
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full border-2 font-black text-[10px] uppercase tracking-tighter ${config.color}`}
        >
          {updateStatus.isPending ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            config.icon
          )}
          {order.orderStatus}
        </div>
        <button
          onClick={onDelete}
          className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="mb-6 flex  items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400 font-bold text-sm uppercase tracking-widest">
          <Hash size={12} /> {order.orderNumber}
        </div>
        <div className="flex items-center gap-2 text-slate-400 font-black text-sm tracking-wide bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
          <Clock size={12} /> {formattedDate}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border-2 border-transparent group-hover:bg-white group-hover:border-slate-100 transition-all">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Coffee size={18} />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase">
              Table
            </p>
            <p className="font-black text-slate-900 leading-none">
              {order.table?.tableNumber || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border-2 border-transparent group-hover:bg-white group-hover:border-slate-100 transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <User size={18} />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase">
              Customer
            </p>
            <p className="font-black text-slate-900 leading-none truncate w-20">
              {order.orderedBy?.fullName !== "Unknown"
                ? order.orderedBy?.fullName
                : "Guest"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 mb-8">
        <div className="flex items-center gap-2 px-1">
          <ShoppingBag size={18} className="text-orange-500" />
          <span className="text-base font-black uppercase text-slate-400 tracking-widest">
            Items ({order.orderItems?.length})
          </span>
        </div>
        <div className="space-y-2 max-h-[180px] overflow-y-auto pr-2 no-scrollbar">
          {order.orderItems?.map((item, idx) => (
            <div
              key={item.id || idx}
              className="flex items-center gap-3 p-2 bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-200 transition-colors"
            >
              <div className="w-15 h-15 rounded-lg bg-white overflow-hidden border border-slate-100 flex-shrink-0">
                <img
                  src={`https://bssrms.runasp.net/images/food/${item.food?.image}`}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.target.src =
                      "https://images.pexels.com/photos/247685/pexels-photo-247685.png")
                  }
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-black text-slate-800 truncate leading-tight">
                  {item.food?.name}
                </p>
                <p className="text-base font-bold text-slate-400">
                  {item.quantity} x {item.unitPrice} ৳
                </p>
              </div>
              <div className="text-right font-black text-slate-900">
                {item.totalPrice} ৳
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t-2 border-slate-50 border-dashed">
          <h3 className="font-black flex justify-between text-slate-900 text-xl tracking-tighter">
            <span>Total Amount:</span>{" "}
            <span>{order.amount?.toLocaleString()} ৳</span>
          </h3>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-3">
        <button
          onClick={onEdit}
          className="flex items-center justify-center gap-2 py-4 font-black text-[11px] uppercase tracking-widest text-slate-600 bg-white border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
        >
          <Edit3 size={16} /> Edit
        </button>
        <button
          onClick={onUpdateStatus}
          className="flex items-center justify-center gap-2 py-4 font-black text-[11px] uppercase tracking-widest text-white bg-orange-500 rounded-2xl hover:bg-orange-600 shadow-lg shadow-orange-100 transition-all active:scale-95"
        >
          Status <ChevronRight size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
