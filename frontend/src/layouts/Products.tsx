"use client";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import Sidebar from "./Sidebar";


import { CartContext } from "@/context/Cartcontext";
import {useContext, useEffect, useState } from "react";

import Cart from "@/app/cart/page";
import { SlidersHorizontal, X } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
  sku: string;
}

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useContext(CartContext);
  const [open,setOpen]=useState(false)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Cart/>
      <main className=" xl:flex bg-gray-100 min-h-max">
        <Sidebar/>
        <div className="xl:w-[75%]  flex-col flex items-center w-full h-full px-4 xl:ml-[25%] xl:mt-20 mb-5 mt-14">
          <div className="mt-5 w-full ">
            <Image
              src={"/images/Gadget-banners.webp"}
              width={1100}
              height={300}
              alt="banner"
              className="w-full bg-cover"
              priority
            />
          </div>
          {open?<div className="w-96 bg-teal-100 fixed top-0 h-screen left-0 z-100">
              <button onClick={()=>setOpen(false)} className="text-right cursor-pointer">
                <X/>
              </button>
              <Sidebar/>
              </div>:
            ( <div className="xl:hidden block w-full bg-white py-2 px-4 ">
            <button className="bg-accent border-1 px-5 py-2 rounded-sm font-semibold flex justify-center items-center cursor-pointer hover:bg-teal-600 hover:text-white"
            onClick={()=>setOpen(true)}
            >
              <SlidersHorizontal /><span className="px-2">filter</span></button>
              </div>)
            }
          <section className=" gap-6 mt-5 w-full flex flex-wrap">
            {products.map((product, i) => {
              return (
                <div
                  className="sm:h-96 sm:w-64  w-full h-72 border bg-white border-gray-100 rounded-md transition cursor-pointer flex flex-col justify-between hover:shadow-lg p-4 shadow-md"
                  key={product._id}
                >
                  <Link href={`/products/${product.sku}`}>
                    <div className="w-full sm:h-60 h-40 flex justify-center items-center ">
                      <Image
                        src={product.image}
                        alt="product_image"
                        height={200}
                        width={200}
                        className="object-contain"
                      />
                    </div>
                    <div className="mx-2">
                      <p className="text-lg text-gray-500 font-semibold">
                        {" "}
                        $ {product.price}
                      </p>
                      <p className="py-1 ">{product.title}</p>
                    </div>
                  </Link>
       
                    <button
                      className=" flex justify-center  items-center bg-gray-100   text-sm font-medium hover:text-white transition cursor-pointer rounded-sm"
                      onClick={() =>
                        addToCart(product._id)
                      }
                    >
                      <span className="flex flex-1 justify-center hover:bg-teal-500 py-2 rounded-l-sm">Add</span>
                      <span className="hover:bg-teal-600 px-3 py-2 rounded-r-sm bg-gray-200">+</span>
                    </button>
                
                </div>
              );
            })}
          </section>
          </div>
      </main>
    </>
  );
}

