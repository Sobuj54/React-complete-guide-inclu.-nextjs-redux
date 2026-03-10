import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../main";
import useAxiosSecure from "./useAxiosSecure";

const toastStyle = {
  borderRadius: "1.5rem",
  fontWeight: "900",
  border: "3px solid #f1f5f9",
  padding: "16px",
};

export const useOrderData = (selectedTableId) => {
  const axiosSecure = useAxiosSecure();

  // Fetch Tables immediately
  const tablesQuery = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/Table/datatable", {
        params: { Page: 1, Per_Page: 50 },
      });
      return data?.data || [];
    },
  });

  // Fetch Foods ONLY when a table is selected
  const foodsQuery = useQuery({
    queryKey: ["foods", selectedTableId],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/Food/datatable");
      return data?.data || [];
    },
    enabled: !!selectedTableId, // Conditional fetching logic
    staleTime: 60000,
  });

  return { tablesQuery, foodsQuery };
};

export const useOrderMutation = () => {
  const axiosSecure = useAxiosSecure();

  return useMutation({
    mutationFn: (payload) => axiosSecure.post("/Order/create", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order Placed Successfully!", { style: toastStyle });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Order failed", {
        style: toastStyle,
      });
    },
  });
};
