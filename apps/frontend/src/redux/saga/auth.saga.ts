
import { call, put, select, takeLatest } from "redux-saga/effects";
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
    const response:LoginResponse= yield call(loginApi, action.payload);
    yield put(LoginSuccess(response));
    toast.success("Login Successful!")
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
       yield put(LogOutSuccess(response));
       console.log("logout",response)
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
