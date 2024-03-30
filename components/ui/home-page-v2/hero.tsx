'use client'
import React from "react";
import BuyCryptoDesignSVG from '@/app/assets/logo/buy-crypto-design-svg.svg'
//import HomeBgElementImage from '../../app/assets/logo/backgroundImages/home-bg-element-1.svg'
//import HomeBgElementImage2 from '../../app/assets/logo/backgroundImages/home-page-bg-lights.webp'
//import HomeBgElementImage3 from '../../app/assets/logo/backgroundImages/3.avif'
import BuyDashboardPage from '@/app/assets/logo/backgroundImages/sell-on-dashboard.svg'
import BuySellDashboardPage from '@/app/assets/logo/backgroundImages/buy-sell-with-dashboard.png'
import BuySellDashboardPageSVG from '@/app/assets/logo/backgroundImages/buy-sell-hero-page-svg.svg'

import curve from '@/app/assets/hero/curve.png'
import Link from "next/link";
import { ReactTyped } from "react-typed";
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image'
import {Button} from '@/components/ui/button'
import backgroundImage from '@/app/assets/backgrounds/oooscillate_3.svg'
import backgroundImage2 from '@/app/assets/backgrounds/rrrepeat.svg'
import backgroundImage4 from '@/app/assets/backgrounds/rrreflection.svg'
import backgroundImage3 from '@/app/assets/backgrounds/183.jpg'
import backgroundImage5 from '@/app/assets/backgrounds/oooscillate_4.svg'
import homepagebglightwebpg from '@/app/assets/logo/backgroundImages/abstract-7561993_1280.png'
import wave from '@/app/assets/backgrounds/website-curve-9.svg'

const HeroSubTextAnimationComponent = () => {
  return (
  <>
   <TypeAnimation
  sequence={['fiat to crypto', 3000, 'crypto to fiat', 3000]}
  //style={{ fontSize: '1em' }}
  cursor={false}
  repeat={Infinity}
  speed={10}
  //key={}
  preRenderFirstString
/>
    {/* // <div> */}
    {/* <ReactTyped strings={["Here you can find anything"]} typeSpeed={40} />
    <br /> */}

    {/* <ReactTyped
      strings={[
        "fiat to crypto",
        "crypto to fiat"
      ]}
      typeSpeed={60}
      backSpeed={50}
      showCursor={true}
      //fadeOut
      //attr="placeholder"
      loop
      //className="text-wrap"
    >
    
    </ReactTyped> */}
  {/* </div> */}
  </>

  )
}

const ProductOffering = () => {
  return (
    <>
     <TypeAnimation
    sequence={['off ramping', 3000, 'on ramping', 3000, 'payments', 3000, 'invoicing', 3000, 'subscriptions', 3000]}
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

export default function HeroPage2(){
    return (
        <>
          <div 
            className="bg-[#d85829]  relative w-full h-screen flex justify-center items-center  overflow-hidden opacity-100 bg-hero bg-no-repeat bg-cover bg-center bg-fixed"
            id="hero"
            style={{
                //backgroundImage: `url(${wave.src})`,
                //backgroundRepeat: 'repeat',
                //backgroundSize: 'cover',
                //width: '100%',
                //bottom: 0,
                //position: 'relative',
                //display: 'block',
                //width: 'calc(300% + 1.3px)',
                //height: '371px',
            }}
            >
{/* <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#050520_1px,#00091d_1px)] bg-[size:20px_20px]"></div> */}
<div className="pt-0.5 sm:pt-1.5 2xl:w-[80%] md:pt-1.5  lg:pt-1.5 w-[98%] mx-auto flex flex-col lg:flex-row">
  {/* :HERO MAIN */}
  <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-gray-600"> {/* Container */}
    {/* ::Hero Inner */}
    <div className="p-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
      {/* Hero Title */}
        <h1 className="py-10 text-4xl sm:text-7xl font-semibold tracking-wide leading-tight text-white ">
            {/* A seamless <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]" >
              <br />
              <HeroSubTextAnimationComponent /> 
              <br />

              </span> onboarding with <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">instant settlement</span> in your <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">local currency</span> */}
              {/* Your <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">
                gateway </span><br />to crypto <br />
                <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]"><ProductOffering /> </span>  */}
                Your gateway to crypto payments
              <br/>
                <span className="inline-block relative">
            in Africa{" "}
              <Image
                src={curve.src}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span><br/> 
            and beyond
        </h1>
      {/* Starting Price */}
        <p className="text-lg font-semibold text-gray-300 tracking-wide">
        {/* Four sizes, starting at $29 */}
            <span className="text-[#00BF63]" >Buy</span>, <span className="text-[#00BF63]">Sell</span>, <span className="text-[#00BF63]">Send</span> , <span className="text-[#00BF63]">Receive </span> and <span className="text-[#00bf63]">Swap 70+ </span>supported assets in <span className="text-[#00BF63]">20+</span> jurisdictions across Africa
        </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-row sm:flex-row items-center">
        <Button 
        //href="/register"
            className="m-1.5 py-2 px-2 rounded-md bg-gradient-to-r from-[#FDC707] to-[#F00FDA] text-white  hover:text-white hover:bg-green-700"
            //className="bg-[#00BF63] m-1.5 py-2 px-2 rounded-md text-white hover:text-white font-semibold hover:bg-green-700"
            style={{
                //background: 'linear-gradient(#593690 50%, #DB1B9A 75%, #9A1AAF 100%);',
                //background: 'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(198,45,253,1) 100%)'
                //font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]
            }}
            >
            Coming Soon
        </Button>
        <Button className="m-1.5 py-2 px-3 rounded-sm bg-[#00BF63] text-white  hover:bg-slate-900 hover:border-teal-400">Join Waitlist</Button>
      </div>
    </div>
  </div>
  {/* :HERO ILLUSTRATION button color font-semibold */}
  <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center overflow-hidden">
        <Image
              height={250}
              width={320}
              //src={BuyCryptoDesignSVG.src}
              src={BuyDashboardPage.src}
              //src={BuySellDashboardPage.src}
              //src={BuySellDashboardPageSVG.src}
              alt='Logo'
              className="rounded-md"
                  />
    {/* <img src={BuyCryptoDesignSVG.src} 
        alt='illustration' 
        //className="w-2/3 lg:w-full"
        style={{
            width: 'auto',
            height: '90%'
        }}
        /> */}
     {/* <img src="https://fancytailwind.com/static/8b86283c874a1f43a78c79fe871525ff/d552e/illustration1.webp" alt="" className="w-2/3 lg:w-full" /> */}
  </div>
  {/* <span className="absolute top-0 right-0 -z-10">
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
    </span> */}
</div>

</div>
            
        </>
        
        )
}