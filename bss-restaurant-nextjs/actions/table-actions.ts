"use server";

import { serverApi } from "@/lib/axios/axios-server";
import { handleAction } from "@/utils/handle-action";
import { revalidatePath } from "next/cache";

export async function getTablesAction(page = 1, perPage = 10, search = "") {
  return handleAction(async () => {
    const api = await serverApi();
    const { data } = await api.get("/Table/datatable", {
      params: { Page: page, Per_Page: perPage, Search: search },
    });
    return data;
  });
}

export async function createTableAction(payload: any) {
  return handleAction(async () => {
    const api = await serverApi();
    const { data } = await api.post("/Table/create", payload);
    revalidatePath("/dashboard/tables");
    return data;
  });
}

export async function updateTableAction(id: string, payload: any) {
  return handleAction(async () => {
    const api = await serverApi();
    const { data } = await api.put(`/Table/update/${id}`, payload);
    revalidatePath("/dashboard/tables");
    return data;
  });
}

export async function deleteTableAction(id: string) {
  return handleAction(async () => {
    const api = await serverApi();
    const { data } = await api.delete(`/Table/delete/${id}`);
    revalidatePath("/dashboard/tables");
    return data;
  });
}

export async function assignEmployeesAction(payload: any) {
  return handleAction(async () => {
    const api = await serverApi();
    const { data } = await api.post("/EmployeeTable/create-range", payload);
    revalidatePath("/dashboard/tables");
    return data;
  });
}

export async function getUnassignedEmployeesAction(tableId: string) {
  return handleAction(async () => {
    const api = await serverApi();
    const { data } = await api.get(
      `/Employee/non-assigned-employees/${tableId}`,
    );
    return data;
  });
}

export async function getTableDetailsAction(id: string) {
  return handleAction(async () => {
    const api = await serverApi();
    const { data } = await api.get(`/Table/get/${id}`);
    return data;
  });
}
