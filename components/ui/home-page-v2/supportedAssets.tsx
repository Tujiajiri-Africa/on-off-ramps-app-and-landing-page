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
              <div 
            className="relative w-full h-full flex justify-center items-center bg-gradient-to-r bg-[#010203] overflow-hidden opacity-100"
            id="feature-list"
            style={{
                //background: 'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(198,45,253,1) 100%)'
            }}
            >

<div className="pt-0.5 sm:pt-20 2xl:w-[80%] lg:pt-40 w-[98%] mx-auto flex flex-col lg:flex-row mb-10">
  {/* :HERO MAIN */}
  <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-gray-600"> {/* Container */}
    {/* ::Hero Inner */}
    <div className="p-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
      {/* Hero Title */}
              <h1 className="py-10 text-4xl sm:text-7xl font-semibold tracking-wide leading-tight text-white">
                  {/* Effortless, <br/>fancy hero 12, <br/>made with love. */}
                  We support  <br /> a wide range <br/> of  <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]'><AssetTypes /></span>
              </h1>
      {/* Starting Price */}
        <p className="text-lg font-semibold text-gray-300 tracking-wide">
        {/* Four sizes, starting at $29 */}
            We empower you to have access to all the major stablecoins, other assets and currencies across Africa
        </p>

      {/* Buttons */}
      <div className="mt-4 ">
        <button className=" ">
            <a href="#" className="inline-flex  gap-4 justify-start items-center px-3 py-2 font-medium rounded leading-5 bg-gradient-to-r from-[#FDC707] to-[#F00FDA] text-primary-100 text-white hover:text-white hover:bg-green-700">
                Learn More <ArrowRightCircleIcon className="h-6 w-6 text-3xl cursor-pointer"/>
            </a>
           
        </button>
        {/* <button className="m-1.5 py-2.5 px-5 rounded-md bg-[#001431]  text-white font-semibold uppercase hover:text-teal-400 hover:border-teal-400">Join WaitList</button> */}
      </div>
    </div>
  </div>
  {/* :HERO ILLUSTRATION */}
  <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center overflow-hidden">
  <Carousel 
              className="w-full max-w-sm"
              plugins={[plugin.current]}
              //className="w-full max-w-xs"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              >
              <CarouselContent className="-ml-1">
                {
                  supportedAssets
                  .filter((s) => s.active == true)
                  .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
                  .map((asset) => (
                    <CarouselItem key={asset.value} className="pl-1 md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Card className="text-white border-none bg-transparent">
                          <CardContent className="flex aspect-square items-center justify-center p-6 gap-1">
                            
                              <Image 
                                  src={asset.icon.src} 
                                  width={45} height={45} 
                                  alt={`${asset.label}`} 
                                  className="rounded-full"
                                /> <br />
                              <p>{asset.label}</p>
                          </CardContent>
                        
                        </Card>
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
<span className="absolute top-0 right-0 -z-10">
        <svg 
            width="388" 
            height="250" 
            viewBox="0 0 388 220" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
                <path 
                    opacity="0.05" 
                    d="M203 -28.5L4.87819e-05 250.5L881.5 250.5L881.5 -28.5002L203 -28.5Z" 
                    fill="url(#paint0_linear_971_6910)">
                        </path>
                        <defs>
                            <linearGradient 
                                id="paint0_linear_971_6910" 
                                x1="60.5" 
                                y1="111" 
                                x2="287" 
                                y2="111" 
                                gradientUnits="userSpaceOnUse">
                                    <stop 
                                        offset="0.520507" 
                                        stopColor="white">
                                    </stop>
                                    <stop 
                                        offset="1" 
                                        stopColor="white" 
                                        stopOpacity="0">
                                    </stop>
                                        </linearGradient>
                        </defs>
                        </svg>
                    </span>
                    <span 
                        className="absolute top-0 right-0 -z-10">
                            <svg 
                            width="324" 
                            height="250" 
                            viewBox="0 0 324 220" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    opacity="0.05" 
                                    d="M203 -28.5L4.87819e-05 250.5L881.5 250.5L881.5 -28.5002L203 -28.5Z" fill="url(#paint0_linear_971_6911)"></path><defs><linearGradient id="paint0_linear_971_6911" x1="60.5" y1="111" x2="287" y2="111" gradientUnits="userSpaceOnUse"><stop offset="0.520507" stopColor="white"></stop><stop offset="1" stopColor="white" stopOpacity="0"></stop></linearGradient></defs></svg></span><span className="absolute top-4 left-4 -z-10"><svg width="43" height="56" viewBox="0 0 43 56" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><circle cx="40.9984" cy="1.49626" r="1.49626" transform="rotate(90 40.9984 1.49626)" fill="white"></circle><circle cx="27.8304" cy="1.49626" r="1.49626" transform="rotate(90 27.8304 1.49626)" fill="white"></circle><circle cx="14.6644" cy="1.49626" r="1.49626" transform="rotate(90 14.6644 1.49626)" fill="white"></circle><circle cx="1.49642" cy="1.49626" r="1.49626" transform="rotate(90 1.49642 1.49626)" fill="white"></circle><circle cx="40.9984" cy="14.6642" r="1.49626" transform="rotate(90 40.9984 14.6642)" fill="white"></circle><circle cx="27.8304" cy="14.6642" r="1.49626" transform="rotate(90 27.8304 14.6642)" fill="white"></circle><circle cx="14.6644" cy="14.6642" r="1.49626" transform="rotate(90 14.6644 14.6642)" fill="white"></circle><circle cx="1.49642" cy="14.6642" r="1.49626" transform="rotate(90 1.49642 14.6642)" fill="white"></circle><circle cx="40.9984" cy="27.8302" r="1.49626" transform="rotate(90 40.9984 27.8302)" fill="white"></circle><circle cx="27.8304" cy="27.8302" r="1.49626" transform="rotate(90 27.8304 27.8302)" fill="white"></circle><circle cx="14.6644" cy="27.8302" r="1.49626" transform="rotate(90 14.6644 27.8302)" fill="white"></circle><circle cx="1.49642" cy="27.8302" r="1.49626" transform="rotate(90 1.49642 27.8302)" fill="white"></circle><circle cx="40.9984" cy="40.9982" r="1.49626" transform="rotate(90 40.9984 40.9982)" fill="white"></circle><circle cx="27.8304" cy="40.9963" r="1.49626" transform="rotate(90 27.8304 40.9963)" fill="white"></circle><circle cx="14.6644" cy="40.9982" r="1.49626" transform="rotate(90 14.6644 40.9982)" fill="white"></circle><circle cx="1.49642" cy="40.9963" r="1.49626" transform="rotate(90 1.49642 40.9963)" fill="white"></circle><circle cx="40.9984" cy="54.1642" r="1.49626" transform="rotate(90 40.9984 54.1642)" fill="white"></circle><circle cx="27.8304" cy="54.1642" r="1.49626" transform="rotate(90 27.8304 54.1642)" fill="white"></circle><circle cx="14.6644" cy="54.1642" r="1.49626" transform="rotate(90 14.6644 54.1642)" fill="white"></circle><circle cx="1.49642" cy="54.1642" r="1.49626" transform="rotate(90 1.49642 54.1642)" fill="white"></circle></g>
        </svg>
    </span>
</div>
    </>


  )
}
