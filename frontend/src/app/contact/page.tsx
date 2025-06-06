import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Navbar } from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <div className="flex-col flex justify-center bg-gray-100  pt-28 pb-20 w-full lg:flex-row px-5 items-center lg:items-start ">
        <div className="lg:w-[400px] bg-white flex flex-col justify-center rounded-md py-10  my-5  md:mx-4  md:my-6 order-2 lg:order-1 lg:min-h-screen h-full w-full">
          <div className="flex justify-center ">
            <Image
              src={"/images/contact-illustration.2f6adc05.svg"}
              alt="contact-image"
              width={300}
              height={300}
              className=""
            />
          </div>
          <div className="my-4 mx-6">
            <p className="py-1 font-semibold">Address</p>
            <p className="py-1 text-sm text-gray-600">
              NY State Thruway, New York, USA
            </p>
          </div>
          <div className="my-4 mx-6">
            <p className="py-1 font-semibold">Phone</p>
            <p className="py-1 text-sm text-gray-600">+129290122122</p>
          </div>
          <div className="my-4 mx-6">
            <p className="py-1 font-semibold">Email Address</p>
            <p className="py-1 text-sm text-gray-600">demo@demo.com</p>
          </div>
          <div className="my-4 mx-6">
            <p className="py-1 font-semibold">Website</p>
            <p className="py-1  text-gray-600">https://redq.io</p>
          </div>
          <div className="my-4 mx-6">
            <p className="py-1 font-semibold px-1">Follow Us</p>
            <div className="flex gap-4 py-1 text-gray-600">
              <Facebook />
              <Twitter />
              <Instagram />
            </div>
          </div>
        </div>

        <div className="lg:w-[700px] bg-white rounded-md flex flex-col justify-center py-10 my-5 md:mx-4 md:my-6 order-1 lg:order-2 lg:min-h-screen h-full w-full">
          <h2 className="font-semibold text-2xl text-center my-4">
            How can we improve your experience?
          </h2>
          <div className=" sm:flex justify-between  items-center gap-5 mx-6 my-4">
            <div className="flex-col flex w-full ">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="border-1 border-gray-300  rounded-sm px-4 py-3 my-1"
              />
            </div>
            <div className="flex-col flex w-full">
              <label htmlFor="email" className="block font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border-1 border-gray-300 rounded-sm px-4 py-3 my-1"
              />
            </div>
          </div>
          <div className="mx-6 my-4">
            <label htmlFor="subject" className="font-semibold">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              className="border-1 border-gray-300 rounded-sm px-4 py-3 w-full my-1"
            />
          </div>
          <div className="mx-6 my-4">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="border-1  rounded-sm px-4 py-3 w-full my-1"
              rows={5}
            />
          </div>
          <div className="mx-6 my-4">
            <button className="bg-teal-700 text-white rounded-md py-3 font-semibold px-8 cursor-pointer">
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
