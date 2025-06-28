import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../shared/utils/sendResponse";
import { AppError } from "../../shared/utils/AppError";
import * as ProductService from "./products.service";
import { ProductModel } from "./product.model";

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await ProductService.createProductService(req.body);
    if (!products) next(new AppError("products not found", 404));
    sendResponse(res, {
      message: "New product created",
      data: products,
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
}
export async function getProductBySKU(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { sku } = req.params;
    const product = await ProductService.getProductBySKUService(sku);
    if (!product) throw new AppError("products not found", 404);
    sendResponse(res, { message: "products retrieved", data: product });
  } catch (error) {
    next(error)
  }
}

export async function deleteProductBySKU(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { sku } = req.params;
    const products = await ProductService.deleteProductServiceBySKU(sku);
    if (!products) next(new AppError("products not found", 404));
    sendResponse(res, {
      message: "products deleted success!",
      data: products
    });
  } catch (error) {
    next(error);
  }
}
export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;
    const { sku } = req.params;
    const updatedProducts = await ProductService.updateProductService(sku, data);
    sendResponse(res, {
      message: "Product Updated",
      data: updatedProducts,
    });
  } catch (error) {
    console.error(error)
    next(error);
  }
}
export async function createListOfProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const listOfProduct = await ProductService.createListOfProductService(req.body);
    if (!listOfProduct) next(new AppError("products not found", 404));
    sendResponse(res, {
      message: "New productList  created",
      data: listOfProduct,
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProductsByCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { category, title } = req.query;
    const filter: any = {};
    if (category) {
      filter.category = category;
    }
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    const products = await ProductModel.find(filter);
    if (!products || products.length === 0) {
      throw new AppError("products not found", 404);
    }
    sendResponse(res, { message: "products retrieved", data: products });
  } catch (error) {
    next(error);
  }
}
