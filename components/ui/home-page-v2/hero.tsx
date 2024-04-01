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
    sequence={['off ramping', 1000, 'on ramping', 1000, 'payments', 1000, 'invoicing', 1000, 'subscriptions', 1000, 'streaming', 1000]}
    // 
    //style={{ fontSize: '1em' }}
    cursor={false}
    repeat={Infinity}
    speed={10}
    //key={}
    preRenderFirstString
    />
    </>
  )
}

export default function HeroPage2(){
    return (
        <>
  <div
  className="flex  w-full h-screen sm:h-full flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
  <a href=""
    className="border border-white-700 dark:border-gray-300 rounded-lg py-2 px-4 text-white-400 dark:text-gray-300 text-sm mb-5 transition duration-300 ease-in-out hover:text-gray-500 dark:hover:text-gray-400">
    {/* Forget about spending hundreds $  flex justify-center items-center  overflow-hidden*/}
    Enhancing crypto adoption across Africa 

  </a>
  <h1
    className="mx-auto w-[96%] sm:max-w-3xl font-display text-5xl font-bold tracking-normal text-white-300 dark:text-gray-300 sm:text-7xl">
    Your Gateway To Crypto <br />
    {/* Crypto <br /> */}
    <span className="relative whitespace-nowrap text-white-600 dark:text-gray-300"> <span className="text-[#F00FDA]"> <ProductOffering /></span> </span> <br />
    <span className="relative whitespace-nowrap text-orange-500 dark:text-orange-300">
      <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-orange-500 dark:fill-orange-300/60" preserveAspectRatio="none">
        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z"></path>
      </svg>
      {/* <span className="relative">with AI</span> */}
      <span className="relative">in Africa</span> <br />
    </span>
    {/* made easy */}
  </h1>
  <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-white-400 text-white-500 dark:text-gray-300 leading-7">
    {/* Experience the future of insurance with our cutting-edge AI tool. From underwriting to claims processing, our
    intelligent system streamlines and enhances every aspect of your insurance operations.  */}
    {/* Buy,Sell,Send,Receive,BTC,USDT,USDC,ETH,SOL,cUSD,PYUSD and other supported assets in 20+ jurisdictions across Africa */}

    Seamlessly buy, sell, send, receive BTC, USDT, USDC, cUSD, PYUSD, ETH, SOL and other supported crypto assets in 20+ jurisdictions across Africa using your local mobile money payment channel or bank transfer 
    {/* Create and manage crypto invoice and subscriptions with ease */}
  </h2>
  <a className="bg-orange-600 dark:bg-gray-800 rounded-xl text-white dark:text-gray-300 font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-orange-500 dark:hover:bg-gray-600 transition"
    href="">Coming Soon</a>
</div>
{/* <div className="flex justify-center mb-6">
          <img
            src="https://pagedone.io/asset/uploads/1691054543.png"
            alt="Dashboard image"
          />
        </div> */}
        </>
        
        )
}