import mongoose, { Document,  } from "mongoose";

export interface ICategory extends Document{
    name:string,
    description?:string,
    slug:string,
    parent:mongoose.Types.ObjectId
    createdAt:Date,
    updatedAt:Date,

}