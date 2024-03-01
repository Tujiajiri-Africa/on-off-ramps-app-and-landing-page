import React from "react";
import SellSwapBannerSVG from '../../app/assets/logo/sell-swap-banner-svg.svg'
import SellSwapBannerGraySVG from '../../app/assets/logo/sell-wap-banner-svg-gray.svg'
import SellSwapBannerLightGreenSVG from '../../app/assets/logo/sell-wap-banner-svg-light-green.svg'
import SellSwapBannerLightDarkSVG from '../../app/assets/logo/sell-swap-banner-light-dark-svg.svg'

import { Bars3Icon, BellIcon, XMarkIcon,ArrowRightCircleIcon } from '@heroicons/react/24/outline'

export default function Features(){
    return (
        <>
          <div 
            className="relative w-full h-full flex justify-center items-center bg-gradient-to-r bg-[#010203] overflow-hidden opacity-100"
            style={{
                //background: 'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(198,45,253,1) 100%)'
            }}
            >

<div className="pt-0.5 sm:pt-20 lg:pt-40 w-[98%] mx-auto flex flex-col lg:flex-row">
  {/* :HERO MAIN */}
  <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-gray-600"> {/* Container */}
    {/* ::Hero Inner */}
    <div className="p-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
      {/* Hero Title */}
        <h1 className="py-10 text-4xl sm:text-7xl font-semibold tracking-wide leading-tight text-white">
            {/* Effortless, <br/>fancy hero 12, <br/>made with love. */}
            Experience <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">secure</span> and <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">compliant</span> crypto onboarding <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]"> like a pro</span>
        </h1>
      {/* Starting Price */}
        <p className="text-lg font-semibold text-gray-300 tracking-wide">
        {/* Four sizes, starting at $29 */}
        We have partnered with the best industry leaders to ensure that we bring you the most compliant crypto experience in more than 20+ jurisdictions across Africa with support for bank and mobile money.
        </p>

      {/* Buttons */}
      <div className="mt-4 ">
        <button className=" ">
            <a href="#" className="inline-flex  gap-4 justify-start items-center px-3 py-2 font-medium rounded leading-5 bg-gradient-to-r from-[#FDC707] to-[#F00FDA] text-primary-100 text-white hover:text-white hover:bg-green-700">
                Learn More <ArrowRightCircleIcon className="h-6 w-6 text-3xl cursor-pointer"/>
            </a>
            {/**TODO Arrow icon here */}
        </button>
        {/* <button className="m-1.5 py-2.5 px-5 rounded-md bg-[#001431]  text-white font-semibold uppercase hover:text-teal-400 hover:border-teal-400">Join WaitList</button> */}
      </div>
    </div>
  </div>
  {/* :HERO ILLUSTRATION */}
  <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center overflow-hidden">
    <img src={SellSwapBannerSVG.src} 
        alt='illustration' 
        //className="w-2/3 lg:w-full"
        style={{
            width: 'auto',
            height: 'auto'
        }}
        />
     {/* <img src="https://fancytailwind.com/static/8b86283c874a1f43a78c79fe871525ff/d552e/illustration1.webp" alt="" className="w-2/3 lg:w-full" /> */}
  </div>
</div>
</div>
            
        </>
        
        )
}