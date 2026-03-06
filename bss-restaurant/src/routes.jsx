import { createBrowserRouter } from "react-router";
import LoginRegister from "./pages/login-register/LoginRegister";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/not-found/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Employees from "./pages/employees/Employees";
import TablesPage from "./pages/tables/Tables";
import OrdersPage from "./pages/orders/Orders";
import NewOrderPage from "./pages/new-order/NewOrder";
import FoodsPage from "./pages/foods/Foods";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRegister />,
    errorElement: <NotFound />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "tables",
        element: <TablesPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "new-order",
        element: <NewOrderPage />,
      },
      {
        path: "foods",
        element: <FoodsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
