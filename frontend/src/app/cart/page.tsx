"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";
import { CartContext } from "@/context/Cartcontext";
import { useContext} from "react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total ,decreaseQuantity} = useContext(CartContext);

  return (
    <div className="fixed top-60 right-0 z-50"> 
      <Sheet>
        <SheetTrigger className="bg-teal-600 p-5 rounded-l-sm font-semibold text-white text-sm cursor-pointer flex flex-col ">
           <span> {cart.length} item(s)</span>
           <br className="my-4"/>
           <span className="bg-white text-teal-600 rounded-sm px-6  py-2  cursor-pointer"> ₹ {total}</span>
        </SheetTrigger>
        <SheetContent className="w-[90vw] sm:w-[400px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-teal-600 text-lg border-b pb-2 mb-2 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Your Cart ({cart.length} items)
            </SheetTitle>
          </SheetHeader>

          {cart.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <ShoppingBag className="text-teal-600 w-20 h-20 opacity-50" />
              <p className="text-gray-500 ml-4">Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="border p-3 flex justify-between items-center rounded"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ₹{item.price} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <button
                      onClick={() => updateQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                    _
                    </button> */}
                    <span>{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item._id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 text-sm ml-2"
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
                ₹ {total}
              </span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}


