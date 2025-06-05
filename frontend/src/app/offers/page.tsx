import Footer from '@/layouts/Footer';
import { Navbar } from '@/layouts/Navbar';
import { ChevronRight, House } from 'lucide-react';
import Link from 'next/link';

export default function Offers(){
    return(
        <>
        <Navbar/>
            <div className="w-full flex  bg-teal-50 flex-col">
                <section className=' h-100 w-full flex justify-center place-items-center flex-col'>
                <h1 className='text-3xl font-bold py-5'>Offers</h1>
                <div className='flex justify-center items-center'>
                    {/* <button className='hover:text-teal-500'></button> */}
                    <Link href="/" className='hover:text-teal-500 text-sm flex justify-center items-center gap-2'><House className='text-sm'/>Home</Link>
                     <p  aria-disabled className=' text-xs flex justify-center items-center gap-2 text-gray-400'> <ChevronRight />Offers </p>
                </div>
                </section>
           <Footer/>
            </div>
        </>
    )
}