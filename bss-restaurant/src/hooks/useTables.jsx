import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast";

export const useTables = (page = 1, perPage = 10, search = "") => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["tables", page, perPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/Table/datatable", {
        params: { Page: page, Per_Page: perPage, Search: search },
      });
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: 100000,
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
    staleTime: 30000,
  });
};

export const useUnassignedEmployees = (tableId) => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["unassigned-employees", tableId],
    queryFn: async () => {
      if (!tableId) return [];
      const { data } = await axiosSecure.get(
        `/Employee/non-assigned-employees/${tableId}`,
      );
      return data;
    },
    enabled: !!tableId,
  });
};

export const useTableMutations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const createTable = useMutation({
    mutationFn: (payload) => axiosSecure.post("/Table/create", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table added to floor plan!");
    },
  });

  const updateTable = useMutation({
    mutationFn: ({ id, payload }) =>
      axiosSecure.put(`/Table/update/${id}`, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      queryClient.invalidateQueries({ queryKey: ["table", variables.id] });
      toast.success("Table updated!");
    },
  });

  const deleteTable = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/Table/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table removed!");
    },
  });

  const assignEmployees = useMutation({
    mutationFn: (payload) =>
      axiosSecure.post("/EmployeeTable/create-range", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Staff assigned!");
    },
  });

  return { createTable, updateTable, deleteTable, assignEmployees };
};
