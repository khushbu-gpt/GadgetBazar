import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import mongoose from "mongoose";
import { MongoError } from "mongodb";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next:NextFunction
) {
  let statusCode = 500;
  let message = "Something went wrong";
  let status = "error";



  if ((err as MongoError)?.code === 11000) {
    statusCode = 400;
    message = "Email already exists";
    status = "fail";
  }

  else if (err instanceof AppError) {
    statusCode = err.statusCode || 500;
    message = err.message;
    status = err.status || "error";
  }

  else if (err instanceof mongoose.Error) {
    statusCode = 400;
    message = err.message;
    status = "fail";
  }

  return res.status(statusCode).json({
    status,
    success: false,
    message,
  });
}
