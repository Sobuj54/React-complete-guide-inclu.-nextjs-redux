import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast";
import { queryClient } from "../main";

const toastStyle = {
  borderRadius: "1.5rem",
  fontWeight: "900",
  border: "3px solid #f1f5f9",
};

export const useOrders = (params) => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["orders", params],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/Order/datatable", { params });
      return data;
    },
    placeholderData: (prev) => prev,
  });
};

export const useOrderMutations = () => {
  const axiosSecure = useAxiosSecure();

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/Order/update-status/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order status updated!", { style: toastStyle });
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Error updating status", {
        style: toastStyle,
      }),
  });

  const updateOrder = useMutation({
    mutationFn: ({ id, payload }) =>
      axiosSecure.put(`/Order/update/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order updated!", { style: toastStyle });
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Error updating order", {
        style: toastStyle,
      }),
  });

  const deleteOrder = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/Order/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.error("Order deleted", { style: toastStyle });
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Error deleting order", {
        style: toastStyle,
      }),
  });

  return { updateStatus, deleteOrder, updateOrder };
};
