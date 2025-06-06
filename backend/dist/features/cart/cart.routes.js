"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
exports.cartRouter = (0, express_1.Router)();
exports.cartRouter.get("/", cart_controller_1.getCartController);
exports.cartRouter.post("/increase/:id", cart_controller_1.addToCartController);
exports.cartRouter.post("/decrease/:id", cart_controller_1.removeFromCartController);
