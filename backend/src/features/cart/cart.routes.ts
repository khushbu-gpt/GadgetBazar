import { Router } from "express";
import { addToCartController, getCartController, removeFromCartController } from "./cart.controller";

export const cartRouter=Router()
cartRouter.get("/",getCartController)
cartRouter.post("/increase/:id",addToCartController)

cartRouter.post("/decrease/:id",removeFromCartController)
