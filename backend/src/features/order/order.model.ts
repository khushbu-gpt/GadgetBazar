import mongoose, { model, Schema } from "mongoose";
import { addressBaseSchema } from "../address/address.model";
import { cartItemSchema } from "../cart/cart.model";

const orderSchema=new Schema({
uid:{
 type:mongoose.Types.ObjectId,
 ref:"users",
 required:true,
},
address:{
type:addressBaseSchema,
required:true,
},
items:{
    type:[cartItemSchema],
    required:true,
},
shippingFee:{
type:Number,
default:0
},
orderTimeLine:{
      placedAt:{type:Date,default:Date.now,required:true},
      confirmedAt:{type:Date},
      deliverAt:{type:Date},
      shippedAt:{type:Date},
      returnedAt:{type:Date},
      cancelledAt:{type:Date},
      ofdAt:{type:Date}
},
status:{
    type:String,
    enum:["placed", "confirmed","deliver","shipped","returned","cancelled","ofd"],
    default:"placed"
}
})

export const OrderModel=model("order",orderSchema)