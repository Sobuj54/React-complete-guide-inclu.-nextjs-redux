import { z } from "zod";

export const employeeSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name is required"),
  spouseName: z.string().min(2, "Spouse name is required"),
  fatherName: z.string().min(2, "Father's name is required"),
  motherName: z.string().min(2, "Mother's name is required"),
  designation: z.string().min(2, "Designation is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  gender: z.string().min(1, "Please select a gender"),
  dob: z.string().min(1, "Date of birth is required"),
  joinDate: z.string().min(1, "Join date is required"),
  nid: z.string().min(5, "NID Card number is required"),
  image: z.any().optional(),
});
