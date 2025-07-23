"use client";

import { Navbar } from "@/layouts/Navbar";
import { createCartRequest } from "@/redux/slice/cart.slice";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { use } from "react"; // ← Required for unwrapping the promise

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
  category: string;
}

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // ← unwrap the Promise

  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`
        );
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchSingleProduct();
  }, [id]);

  return (
    <>
      <Navbar />
      {product ? (
        <div className="sm:flex justify-around items-center w-full sm:h-screen xl:px-40 px-0 md:px-20 sm:py-0 py-10">
          <div className="lg:w-1/3 flex justify-center items-center h-full w-full md:w-1/2">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={300}
              className="bg-cover"
            />
          </div>
          <div className="flex flex-col place-items-start lg:w-1/3 w-full px-5 md:w-1/2">
            <h1 className="sm:text-2xl font-semibold py-2 text-xl">
              {product.title}
            </h1>
            <p className="py-2 text-xl">Price: ₹{product.price}</p>
            <button
              className="w-full py-4 text-center bg-teal-600 text-white rounded-md cursor-pointer my-2"
              onClick={() =>
                dispatch(createCartRequest({ productId: product._id, quantity: 1 }))
              }
            >
              Add To Shopping Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Product not found or failed to load.</p>
      )}
    </>
  );
}
