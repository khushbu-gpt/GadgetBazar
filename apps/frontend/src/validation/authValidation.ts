import { z } from "zod";

export const registerSchema = z.object({
  name: z
  .string()
  .min(2, "Name must be at least two character")
  .max(50, "Name can't exceed 50 characters")
  .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .trim(),
  password: z
  .string()
  .min(6, "Minimum 6  letter is required")
  .max(100, "Password can't exceed 100 characters"),
  phone: z
  .string()
  .regex(/^[0-9]{9,15}$/, "Phone no must be  9-15 digits")
  .optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .trim(),
  password: z
  .string()
  .min(6, "Minimum 6 letter is required"),
});
