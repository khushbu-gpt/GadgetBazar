import mongoose, { model, Schema } from "mongoose";
import { ICart, ICartItem } from "./cart.types";

const CartItemSchema = new Schema<ICartItem>(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    image: { type: String },
    quantity: { type: Number, required: true, },
    variant: { type: String }
  },
  { _id: false }
);
const cartSchema = new Schema<ICart>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: { type: [CartItemSchema], required: true, default: [] },
    subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  discount: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);
export const CartModel = model("Cart", cartSchema);
