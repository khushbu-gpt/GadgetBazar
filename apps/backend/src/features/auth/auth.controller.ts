import { NextFunction, Request, Response } from "express";
import * as userService from "./auth.service";
import { AppError } from "../../shared/utils/AppError";
import { sendResponse } from "../../shared/utils/sendResponse";


export async function registerUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await userService.registerService(req.body);
    if (!user) next(new AppError("user not found", 400));
    sendResponse(res, {
      data: user,
      message: "user register success!",
      status_code: 201,
    });
  } catch (error) {
    next  (error)
  }
}

export async function loginUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user, tokens } =await userService.loginService(req.body);
    if (!user) next(new AppError("Email is rerequired",400));
    res.cookie("refresh-token", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    sendResponse(res, {
      data:{
        user,
        accessToken:tokens.accessToken},
      message: "login success!"
     });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
