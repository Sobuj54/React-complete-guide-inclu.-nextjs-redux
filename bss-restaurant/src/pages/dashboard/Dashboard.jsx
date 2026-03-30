import {
  DollarSign,
  ShoppingCart,
  Users,
  LayoutGrid,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  useTheme,
} from "@mui/material";
import useDashboardAnalytics from "../../hooks/useDashboardAnalytics";
import DashboardSkeleton from "../../components/ui/DashboardSkeleton";

export default function Dashboard() {
  const theme = useTheme();
  const { data, isPending, isError } = useDashboardAnalytics();

  if (isPending) return <DashboardSkeleton />;
  if (isError)
    return (
      <Box sx={{ p: 10, color: "error.main", fontWeight: 900 }}>
        Error loading analytics...
      </Box>
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
    <Box className="space-y-10 animate-in fade-in duration-700">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 bg-white rounded-md shadow-sm hover:shadow-lg transition-all group"
          >
            <div
              className={`w-12 h-12 rounded-md ${stat.bg} ${stat.color} flex items-center justify-center mb-4 transition-transform shadow-md`}
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
        <Box className="xl:col-span-2 overflow-hidden shadow-md bg-white/90 rounded-md">
          <Box className="p-6 border-b-[1px] border-slate-200 flex items-center justify-between">
            <h2 className="text-md md:text-lg font-bold">Recent Orders</h2>
            <span className="text-xs font-medium px-3 py-1 bg-blue-400/90 rounded-xs text-white/90">
              TODAY : {data.todaysOrders}
            </span>
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 600 }}>
              <TableHead
                sx={{ bgcolor: "slate.100" }}
                className="bg-slate-100/80"
              >
                <TableRow>
                  <TableCell sx={{ py: 1.5 }}>Order ID</TableCell>
                  <TableCell sx={{ py: 1.5 }}>Table</TableCell>
                  <TableCell sx={{ py: 1.5 }}>Amount</TableCell>
                  <TableCell sx={{ py: 1.5 }}>Status</TableCell>
                  <TableCell sx={{ py: 1.5 }}>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.recentOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    hover
                    sx={{ "&:last-child td": { border: 0 }, py: 0 }}
                  >
                    <TableCell
                      className="truncate max-w-20 md:max-w-full"
                      sx={{ py: 1.5 }}
                    >
                      # {order.orderNumber}
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      {order.tableNumber || "Walk-in"}
                    </TableCell>
                    <TableCell sx={{ color: "success.dark", py: 1.5 }}>
                      ৳ {order.amount.toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Chip
                        label={order.orderStatus}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderRadius: "5px",
                          bgcolor:
                            order.orderStatus === "Paid"
                              ? "success.lighter"
                              : order.orderStatus === "Served"
                                ? "primary.lighter"
                                : "warning.lighter",
                          color:
                            order.orderStatus === "Paid"
                              ? "success.main"
                              : order.orderStatus === "Served"
                                ? "primary.main"
                                : "warning.main",
                          borderColor: "transparent",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      {new Date(order.orderTime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Top Selling Foods */}
        <Box className="bg-white rounded-[5px] shadow-md overflow-hidden">
          <Box className="flex items-center justify-between mb-0 bg-slate-50 p-3 md:p-6 border-b-[1px] border-b-slate-200 rouned-t-[5px]">
            <Box className="flex items-center gap-2">
              <TrendingUp className="text-green-500" size={20} />
              <h2 className="text-lg font-bold">Top Sellers</h2>
            </Box>
            <Star className="text-orange-400 fill-orange-400" size={18} />
          </Box>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {data.topSellingFoods.map((food, index) => (
                  <TableRow
                    key={food.id}
                    hover
                    sx={{ "&:last-child td": { border: 0 } }}
                  >
                    <TableCell
                      sx={{ width: 40, fontWeight: 700, color: "success.main" }}
                    >
                      #{index + 1}
                    </TableCell>
                    <TableCell sx={{ width: 60 }}>
                      <Avatar
                        variant="rounded"
                        src={`${import.meta.env.VITE_IMG_URL}/images/food/${food.image}`}
                        sx={{ width: 45, height: 45, borderRadius: "5px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {food.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontStyle: "italic" }}
                      >
                        ৳ {food.price.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 800, color: "success.main" }}
                      >
                        {food.totalQuantitySold} sold
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 700, color: "text.secondary" }}
                      >
                        ৳{" "}
                        {(food.totalQuantitySold * food.price).toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </Box>
  );
}
