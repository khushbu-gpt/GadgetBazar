import { CartPayload, getCartApiResponse } from "@/types/cart.types";
import axios from "axios";
export async function createCartApi(
  payload: CartPayload,
  token: string
):Promise<getCartApiResponse>{
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
}
export async function updateCartApi(
  payload: CartPayload,
  token: string
):Promise<getCartApiResponse>{
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/update`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
}

export async function getCartApi(
  token: string
):Promise<getCartApiResponse>{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
}


export async function deleteCartApi(
  token: string
):Promise<void>{
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
}
