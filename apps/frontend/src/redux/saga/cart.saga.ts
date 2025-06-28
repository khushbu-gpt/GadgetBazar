
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
import { getCartApiResponse } from "@/types/cart.types";

export function* createCartSaga(action: any) {
  try {
    const token:string=yield select(selectToken)
    console.log("token:",token)
    const response:getCartApiResponse= yield call(createCartApi,action.payload,token);
    yield put(createCartSuccess(response))
    console.log("createCartSaga:",response)
  } catch (error) {
    console.log("Cart creation Error",error);
    yield put(createCartFailure((error as Error).message));
  }
}

export function* updateCartSaga(action: any) {
  try {
    const token:string=yield select(selectToken)
    console.log("token:",token)
    const response:getCartApiResponse= yield call(updateCartApi,action.payload,token);
    yield put(updateCartSuccess(response))
    console.log(response)
  } catch (error) {
    console.log("Cart creation Error",error);
    yield put(updateCartFailure((error as Error).message));
  }
}

export function* getCartSaga() {
  try {
    const token:string=yield select(selectToken)
    console.log("token:",token)
    const response:getCartApiResponse= yield call(getCartApi,token);
    yield put(getCartSuccess(response))
    console.log(response)
  } catch (error) {
    console.log("Cart creation Error",error);
    yield put(getCartFailure((error as Error).message));
  }
}

export function* deleteCartSaga() {
  try {
    const token:string=yield select(selectToken)
    console.log("token:",token)
    const response= yield call(deleteCartApi,token);
    yield put(deleteCartSuccess(response))
    console.log(response)
  } catch (error) {
    console.log("Cart creation Error",error);
    yield put(deleteCartFailure((error as Error).message));
  }
}
export function* watchCartSaga() {
  yield takeLatest(createCartRequest, createCartSaga);
  yield takeLatest(getCartRequest, getCartSaga);
  yield takeLatest(updateCartRequest, updateCartSaga);
  yield takeLatest(deleteCartRequest, deleteCartSaga);
}
