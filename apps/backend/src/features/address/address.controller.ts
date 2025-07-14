import { NextFunction, Request, Response } from "express";
import * as addressService from "./address.service";
import { sendResponse } from "../../shared/utils/sendResponse";
import { AppError } from "../../shared/utils/AppError";

export async function createAddressController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newaddress = await addressService.createAddress(req.body);
    sendResponse(res, {
      data: newaddress,
      status_code: 201,
      message: "Address created!",
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAddressController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const updateAddress = await addressService.updateAddress(req.body, { id });
    if (!updateAddress) next(new AppError("Address is required!", 400));
    sendResponse(res, {
      data: updateAddress,
      status_code: 200,
      message: "Address updated!",
    });
  } catch {
    next(new AppError("update Address failed", 500));
  }
}

export async function getAddressController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uid } = req.params;
    const Address = await addressService.getAddress(uid);
    if (!Address) next(new AppError("Address not found!", 404));
    sendResponse(res, {
      data: Address,
      status_code: 200,
      message: "Address retrieve!",
    });
  } catch {
    next(new AppError("Address retrieve failed", 500));
  }
}

export async function getAddressByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const Address = await addressService.getAddressById({ id });
    if (!Address) next(new AppError("Address not found!", 400));
    sendResponse(res, {
      data: Address,
      status_code: 200,
      message: "Address retrieve!",
    });
  } catch {
    next(new AppError("Address retrieve failed", 500));
  }
}

export async function deleteAddressController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const Address = await addressService.deleteAddress({ id });
    if (!Address) next(new AppError("Address not found!", 404));
    sendResponse(res, {
      data: Address,
      status_code: 200,
      message: "Address retrieve!",
    });
  } catch {
    next(new AppError("Address retrieve failed"));
  }
}
