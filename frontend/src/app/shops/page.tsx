
import { Navbar } from "@/layouts/Navbar";
import Image from "next/image"
type ShopCardProps = {
    image: string;
    title: string;
    address: string;
  };

export default function Shops(){

    const data=[
        { image:"/images/Medicine.webp" ,title:"Medicine",address:"East Avenue 1743, West Tower, New York, Manhattan, 12332, United States"},
        { image:"/images/Gadget.webp" ,title:"Gadget",address:"1740 Bedford Street, Alabama, Michigan, 35203, USA"},
        { image:"/images/Grocery.webp" ,title:"Grocery",address:"1986 Spinnaker Lane, Illinois, Freeport, 61032, USA"},
        { image:"/images/Makeup.webp" ,title:"Makeup",address:"2960 Rose Avenue, Louisiana, Metairie, 70001, USA"},
        { image:"/images/fashion.webp" ,title:"Fashion",address:"4885 Spring Street, Illinois, Lincoln, 62656, USA"},
        { image:"/images/Books.webp" ,title:"Books Shop",address:"44444, California, zurich, 8021, Switzerland"},

      ]
  
return (
    <>
    <Navbar/>
    <div className=" ">
        <h1 className="font-bold text-2xl text mt-36 text-center">All Shops</h1>
        <div className="flex flex-wrap gap-5 justify-center items-center my-10">
        {data.map((item,i)=>{
           return( 
           <ShopCard  key={i} image={item.image} title={item.title} address={item.address}/>
           )
        })}
        </div>
    </div>

    </>
)
}


export function ShopCard({image,title,address}:ShopCardProps){
 return(
    <div className="lg:w-72 md:w-84 xl:w-96  bg-teal-50 flex justify-center items-center gap-5 p-5  rounded-md border-1 m-5 sm:m-0">
            <Image src={image} height={75} width={75} alt="gadget-logo" className="rounded-full"/>
        <div className="right ">
                <p className="font-bold  text-lg">{title}</p>
                <p className="text-xs">{address}</p>
        </div>
    </div>
 )
}