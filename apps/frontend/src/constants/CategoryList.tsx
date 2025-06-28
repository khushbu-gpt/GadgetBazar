
type CategoryItem = {
  icon:(size:number)=> ReactNode;
  name: string;
};
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
import { ReactNode } from "react";
export const categories: CategoryItem[] = [
  {
    icon: (size) => <Gamepad2 strokeWidth={1} size={size} />,
    name: "Remote",
  },
  {
    icon: (size) => <Monitor strokeWidth={1} size={size} />,
    name: "Monitor",
  },
  {
    icon: (size) => <Laptop strokeWidth={1} size={size} />,
    name: "Laptop",
  },
  {
    icon: (size) => <Plug strokeWidth={1} size={size} />,
    name: "Accessories",
  },
  {
    icon: (size) => <Camera strokeWidth={1} size={size} />,
    name: "Camera",
  },
  {
    icon: (size) => <Headphones strokeWidth={1} size={size} />,
    name: "Headphone",
  },
  {
    icon: (size) => <Smartphone strokeWidth={1} size={size} />,
    name: "Smartphone",
  },
  {
    icon: (size) => <Router strokeWidth={1} size={size} />,
    name: "Router",
  },
  {
    icon: (size) => <Watch strokeWidth={1} size={size} />,
    name: "SmartWatch",
  },
  {
    icon: (size) => 
      <Speaker
        strokeWidth={1}
         size={size}
      />,
    
    name: "Speaker",
  },
];
