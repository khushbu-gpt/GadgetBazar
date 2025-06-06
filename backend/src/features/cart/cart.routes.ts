import { Router } from "express";
import { VerifyAccessTokenMiddleWare } from "../../shared/middleware/verifyTokenMiddleware";
import { createCartController, deleteCartController, getCartController, updateCartController } from "./cart.controller";

export const cartRouter=Router()
cartRouter.get("/",VerifyAccessTokenMiddleWare,getCartController)
cartRouter.post("/",VerifyAccessTokenMiddleWare,createCartController)
cartRouter.put("/",VerifyAccessTokenMiddleWare,updateCartController)
cartRouter.delete("/",VerifyAccessTokenMiddleWare,deleteCartController)

