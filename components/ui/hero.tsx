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
import backgroundImage3 from '@/app/assets/backgrounds/264.jpg'
import backgroundImage5 from '@/app/assets/backgrounds/oooscillate_4.svg'

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

export default function Hero(){
    return (
        <>
          <div 
            className="bg-[#010203] relative w-full h-full flex justify-center items-center  overflow-hidden opacity-100"
            id="hero"
            style={{
                //background: 'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(198,45,253,1) 100%)'
                //bg-[#081e1c]
                //#0d1117
                //010203
            }}
            >
{/* <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#050520_1px,#00091d_1px)] bg-[size:20px_20px]"></div> */}
<div className="pt-0.5 sm:pt-1.5  md:pt-1.5  lg:pt-1.5 w-[98%] mx-auto flex flex-col lg:flex-row">
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
              Your <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">gateway </span><br />to crypto <br /><span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]"><ProductOffering /> </span> 
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
              height={300}
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
</div>
</div>
            
        </>
        
        )
}