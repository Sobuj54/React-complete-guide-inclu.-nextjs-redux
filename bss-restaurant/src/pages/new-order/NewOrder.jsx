import { useState } from "react";
import {
  Search,
  ShoppingCart,
  X,
  Loader2,
  Utensils,
  ShoppingBasket,
  Trash2,
} from "lucide-react";
import { useOrderData, useOrderMutation } from "../../hooks/useNewOrder";
import TableSelection from "../../components/ui/TableSelection";
import FoodMenu from "../../components/ui/FoodMenu";

export default function NewOrderPage() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { tablesQuery, foodsQuery } = useOrderData(selectedTable?.id);
  const orderMutation = useOrderMutation();

  const handleAddToCart = (food) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.foodId === food.id);
      if (existing) {
        return prev.map((item) =>
          item.foodId === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * food.price,
              }
            : item,
        );
      }
      return [
        ...prev,
        {
          foodId: food.id,
          name: food.name,
          image: food.image,
          unitPrice: food.price,
          quantity: 1,
          totalPrice: food.price,
          foodPackageId: 0,
        },
      ];
    });
  };

  const removeFromCart = (id) =>
    setCart(cart.filter((item) => item.foodId !== id));

  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = () => {
    const payload = {
      tableId: selectedTable.id,
      orderNumber: `ORD-${Date.now()}`,
      amount: totalAmount,
      phoneNumber: phone,
      items: cart.map(({ name, image, ...rest }) => rest),
    };
    orderMutation.mutate(payload, {
      onSuccess: () => {
        setCart([]);
        setSelectedTable(null);
        setIsDrawerOpen(false);
        setPhone("");
      },
    });
  };

  return (
    <div className="h-screen bg-[#f8fafc] p-4 lg:p-8 font-sans overflow-hidden flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500 rounded-2xl shadow-lg shadow-green-100 text-white">
            <Utensils size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              BSS Resto
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              New Order Terminal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Global Search Input */}
          <div className="relative flex-1 md:w-80">
            <input
              type="text"
              placeholder="Search Food..."
              className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3 px-4 pl-12 font-bold text-sm focus:border-green-500 outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-4 top-3.5 text-slate-300"
              size={18}
            />
          </div>

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative p-3.5 bg-white border-2 border-slate-100 rounded-2xl text-slate-600 hover:border-green-500 transition-all shadow-sm"
          >
            <ShoppingBasket size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-4 border-[#f8fafc]">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        <TableSelection
          tablesQuery={tablesQuery}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
        />
        <FoodMenu
          selectedTable={selectedTable}
          foodsQuery={foodsQuery}
          searchTerm={searchTerm}
          handleAddToCart={handleAddToCart}
        />
      </div>

      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${isDrawerOpen ? "visible" : "invisible"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${isDrawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsDrawerOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"} flex flex-col border-l-8 border-green-500 rounded-l-[3rem]`}
        >
          {/* Drawer Header */}
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-xl text-green-600">
                <ShoppingCart size={24} />
              </div>
              <h2 className="font-black uppercase text-xl text-slate-800">
                Your Cart
              </h2>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-full transition-colors"
            >
              <X size={24} className="text-slate-400" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-8 space-y-4 no-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-20 text-slate-400">
                <ShoppingBasket size={80} className="mb-4" />
                <p className="font-black text-2xl uppercase">Empty Cart</p>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-slate-50 p-4 rounded-[2rem] border-2 border-slate-100"
                >
                  <img
                    src={`https://bssrms.runasp.net/images/food/${item.image}`}
                    className="w-16 h-16 rounded-2xl object-cover"
                    alt={item.name}
                  />
                  <div className="flex-1">
                    <p className="font-black text-slate-800 text-xs uppercase">
                      {item.name}
                    </p>
                    <p className="text-[10px] font-black text-slate-400 uppercase mt-1">
                      Qty: {item.quantity} x {item.unitPrice}৳
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-800 text-sm mb-1">
                      {item.totalPrice}৳
                    </p>
                    <button
                      onClick={() => removeFromCart(item.foodId)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Checkout */}
          <div className="p-10 bg-white border-t-4 border-slate-50 space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">
                Customer Phone
              </label>
              <input
                type="text"
                placeholder="01XXX-XXXXXX"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 font-bold text-sm focus:border-green-500 outline-none transition-all shadow-inner"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="font-black text-slate-400 uppercase text-xs">
                Total Payable:
              </p>
              <p className="font-black text-4xl text-green-600 tracking-tighter">
                {totalAmount}৳
              </p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={cart.length === 0 || orderMutation.isLoading}
              className="w-full bg-slate-900 hover:bg-green-600 py-5 rounded-[2rem] text-white font-black uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl disabled:bg-slate-200"
            >
              {orderMutation.isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Confirm Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
