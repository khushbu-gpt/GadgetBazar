import { CartPayload, getCartApiResponse } from "@/types/cart.types";
import axios from "axios";
const BACKEND = "http://localhost:5000";

export async function createCartApi(
  payload: CartPayload,
  token: string
):Promise<getCartApiResponse>{
    const response = await axios.post(`${BACKEND}/cart`, payload, {
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
    const response = await axios.post(`${BACKEND}/cart`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
}

export async function getCartApi(
  token: string
):Promise<getCartApiResponse>{
    const response = await axios.get(`${BACKEND}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
}


export async function deleteCartApi(
  token: string
):Promise<void>{
    const response = await axios.delete(`${BACKEND}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
}
