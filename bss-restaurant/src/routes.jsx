import { createBrowserRouter } from "react-router";
import LoginRegister from "./pages/login-register/LoginRegister";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/not-found/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRegister />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
