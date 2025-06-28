import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least two character").trim(),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .trim(),
  password: z
    .string()
    .min(6, "Minimum 6  letter is required"),
    phone:z.string().min(9,"must be at least 9 digits").optional()
});

export const loginSchema=z.object({
    email: z
      .string()
      .email("Invalid email format")
      .min(1, "Email is required")
      .trim(),
    password: z
      .string()
      .min(6, "Minimum 6 letter is required")
  });

export type registeZodType=z.infer<typeof registerSchema>
export type loginZodType=z.infer<typeof loginSchema>
