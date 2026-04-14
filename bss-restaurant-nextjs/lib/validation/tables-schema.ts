import z from "zod";

export const tableSchema = z.object({
  tableNumber: z.string().min(3, "Table Number is required."),
  numberOfSeats: z.number().min(1, "Table must have atleast one seat."),
  image: z.any().optional().nullable(),
});

export type TableForm = z.infer<typeof tableSchema>;
