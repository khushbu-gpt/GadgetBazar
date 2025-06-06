import mongoose from "mongoose";
import { Document } from "mongoose";

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
  subtotal:number
}
export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  subtotal:number,
  tax:number,
  discount:number,
  totalPrice: number;
}