import React from 'react'
import Image from 'next/image'
import AboutPageIllustration from '@/app/assets/backgrounds/about-svg.png'
import CollabConceptIllustration from '@/app/assets/backgrounds/collab-concept-illustration-removebg-preview.png'
import { Card, CardContent } from '@/components/ui/card'

export function AboutPageV2(){
    return (<>
    <div className="relative  bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50  px-2 py-10 h-full sm:h-screen content-center" id="about">
    <div className="2xl:w-[80%] md:pt-1.5  lg:pt-1.5 w-[98%] mx-auto bg-inherit">
    <div className="relative mt-12 lg:mt-20 grid gri-cols-2 sm:grid-cols-2">
        <div className="image object-center text-center col-span-1">
            <Image 
                //src="https://i.imgur.com/WbQnbas.png" 
                //src={AboutPageIllustration.src}
                src={CollabConceptIllustration.src}
                height={300}
                width={500}
                alt={'about'}
                />
        </div>
        <div className='col-span-1'>
        <p className="text-center text-base font-semibold leading-7 text-primary-500">About Us</p>
        <h2 className="text-center font-display text-4xl sm:text-7xl font-bold leading-tight text-slate-900 md:text-4xl mb">
            Who We Are
        </h2>
             {/* <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">About <span className="text-indigo-600">Our Company</span>
            </h2>  */}
            <Card>
                <CardContent>
                <p className="mt-1.5 text-sm leading-6 text-secondary-500">
       
       We have challenged ourselves to bring blockchain technology and cryptocurrency to the unbanked and underbanked African community combining it with the existing local payment channels to connect the African continent to the global digital financial ecosystem with a strict focus on compliance and real-world usecase of these powerful technologies to positively impact the lives of our users and the communities around us

       </p>
                </CardContent>
            </Card>

        </div>
        </div>
    </div>
    {/* <div className="sm:w-1/2 p-10 bg-inherit">
        <div className="image object-center text-center">
            <Image 
                //src="https://i.imgur.com/WbQnbas.png" 
                //src={AboutPageIllustration.src}
                src={CollabConceptIllustration.src}
                height={200}
                width={680}
                alt={'about'}
                />
        </div>
    </div>
    <div className="sm:w-1/2 p-5">
        <div className="text">
        <p className="text-center text-base font-semibold leading-7 text-primary-500">About Us</p>
        <h2 className="text-center font-display text-4xl sm:text-7xl font-bold leading-tight text-slate-900 md:text-4xl ">
            Who We Are
        </h2>
             <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">About <span className="text-indigo-600">Our Company</span>
            </h2> 
     
     <p className="mt-1.5 text-sm leading-6 text-secondary-500">
       
       We have challenged ourselves to bring blockchain technology and cryptocurrency to the unbanked and underbanked African community combining it with the existing local payment channels to connect the African continent to the global digital financial ecosystem with a strict focus on compliance and real-world usecase of these powerful technologies to positively impact the lives of our users and the communities around us

       </p>
        </div>
    </div> */}
</div>
    </>)
}