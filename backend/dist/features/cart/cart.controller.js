"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCartController = exports.addToCartController = exports.getCartController = void 0;
const AppError_1 = require("../../shared/utils/AppError");
const sendResponse_1 = require("../../shared/utils/sendResponse");
const cart_model_1 = require("./cart.model");
const product_model_1 = require("../product/product.model");
const mongoose_1 = require("mongoose");
const jsontoken_1 = require("../../shared/utils/jsontoken");
// export const getCartController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//   const userId= req.user?.uid
//     const cart = await CartModel.findOne({ userId})
//     if (!cart) return next(new AppError("cart not found", 404));
//     sendResponse(res, {
//       status_code: 200,
//       data: cart,
//       message: "cart retrieved successfully!",
//     });
//   } catch (error) {
//     console.log(error)
//     next(error);
//   }
// };
const getCartController = (req, res) => {
    const userId = req.user?.uid; // ✅ No TS error
    res.send(`User ID: ${userId}`);
};
exports.getCartController = getCartController;
const addToCartController = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(" ")[1];
        if (!token)
            throw new Error("Invalid Token!");
        const token_payload = (0, jsontoken_1.decodeToken)(token);
        console.log(token_payload);
        let cart = await cart_model_1.CartModel.findOne({ uid: new mongoose_1.Types.ObjectId(token_payload.uid) });
        // const user = UserFromRequest(req);
        // const userId = user?.uid
        const _id = req.params.id;
        const product = await product_model_1.ProductModel.findById(_id);
        if (!product)
            return next(new AppError_1.AppError("product Id not found", 404));
        const quantity = 1;
        const subTotal = Number(product.price) * quantity;
        const tax = subTotal * 0.1;
        const discount = Number(product.price) * 0.1;
        const total = subTotal + tax - discount;
        if (!cart) {
            cart = await cart_model_1.CartModel.create({
                items: [
                    {
                        _id,
                        quantity,
                        subTotal,
                    },
                ],
                price: {
                    tax,
                    subTotal,
                    discount,
                },
                total,
            });
        }
        else {
            const existCart = cart.items.find((product) => product.id === _id);
            if (existCart) {
                existCart.quantity += quantity;
                existCart.subTotal += subTotal;
            }
            else {
                cart.items.push({
                    _id,
                    quantity,
                    subTotal,
                });
            }
            const updatedSubTotal = cart.items.reduce((sum, item) => sum + item.subTotal, 0);
            const updatedTax = updatedSubTotal * 0.1;
            const updatedDiscount = updatedSubTotal * 0.1;
            cart.price = {
                tax: updatedTax,
                subTotal: updatedSubTotal,
                discount: updatedDiscount,
            };
            cart.total = updatedSubTotal + updatedTax - updatedDiscount;
            await cart.save();
        }
        (0, sendResponse_1.sendResponse)(res, {
            message: "product  added success!",
            status_code: 201,
            data: cart,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addToCartController = addToCartController;
const removeFromCartController = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(" ")[1];
        if (!token)
            throw new Error("Invalid Token!");
        const token_payload = (0, jsontoken_1.decodeToken)(token);
        console.log(token_payload);
        let cart = await cart_model_1.CartModel.findOne({ uid: new mongoose_1.Types.ObjectId(token_payload.uid) });
        // const user = UserFromRequest(req);
        const _id = req.params.id;
        const product = await product_model_1.ProductModel.findById(_id);
        if (!product)
            return next(new AppError_1.AppError("product Id not found", 404));
        if (!cart) {
            return next(new AppError_1.AppError("Cart not found", 404));
        }
        else {
            const existingItemIndex = cart.items.findIndex((product) => product.id === _id);
            if (existingItemIndex === -1) {
                return next(new AppError_1.AppError("Product not found in cart", 404));
            }
            const existingItem = cart.items[existingItemIndex];
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
                existingItem.subTotal = Number(product.price) * existingItem.quantity;
            }
            else {
                cart.items.splice(existingItemIndex, -1);
            }
            const updatedSubTotal = cart.items.reduce((sum, item) => sum + item.subTotal, 0);
            const updatedTax = updatedSubTotal * 0.1;
            const updatedDiscount = updatedSubTotal * 0.1;
            const updatedTotal = updatedSubTotal + updatedTax - updatedDiscount;
            cart.price = {
                tax: updatedTax,
                subTotal: updatedSubTotal,
                discount: updatedDiscount,
            };
            cart.total = updatedTotal;
            await cart.save();
        }
        (0, sendResponse_1.sendResponse)(res, {
            message: "product  removed from cart!",
            status_code: 201,
            data: cart,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.removeFromCartController = removeFromCartController;
