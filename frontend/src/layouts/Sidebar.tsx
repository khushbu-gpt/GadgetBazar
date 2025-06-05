
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import {
    Monitor,
    Gamepad2,
    Laptop,
    Plug,
    Headphones,
    Camera,
    Smartphone,
    Router,
    Watch,
    Speaker,
} from "lucide-react";

interface Category{
  _id:string,
  name:string,
  slug:string,

}

const categories = [
    {
        icon: <Gamepad2 strokeWidth={1} className="h-12 w-12 " />,
        name: "Gamepad",
    },
    {
        icon: <Monitor strokeWidth={1} className="h-12 w-12 t " />,
        name: "Monitor",
    },
    {
        icon: <Laptop strokeWidth={1} className="h-12 w-12  " />,
        name: "Laptop",
    },
    {
        icon: <Plug strokeWidth={1} className="h-12 w-12  " />,
        name: "Plug",
    },
    {
        icon: <Camera strokeWidth={1} className="h-12 w-12 " />,
        name: "Camera",
    },
    {
        icon: <Headphones strokeWidth={1} className="h-12 w-12 " />,
        name: "Headphones",
    },
    {
        icon: <Smartphone strokeWidth={1} className="h-12 w-12  " />,
        name: "Smartphone",
    },
    {
        icon: <Router strokeWidth={1} className="h-12 w-12 " />,
        name: "Router",
    },
    {
        icon: <Watch strokeWidth={1} className="h-12 w-12  " />,
        name: "Watch",
    },
    {
        icon: <Speaker strokeWidth={1} className="h-12 w-12 " />,
        name: "Speaker",
    },
];
export  default  function Sidebar() {
    return (
      <>
<aside className="xl:w-[25%] fixed left-0 top-20 h-[calc(100vh-5rem)] z-10 xl:block hidden">
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
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {categories.map((item, index) => (
          <div
            className="h-36 w-40 bg-white rounded-md flex flex-col items-center justify-center text-sm shadow-sm hover:shadow-md transition cursor-pointer"
            key={index}
          >
            <button className="flex flex-col items-center gap-2 text-center cursor-pointer">
              <span>  {item.icon}</span>
              <span>    {item.name}</span>
            </button>        
          </div>
        ))}
      </div>

    </SwiperSlide>
  </Swiper>
</aside>
</ >

    );
}
