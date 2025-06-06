"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartRequest, selectCart, updateCartRequest } from "@/redux/slice/cart.slice";

export default function Cart() {
  const dispatch=useDispatch()
const cart=useSelector(selectCart)
console.log("cart",cart)

  return (
    <div className="fixed top-60 right-0 z-50"> 
      <Sheet>
        <SheetTrigger className="bg-teal-600 p-5 rounded-l-sm font-semibold text-white text-sm cursor-pointer flex flex-col ">
           <span> {cart?.data?.items?.length} item(s)</span>
           <br className="my-4"/>
           <span className="bg-white text-teal-600 rounded-sm px-6  py-2  cursor-pointer"> ₹ {cart?.data?.totalPrice}</span>
        </SheetTrigger>
        <SheetContent className="w-[90vw] sm:w-[400px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-teal-600 text-lg border-b pb-2 mb-2 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              {/* Your Cart ({cart?.items?.length} items) */}
            </SheetTitle>
          </SheetHeader>

          {cart?.data?.items.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <ShoppingBag className="text-teal-600 w-20 h-20 opacity-50" />
              <p className="text-gray-500 ml-4">Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart?.data?.items.map((item) => (
                <li
                  key={item.productId}
                  className="border p-3 flex justify-between items-center rounded"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ₹{item.price} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                   <button
                        onClick={() =>dispatch(updateCartRequest({productId:item.productId,quantity:-1}))}
                      className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                        onClick={() =>dispatch(updateCartRequest({productId:item.productId,quantity:1}))}
                      className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>dispatch(deleteCartRequest())}
                      className="text-red-700 text-sm ml-2"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className=" px-5 w-full bottom-10 absolute">
            <button className="w-full py-3 bg-teal-600 text-white rounded-full flex justify-between items-center px-6 font-medium">
              Checkout
              <span className="bg-white text-teal-600 px-3 py-1 rounded-full">
                ₹ {cart?.data?.totalPrice}
              </span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}


