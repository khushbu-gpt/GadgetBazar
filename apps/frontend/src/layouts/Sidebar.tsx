"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { useContext } from "react";
import { FilterProductCategory } from "@/context/FilterProductContext";
import Image from "next/image";
import { categories } from "@/constants/CategoryList";
import { X } from "lucide-react";
export default function Sidebar({
  isMobile = false,
  setOpen,
}: {
  isMobile: Boolean;
  setOpen: (value: boolean) => void;
}) {
  const { setSelectedCategory } = useContext(
    FilterProductCategory
  );
  

  return (
    <>
      {isMobile ? (
        <div className="sm:w-96 w-full bg-white fixed top-0 h-screen left-0 z-50 shadow-lg overflow-y-auto">
          <div className="flex justify-between px-4 border-b border-gray-200 py-6">
            <Image
              src={"/images/Logo.webp"}
              height={100}
              width={140}
              alt="pickbazar logo"
              className=""
            />
            <button
              onClick={() => setOpen?.(false)}
              className="text-gray-600 hover:text-teal-700 cursor-pointer"
              aria-label="close-filter-sidebar"
            >
              <X size={24} />
            </button>
          </div>
          {categories.map((item, index) => (
            <div
              className="cursor-pointer px-6 py-3 hover:text-teal-700"
              key={index}
            >
              <button
                className="flex gap-3 justify-center items-center cursor-pointer"
                onClick={() => setSelectedCategory(item.name.toLowerCase())}
              >
                <span> {item.icon(24)}</span>
                <span className="text-base font-semibold"> {item.name}</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <aside
          className={`${
            isMobile
              ? "block w-full "
              : "xl:w-[25%] fixed left-0 top-20 h-[calc(100vh-5rem)] z-10 xl:block hidden bg-gray-100"
          } `}
        >
          <Swiper
            direction="vertical"
            slidesPerView="auto"
            freeMode={true}
            scrollbar={{ draggable: true }}
            mousewheel={true}
            modules={[FreeMode, Scrollbar, Mousewheel]}
            className="h-full  "
          >
            <SwiperSlide className="!h-auto">
              <div className="flex flex-wrap justify-center gap-4 p-4 bg-white">
                {categories.map((item, index) => (
                  <div
                    className="h-36 w-40  rounded-md flex flex-col items-center justify-center text-sm shadow-sm hover:shadow-md transition cursor-pointer text-center"
                    key={index}
                  >
                    <button
                      className="flex flex-col items-center gap-2 text-center cursor-pointer"
                      onClick={() =>
                        setSelectedCategory(item.name.toLowerCase())
                      }
                    >
                    <span> {item.icon(48)}</span>

                    <span> {item.name}</span>
                    </button>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          </Swiper>
        </aside>
      )}
    </>
  );
}
