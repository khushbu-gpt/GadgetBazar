import { Router } from "express";
import { VerifyAccessTokenMiddleWare } from "../../shared/middleware/verifyTokenMiddleware";
import { createCartController, deleteCartController, getCartController, updateCartController } from "./cart.controller";
export const cartRouter=Router()
cartRouter.get("/",VerifyAccessTokenMiddleWare,getCartController)
cartRouter.post("/",VerifyAccessTokenMiddleWare,createCartController)
cartRouter.delete("/",VerifyAccessTokenMiddleWare,deleteCartController)
cartRouter.put("/update",VerifyAccessTokenMiddleWare,updateCartController)
