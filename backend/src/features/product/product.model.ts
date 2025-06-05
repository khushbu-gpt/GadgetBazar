import mongoose, { Types } from "mongoose";
import { IProduct } from "./product.types";
export const productSchema = new mongoose.Schema<IProduct>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true, min: [0, "MRP cannot be negative"] },
    image: { type: String, required: true },
    category: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    description: String,
    mrp: { type: Number, min: [0, "MRP cannot be negative"] },
    variants: [
      {
        color: String,
        size: String,
        stock:Number
      },
    ],
    discount: {
      type: Number,
      min: [0, "can't ne negative"],
      max: [100, "Discount can't exceed 100%"],
    },
    sku:{
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      trim: true,
      uppercase:true
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model<IProduct>("products", productSchema);
