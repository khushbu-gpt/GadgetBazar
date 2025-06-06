"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.productSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.productSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true, min: [0, "MRP cannot be negative"] },
    image: { type: String, required: true },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "categories",
        required: true,
    },
    description: String,
    mrp: { type: Number, min: [0, "MRP cannot be negative"] },
    variants: [
        {
            color: String,
            size: String,
            stock: Number
        },
    ],
    discount: {
        type: Number,
        min: [0, "can't ne negative"],
        max: [100, "Discount can't exceed 100%"],
    },
    sku: {
        type: String,
        required: [true, "SKU is required"],
        unique: true,
        trim: true,
        uppercase: true
    },
}, {
    timestamps: true,
});
exports.ProductModel = mongoose_1.default.model("products", exports.productSchema);
