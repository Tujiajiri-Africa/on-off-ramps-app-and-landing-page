'use client'

import * as React from "react"
import { Bars3Icon, BellIcon, XMarkIcon,ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {supportedAssets} from '@/helpers/data'
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import { TypeAnimation } from 'react-type-animation';

const AssetTypes = () => {
  return (
    <>
     <TypeAnimation
    sequence={['stablecoins', 3000, 'currencies', 3000, 'assets', 3000]}
    // 
    //style={{ fontSize: '1em' }}
    cursor={false}
    repeat={Infinity}
    speed={10}
    //key={}
    //preRenderFirstString
    />
    </>
  )
}

export function SupportedAssetsV2() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <>
    <section id="supported-assets" className="relative  bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50  px-2 py-10 h-full lg:h-screen content-center shadow-md">
    <div className="2xl:w-[80%] md:pt-1.5  lg:pt-1.5 w-[98%] mx-auto bg-inherit">
        <p className="text-center text-base font-semibold leading-7 text-primary-500">Supported Assets</p>
        <h2 className="text-center font-display text-4xl sm:text-7xl font-bold leading-tight text-slate-900 md:text-4xl ">
            Supported Assets
        </h2>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
        {/* <h2 className="text-center font-display text-4xl sm:text-7xl font-bold leading-tight text-slate-900 md:text-4xl ">
            How to get started
        </h2> */}
            {/* <p className="max-w-2xl mx-auto mt-4 text-base text-gray-400 leading-relaxed md:text-2xl">
                We believe there should be no barrier to your adoption of crypto across Africa
            </p> */}
            <p className="mt-1.5 text-sm leading-6 text-secondary-500">We support a wide range of stablecoins, major crypto coins and fiat currencies across 20 African jurisdictions</p>
        </div>
        <div className="relative mt-12 lg:mt-20 max-w-2xl mx-auto">
        <Carousel 
              //className="w-full max-w-sm"
              plugins={[plugin.current]}
              //className="w-full max-w-xs"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              >
              <CarouselContent className="-ml-1 bg-transparent">
                {
                  supportedAssets
                  .filter((s) => s.active == true)
                  .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
                  .map((asset) => (
                    <CarouselItem key={asset.value} className="pl-1 md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <div className="text-slate-900 border-none bg-transparent">
                          <CardContent className="flex aspect-square items-center justify-center p-2 gap-1">
                            
                              <Image 
                                  src={asset.icon.src} 
                                  width={45} height={45} 
                                  alt={`${asset.label}`} 
                                  className="rounded-full"
                                /> <br />
                              <p>{asset.label}</p>
                          </CardContent>
                        
                        </div>
                      </div>
                  </CarouselItem>
                  
                  ))
                }
                {/* {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-2xl font-semibold">{index + 1}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))} */}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
        </div>
    </div>
    <div className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
        style={{background: "radial-gradient(1.89deg, rgba(34, 78, 95, 0.4) -1000%, rgba(191, 227, 205, 0.26) 1500.74%, rgba(34, 140, 165, 0.41) 56.49%, rgba(28, 47, 99, 0.11) 1150.91%)"}}>
    </div>
    </div>

</section>
    </>


  )
}
