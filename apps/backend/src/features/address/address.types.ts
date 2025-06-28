import mongoose, { Document } from "mongoose";


export interface IAddressBase{
   fullname:string
   address1:string,
   address2?:string,
   phone:string,
   pincode:string,
   city:string,
   state:string,
   country: string;
}

export interface IAddress extends Document{
   uid:mongoose.Types.ObjectId,
   address:IAddressBase
}