import { User } from "./common";

export interface employee {
  id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  image?: string;
  spouseName: string;
  fatherName: string;
  motherName: string;
  designation: string;
  email: string;
  phone: string;
  gender: "Male" | "Female" | "";
  dob: string;
  joinDate: string;
  nid: string;
}

export interface EmployeesResponse {
  id: string;
  designation: string;
  joinDate: string;
  amountSold: number;
  user: User;
}

export interface paginatedEmployeesResponse {
  data: EmployeesResponse[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
