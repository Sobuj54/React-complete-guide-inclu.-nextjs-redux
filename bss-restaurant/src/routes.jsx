import { createBrowserRouter } from "react-router";
import LoginRegister from "./pages/login-register/LoginRegister";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/not-found/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Employees from "./pages/dashboard/Employees";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRegister />,
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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
