import { Navbar } from "@/layouts/Navbar";
import axios from "axios";
import Image from "next/image";

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
  category: string;
}


export default async function fetchProductsById({ params }) {
  let product: Product | null = null;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${params.id}`);
    product = response.data.data;
    console.log("Product fetched:", product);
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  return (
    <>
      <Navbar />
      {product ? (
        <div className="flex justify-between items-center  w-full h-screen px-40 ">
          <div className="w-1/3 flex justify-center items-center  h-full">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={300}
              className="bg-cover"
            />
          </div>

          <div className="right flex flex-col place-items-start w-1/3 ">
            <h1 className="text-2xl font-semibold py-2">{product.title}</h1>
            <p className="py-2 text-xl ">Price: ₹{product.price}</p>
            <button className="w-full py-4 text-center bg-teal-600 text-white rounded-md cursor-pointer my-2">
              Add To Shopping Cart
            </button>
            <div>
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found or failed to load.</p>
      )}
    </>
  );
}
