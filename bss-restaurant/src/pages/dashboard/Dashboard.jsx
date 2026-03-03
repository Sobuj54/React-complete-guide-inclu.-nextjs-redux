import {
  DollarSign,
  ShoppingCart,
  Users,
  LayoutGrid,
  Clock,
  Star,
} from "lucide-react";
import useDashboardAnalytics from "../../hooks/useDashboardAnalytics";
import DashboardSkeleton from "../../components/ui/DashboardSkeleton";

const formatCurrency = (val) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    val,
  );

export default function Dashboard() {
  const { data, isPending, isError } = useDashboardAnalytics();

  if (isPending) return <DashboardSkeleton />;
  if (isError)
    return <div className="p-10 text-red-500">Error loading analytics...</div>;

  const stats = [
    {
      label: "Total Revenue",
      value: formatCurrency(data.totalRevenue),
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
    <>
      <title>BSS Resto | Dashboard</title>
      <meta
        name="description"
        content="Dashboard Analytics of total revenue, orders, staff members and tables."
      />
      <div className="space-y-10 animate-in fade-in duration-700">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900">
            Dashboard Analytics
          </h1>
          <p className="text-slate-500 font-medium">
            Real-time performance of BSS Restaurant
          </p>
        </div>

        {/* 4 Main Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center md:flex md:items-start"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}
              >
                <stat.icon size={24} />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Orders Table - 2/3 Width */}
          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">
                Recent Orders
              </h2>
              <div className="flex gap-2">
                <span className="text-xs font-bold bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                  Today: {data.todaysOrders}
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">
                      Order Info
                    </th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">
                      Amount
                    </th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-8 py-4">
                        <p className="text-sm font-black text-slate-900 truncate max-w-[180px]">
                          {order.orderNumber}
                        </p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock size={12} />{" "}
                          {new Date(order.orderTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </td>
                      <td className="px-8 py-4 text-sm font-bold text-slate-700">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="px-8 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            order.orderStatus === "Paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Selling Foods - 1/3 Width */}
          <div className="bg-white border border-slate-200 rounded-4xl p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Star className="text-orange-500 fill-orange-500" size={20} />
              <h2 className="text-xl font-black text-slate-900">Top Sellers</h2>
            </div>
            <div className="space-y-6">
              {data.topSellingFoods.map((food) => (
                <div key={food.id} className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.target.src =
                          "https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?_gl=1*5lvrk5*_ga*MTEyMzE5NjgyMi4xNzY5MDgyNDM0*_ga_8JE65Q40S6*czE3NzI1MTYyNTAkbzQkZzEkdDE3NzI1MTYyNTUkajU1JGwwJGgw";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black text-slate-900 truncate">
                      {food.name}
                    </h4>
                    <p className="text-xs font-bold text-slate-400">
                      {food.totalQuantitySold} Sold
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-orange-600">
                      {formatCurrency(food.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
