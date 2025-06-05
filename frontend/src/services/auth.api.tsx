import {
  LoginPayload,
  LoginResponse,
  SignUpPayload,
  SignUpResponse,
} from "@/types/auth.types";
import axiosInstance from "@/utils/axiosInstance";

export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
  const res = await axiosInstance.post(`/auth/login`, payload);
  return res.data;
}

export async function signUpApi(
  payload: SignUpPayload
): Promise<SignUpResponse> {
  const res = await axiosInstance.post(`/auth/register`, payload);
  return res.data;
}

