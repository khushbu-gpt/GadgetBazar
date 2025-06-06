import { Types } from "mongoose";
import { AppError } from "../../shared/utils/AppError";
import { ProductModel } from "../product/product.model";
import { CartModel } from "./cart.model";

const TAX = 0.18
export const createCartService = async (productId: string, quantity: number, userId: string) => {
    const product = await ProductModel.findById(productId);
    if (!product) throw new AppError("Product not found", 404);
    if (!Types.ObjectId.isValid(productId)) {
        throw new AppError(`Invalid product ID: ${productId}`, 400);
    }
    let cart = await CartModel.findOne({ user: userId });
    const itemsubtotal = product.price * quantity
    const itemtax = itemsubtotal * TAX
    const itemdiscount = (product as any).discount ? (product as any).discount * quantity : 0;
    const itemtotalPrice = itemsubtotal + itemtax - itemdiscount
    console.log("cart", cart)
    if (!cart) {
        await CartModel.create({
            user: userId, items: [{
                productId: product._id,
                quantity,
                price: product.price,
                image: product.image,
                name: product.title,
                subtotal: itemsubtotal
            }],
            subtotal: itemsubtotal,
            tax: itemtax,
            discount: itemdiscount,
            totalPrice: itemtotalPrice
        })
    } else {
        let existingCartItem = cart.items.find((item) => item.productId.toString() == (product._id as Types.ObjectId).toString())
        console.log("ExistingCart", existingCartItem)
        if (existingCartItem) {
            existingCartItem.quantity+= quantity
            existingCartItem.subtotal = existingCartItem.quantity * existingCartItem.price
        }
        else {
            cart.items.push({
                productId: product._id as Types.ObjectId,
                name: product.title,
                price: product.price,
                image: product.image,
                quantity,
                subtotal: product.price * quantity,

            });
        }
        const updatedSubTotal = cart.items.reduce((acc, curr) => acc + curr.subtotal, 0)
        const updatedTax = updatedSubTotal * TAX
        const updatedDiscount = cart.items.reduce((acc, curr) => acc + ((curr.price * quantity) * 0), 0);
        const updatedTotal = updatedSubTotal + updatedTax

        cart.subtotal = updatedSubTotal,
            cart.tax = updatedTax,
            cart.discount = updatedDiscount
        cart.totalPrice = updatedTotal

        await cart.save();
    }
    return cart
}



export const updateCartService = async (productId: string, quantity: number, userId: string) => {
    if (!Types.ObjectId.isValid(productId)) {
        throw new AppError("Product Id is Invalid", 400)
    }

    let cart = await CartModel.findOne({ user: userId })
    if (!cart) throw new AppError("Cart not found!", 404);

    const ProductObjectId = new Types.ObjectId(productId)

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() ===ProductObjectId.toString())

    if (itemIndex === -1) {
        throw new AppError("Product not found in cart", 404);
    }
    if (quantity <= 0) {
        cart.items.splice(itemIndex, 1)
    }
    else {
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].subtotal = cart.items[itemIndex].price * quantity
    }

    const updatedSubtotal = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
  const updatedTax = updatedSubtotal * TAX;
  const updatedDiscount = cart.items.reduce((acc, curr) => acc + ((curr.price * quantity) * 0), 0);
  const updatedTotal = updatedSubtotal + updatedTax - updatedDiscount;

  cart.subtotal = updatedSubtotal;
  cart.tax = updatedTax;
  cart.discount = updatedDiscount;
  cart.totalPrice = updatedTotal;
    await cart.save()
    return cart

}


export const getCartService=async(userId:string)=>{
const cart = await CartModel.findOne({ user: userId }).populate("items.productId")
 if (!cart) throw new AppError("Cart not found!", 404);
  return cart
}


export const deleteCartService=async(userId:string)=>{
const cart = await CartModel.findOneAndDelete({ user:userId}).populate("items.productId")
 if (!cart) throw new AppError("Cart not found!", 404);
  return cart
}