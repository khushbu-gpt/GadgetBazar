"use client";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Cart from "@/app/cart/page";
import { SlidersHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCartRequest,
  selectCart,
  updateCartRequest,
} from "@/redux/slice/cart.slice";
import { CartPayload } from "@/types/cart.types";
import Sidebar from "@/layouts/Sidebar";
import { FilterProductCategory } from "@/context/FilterProductContext";
interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
  category: string;
  sku: string;
}
export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const cart = useSelector(selectCart);
  const [visibleCount, setVisibleCount] = useState(10);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { selectedCategory, searchProducts } = useContext(
    FilterProductCategory
  );
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
        const filters: Partial<{
          category: string | null;
          title: string | null;
        }> = {};

        if (selectedCategory) filters.category = selectedCategory;

        if (searchProducts) filters.title = searchProducts;

        const filtersArray = Object.entries(filters);
        const params = new URLSearchParams(url.search);

        for (const [key, value] of filtersArray) {
          if (value) params.append(key, value);
        }
        const urlAsString = url.toString() + "?" + params.toString();
        const response = await axios.get(urlAsString);
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [selectedCategory, searchProducts]);

  const fetchCart = (product: CartPayload) => {
    dispatch(createCartRequest(product));
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <>
      <Cart />
      <main className=" xl:flex bg-gray-100 min-h-screen">
        <Sidebar isMobile={false} setOpen={setOpen} />
        <div className="xl:w-[75%]  flex-col flex items-center w-full h-full px-4 xl:ml-[25%] xl:mt-20 mb-5 mt-18">
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
          {open ? (
            <Sidebar isMobile={true} setOpen={setOpen} />
          ) : (
            <div className="xl:hidden block w-full bg-white py-2 px-4 ">
              <button
                className="bg-accent border-1 px-5 py-2 rounded-sm font-semibold flex justify-center items-center cursor-pointer hover:bg-teal-800 hover:text-white"
                onClick={() => setOpen(true)}
                aria-label="filter-button"
              >
                <SlidersHorizontal />
                <span className="px-2">filter</span>
              </button>
            </div>
          )}
          <section className="gap-6 my-5 w-full flex flex-wrap">
            {products.slice(0, visibleCount).map((product) => {
              const itemInCart = cart?.data?.items.find(
                (item) => item.productId.toString() === product._id.toString()
              );
              return (
                <div
                  className="sm:h-96 sm:w-56  lg:w-72 xl:w-64 pb-6  w-full h-84 border bg-white border-gray-100 rounded-md transition cursor-pointer flex flex-col justify-between hover:shadow-lg px-4 shadow-md"
                  key={product._id}
                >
                  <Link href={`/products/${product.sku}`}>
                    <div className="w-full sm:my-5 flex justify-center items-center ">
                      <Image
                        src={product.image}
                        alt="product_image"
                        height={100}
                        width={200}
                        className="object-contain "
                      />
                    </div>
                    <div className="mx-2">
                      <p className="text-base text-gray-500 font-semibold">
                        {" "}
                        $ {product.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 font-semibold py-1">
                        {product.title}
                      </p>
                    </div>
                  </Link>
                  <div className="flex bg-gray-100    font-medium hover:bg-teal-700 hover:text-white transition cursor-pointer rounded-sm">
                    {itemInCart ? (
                      <button
                        className=" flex flex-1 text-center justify-center items-center text-sm  py-2 cursor-pointer"
                        onClick={() =>
                          dispatch(
                            updateCartRequest({
                              productId: product._id,
                              quantity: itemInCart.quantity + 1,
                            })
                          )
                        }
                      >
                        Add
                      </button>
                    ) : (
                      <button
                        className=" flex flex-1 text-center justify-center items-center text-sm  py-2 cursor-pointer"
                        onClick={() =>
                          fetchCart({ productId: product._id, quantity: 1 })
                        }
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </section>

          {visibleCount < products.length && (
            <div className="my-10">
              <button
                onClick={handleLoadMore}
                className="bg-teal-700 text-white py-2 px-6 rounded shadow hover:bg-teal-800 transition cursor-pointer"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
