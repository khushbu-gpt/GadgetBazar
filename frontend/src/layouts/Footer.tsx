import { Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"


type FooterItems = {
    title: React.ReactNode,
    lists: React.ReactNode[]

}
const data = [
    {
        title: <Image
            src="/images/logo.webp"
            alt="Company Logo"
            width={150}
            height={150}
            // className="w-84 bg-contain"
        />,
        lists: ["New York, USA", "demo@demo.com",
            <div className="flex gap-2">
                <Facebook /><Twitter /><Instagram />
            </div>]
    },
    {
        title: "Explore",
        lists: ["Shops", "Authors", "Flash Deals", "Coupon"]
    },
    {
        title: "Customer Service",
        lists: ["FAQ & Helps", "Vendor Refund Policies", " Customer Refund Policies"]
    },
    {
        title: "Our Information",
        lists: ["Manufacturers", "Privacy policies", "Terms & conditions", "Contact Us"]
    },
    {
        title: "Subscribe Now",
        lists: ["Subscribe your email for newsletter and featured news based on your interest"]
    },

]

export default function Footer() {
    return (
        <>
            <footer className="bottom-0 w-full bg-white grid  xl:grid-cols-5 justify-center md:px-10 md:py-20  px-5 py-10 border md:grid-cols-3 sm:grid-cols-2  grid-cols-1">
                {data.map((item, i) => {
                    return (
                        <FooterItems key={i} title={item.title} lists={item.lists} />)
                })
                }
            </footer>
        </>
    )
}
export function FooterItems({ title, lists }: FooterItems) {
    return (
        <section className="my-4">
            <h2 className="font-semibold text-lg">{title}</h2>
            <ul className="list-none text-sm gap-2 mt-2">
                {lists.map((e, i) => {
                    return <li className="py-2   text-sm" key={i}>{e}</li>
                })}
            </ul>
        </section>
    )
}

