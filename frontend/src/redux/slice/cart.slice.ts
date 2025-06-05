import { intialValue, Product } from "@/types/cart.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const initialState:intialValue={
  cart:[],
  loading:true,
  error:""
}
export const cartSlice=createSlice({
    name:"Cart",
    initialState,
    reducers:{
        getCartRequest:(state)=>{
        state.loading=true,
        state.error=""
        },
        getCartSuccess:(state,action:PayloadAction<Product>)=>{
         state.loading=false;
         state.error="";
        //  state.cart=action.payload;
        },
        getCartFailure:(state,action:PayloadAction<string>)=>{
         state.loading=false,
         state.error=action.payload
        }
    },
    selectors:{
        setCart:(state)=>state.cart,
        setLoading:(state)=>state.loading,
        setError:(state)=>state.error
    }
})

export const {getCartRequest,getCartFailure,getCartSuccess}=cartSlice.actions
export const {setCart,setLoading,setError}=cartSlice.selectors