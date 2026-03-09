import { useState, useEffect, useMemo, useRef } from "react";
import { Trash2, Loader2, Plus, Search, ChevronDown } from "lucide-react";
import Modal from "./Modal";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function EditOrderModal({
  isOpen,
  onClose,
  order,
  onUpdate,
  isSubmitting,
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [items, setItems] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (isOpen) {
      const fetchFood = async () => {
        try {
          const { data } = await axiosSecure.get("/Food/datatable");
          setFoodItems(data.data || []);
        } catch (error) {
          console.error(error);
        }
      };
      fetchFood();
    }
  }, [isOpen, axiosSecure]);

  useEffect(() => {
    if (order && isOpen) {
      setPhoneNumber(order.orderedBy?.phoneNumber || "");
      setItems(order.orderItems || []);
    }
  }, [order, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  );

  const filteredFood = foodItems.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddItem = (foodToAdd) => {
    const existingIndex = items.findIndex(
      (item) => (item.food?.id || item.foodId) === foodToAdd.id,
    );

    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += 1;
      updated[existingIndex].totalPrice =
        updated[existingIndex].quantity * updated[existingIndex].unitPrice;
      setItems(updated);
    } else {
      setItems([
        {
          foodId: foodToAdd.id,
          food: {
            id: foodToAdd.id,
            name: foodToAdd.name,
            imageUrl: foodToAdd.image,
          },
          quantity: 1,
          unitPrice: foodToAdd.price,
          totalPrice: foodToAdd.price,
        },
        ...items,
      ]);
    }
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const handleQtyChange = (index, val) => {
    const updated = [...items];
    const newQty = Math.max(1, Number(val));
    updated[index] = {
      ...updated[index],
      quantity: newQty,
      totalPrice: newQty * updated[index].unitPrice,
    };
    setItems(updated);
  };

  const handleSubmit = () => {
    if (items.length === 0) return;
    const payload = {
      tableId: order.table?.tableId || order.tableId || 0,
      orderNumber: order.orderNumber,
      amount: totalAmount,
      phoneNumber,
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
      style="max-w-2xl"
    >
      <div className="space-y-5 p-1">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 border-2 border-slate-100 rounded-[1.2rem]">
            <p className="text-[9px] font-black uppercase text-slate-400 mb-0.5 px-1">
              Table
            </p>
            <p className="font-black text-slate-800 text-sm px-1">
              {order?.table?.tableNumber || "Walk-in"}
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-400 px-2">
              Phone
            </label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2.5 bg-white border-2 border-slate-100 rounded-[1.2rem] font-bold text-sm focus:border-orange-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <label className="text-[9px] font-black uppercase text-slate-400 px-2 mb-1 block">
            Add Food Item
          </label>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between p-3 bg-white border-[3px] border-slate-100 rounded-[1.5rem] cursor-pointer hover:border-orange-200 transition-all"
          >
            <div className="flex items-center gap-2 text-slate-400">
              <Search size={16} />
              <span className="font-bold text-sm">Search and add food...</span>
            </div>
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute z-50 mt-2 w-full bg-white border-[3px] border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b-2 border-slate-50">
                <input
                  autoFocus
                  placeholder="Type food name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 bg-slate-50 rounded-xl outline-none font-bold text-sm px-4"
                />
              </div>
              <div className="max-h-60 overflow-y-auto custom-scrollbar">
                {filteredFood.length > 0 ? (
                  filteredFood.map((food) => (
                    <div
                      key={food.id}
                      onClick={() => handleAddItem(food)}
                      className="flex items-center gap-3 p-3 hover:bg-orange-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                    >
                      <img
                        src={`https://bssrms.runasp.net/images/food/${food.image}`}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                        alt=""
                        onError={(e) =>
                          (e.target.src =
                            "https://images.pexels.com/photos/247685/pexels-photo-247685.png")
                        }
                      />
                      <div className="flex-1">
                        <p className="font-black text-slate-800 text-xs uppercase">
                          {food.name}
                        </p>
                        <p className="text-[10px] font-bold text-orange-500">
                          {food.price} ৳
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <Plus size={14} strokeWidth={4} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs font-bold text-slate-400">
                    No food items found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-[3px] border-slate-50 rounded-[2rem] overflow-hidden bg-white">
          <div className="max-h-[280px] overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-[1.5rem] border-2 border-transparent hover:border-slate-100 transition-all"
              >
                <img
                  src={`https://bssrms.runasp.net/images/food/${item.food?.imageUrl || item.food?.image}`}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  alt=""
                  onError={(e) =>
                    (e.target.src =
                      "https://images.pexels.com/photos/247685/pexels-photo-247685.png")
                  }
                />
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-800 text-sm truncate uppercase">
                    {item.food?.name}
                  </p>
                  <p className="text-xs font-bold text-slate-400">
                    {item.unitPrice} ৳
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQtyChange(idx, e.target.value)}
                    className="w-12 p-1.5 text-center font-black bg-white border-2 border-slate-200 rounded-lg text-xs focus:border-orange-500 outline-none"
                  />
                  <div className="text-right min-w-[60px]">
                    <p className="font-black text-slate-800 text-sm">
                      {item.quantity * item.unitPrice} ৳
                    </p>
                  </div>
                  <button
                    onClick={() => setItems(items.filter((_, i) => i !== idx))}
                    className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-[1.8rem] flex justify-between items-center border-b-4 border-orange-500">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Total
          </span>
          <span className="text-xl font-black text-orange-400">
            {totalAmount.toLocaleString()} ৳
          </span>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 font-black text-slate-400 uppercase text-[10px] hover:bg-slate-50 rounded-2xl transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || items.length === 0}
            className="flex-[2] py-3.5 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 active:scale-95 transition-all shadow-lg shadow-orange-100 disabled:opacity-50 flex items-center justify-center gap-2 text-xs uppercase tracking-tight cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Update Order"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
