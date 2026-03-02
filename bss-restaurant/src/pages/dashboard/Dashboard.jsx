import React from "react";
import {
  ShoppingBag,
  Users2,
  Table as TableIcon,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Clock,
} from "lucide-react";

const stats = [
  {
    label: "Today's Orders",
    value: "154",
    icon: ShoppingBag,
    color: "text-blue-600",
    bg: "bg-blue-50",
    trend: "+14%",
  },
  {
    label: "Total Tables",
    value: "32",
    icon: TableIcon,
    color: "text-purple-600",
    bg: "bg-purple-50",
    trend: "8 Active",
  },
  {
    label: "Tables Occupied",
    value: "21",
    icon: CheckCircle2,
    color: "text-orange-600",
    bg: "bg-orange-50",
    trend: "65% Rate",
  },
  {
    label: "Staff On Duty",
    value: "09",
    icon: Users2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    trend: "Full Team",
  },
];

const recentOrders = [
  {
    id: "#BSS-8821",
    table: "T-04",
    customer: "John Doe",
    total: "$45.20",
    status: "Preparing",
    time: "2 min ago",
  },
  {
    id: "#BSS-8820",
    table: "T-12",
    customer: "Sarah K.",
    total: "$12.50",
    status: "Served",
    time: "8 min ago",
  },
  {
    id: "#BSS-8819",
    table: "T-02",
    customer: "Mike Ross",
    total: "$89.00",
    status: "Pending",
    time: "15 min ago",
  },
  {
    id: "#BSS-8818",
    table: "T-09",
    customer: "Emily W.",
    total: "$34.10",
    status: "Served",
    time: "22 min ago",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-10 duration-700 animate-in fade-in slide-in-from-bottom-4">
      {/* Header Info */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Main Analytics
        </h1>
        <p className="font-medium text-slate-500">
          BSS Restaurant performance overview for today.
        </p>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color} transition-colors group-hover:bg-slate-900 group-hover:text-white`}
              >
                <stat.icon size={26} />
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-black uppercase tracking-wider">
                <ArrowUpRight size={14} />
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="mb-1 text-sm font-bold tracking-widest uppercase text-slate-400">
                {stat.label}
              </p>
              <h3 className="text-4xl font-black tracking-tighter text-slate-900">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section: Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {/* Orders Table */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-8 border-b border-slate-50">
            <h2 className="text-xl font-black text-slate-900">Live Orders</h2>
            <button className="px-5 py-2 text-sm font-bold text-orange-600 transition-colors hover:bg-orange-50 rounded-xl">
              Refresh List
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
                    Order
                  </th>
                  <th className="px-8 py-4 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
                    Table
                  </th>
                  <th className="px-8 py-4 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
                    Total
                  </th>
                  <th className="px-8 py-4 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors cursor-pointer hover:bg-slate-50/80 group"
                  >
                    <td className="px-8 py-5">
                      <p className="text-sm font-black text-slate-900">
                        {order.id}
                      </p>
                      <p className="flex items-center gap-1 text-xs font-medium text-slate-400">
                        <Clock size={12} /> {order.time}
                      </p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-100 text-slate-700">
                        {order.table}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-slate-900">
                      {order.total}
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span
                        className={`inline-block w-24 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                          order.status === "Served"
                            ? "bg-emerald-100 text-emerald-700"
                            : order.status === "Preparing"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel: System Health / Quick Action */}
        <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-between shadow-2xl shadow-slate-300">
          <div>
            <h2 className="mb-2 text-xl font-black">Kitchen Status</h2>
            <p className="mb-8 text-sm font-medium text-slate-400">
              System is operating at peak efficiency.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-sm font-bold">Printers: Online</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-sm font-bold">KDS Sync: Active</p>
              </div>
            </div>
          </div>

          <button className="w-full py-4 font-black transition-all transform bg-orange-600 shadow-lg hover:bg-orange-700 rounded-2xl active:scale-95 shadow-orange-900/20">
            Create New Order
          </button>
        </div>
      </div>
    </div>
  );
}
