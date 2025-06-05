import { Navbar } from '@/layouts/Navbar';
import { ChevronRight, House } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Offers(){
    return(
        <>
        <Navbar/>
            <div className="w-full flex justify-center place-items-center bg-teal-50 h-100 flex-col">
                <h1 className='text-3xl font-bold py-5'>Offers</h1>
                <div className='flex justify-center items-center'>
                    {/* <button className='hover:text-teal-500'></button> */}
                    <Link href="/" className='hover:text-teal-500 text-sm flex justify-center items-center gap-2'><House className='text-sm'/>Home</Link>
                     <p  aria-disabled className=' text-xs flex justify-center items-center gap-2 text-gray-400'> <ChevronRight />Offers </p>
                </div>

                <div>
                <div className="blur- absolute top-0 left-0 h-full w-full bg-cover bg-center bg-no-repeat blur-sm">
                    <div>
                        <Image src={"/images/thumbnail-1.jpg"} width={100} height={100} alt="thumbnail"/>
                    </div>
                </div>
                </div>

            </div>
        </>
    )
}