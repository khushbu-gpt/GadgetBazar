import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import mongoose from "mongoose";

export function errorHandler(
  err: Error | AppError | mongoose.Error,
  _req: Request,
  res: Response,
  next:NextFunction
) {
  let statusCode = 500;
  let message = "Something went wrong";
  let status = "error";

  if ((err as any).code === 11000 && (err as any).keyPattern?.email) {
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

 res.status(statusCode).json({
    status,
    success: false,
    message,
  });
}
