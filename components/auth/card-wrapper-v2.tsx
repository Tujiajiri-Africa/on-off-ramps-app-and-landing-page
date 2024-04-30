'use client'

import React, {useRef, useEffect, useState} from 'react'
import { 
    Card,
    CardContent, 
    CardHeader, 
    CardTitle,
    CardDescription
}from '@/components/ui/card'
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import Link from 'next/link'
import Logo from '@/app/assets/logo/nana-pay-logo-color.png'
import Image, { ImageProps, StaticImageData } from 'next/image'
import { Transition } from '@headlessui/react'
import {AccessibilityIcon, AArrowUpIcon, ALargeSmall, ArrowBigDownDash} from 'lucide-react'

import BackgroundIntroImage from '@/app/assets/backgrounds/auth/intro-page-image-1-svg.svg'
import BackgorundImage6 from '@/app/assets/backgrounds/about-page-3-removebg-preview.png'

interface Item {
    img?: StaticImageData
    desc?: string
    buttonIcon?: ImageProps//StaticImageData
}

interface CardWrapperProps{
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
    headerDescription? : string;
    shouldPositionDescriptionAtCenter? : boolean;
    shouldExtendLargeScreen?: boolean;
}

export type ProductIntroItemProps = {
    label: string;
    description? :string;
}

export const productIntroItems: ProductIntroItemProps[] = [
    {
        label: "Create Invoices",
        description: "Say goodbye to manual invoices"
    },
    {
        label: "No charge backs",
        description: "No more loosing money to frauds"
    }
]

export const productSliderItems: Item[] = [
    {
        desc: "Invoicing",
        //buttonIcon: AccessibilityIcon,
        img: BackgroundIntroImage
    },
    {
        desc: "Buy Crypto",
        //buttonIcon: ArrowBigDownDash,
        img: BackgorundImage6
    }
]

export function ProgressSlider({ items }: { items: Item[] }) {
    const duration: number = 5000
    const itemsRef = useRef<HTMLDivElement>(null)
    const frame = useRef<number>(0)
    const firstFrameTime = useRef(performance.now())
    const [active, setActive] = useState<number>(0)
    const [progress, setProgress] = useState<number>(0)
  
    useEffect(() => {
      firstFrameTime.current = performance.now()
      frame.current = requestAnimationFrame(animate)
      return () => {
        cancelAnimationFrame(frame.current)
      }
    }) //[animate, active]
  
    const animate = (now: number) => {
      let timeFraction = (now - firstFrameTime.current) / duration
      if (timeFraction <= 1) {
        setProgress(timeFraction * 100)
        frame.current = requestAnimationFrame(animate)
      } else {
        timeFraction = 1
        setProgress(0)
        setActive((active + 1) % items.length)
      }
    }
  
    const heightFix = () => {
      if (itemsRef.current && itemsRef.current.parentElement) itemsRef.current.parentElement.style.height = `${itemsRef.current.clientHeight}px`
    }
  
    useEffect(() => {
      heightFix()
    }, [])
  
    return (
      <div className="w-full max-w-5xl mx-auto text-center">
        {/* Item image */}
        <div className="transition-all duration-150 delay-300 ease-in-out">
          <div className="relative flex flex-col" ref={itemsRef}>
  
            {items.map((item, index) => (
              <Transition
                key={index}
                show={active === index}
                enter="transition ease-in-out duration-500 delay-200 order-first"
                enterFrom="opacity-0 scale-105"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in-out duration-300 absolute"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                beforeEnter={() => heightFix()}
              >
                <img 
                    className="rounded-xl" 
                    src={item.img?.src} 
                    width={1024} 
                    height={576} 
                    alt={item.desc} 
                />
              </Transition>
            ))}
  
          </div>
        </div>
        {/* Buttons */}
        <div className="max-w-xs sm:max-w-sm md:max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
  
          {items.map((item, index) => (
            <button
              key={index}
              className="p-2 rounded focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 group"
              onClick={() => { setActive(index); setProgress(0) }}
            >
              <span className={`text-center flex flex-col items-center ${active === index ? '' : 'opacity-50 group-hover:opacity-100 group-focus:opacity-100 transition-opacity'}`}>
                <span className="flex items-center justify-center relative w-9 h-9 rounded-full bg-indigo-100 mb-2">
                  {/* <img src={item?.buttonIcon.src} alt={item?.desc} /> */}
                  {/* {item.desc} */}
                </span>
                <span className="block text-sm font-medium text-slate-900 mb-2">{item.desc}</span>
                <span className="block relative w-full bg-slate-200 h-1 rounded-full" role="progressbar" aria-valuenow={active === index ? progress : 0}>
                  <span className="absolute inset-0 bg-blue-600 rounded-[inherit]" style={{ width: active === index ? `${progress}%` : '0%' }}></span>
                </span>
              </span>
            </button>
          ))}
  
        </div>
      </div>
    )
  }

export function CarouselPlugin() {
    const plugin = useRef(
      Autoplay({ delay: 2000, stopOnInteraction: true })
    )
   
    return (
        <>
            <main className="relative min-h-screen flex flex-col justify-center overflow-hidden"
            ///bg-slate-50
            >
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        <div className="flex justify-center">

          <ProgressSlider items={productSliderItems} />

        </div>
      </div>
    </main>
            {/* <div className='items-center flex max-w-[400px]'>
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full max-w-xs"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent
                    //className='w-full'
                    >
                    {productIntroItems.map((item, index) => (
                        <CarouselItem key={index}>
                        <div className="p-1">
                            <div>
                            <div className="flex flex-col  justify-center p-6"
                            //aspect-square items-center
                            >
                                <span className="text-4xl font-semibold">
                                    {item.label}
                                </span> <br />
                                <span className='text-sm'>
                                    {item.description}
                                </span>
                            </div>
                            </div>

                        </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>    
            </div> */}

        </>

    )
  }

export const AuthCardWrapperWithIntroBackground = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
    headerDescription,
    shouldPositionDescriptionAtCenter,
    shouldExtendLargeScreen
    }: CardWrapperProps)=>{
    return (
        <>
                <CardContent className="flex justify-center text-gray-700"
        //bg-gray-100 text-gray-900 h-full lg:min-h-screen min-h-screen 
        >
            <div className={`${shouldExtendLargeScreen ? '2xl:max-w-screen-2xl' : ""}  max-w-screen-xl mx-auto m-0 sm:m-10 bg-white shadow-2xl rounded-lg flex justify-center flex-1`}
            //2xl:max-w-screen-2xl 
            >
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex text-center justify-center ">
                    <Image 
                        src={Logo.src} 
                        width={80} 
                        height={80}  
                        className="rounded-full mx-auto mb-2" 
                        alt="logo"
                        //w-28
                    />
            </div>
                  <CardTitle className='text-lg sm:text-2xl  mt-2 font-extrabold text-start sm:text-center items-center'
                  //sm:text-center 
                  >
                      {headerLabel}
                  </CardTitle>
                  <CardDescription className={`text-sm text-muted-foreground ${shouldPositionDescriptionAtCenter ? 'sm:text-center' : 'text-start'} 2xl:text-center`}
                  //sm:text-center sm:text-center
                  >
                      {headerDescription}
                  </CardDescription>

            <div className="mt-4 flex flex-col items-center">
                <div className="w-full flex-1 mt-8">
                    <div className="mx-auto max-w-[600px]"
                    //max-w-xs
                    >

                            {children}
                            <div className="mt-6">
                            {
                                showSocial &&
                                (
                                    <>
                                        <Social />
                                    </>

                                )
                            }
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm items-center">
                                <Link href={backButtonHref} className="font-medium text-blue-600 hover:text-blue-500">
                                    {backButtonLabel}
                                </Link>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${BackgroundIntroImage.src})`,
                }}>
                  
                  {/* <CarouselPlugin /> */}

            </div>
        </div>
            </div>
        </CardContent>
        </>
    )
}