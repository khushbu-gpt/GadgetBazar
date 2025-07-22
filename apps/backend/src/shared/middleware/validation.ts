import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { AppError } from "../utils/AppError";

type ZodSchema={
     body?: AnyZodObject ; 
     query?: AnyZodObject;
     params?: AnyZodObject; 
}
export const zodValidation=(schema:ZodSchema)=>(req:Request,res:Response,next:NextFunction)=>{
try{
    if (schema.body) schema.body.parse(req.body);
    if (schema.query) schema.query.parse(req.query);
    if (schema.params) schema.params.parse(req.params);
    next()
    }
catch(error){
    console.error(error)
    if(error instanceof ZodError){
        const  errors=error.errors.map((e)=>(`${e.path.join(".")},${e.message}`))
       return next(new AppError(` ${errors}`,400))
    }
    return next(new AppError("Validation failed"))
}
}