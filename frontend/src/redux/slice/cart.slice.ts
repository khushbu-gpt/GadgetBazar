import { tokenResponse } from "@/types/auth.types";
import { CartPayload, getCartApiResponse, } from "@/types/cart.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface intialValue {
    cart: getCartApiResponse | null,
    loading: boolean,
    error: string
}
export const initialState: intialValue = {
    cart: null,
    loading: true,
    error: ""
}
export const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        getCartRequest: (state,) => {
            state.loading = true;
            state.error = "";
        },
        getCartSuccess: (state, action: PayloadAction<getCartApiResponse>) => {
            state.loading = false;
            state.error = "";
            state.cart = action.payload;
        },
        getCartFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        createCartRequest: (state, _action: PayloadAction<CartPayload>) => {
            state.loading = true;
            state.error = "";
        },
        createCartSuccess: (state, action: PayloadAction<getCartApiResponse>) => {
            state.loading = false;
            state.error = "";
            state.cart = action.payload;
        },
        createCartFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateCartRequest: (state, _action: PayloadAction<CartPayload>) => {
            state.loading = true;
            state.error = "";
        },
        updateCartSuccess: (state, action: PayloadAction<getCartApiResponse>) => {
            state.loading = false;
            state.error = "";
            state.cart = action.payload;
        },
        updateCartFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteCartRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        deleteCartSuccess: (state) => {
            state.loading = false;
            state.error = "";
            state.cart = null;
        },
        deleteCartFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
    selectors: {
        selectCart: (state) => state.cart,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error
    }
})

export const { getCartRequest, getCartFailure, getCartSuccess, updateCartRequest, updateCartFailure, updateCartSuccess, createCartFailure
    , createCartRequest, createCartSuccess, deleteCartFailure, deleteCartRequest, deleteCartSuccess } = cartSlice.actions
export const { selectCart, selectLoading, selectError } = cartSlice.selectors