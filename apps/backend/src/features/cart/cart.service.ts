import { Types } from "mongoose";
import { AppError } from "../../shared/utils/AppError";
import { ProductModel } from "../product/product.model";
import { CartModel } from "./cart.model";

const TAX = 0.18
export const createCartService = async (
  productId: string,
  quantity: number,
  userId: string
) => {
  if (!Types.ObjectId.isValid(productId))
    throw new AppError("Invalid product ID", 400);

  const product = await ProductModel.findById(productId);
  if (!product) throw new AppError("Product not found", 404);
  let cart = await CartModel.findOne({ user: userId });
  const price = product.price;
  const itemSubtotal = price * quantity;
  const itemDiscount = ((product as any).discount || 0) * quantity;

  const newItem = {
    productId: new Types.ObjectId(productId),
    name: product.title,
    price,
    image: product.image,
    quantity,
    subtotal: itemSubtotal,
  };

  if (!cart) {
    const tax = itemSubtotal * TAX;
    const total = itemSubtotal + tax - itemDiscount;

    cart = await CartModel.create({
      user: userId,
      items: [newItem],
      subtotal: itemSubtotal,
      tax,
      discount: itemDiscount,
      totalPrice: total,
    });

    return cart;
  }

  const alreadyExists = cart.items.some((item) =>
    item.productId.equals(productId)
  );

  if (alreadyExists) {
    throw new AppError("Product already in cart", 409);
  }


  cart.items.push(newItem);

  cart.subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
  cart.tax = cart.subtotal * TAX;
  cart.discount = 0; // You can calculate total discount here if needed
  cart.totalPrice = cart.subtotal + cart.tax - cart.discount;

  await cart.save();
  return cart;
};


export const updateCartService = async (productId: string, quantity: number, userId: string) => {
  if (!Types.ObjectId.isValid(productId)) throw new AppError("Invalid Product ID", 400);

  const cart = await CartModel.findOne({ user: userId });
  if (!cart) throw new AppError("Cart not found", 404);

  const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
  if (itemIndex === -1) throw new AppError("Product not found in cart", 404);

  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    const item = cart.items[itemIndex];
    item.quantity = quantity;
    item.subtotal = item.price * quantity;
  }

  cart.subtotal = cart.items.reduce((sum, i) => sum + i.subtotal, 0);
  cart.tax = cart.subtotal * TAX;
  cart.discount = 0;
  cart.totalPrice = cart.subtotal + cart.tax - cart.discount;

  await cart.save();
  return cart;
};



export const getCartService = async (userId: string) => {
  const cart = await CartModel.findOne({ user: userId }).populate("items.productId")
  if (!cart) throw new AppError("Cart not found!", 404);
  return cart
}


export const deleteCartService = async (userId: string) => {
  const cart = await CartModel.findOneAndDelete({ user: userId }).populate("items.productId")
  if (!cart) throw new AppError("Cart not found!", 404);
  return cart
}
