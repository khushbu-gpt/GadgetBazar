import { z } from "zod";

export const sku=z.string().min(1,"SKU is required").regex(/^[A-Z0-9-]+$/,"Must be included uppercase")
export const createProductSchema = z.object({
  title: z.string().min(2, "Title is required"),
  image: z.string().url("Image should be valid"),
  category: z .string(),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive."),
  mrp: z.number().positive("Price must be positive.").optional(),
  sku

});

export const variantSchema = z.object({
  size: z.string().min(1, "Size is required"),
  stock: z.number().min(0, "Stock can't be negative"),
  color: z.string().min(2, "Color is required"),
});
export const updateProductSchema = z.object({
  ...createProductSchema.shape,
  variants: z.array(variantSchema).optional(),
});

export const deleteProductSchema = z.object({
  sku
});

export const getProductSchema = z.object({sku});
export const createListOfProductScema = z.array(createProductSchema);

export type createListOfProductZodType = z.infer<
  typeof createListOfProductScema
>;
export type createProductZodType = z.infer<typeof createProductSchema>;
export type updateProductZodType = z.infer<typeof updateProductSchema>;
export type deleteProductZodType = z.infer<typeof deleteProductSchema>;
export type getProductZodType = z.infer<typeof getProductSchema>;
