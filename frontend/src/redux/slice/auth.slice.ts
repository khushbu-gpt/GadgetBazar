
import { InitialUserValue, LoginPayload, LoginResponse, SignUpPayload, SignUpResponse, tokenResponse } from "@/types/auth.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: InitialUserValue = {
  auth: {
    user:null,
    accessToken:""
  },
  loading: true,
  error: "",
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
      state.auth=action.payload
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
      state.auth.user= action.payload;
    },
    SignUpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false; state.error = action.payload;
    },
    LogOutRequest: (state,) => {
      state.loading = true;
      state.error = "";
    },
    LogOutSuccess: (state) => {
      state.loading = false;
      state.auth = {
        user:null,
        accessToken:""
      };
      state.error = "";
    },
    LogOutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  selectors: {
    selectAuth: (state: any) => state.auth,
    selectUser: (state: any) => state.auth.user,
    selectToken: (state: any) => state.auth.accessToken,
    selectLoading: (state: any) => state.loading,
    selectError: (state: any) => state.error,
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
export const { selectAuth, selectLoading, selectError, selectToken,selectUser } = authSlice.selectors;
