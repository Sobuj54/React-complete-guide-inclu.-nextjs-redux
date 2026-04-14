"use server";

import { serverApi } from "@/lib/axios/axios-server";
import { employee } from "@/types";
import { handleAction } from "@/utils/handle-action";
import { revalidatePath } from "next/cache";

// --- GETTERS ---

export async function getEmployees(page = 1, perpage = 10) {
  return handleAction(async () => {
    const api = await serverApi();
    const { data } = await api.get(`/Employee/datatable`, {
      params: { Page: page, Per_Page: perpage },
    });
    return data;
  });
}

export async function getEmployee(id: string) {
  return handleAction(async () => {
    const api = await serverApi();
    const { data } = await api.get(`/Employee/get/${id}`);
    return data;
  });
}

// --- MUTATIONS ---

export async function createEmployee(formdata: employee) {
  return handleAction(async () => {
    const api = await serverApi();
    const { data } = await api.post(`/Employee/create`, formdata);

    revalidatePath("/employees");
    return data;
  });
}

export async function updateEmployee(id: string, formdata: any) {
  return handleAction(async () => {
    const api = await serverApi();
    const { data } = await api.put(`/Employee/update/${id}`, formdata);

    revalidatePath("/employees");
    return data;
  });
}

export async function deleteEmployee(id: string) {
  return handleAction(async () => {
    const api = await serverApi();
    const { data } = await api.delete(`/Employee/delete/${id}`);

    revalidatePath("/employees");
    return data;
  });
}
