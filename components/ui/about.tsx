import React from "react";
import AboutPageIllustration from '@/app/assets/logo/about-section-illustration-svg.svg'
import { Bars3Icon, BellIcon, XMarkIcon,ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import BuySellDashboardPageSVG from '@/app/assets/logo/backgroundImages/buy-sell-hero-page-svg.svg'
import WalletBananer from '@/app/assets/logo/backgroundImages/wallet-banner-png-2.png'
import AboutPageBananer from '@/app/assets/logo/backgroundImages/about-banner-png.png'
import AboutPageBanner_3 from '@/app/assets/logo/backgroundImages/about-banner-3-png.png'
import MainDashboard from '@/app/assets/logo/backgroundImages/dashboard-main.png'
import SellWithdrawIllustration from '@/app/assets/logo/backgroundImages/sell-withdraw-illustration.svg'

export default function About(){
    return (
        <>
        <div className="relative w-full h-full flex justify-center items-center bg-[#010203] overflow-hidden opacity-100" id="about">
            <div className="pt-0.5 sm:pt-20 lg:pt-40 w-[98%] mx-auto flex flex-col-reverse md:flex-row  ">
                <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center overflow-hidden">
                        {/* <img src={AboutPageIllustration.src} 
                            alt='illustration' 
                            //className="w-2/3 lg:w-full"
                            //bg-[#050520]
                            style={{
                                width: '100%',
                                height: '80%',
                                opacity: '100%'lg:flex-row
                            }}
                        /> */}
                        <Image
                          height={700}//
                          width={1024}
                          //src={AboutPageIllustration.src}
                          //src={BuySellDashboardPageSVG.src}
                          //src={WalletBananer.src}
                          //src={AboutPageBananer.src}
                          //src={AboutPageBanner_3.src}
                          //src={MainDashboard.src}
                          src={SellWithdrawIllustration.src}
                          alt='Logo'
                          className="rounded-md"
                  />
                            {/* <img src="https://fancytailwind.com/static/8b86283c874a1f43a78c79fe871525ff/d552e/illustration1.webp" alt="" className="w-2/3 lg:w-full" /> */}
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-gray-600"> {/* Container */}
    {/* ::Hero Inner */}
    <div className="p-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
      {/* Hero Title */}
        <h1 className="py-6 text-4xl sm:text-7xl font-semibold tracking-wide leading-tight text-white">
            {/* Effortless, <br/>fancy hero 12, <br/>made with love. */}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">Take back control </span> of your <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]" >financial freedom</span> today
        </h1>
      {/* Starting Price */}
        <p className="text-lg font-semibold text-gray-300 tracking-wide">
        {/* Four sizes, starting at $29 */}
          With AjiraPay, you get the best quotes for your crypto buy and sell orders, convert supported assets to your local currency in seconds for use in your day to day utilities
        </p>

      {/* Buttons */}
      <div className="mt-4 flex flex-col sm:flex-row items-center">
      <button className=" ">
            <a href="#" className="inline-flex  gap-4 justify-start items-center px-3 py-2 font-medium rounded leading-5 bg-gradient-to-r from-[#FDC707] to-[#F00FDA] text-primary-100 text-white hover:text-white hover:bg-green-700">
                Join WaitList <ArrowRightCircleIcon className="h-6 w-6 text-3xl cursor-pointer"/>
            </a>
            {/**TODO Arrow icon here */}
        </button>
        {/* <button className="m-1.5 py-2.5 px-5 rounded-md bg-[#001431]  text-white font-semibold uppercase hover:text-teal-400 hover:border-teal-400">Join WaitList</button> */}
      </div>
    </div>
  </div>
            </div>
        </div>
        </>
        )
}