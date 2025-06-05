import {

} from "@/services/auth.api";
import { InitialUserValue, LoginPayload, LoginResponse, SignUpPayload, SignUpResponse } from "@/types/auth.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState:InitialUserValue= {
  user: null,
  loading: true,
  error:"",
};
export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    LoginRequest: (state, _action: PayloadAction<LoginPayload>) => {
      state.loading = true;
      state.error = "";
    },
    LoginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.loading = false;
      state.user = action.payload;
    },
    LoginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    SignUpRequest: (state, action: PayloadAction<SignUpPayload>) => {
      state.loading = true;
      state.error = "";
    },
    SignUpSuccess: (state, action: PayloadAction<SignUpResponse>) => {
      state.loading = false;
      state.user = action.payload;
    },
    SignUpFailure: (state, action: PayloadAction<string>) => {
      (state.loading = false), (state.error = action.payload);
    },
   LogOutRequest: (state,) => {
      state.loading = true;
      state.error = "";
    },
    LogOutSuccess: (state) => {
      state.loading = false;
      state.user =null;
      state.error="";
    },
    LogOutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  selectors: {
    setAuth: (state:any) => state.user,
    setLoading: (state:any) => state.loading,
    setError: (state:any) => state.error,
  },
});

export const {
  LoginRequest,
  LoginSuccess,
  LoginFailure,
  SignUpRequest,
  SignUpFailure,
  SignUpSuccess,
  LogOutRequest,
  LogOutSuccess,
  LogOutFailure
} = authSlice.actions;
export const { setAuth, setLoading, setError } = authSlice.selectors;
