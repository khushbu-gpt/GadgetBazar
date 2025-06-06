import { NextFunction, Request, Response } from "express";
import { CategoryModel } from "./category.model";
import { sendResponse } from "../../shared/utils/sendResponse";
import { AppError } from "../../shared/utils/AppError";

export async function addCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, slug } = req.body;
    const category = await CategoryModel.create({ name, slug });
    if (!category) next(new AppError("name and slug is required"));
    sendResponse(res, {
      data: category,
      message: "category created successful!",
      status_code: 201,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function getSingeleCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {slug} = req.query;
    console.log("slug",slug)
    const category = await CategoryModel.findOne({slug });
    if (!category) return next(new AppError("category not found"));
    sendResponse(res, {
      data: category,
      message: "category found successfull!",
      status_code: 200,
    });
  } catch (error: any) {
    next(error);
  }
}


export async function getAllCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const category = await CategoryModel.find({});
    if (!category) return next(new AppError("category not found"));
    sendResponse(res, {
      data: category,
      message: "category found successfull!",
      status_code: 200,
    });
  } catch (error: any) {
    next(error);
  }
}
