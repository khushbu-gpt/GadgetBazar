import { Router } from "express";
import { loginUserController, registerUserController } from "./auth.controller";
import { zodValidation } from "../../shared/middleware/validation";
import { loginSchema, registerSchema } from "./auth.validation";

export const authRouter=Router()

authRouter.post("/register",zodValidation({body:registerSchema}),registerUserController)
authRouter.post("/login",zodValidation({body:loginSchema}),loginUserController)