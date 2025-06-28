import { Navbar } from "@/layouts/Navbar";
import Image from "next/image";
import {shopsData} from "../../data/shopsData"
type ShopCardProps = {
  image: string;
  title: string;
  address: string;
};

export default function Shops() {
  return (
    <>
      <Navbar />
      <div>
        <h1 className="font-bold text-2xl text mt-36 text-center">All Shops</h1>
        <div className="flex flex-wrap gap-5 justify-center items-center my-10">
          {shopsData.map((item, i) => {
            return (
              <ShopCard
                key={i}
                image={item.image}
                title={item.title}
                address={item.address}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export function ShopCard({ image, title, address }: ShopCardProps) {
  return (
    <div className="lg:w-72 md:w-84 xl:w-96  bg-teal-50 flex justify-center items-center gap-5 p-5  rounded-md border-1 m-5 sm:m-0">
      <Image
        src={image}
        height={75}
        width={75}
        alt="gadget-logo"
        className="rounded-full"
      />
      <div className="right ">
        <p className="font-bold  text-lg">{title}</p>
        <p className="text-xs">{address}</p>
      </div>
    </div>
  );
}
