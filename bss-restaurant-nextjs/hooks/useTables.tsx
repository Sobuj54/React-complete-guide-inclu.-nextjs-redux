"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getTablesAction,
  createTableAction,
  updateTableAction,
  deleteTableAction,
  assignEmployeesAction,
  getUnassignedEmployeesAction,
  getTableDetailsAction,
} from "@/actions/table-actions";
import { TableForm } from "@/lib/validation/tables-schema";

interface UseTablesProps {
  page: number;
  perPage: number;
  debouncedSearch: string;
  initialTables: any;
  selectedId: string | null;
  assigningTableId: string | null;
}

export function useTables({
  page,
  perPage,
  debouncedSearch,
  initialTables,
  selectedId,
  assigningTableId,
}: UseTablesProps) {
  const queryClient = useQueryClient();

  // --- QUERIES ---
  const tablesQuery = useQuery({
    queryKey: ["tables", page, perPage, debouncedSearch],
    queryFn: () => getTablesAction(page + 1, perPage, debouncedSearch),
    initialData:
      page === 0 && debouncedSearch === "" ? initialTables : undefined,
    placeholderData: keepPreviousData,
    staleTime: 10000,
  });

  const tableDetailsQuery = useQuery({
    queryKey: ["table", selectedId],
    queryFn: () => getTableDetailsAction(selectedId!),
    enabled: !!selectedId,
  });

  const staffQuery = useQuery({
    queryKey: ["unassigned-employees", assigningTableId],
    queryFn: () => getUnassignedEmployeesAction(assigningTableId!),
    enabled: !!assigningTableId,
  });

  // --- MUTATIONS ---
  const createMutation = useMutation({
    mutationFn: createTableAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table added to floor plan!");
    },
    onError: () => toast.error("Failed to add table."),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TableForm }) =>
      updateTableAction(id, payload),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      queryClient.invalidateQueries({ queryKey: ["table", vars.id] });
      toast.success("Table updated!");
    },
    onError: () => toast.error("Failed to update table."),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTableAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table removed!");
    },
    onError: () => toast.error("Failed to delete table."),
  });

  const assignMutation = useMutation({
    mutationFn: assignEmployeesAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Staff assigned!");
    },
    onError: () => toast.error("Failed to assign staff."),
  });

  return {
    tables: tablesQuery.data,
    isLoading: tablesQuery.isLoading,
    isFetching: tablesQuery.isFetching,
    isError: tablesQuery.isError,
    tableDetails: tableDetailsQuery.data,
    unassignedStaff: staffQuery.data,
    isLoadingStaff: staffQuery.isLoading,
    createTable: createMutation,
    updateTable: updateMutation,
    deleteTable: deleteMutation.mutate,
    assignStaff: assignMutation.mutate,
    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending ||
      assignMutation.isPending,
  };
}
