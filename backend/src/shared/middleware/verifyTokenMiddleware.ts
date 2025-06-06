import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { decodeToken } from "../utils/jsontoken";

export const VerifyAccessTokenMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Unauthorized: No token provided", 401));
    }
    const token = authHeader.split(" ")[1];
    const decoded = decodeToken(token);
    req.user = decoded;

    next(); // ✅ call next when done
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};
