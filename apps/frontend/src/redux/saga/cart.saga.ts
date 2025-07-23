import { createCartApi, deleteCartApi, getCartApi, updateCartApi } from "@/services/cart.api";
import { selectToken } from "../slice/auth.slice";
import {
  createCartFailure,
  createCartRequest,
  createCartSuccess,
  deleteCartFailure,
  deleteCartRequest,
  deleteCartSuccess,
  getCartFailure,
  getCartRequest,
  getCartSuccess,
  updateCartFailure,
  updateCartRequest,
  updateCartSuccess,
} from "../slice/cart.slice";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { CartPayload, getCartApiResponse } from "@/types/cart.types";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export function* createCartSaga(action: PayloadAction<CartPayload>) {
  try {
    const token:string=yield select(selectToken)
    const response:getCartApiResponse= yield call(createCartApi,action.payload,token);
    yield put(createCartSuccess(response))
    console.log("createCartSaga:",response)
  } catch (error) {
    yield put(createCartFailure((error as Error).message));
    toast.error("please login to continue")
  }
}

export function* updateCartSaga(action:PayloadAction<CartPayload>) {
  try {
    const token:string=yield select(selectToken)
    const response:getCartApiResponse= yield call(updateCartApi,action.payload,token);
    yield put(updateCartSuccess(response))
  } catch (error) {
    yield put(updateCartFailure((error as Error).message));
  }
}

export function* getCartSaga() {
  try {
    const token:string=yield select(selectToken)
    const response:getCartApiResponse= yield call(getCartApi,token);
    yield put(getCartSuccess(response))
  } catch (error) {
    yield put(getCartFailure((error as Error).message));
  }
}

export function* deleteCartSaga() {
  try {
    const token:string=yield select(selectToken)
      yield call(deleteCartApi,token);
    yield put(deleteCartSuccess())
  } catch (error) {
    yield put(deleteCartFailure((error as Error).message));
  }
}
export function* watchCartSaga() {
  yield takeLatest(createCartRequest, createCartSaga);
  yield takeLatest(getCartRequest, getCartSaga);
  yield takeLatest(updateCartRequest, updateCartSaga);
  yield takeLatest(deleteCartRequest, deleteCartSaga);
}
