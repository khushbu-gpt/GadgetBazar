"use client";
import Image from "next/image";
import Link from "next/link";
import { AlignJustify, Search, X } from "lucide-react";
import { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginPage from "@/app/login/page";
import { useDispatch, useSelector } from "react-redux";
import { LogOutRequest, selectUser } from "@/redux/slice/auth.slice";
import { FilterProductCategory } from "@/context/FilterProductContext";
import { deleteCartRequest } from "@/redux/slice/cart.slice";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const isLoggedin = useSelector(selectUser);
  const dispatch = useDispatch();
  const { setSearchProducts, searchProducts } = useContext(
    FilterProductCategory
  );
  const hadleLogout = () => {
    dispatch(LogOutRequest());
    dispatch(
      deleteCartRequest({
        productId: "",
        quantity: 0,
      })
    );
  };

  return (
    <nav className="w-full bg-white flex justify-between items-center py-5 fixed top-0 left-0 z-20 shadow-sm">
      <div className=" flex justify-center items-center xl:px-10 gap-8  px-10 ">
        <Image
          src={"/images/Logo.webp"}
          height={100}
          width={140}
          alt="pickbazar logo"
        />
      </div>

      {menu ? (
        <div className="flex flex-col h-screen bg-white z-100 sm:w-80 w-full fixed top-0 left-0  px-6 font-semibold py-2 text-sm  shadow-md">
          <div className=" border-b-1 border-gray-200 py-4 flex justify-between w-full">
            <Image
              src={"/images/Logo.webp"}
              height={100}
              width={140}
              alt="pickbazar logo"
              className=" "
            />
            <button
              className="cursor-pointer hover:bg-teal-700 hover:text-white rounded-full border p-1 text-gray-700 "
              onClick={() => setMenu(false)}
              aria-label="close-menu-button"
            >
              <X size={24} />
            </button>
          </div>
          <ul className="flex flex-col my-4 w-full ">
            <li className="hover:text-teal-800 py-2 px-2">
              <Link href="/shops">Shops</Link>
            </li>
            <li className="hover:text-teal-800 py-2 px-2">
              <Link href="/offers">Offers</Link>
            </li>
            <li className="hover:text-teal-800 py-2 px-2">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          <div className="flex flex-col w-72 pr-4">
            <Link
              href="/login"
              className=" bg-teal-700   py-3  px-4 rounded-sm font-semibold text-white text-sm cursor-pointer my-2  text-center"
            >
              Join
            </Link>

            <Link
              href="/register"
              className=" bg-teal-700   py-3  px-4 rounded-sm font-semibold text-white text-sm cursor-pointer my-2 text-center  "
            >
              Become a Seller
            </Link>
          </div>
        </div>
      ) : (
        <div className="lg:hidden  absolute transition  text-center left-44  flex justify-center items-center px-2">
          <button
            className="cursor-pointer px-4 text-center"
            aria-label="menu-bar"
            onClick={() => setMenu(true)}
          >
            <AlignJustify size={28} />
          </button>
        </div>
      )}

      <div className="flex justify-around items-center mx-6 gap-8">
        <ul className="lg:flex justify-around items-center gap-10 hidden">
          <li>
            <Link href="/shops" className="hover:text-teal-700">
              Shops
            </Link>
          </li>
          <li>
            <Link href="/offers" className="hover:text-teal-700">
              Offers
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-teal-700">
              Contact
            </Link>
          </li>
        </ul>
        <div className="flex gap-4  items-center justify-center">
          {open ? (
            <div className="fixed top-0 left-0  w-full bg-white-40 backdrop-blur-lg  py-4 flex justify-center items-center gap-5 z-100 border border-b-teal-500 ">
              <div className="w-[50%] flex place-items-center">
                <button
                  className="absolute cursor-pointer text-gray-500  p-3 text-sm "
                  aria-label="search-button"
                >
                  <Search className="p-0.5 cursor-pointer" />
                </button>
                <input
                  type="text"
                  name=""
                  id=""
                  value={searchProducts}
                  onChange={(e) => setSearchProducts(e.target.value)}
                  placeholder="Search your products from here"
                  className="bg-transparent  rounded-md  border border-teal-700  px-12 py-3.5 w-full relative text-sm focus:border-teal-600  outline-none"
                />
              </div>
              <button
                className="border-1 border-teal-700  rounded-md  text-base  text-teal-500 p-3 cursor-pointer"
                onClick={() => setOpen(false)}
                aria-label="close-button"
              >
                <X />
              </button>
            </div>
          ) : (
            <button
              className="border-1 border-gray-50  rounded-full text-sm p-2 cursor-pointer"
              onClick={() => setOpen(true)}
              aria-label="search-button"
            >
              <Search />
            </button>
          )}
        </div>

        {isLoggedin ? (
          <button
            className="bg-teal-700 py-3 px-4 rounded-sm font-semibold text-white text-sm cursor-pointer"
            onClick={hadleLogout}
          >
            LogOut
          </button>
        ) : (
          <div className="flex gap-6">
            <Dialog>
              <DialogTrigger className="bg-teal-700 lg:py-3 py-2 px-4 rounded-sm font-semibold text-white text-sm cursor-pointer hidden lg:block">
                join
              </DialogTrigger>
              <DialogContent className="h-[550px]">
                <DialogTitle></DialogTitle>
                <LoginPage />
              </DialogContent>
            </Dialog>
            <Link
              href="/register"
              className=" bg-teal-700 lg:py-3  py-2  sm:px-4 rounded-sm font-semibold text-white text-sm cursor-pointer px-6 text-nowrap hidden lg:block"
            >
              Become a Seller
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
