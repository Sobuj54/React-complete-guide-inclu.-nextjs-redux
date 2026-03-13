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

  const stats = [
    {
      label: "Total Revenue",
      value: data.totalRevenue.toLocaleString(),
      icon: DollarSign,
      color: "text-white",
      bg: "bg-emerald-500",
    },
    {
      label: "Total Orders",
      value: data.totalOrders,
      icon: ShoppingCart,
      color: "text-white",
      bg: "bg-blue-500",
    },
    {
      label: "Staff Members",
      value: data.totalEmployees,
      icon: Users,
      color: "text-white",
      bg: "bg-purple-500",
    },
    {
      label: "Tables Occupied",
      value: `${data.occupiedTables}/${data.totalTables}`,
      icon: LayoutGrid,
      color: "text-white",
      bg: "bg-orange-600",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 py-5">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 bg-white rounded-md shadow-sm hover:shadow-lg  transition-all group"
          >
            <div
              className={`w-12 h-12 rounded-md ${stat.bg} ${stat.color} flex items-center justify-center mb-4  transition-transform shadow-md`}
            >
              <stat.icon size={24} />
            </div>
            <p className="text-base uppercase font-semibold">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="xl:col-span-2 overflow-hidden shadow-md bg-white/90 rounded-md">
          <div className="p-6 border-b-[1px] border-slate-200 flex items-center justify-between ">
            <h2 className="text-md md:text-lg font-bold">Recent Orders</h2>
            <span className="text-xs font-medium px-3 py-1 bg-blue-400/90 rounded-xs hover:bg-blue-500 text-white/90">
              TODAY : {data.todaysOrders}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-100/80 border-b-[1px] border-b-slate-200">
                  <th className="px-6 py-4 text-sm text-slate-500">Order ID</th>
                  <th className="px-6 py-4 text-sm text-slate-500">Table</th>
                  <th className="px-6 py-4 text-sm text-slate-500">Amount</th>
                  <th className="px-6 py-4 text-sm text-slate-500">Status</th>
                  <th className="px-6 py-4 text-sm text-slate-500">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/80 transition-colors border-b-[1px] border-b-slate-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium truncate max-w-[120px] md:max-w-none">
                      # {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium truncate max-w-[120px]">
                      {order.tableNumber || "Walk-in"}
                    </td>
                    <td className="px-6 py-4 text-sm text-emerald-700 font-medium truncate max-w-[120px]">
                      ৳ {order.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 truncate max-w-[130px]">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          order.orderStatus === "Paid"
                            ? "bg-green-50 text-green-500 border-green-100"
                            : order.orderStatus === "Served"
                              ? "bg-blue-50 text-blue-500 border-blue-100"
                              : "bg-orange-50 text-orange-500 border-orange-100"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium truncate max-w-[120px]">
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
        <div className="bg-white rounded-md  shadow-md">
          <div className="flex items-center justify-between mb-3 bg-slate-50 p-3 md:p-6 border-b-[1px] border-b-slate-200">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-green-500" size={20} />
              <h2 className="text-lg font-bold">Top Sellers</h2>
            </div>
            <Star className="text-orange-400 fill-orange-400" size={18} />
          </div>
          <div className="space-y-2">
            {data.topSellingFoods.map((food, index) => (
              <div
                key={food.id}
                className="flex items-center gap-4 group  hover:bg-slate-50 transition-all border-b-[1px] border-b-slate-200 px-3 md:px-6 pb-3"
              >
                <span className="text-base font-medium text-green-600 w-5">
                  #{index + 1}
                </span>
                <div className="w-12 h-12 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                  <img
                    src={`https://bssrms.runasp.net/images/food/${food.image}`}
                    alt={food.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate  ">
                    {food.name}
                  </h4>
                  <p className="text-sm font-medium text-slate-500 italic">
                    ৳ {food.price.toLocaleString()}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-green-600 capitalize">
                    {food.totalQuantitySold} sold
                  </p>
                  <p className="text-sm font-bold text-slate-500">
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
