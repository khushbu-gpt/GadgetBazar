"use client"
import { OffersList } from "@/constants/OffersList";
import Footer from "@/layouts/Footer";
import { Navbar } from "@/layouts/Navbar";
import { ChevronRight, House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Offers() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="w-full flex  bg-teal-700 flex-col">
        <section className=" h-100 w-full flex justify-center place-items-center flex-col">
          <h1 className="text-3xl font-bold py-5 text-white">Offers</h1>
          <div className="flex justify-center items-center">
            <Link
              href="/"
              className="hover:text-teal-800  text-sm flex justify-center items-center gap-2"
            >
              <House className="text-sm" />
              Home
            </Link>
            <p
              aria-disabled
              className=" text-xs flex justify-center items-center gap-2 text-gray-400"
            >
              <ChevronRight />
              Offers{" "}
            </p>
          </div>
        </section>
        <section className=" w-full grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:grid-cols-7 bg-white h-full z-0 pb-10 px-5">
          {OffersList.map((offer, index) => {
            return (
              <div
                className="relative w-40 h-40 flex flex-col items-center justify-center m-5 gap-5 sm:gap-0"
                key={index}
              >
                <div className="z-20">
                  <Image
                    src={offer.path}
                    height={300}
                    width={200}
                    alt="pickbazar logo"
                    className="rounded-t-2xl rounded-b-sm object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 w-[90%] px-3  py-3 bg-white rounded shadow-md flex justify-between items-center z-10">
                  <p className="text-base font-medium">{offer.text}</p>
                  <button
                    onClick={() => handleCopy(offer.text, index)}
                    className="text-teal-700 cursor-pointer text-sm font-semibold"
                  >
                    {copiedIndex===index ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            );
          })}
        </section>
        <Footer />
      </div>
    </>
  );
}
