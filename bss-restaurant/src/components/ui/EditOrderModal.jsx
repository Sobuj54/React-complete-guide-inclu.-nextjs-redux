import { useState, useEffect, useMemo } from "react";
import { Trash2, ShoppingBag, Loader2 } from "lucide-react";
import Modal from "./Modal";

export default function EditOrderModal({
  isOpen,
  onClose,
  order,
  onUpdate,
  isSubmitting,
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [items, setItems] = useState([]);

  // Sync state when modal opens
  useEffect(() => {
    if (order && isOpen) {
      setPhoneNumber(order.orderedBy?.phoneNumber || "");
      setItems(order.orderItems || []);
    }
  }, [order, isOpen]);

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  );

  const handleQtyChange = (index, val) => {
    const updatedItems = [...items];
    const newQty = Math.max(1, Number(val));
    updatedItems[index] = {
      ...updatedItems[index],
      quantity: newQty,
      totalPrice: newQty * updatedItems[index].unitPrice,
    };
    setItems(updatedItems);
  };

  const removeOrderItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (items.length === 0) return;

    const payload = {
      tableId: order.table?.tableId || 0,
      orderNumber: order.orderNumber,
      amount: totalAmount,
      phoneNumber: phoneNumber,
      items: items.map((item) => ({
        foodId: item.food?.id || item.foodId,
        foodPackageId: item.foodPackageId || 0,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.quantity * item.unitPrice,
      })),
    };
    onUpdate({ id: order.id, payload });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Order: ${order?.orderNumber}`}
      style="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Header Info */}
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-slate-50 rounded">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">
              Table Number
            </p>
            <p className="font-black text-slate-900">
              {order?.table?.tableNumber || "N/A"}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 px-2">
              Customer Phone
            </label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-4 bg-white border-2 border-slate-100 rounded-[1.5rem] font-black focus:border-orange-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <ShoppingBag size={18} className="text-orange-500" />
            <h4 className="font-black text-slate-900 uppercase text-sm">
              Order Items ({items.length})
            </h4>
          </div>

          <div className="border-[3px] border-slate-100 rounded-[2.5rem] overflow-hidden bg-white">
            <div className="max-h-[350px] overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {items.length > 0 ? (
                items.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="group flex items-center gap-4 p-4 bg-slate-50 rounded-[2rem] border-2 border-transparent hover:border-slate-200 transition-all"
                  >
                    <div className="w-24 h-18 bg-white border-2 border-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={`https://bssrms.runasp.net/images/food/${item.food?.imageUrl}`}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://images.pexels.com/photos/247685/pexels-photo-247685.png";
                        }}
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-black text-slate-900 leading-tight">
                        {item.food?.name || "Unknown Item"}
                      </p>
                      <p className="text-xs font-bold text-slate-400">
                        {item.unitPrice} ৳ / unit
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] font-black text-slate-400 uppercase mb-1">
                          Qty
                        </span>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQtyChange(idx, e.target.value)}
                          className="w-14 p-2 text-center font-black bg-white border-2 border-slate-200 rounded-xl focus:border-orange-500 outline-none"
                        />
                      </div>
                      <div className="text-right min-w-[80px]">
                        <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                          Subtotal
                        </p>
                        <p className="font-black text-slate-900">
                          {item.quantity * item.unitPrice} ৳
                        </p>
                      </div>
                      <button
                        onClick={() => removeOrderItem(idx)}
                        className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all cursor-pointer"
                      >
                        <Trash2 size={20} color="red" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center font-bold text-slate-400 italic">
                  No items in order
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Total Summary */}
        <div className="bg-slate-600 p-6 rounded-[2rem] flex justify-between items-center shadow-xl shadow-slate-200">
          <span className="text-sm font-black uppercase tracking-widest text-slate-400">
            Total Payable:
          </span>
          <span className="text-3xl font-black text-orange-400">
            {totalAmount.toLocaleString()} ৳
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={onClose}
            type="button"
            className="flex-1 py-4 font-black text-slate-400 uppercase tracking-widest text-[11px] hover:text-slate-600 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || items.length === 0}
            className={`flex-[2] py-4 bg-orange-500 text-white font-black rounded-[1.5rem] hover:bg-orange-600 active:scale-95 transition-all shadow-lg shadow-orange-100 disabled:opacity-50 flex items-center justify-center gap-2 ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Update Order"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
