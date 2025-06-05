"use client"
import CartContextProvider from '@/context/Cartcontext'
import React from 'react'

const CartContexWrapper = ({children}:{children:React.ReactNode}) => {
  return (
   <CartContextProvider>{children}</CartContextProvider>
  )
}
export default CartContexWrapper