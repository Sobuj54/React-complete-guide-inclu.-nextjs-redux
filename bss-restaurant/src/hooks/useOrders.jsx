import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../main";
import useAxiosSecure from "./useAxiosSecure";

export const useOrders = (params) => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["orders", params],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/Order/datatable", { params });
      return data;
    },
  });
};

export const useOrderMutations = () => {
  const axiosSecure = useAxiosSecure();

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.put(`/Order/update-status/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order status updated!");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Error updating status"),
  });

  const updateOrder = useMutation({
    mutationFn: ({ id, payload }) =>
      axiosSecure.put(`/Order/update/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order updated!");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Error updating order"),
  });

  const deleteOrder = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/Order/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order deleted");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Error deleting order"),
  });

  return { updateStatus, deleteOrder, updateOrder };
};
