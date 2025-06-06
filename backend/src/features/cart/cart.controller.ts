import { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/utils/AppError";
import { sendResponse } from "../../shared/utils/sendResponse";

import * as Cartservice from "./cart.service"

export const getCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.uid
    if (!userId) return next(new AppError("User ID missing in token", 401));
    const cart = await Cartservice.getCartService(userId)
    sendResponse(res, {
      status_code: 200,
      data: cart,
      message: "cart retrieved successfully!",
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

export const deleteCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.uid;
    if (!userId) return next(new AppError("User ID missing in token", 401));
    const cart = await Cartservice.deleteCartService(userId)
    sendResponse(res, {
      message: "product  removed from cart!",
      status_code: 201,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};


export const createCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.uid;
    if (!userId) return next(new AppError("User ID missing in token", 401));

    const { productId, quantity } = req.body;
    if (!productId) return next(new AppError("Product ID is required", 400));

    const cart = await Cartservice.createCartService(productId, quantity, userId)
    sendResponse(res, {
      data: cart,
      message: "Product added successfully!",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};



export const updateCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.uid;
    if (!userId) return next(new AppError("User ID missing in token", 401));

    const { productId, quantity } = req.body;
    if (!productId) return next(new AppError("Product ID is required", 400));

    const cart = await Cartservice.updateCartService(productId, quantity, userId)
    sendResponse(res, {
      data: cart,
      message: "Product added successfully!",
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};