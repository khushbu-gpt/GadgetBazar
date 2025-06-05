import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Navbar } from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
       <Navbar/>
      <main className="md:w-full md:flex justify-center bg-gray-100 pt-20 py-10">
        <div className=" md:w-[400px] bg-white flex flex-col justify-center rounded-md  py-10 h-full m-6 md:mx-4  md:my-6 order-2 sm:order-1 ">
          <div className="flex justify-center">
            <Image
              src={"/images/contact-illustration.2f6adc05.svg"}
              alt="contact-image"
              width={350}
              height={350}
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

        <div className="md:w-[710px] bg-white rounded-md flex flex-col justify-center py-10 h-full m-6 md:mx-4 md:my-6 order-1 sm:order-2">
           <h2 className="font-semibold text-2xl text-center my-4">How can we improve your experience?</h2>
             <div className=" sm:flex justify-between  items-center gap-5 px-6 my-4">
                <div className="flex-col flex w-full ">
                  <label htmlFor="name" className="font-semibold">Name</label>
                  <input type="text" name="name" id="name" className="border-1 border-gray-300  rounded-sm px-4 py-3 my-1" />
                </div>
                <div className="flex-col flex w-full">
                <label htmlFor="email"  className="block font-semibold">Email</label>
                  <input type="email" name="email" id="email" className="border-1 border-gray-300 rounded-sm px-4 py-3 my-1"/>
             </div>
             </div>

             <div className="px-6 my-4">
                <label htmlFor="subject" className="font-semibold">Subject</label>
                <input type="text" name="subject" id="subject"  className="border-1 border-gray-300 rounded-sm px-4 py-3 w-full my-1" />
             </div>
             <div className="px-6 my-4">
                <label htmlFor="description" className="font-semibold">Description</label>
                <textarea name="description" id="description" className="border-1  rounded-sm px-4 py-3 w-full my-1"  rows={5} />
             </div>
             <div className="px-6">
             <button className="bg-teal-500 text-white rounded-md py-3 font-semibold px-6 cursor-pointer">Submit</button>
             </div>
        </div>
      </main>
      <Footer/> 
    </div>
  );
}
