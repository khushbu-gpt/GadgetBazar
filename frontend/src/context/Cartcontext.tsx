"use client"
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
export type Product = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  SubTotal: number;
};
export type CartContextType = {
  cart: Product[];
  addToCart: (id:string) => void;
  removeFromCart: (id: string) => void;
  total: number;
  updateQuantity: (id: string) => void;
  decreaseQuantity?: (id: string) => void;
  clearCart:()=>void;
  fetchCart?:()=>Promise<void>;
};
export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  total: 0,
  updateQuantity: () => {},
  clearCart:()=>{}
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<Product[]>([]);

  
const fetchCart = async () => {
  const response = await axiosInstance.get("/cart")
  console.log("fetchcartrespone:",response.data.data.items)
  setCart(response.data.items); 
}

  // async function addToCart(id:string) {
  //   try{
  //     const response=  await axios.post(`http://localhost:5000/cart/increase/${id}`)
  //     const data=await fetchCart()
  //   console.log("cart",data)
  //   console.log(response.data)
  //     }catch(error){
  //       console.log(error)
  //     }
  // }

  async function addToCart(id:string) {
    try{
      const response=  await axiosInstance.post(`/cart/increase/${id}`)
      const data=await fetchCart()
    console.log("cart",data)
    console.log(response.data)
      }catch(error){
        console.log(error)
      }
  }
  async function removeFromCart(id: string) {
   try{
    const response=  await axios.post(`http://localhost:5000/cart/decrease/${id}`)
   const data= await fetchCart()
    console.log("cart",response.data)

      }catch(error){
        console.log(error)
      }
  }
async function decreaseQuantity(id: string) {
  try {
       const response= await axios.post(`http://localhost:5000/cart/decrease/${id}`);
       await fetchCart();
       await response.data
  } catch (error) {
    console.log(error);
  }
}
 async function updateQuantity(id:string) {
     try{
    const response=  await axios.post(`http://localhost:5000/cart/increase/${id}`)
    await fetchCart()
    console.log("cart",response.data)
      }catch(error){
        console.log(error)
      }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ addToCart, removeFromCart, total, cart, updateQuantity,clearCart,fetchCart,decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
