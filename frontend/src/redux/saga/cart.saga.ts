import { getCartApi } from "@/services/cart.api";
import {
  getCartFailure,
  getCartRequest,
  getCartSuccess,
} from "../slice/cart.slice";
import { call, put, takeLatest } from "redux-saga/effects";
export function* cartSaga(action: any) {
  try {
    const data = yield call(getCartApi);
    console.log(data)
  } catch (error) {
    console.log(error);
    getCartFailure((error as Error).message);
  }
}

export function* watchCartSaga() {
  yield takeLatest(getCartRequest, cartSaga);
}
