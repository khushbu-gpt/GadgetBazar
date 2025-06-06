"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least two character").trim(),
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .min(1, "Email is required")
        .trim(),
    password: zod_1.z
        .string()
        .min(6, "Minimum 6  letter is required"),
    phone: zod_1.z.string().min(9, "must be at least 9 digits").optional()
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .min(1, "Email is required")
        .trim(),
    password: zod_1.z
        .string()
        .min(6, "Minimum 6 letter is required")
});
