import {
  DollarSign,
  ShoppingCart,
  Users,
  LayoutGrid,
  Star,
  TrendingUp,
} from "lucide-react";
import useDashboardAnalytics from "../../hooks/useDashboardAnalytics";
import DashboardSkeleton from "../../components/ui/DashboardSkeleton";

export default function Dashboard() {
  const { data, isPending, isError } = useDashboardAnalytics();

  if (isPending) return <DashboardSkeleton />;
  if (isError)
    return (
      <div className="p-10 text-red-500 font-black">
        Error loading analytics...
      </div>
    );

  console.log(data);

  const stats = [
    {
      label: "Total Revenue",
      value: data.totalRevenue.toLocaleString(),
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Total Orders",
      value: data.totalOrders,
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Staff Members",
      value: data.totalEmployees,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Tables Info",
      value: `${data.occupiedTables}/${data.totalTables}`,
      icon: LayoutGrid,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
          Dashboard Analytics
        </h1>
        <p className="text-slate-500 font-bold text-sm">
          Real-time performance of BSS Restaurant
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-orange-200 transition-all group"
          >
            <div
              className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {stat.label}
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="xl:col-span-2 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              Recent Orders
            </h2>
            <span className="text-[10px] font-black bg-orange-50 text-orange-600 px-3 py-1 rounded-lg border border-orange-100">
              TODAY: {data.todaysOrders}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-sm font-black uppercase text-slate-400">
                    Order #
                  </th>
                  <th className="px-6 py-4 text-sm font-black uppercase text-slate-400">
                    Table
                  </th>
                  <th className="px-6 py-4 text-sm font-black uppercase text-slate-400">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-sm font-black uppercase text-slate-400 text-center">
                    Status
                  </th>
                  <th className="px-6 py-4 text-sm font-black uppercase text-slate-400">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-bold  truncate max-w-[120px] md:max-w-none">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium ">
                      {order.tableNumber || "Walk-in"}
                    </td>
                    <td className="px-6 py-4 text-sm font-black ">
                      ৳ {order.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${
                          order.orderStatus === "Paid"
                            ? "bg-green-50 text-green-600 border-green-100"
                            : order.orderStatus === "Served"
                              ? "bg-blue-50 text-blue-600 border-blue-100"
                              : "bg-orange-50 text-orange-600 border-orange-100"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold  whitespace-nowrap">
                      {new Date(order.orderTime).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Foods */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-green-500" size={20} />
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                Top Sellers
              </h2>
            </div>
            <Star className="text-orange-400 fill-orange-400" size={18} />
          </div>
          <div className="space-y-5">
            {data.topSellingFoods.map((food, index) => (
              <div
                key={food.id}
                className="flex items-center gap-4 group p-2 rounded-xl hover:bg-slate-50 transition-all"
              >
                <span className="text-sm font-black text-green-600 w-5">
                  #{index + 1}
                </span>
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                  <img
                    src={`https://bssrms.runasp.net/images/food/${food.image}`}
                    alt={food.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-black text-slate-900 truncate uppercase tracking-tighter">
                    {food.name}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 italic">
                    ৳ {food.price.toLocaleString()}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[12px] font-black text-green-600 uppercase">
                    {food.totalQuantitySold} sold
                  </p>
                  <p className="text-sm font-bold text-slate-400">
                    ৳ {(food.totalQuantitySold * food.price).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
