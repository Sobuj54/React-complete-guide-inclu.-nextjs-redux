import { Utensils, Plus } from "lucide-react";
import OrderSkeleton from "./OrderSkeleton";

export default function FoodMenu({
  selectedTable,
  foodsQuery,
  searchTerm,
  handleAddToCart,
}) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <h2 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">
        Menu {selectedTable && `— ${selectedTable.tableNumber}`}
      </h2>
      <div className="flex-1 overflow-y-auto pr-2 no-scrollbar pb-10">
        {!selectedTable ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-300 bg-white rounded-[3.5rem] border-4 border-dashed border-slate-100">
            <Utensils size={64} className="mb-6 opacity-10" />
            <p className="font-black uppercase tracking-[0.3em] text-sm text-center">
              Please select a table
              <br />
              to browse the menu
            </p>
          </div>
        ) : foodsQuery.isLoading ? (
          <OrderSkeleton />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {foodsQuery.data
              ?.filter((f) =>
                f.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((food) => (
                <div
                  key={food.id}
                  className="bg-white p-5 rounded-[2.8rem] border-[3px] border-white hover:border-green-100 transition-all group flex items-center justify-center gap-6 shadow-sm"
                >
                  <div className="w-28 h-28 rounded-[2.2rem] overflow-hidden border-2 border-slate-50 flex-shrink-0">
                    <img
                      src={`https://bssrms.runasp.net/images/food/${food.image}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={food.name}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-slate-800 text-sm uppercase mb-1">
                      {food.name}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-4 line-clamp-1">
                      {food.description || "Freshly Cooked"}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-black text-green-600">
                        {food.price}৳
                      </p>
                      <button
                        onClick={() => handleAddToCart(food)}
                        className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-2xl transition-all active:scale-90"
                      >
                        <Plus size={20} strokeWidth={3} /> Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
