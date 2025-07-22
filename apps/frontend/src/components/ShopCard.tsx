import Image from "next/image";
type ShopCardProps = {
  image: string;
  title: string;
  address: string;
};
export default function ShopCard({ image, title, address }: ShopCardProps) {
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