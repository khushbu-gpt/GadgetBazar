"use client";
import Image from "next/image";
import Link from "next/link";
import { ChartNoAxesGantt, Search, X } from "lucide-react";
import { useState } from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LoginPage from "@/app/login/page";
import { useDispatch } from "react-redux";
import { LogOutRequest } from "@/redux/slice/auth.slice";


export function Navbar() {
  const [open, setOpen] = useState(true);
  const [menu,setMenu]=useState(false)
  const dispatch=useDispatch()

  return (
    <nav className="w-full bg-white flex justify-between items-center xl:py-5 py-3  fixed top-0 left-0 z-20 shadow-xs">
     
      <div className="left flex justify-center items-center xl:px-10 gap-8  px-16">
        <Image
          src={"/images/Logo.webp"}
          height={100}
          width={140}
          alt="pickbazar logo"
        />
      </div>
    
    {menu?<ul className="flex flex-col h-screen bg-white z-100 w-96 fixed top-0 left-0 px-6 font-semibold py-2 text-sm">
        <div className=" border-b-1 border-gray-200 py-4 flex justify-between items-center">
        <Image
          src={"/images/Logo.webp"}
          height={100}
          width={140}
          alt="pickbazar logo"
          className=""
        />
        <button className="cursor-pointer hover:bg-teal-600 hover:text-white rounded-full border p-1 text-gray-700 " onClick={()=>setMenu(false)}> <X  className="w-6 h-6  "/></button>  
      </div>

          <Link href="/shops" className="hover:text-teal-600 py-3">
            Shops
          </Link>
          <Link href="/offers" className="hover:text-teal-600 py-3">
            Offers
          </Link>
          <Link href="/contact" className="hover:text-teal-600 py-3">
            Contact
          </Link>
          <Link href="/shops" className="hover:text-teal-600 py-3">
            Flash Sale
          </Link>
          <Link href="/offers" className="hover:text-teal-600 py-3">
            Authors
          </Link>
          <Link href="/contact" className="hover:text-teal-600 py-3">
            FAQ
          </Link>
           <Link href="/offers" className="hover:text-teal-600 py-3">
            Terms & Conditions
          </Link>
          <Link href="/contact" className="hover:text-teal-600 py-3">
          Customer Refund Policy
          </Link>
        </ul>:
        (<div className="xl:hidden block absolute transition ">
        <button className="cursor-pointer px-4" onClick={()=>setMenu(true)}> <ChartNoAxesGantt  className="w-8 h-8 text-gray-600  "/></button> 
      </div>
      )}

      <div className="flex justify-around items-center mx-6 gap-8 ">
        <ul className="xl:flex justify-around items-center gap-10 hidden ">
          <Link href="/shops" className="hover:text-teal-600">
            Shops
          </Link>
          <Link href="/offers" className="hover:text-teal-600">
            Offers
          </Link>
          <Link href="/contact" className="hover:text-teal-600">
            Contact
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>pages</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Flash Sale</NavigationMenuLink>
                  <NavigationMenuLink>Authors</NavigationMenuLink>
                  <NavigationMenuLink>FAQ</NavigationMenuLink>
                  <NavigationMenuLink>Terms & Conditions</NavigationMenuLink>
                  <NavigationMenuLink>
                    Customer Refund Policy
                  </NavigationMenuLink>
                  <NavigationMenuLink>Terms & Conditions</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ul>

        <div className="flex gap-4  items-center justify-center">
          {open ? (
            <button
              className="border-1 border-gray-50  rounded-full text-sm p-2 cursor-pointer hidden lg:block"
              onClick={() => setOpen(!open)}
            >
              <Search />
            </button>
          ) : (
            <div className="fixed top-0 left-0  w-full bg-white-40 backdrop-blur-lg  py-4 flex justify-center items-center gap-5 z-50 border border-b-teal-500 ">
              <div className="w-[50%] flex place-items-center">
                <button className="absolute cursor-pointer text-gray-500  p-3 text-sm "><Search className="p-0.5"/></button>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search your products from here"
                  className="bg-transparent  rounded-md  border border-teal-500  px-12 py-3.5 w-full relative text-sm focus:border-teal-600  outline-none"
                />
              </div>
              <button
                className="border-1 border-teal-500  rounded-md  text-base  text-teal-500 p-3 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <X />
              </button>
            </div>
          )}

       <Dialog>
          <DialogTrigger className="bg-teal-600 py-3 px-4 rounded-sm font-semibold text-white text-sm cursor-pointer">
          join
      </DialogTrigger>
        <DialogContent>
          <DialogTitle></DialogTitle>
          <LoginPage/>
          </DialogContent>
      </Dialog> 
          <Link
            href="/register"
            className=" bg-teal-600 py-3 px-4 rounded-sm font-semibold text-white text-sm cursor-pointer hidden sm:block"
          >
            Become a Seller
          </Link>
        <button className="bg-teal-800 py-3 px-4 rounded-sm font-semibold text-white text-sm cursor-pointer hidden sm:block"
        onClick={()=>dispatch(LogOutRequest())}>LogOut</button>
        </div>
      </div>
    </nav>
  );
}
