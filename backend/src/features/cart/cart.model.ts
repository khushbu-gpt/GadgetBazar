import mongoose, { model, Schema } from "mongoose";
import { productSchema } from "../product/product.model";

const cartPriceSchema = new Schema(
  {
    tax: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    discount: {
      type: Number,
    },
  },
  {
    _id: false,
  }
);

export const cartItemSchema = new Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      ref: "products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);
const cartSchema = new Schema({
uid: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  items: {type:[cartItemSchema],required:true,default:[]},
  price:{type:cartPriceSchema,required:true},
  total:{type:Number,required:true},
},{
    timestamps:true,
    autoIndex:true
})
;


export const CartModel=model("cart",cartSchema)