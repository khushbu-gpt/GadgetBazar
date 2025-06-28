import { authSlice } from "./slice/auth.slice";
import { cartSlice } from "./slice/cart.slice";

export const rootReducer={
 Auth:authSlice.reducer,
 Cart:cartSlice.reducer
}