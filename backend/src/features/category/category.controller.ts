import { NextFunction, Request, Response } from "express";
import { CategoryModel } from "./category.model";
import { sendResponse } from "../../shared/utils/sendResponse";
import { AppError } from "../../shared/utils/AppError";

export function getCategory(req:Request,res:Response){

}

export async function addCategory(req:Request,res:Response,next:NextFunction){
    try{
         const {name,slug}=req.body
         console.log("1")
        const category=await CategoryModel.create({name,slug})
        if(!category) next(new AppError("name and slug is required"))
        console.log(category)
       sendResponse(res,{data:category,message:"category created successful!",status_code:201})
    }catch(error:any){
        next(error)
    }
}