import z from "zod";

export const employeeschema = z.object({
  firstName: z.string().min(1, "first name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "last name is required"),
  image: z.any().optional(),
  spouseName: z.string().min(1, "spouse name is required"),
  fatherName: z.string().min(1, "father name is required"),
  motherName: z.string().min(1, "mother name is required"),
  designation: z.string().min(1, "designation is required"),
  email: z.email("invalid email address"),
  phone: z.string().min(5, "phone is required"),
  gender: z.enum(["Male", "Female", ""]),
  dob: z.string().min(1, "date of birth is required"),
  joinDate: z.string().min(1, "join date is required"),
  nid: z.string().min(5, "nid is required"),
});
