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
import {
  deleteCartRequest,
  selectCart,
  updateCartRequest,
} from "@/redux/slice/cart.slice";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  console.log("cart", cart);

  return (
    <div className="fixed top-1/2 right-0 z-50">
      <Sheet>
        <SheetTrigger className="bg-teal-700 p-5 rounded-l-sm font-semibold text-white text-sm cursor-pointer flex flex-col ">
          <span> {cart?.data?.items?.length} item(s)</span>
          <br className="my-4" />
          <span className="bg-white text-teal-700 rounded-sm px-6  py-2  cursor-pointer">
            {" "}
            ${cart?.data?.totalPrice}
          </span>
        </SheetTrigger>
        <SheetContent className="w-[90vw] sm:w-[400px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-teal-700 text-lg border-b pb-2 mb-2 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
            </SheetTitle>
          </SheetHeader>

          {cart?.data?.items.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <ShoppingBag className="text-teal-700 w-20 h-20 opacity-50" />
              <p className="text-gray-500 ml-4">Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart?.data?.items.map((item: any) => (
                <li
                  key={item.productId}
                  className="border p-3 flex justify-between items-center rounded"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        dispatch(
                          updateCartRequest({
                            productId: item.productId,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                      className={`px-2 py-1 rounded cursor-pointer ${
                        item.quantity === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gray-200"
                      }`}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateCartRequest({
                            productId: item.productId,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        dispatch(
                          updateCartRequest({
                            productId: item.productId,
                            quantity: 0,
                          })
                        )
                      }
                      className="text-red-700 text-sm ml-2 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className=" bottom-5 fixed right-5">
            <button className="w-full py-2 bg-teal-700 text-white rounded-full flex  items-center gap-40 font-medium px-5">
              Checkout
              <span className="bg-white text-teal-700 px-3 py-2 rounded-full">
                $ {cart?.data?.totalPrice}
              </span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
