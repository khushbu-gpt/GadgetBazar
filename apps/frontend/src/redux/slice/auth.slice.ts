import { InitialUserValue, LoginResponse, SignUpResponse } from "@/types/auth.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStore } from 'next-persist';
export const initialState: InitialUserValue = {
  auth: {
    user: null,
    accessToken: ""
  },
  loading: true,
  error: "",
};
const persistedState = getLocalStore("Auth", initialState);
export const authSlice = createSlice({
  name: "Auth",
  initialState: persistedState,
  reducers: {
    LoginRequest: (state,) => {
      state.loading = true;
      state.error = "";
    },
    LoginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.loading = false;
      state.auth = action.payload
    },
    LoginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    SignUpRequest: (state,) => {
      state.loading = true;
      state.error = "";
    },
    SignUpSuccess: (state, action: PayloadAction<SignUpResponse>) => {
      state.loading = false;
      state.auth.user = action.payload;
    },
    SignUpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false; state.error = action.payload;
    },
    LogOutRequest: (state) => {
      state.loading = false;
      state.auth = {
        user: null,
        accessToken: ""
      };
      state.error = "";
    },
  },
  selectors: {
    selectAuth: (state) => state.auth,
    selectUser: (state) => state.auth.user,
    selectToken: (state) => state.auth.accessToken,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
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
} = authSlice.actions;
export const { selectAuth, selectLoading, selectError, selectToken, selectUser } = authSlice.selectors;
