"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressById = exports.getAddressById = exports.updateAddress = exports.getAddressByUid = exports.createAddressSchema = exports.addressSchema = void 0;
const zod_1 = require("zod");
exports.addressSchema = zod_1.z.object({
    fullname: zod_1.z.string().min(3, "Fullname is required"),
    phone: zod_1.z.string().regex(/^\d{9}$/, "phone num must be 9 digits"),
    city: zod_1.z.string().min(3, "City is required"),
    state: zod_1.z.string().min(3, "State is required"),
    country: zod_1.z.string().optional(),
    address1: zod_1.z.string().min(3, "Address1 is required"),
    address2: zod_1.z.string().min(3, "Address 2 ").optional(),
    pincode: zod_1.z.string().regex(/^[1-9]{6}$/, "Pincode must be a valid 6-digit number"),
});
exports.createAddressSchema = zod_1.z.object({
    uid: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"),
    address: exports.addressSchema,
});
exports.getAddressByUid = zod_1.z.object({
    uid: zod_1.z.string().regex(/^[a-f\d]{24}$/i, "uid sould be valid"),
});
exports.updateAddress = exports.addressSchema.partial();
exports.getAddressById = zod_1.z.object({
    id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, "Id sould be valid")
});
exports.deleteAddressById = exports.getAddressById;
