"use client";

import {
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "@/actions/employee-actions";
import { employee } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useemployeemutations = () => {
  const queryclient = useQueryClient();

  const create = () =>
    useMutation({
      mutationFn: (formData: employee) => createEmployee(formData),
      onSuccess: () => {
        queryclient.invalidateQueries({ queryKey: ["employees"] });
        toast.success("employee created successfully!");
      },
      onError: (error: any) => toast.error(error.message),
    });

  const update = () =>
    useMutation({
      mutationFn: ({
        id,
        formData,
      }: {
        id: string;
        formData: Partial<employee>;
      }) => updateEmployee(id, formData),
      onSuccess: (_, variables) => {
        queryclient.invalidateQueries({ queryKey: ["employee", variables.id] });
        queryclient.invalidateQueries({ queryKey: ["employees"] });
        toast.success("employee updated successfully!");
      },
      onError: (error: any) => toast.error(error.message),
    });

  const remove = useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("employee deleted successfully!");
    },
    onError: (error: any) => toast.error(error.message),
  });

  return { create, update, remove };
};
