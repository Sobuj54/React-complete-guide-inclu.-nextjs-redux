import toast from "react-hot-toast";
import { queryClient } from "../main";
import useAxiosSecure from "./useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

const useDeleteEmployee = () => {
  const axiosSecure = useAxiosSecure();

  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/Employee/delete/${id}`);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });

      toast.success("Employee deleted successfully!", {
        style: { borderRadius: "1rem", fontWeight: "800" },
      });
    },

    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to delete employee";

      toast.error(message);
    },
  });
};

export default useDeleteEmployee;
