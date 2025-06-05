import { all } from "redux-saga/effects";
import { watchCartSaga } from "./saga/cart.saga";
import { watchAuthSaga } from "./saga/auth.saga";

  export function* RootSaga(){
    yield all([watchCartSaga(),watchAuthSaga()])
  }