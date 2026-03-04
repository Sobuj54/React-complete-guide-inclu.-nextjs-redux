import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { queryClient } from "../main";
import toast from "react-hot-toast";

export const useUpdateEmployee = (id) => {
  const axiosSecure = useAxiosSecure();

  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosSecure.put(
        `/Employee/update/${id}`,
        formData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee", id] });
      toast.success("Employee information updated successfully!", {
        style: { borderRadius: "1rem", fontWeight: "800" },
      });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to update employee";
      toast.error(message);
    },
  });
};
