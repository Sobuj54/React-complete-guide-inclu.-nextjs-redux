import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "./useAxiosSecure";
import { queryClient } from "../main";

const toastStyle = {
  borderRadius: "1.5rem",
  fontWeight: "900",
  border: "3px solid #f1f5f9",
  padding: "16px",
};

export const useFoods = (page = 1, perPage = 10, search = "") => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["foods", page, perPage, search],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/Food/datatable", {
        params: { Page: page, Per_Page: perPage, Search: search },
      });
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useFood = (id) => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["food", id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await axiosSecure.get(`/Food/get/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useFoodMutations = (id) => {
  const axiosSecure = useAxiosSecure();

  const createFood = useMutation({
    mutationFn: (payload) => axiosSecure.post("/Food/create", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      toast.success("Food added successfully!", { style: toastStyle });
    },
  });

  const updateFood = useMutation({
    mutationFn: (payload) => axiosSecure.put(`/Food/update/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      queryClient.invalidateQueries({ queryKey: ["food", id] });
      toast.success("Food updated successfully!", { style: toastStyle });
    },
  });

  const deleteFood = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/Food/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      toast.success("Food removed!", { style: toastStyle });
    },
  });

  return { createFood, updateFood, deleteFood };
};
