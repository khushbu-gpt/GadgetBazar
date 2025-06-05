
import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginApi,  
  signUpApi,
} from "@/services/auth.api";
import {
  LoginFailure,
  LoginRequest,
  LoginSuccess,
  LogOutRequest,
  LogOutSuccess,
  SignUpFailure,
  SignUpRequest,
  SignUpSuccess,
} from "../slice/auth.slice";
import { LoginPayload, LoginResponse, SignUpPayload, SignUpResponse } from "@/types/auth.types";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


export function* loginSaga(action:PayloadAction<LoginPayload>) {

  try {
    const response= yield call(loginApi, action.payload);
    const {user,accessToken}=response.data
        if (!accessToken) {
      throw new Error("Access token not found in response");
    }
    yield put(LoginSuccess(response));
    toast.success("Login Successful!")
    if(typeof window !== "undefined"){
      localStorage.setItem("token",accessToken)
    }

  } catch (error) {
    yield put(LoginFailure((error as Error).message||"Login Failed"));
    toast.error("Login Failed")
  }
}

export function* signUpSaga(action: PayloadAction<SignUpPayload>) {
  try {
    const response: SignUpResponse = yield call(signUpApi, action.payload);

    yield put(SignUpSuccess(response));
    toast.success("SignUp Successful!")
  } catch (error:any) {
    yield put(SignUpFailure(error.message||"SignUp Failed!"));
    toast.error(`SignUp Failed!`)

  }
}

export function* LogOutSaga() {
  try {
    const response= yield call(LogOutRequest);
      if(typeof window !== "undefined"){
      localStorage.removeItem("token")
    }
    yield put(LogOutSuccess(response));
    toast.success("LogOut Successful!")
  } catch (error:any) {
    yield put(LoginFailure(error.message||"SignUp Failed!"));
    toast.error(`LogOut Failed!`)

  }
}
export function* watchAuthSaga() {
  yield takeLatest(SignUpRequest, signUpSaga);
  yield takeLatest(LoginRequest, loginSaga);
  yield takeLatest(LogOutRequest, LogOutSaga);

}
