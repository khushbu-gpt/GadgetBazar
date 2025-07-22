import { Navbar } from "@/layouts/Navbar";
import {shopsData} from "../../data/shopsData"
import ShopCard from "@/components/ShopCard";
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


