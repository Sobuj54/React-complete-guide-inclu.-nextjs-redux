import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { queryClient } from "../main";
import toast from "react-hot-toast";

export const useTables = (page = 1, perPage = 10, search = "") => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["tables", page, perPage, search],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/Table/datatable", {
        params: { Page: page, Per_Page: perPage, Search: search },
      });
      return data;
    },
    keepPreviousData: true,
    staleTime: 1000,
  });
};

export const useTable = (id) => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["table", id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await axiosSecure.get(`/Table/get/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useTableMutations = () => {
  const axiosSecure = useAxiosSecure();

  const createMutation = useMutation({
    mutationFn: (payload) => axiosSecure.post("/Table/create", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table created successfully!", {
        style: { borderRadius: "1rem", fontWeight: "800" },
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) =>
      axiosSecure.put(`/Table/update/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      queryClient.invalidateQueries({ queryKey: ["table"] });
      toast.success("Table updated successfully!", {
        style: { borderRadius: "1rem", fontWeight: "800" },
      });
    },
  });

  return { createTable: createMutation, updateTable: updateMutation };
};
