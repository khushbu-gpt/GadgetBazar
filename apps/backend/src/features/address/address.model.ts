import mongoose, { model, Schema, Types } from "mongoose";
import { IAddress, IAddressBase } from "./address.types";


export const addressBaseSchema=new Schema<IAddressBase>({
  fullname:{type:String,required:true},
  address1:{type:String,
    required:true},
  address2:String,
  phone:{type:String,required:true,
  },
  city:{type:String,required:true},
  state:{type:String,required:true},
  country:{type:String, default: 'India',},
  pincode:{
    type:String,
    required:true,
}
},{
  _id:false,
})

export const addressSchema=new Schema<IAddress>({
  uid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  address:addressBaseSchema,
},{
timestamps:true
}
)

export const AddressModel=model<IAddress>("Address",addressSchema)