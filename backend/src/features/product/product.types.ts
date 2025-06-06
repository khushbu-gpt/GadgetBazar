import mongoose, { Document, Types } from "mongoose";


export interface IProduct extends Document{
    title:string,
    category:string,
    price:number,
    image:string,
    mrp?:number,
    sku:string,
    description?:string,
    variants?:{
     color:string,
     size:string,
     stock:number,
    }[],
    discount?:string,
}