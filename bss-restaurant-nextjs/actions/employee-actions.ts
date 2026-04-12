"use server";

import { serverApi } from "@/lib/axios/axios-server";
import { employee } from "@/types";
import { revalidatePath } from "next/cache";

export async function getEmployees(page = 1, perpage = 10) {
  try {
    const api = await serverApi();
    const { data } = await api.get(`/Employee/datatable`, {
      params: { Page: page, Per_Page: perpage },
    });
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "failed to fetch employees",
    );
  }
}

export async function getEmployee(id: string) {
  try {
    const api = await serverApi();
    const { data } = await api.get(`/Employee/get/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "failed to fetch employee",
    );
  }
}

export async function createEmployee(formdata: employee) {
  try {
    const api = await serverApi();
    const { data } = await api.post(`/Employee/create`, formdata);

    revalidatePath("/employees");
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || "failed to create employee",
    );
  }
}

export async function updateEmployee(id: string, formdata: any) {
  try {
    const api = await serverApi();
    const { data } = await api.put(`/Employee/update/${id}`, formdata);

    revalidatePath("/employees");
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "failed to update employee",
    );
  }
}

export async function deleteEmployee(id: string) {
  try {
    const api = await serverApi();
    const { data } = await api.delete(`/Employee/delete/${id}`);

    revalidatePath("/employees");
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "failed to delete employee",
    );
  }
}
