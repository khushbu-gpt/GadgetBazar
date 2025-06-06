"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListOfProductScema = exports.getProductSchema = exports.deleteProductSchema = exports.updateProductSchema = exports.variantSchema = exports.createProductSchema = exports.sku = void 0;
const zod_1 = require("zod");
exports.sku = zod_1.z.string().min(1, "SKU is required").regex(/^[A-Z0-9-]+$/, "Must be included uppercase");
exports.createProductSchema = zod_1.z.object({
    title: zod_1.z.string().min(2, "Title is required"),
    image: zod_1.z.string().url("Image should be valid"),
    category: zod_1.z
        .string()
        .min(24, "Category is required"),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().positive("Price must be positive."),
    mrp: zod_1.z.number().positive("Price must be positive.").optional(),
    sku: exports.sku
});
exports.variantSchema = zod_1.z.object({
    size: zod_1.z.string().min(1, "Size is required"),
    stock: zod_1.z.number().min(0, "Stock can't be negative"),
    color: zod_1.z.string().min(2, "Color is required"),
});
exports.updateProductSchema = zod_1.z.object({
    ...exports.createProductSchema.shape,
    variants: zod_1.z.array(exports.variantSchema).optional(),
});
exports.deleteProductSchema = zod_1.z.object({
    sku: exports.sku
});
exports.getProductSchema = zod_1.z.object({ sku: exports.sku });
exports.createListOfProductScema = zod_1.z.array(exports.createProductSchema);
