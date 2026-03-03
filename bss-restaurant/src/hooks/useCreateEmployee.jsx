import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { queryClient } from "../main";
import toast from "react-hot-toast";

const useCreateEmployee = () => {
  const axiosSecure = useAxiosSecure();

  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosSecure.post("/Employee/create", formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee created successfully!", {
        style: { borderRadius: "1rem", fontWeight: "800" },
      });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to create employee";
      console.log(error);
      console.log(message);
      toast.error(message);
    },
  });
};

export default useCreateEmployee;
