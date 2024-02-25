import React from "react";
import BuyCryptoDesignSVG from '../../app/assets/logo/buy-crypto-design-svg.svg'

export default function Hero(){
    return (
        <>
          <div 
            className="relative w-full h-full flex justify-center items-center bg-[#010203] overflow-hidden opacity-100"
            style={{
                //background: 'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(198,45,253,1) 100%)'
            }}
            >

<div className="pt-0.5 sm:pt-20 lg:pt-40 w-[98%] sm:w-[80%] md:w-[80%] lg:w-[80%] mx-auto flex flex-col lg:flex-row">
  {/* :HERO MAIN */}
  <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-gray-600"> {/* Container */}
    {/* ::Hero Inner */}
    <div className="p-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
      {/* Hero Title */}
        <h1 className="py-10 text-3xl sm:text-7xl font-semibold tracking-wide leading-tight text-white">
            {/* Effortless, <br/>fancy hero 12, <br/>made with love. */}
            A seamless <span className="text-[#00BF63]" >crypto to fiat </span> onboarding with <span className="text-[#06F0FF]">instant settlement</span> in your <span className="text-[#00BF63]">local currency</span>
        </h1>
      {/* Starting Price */}
        <p className="text-lg font-semibold text-gray-300 tracking-wide">
        {/* Four sizes, starting at $29 */}
            <span className="text-[#00BF63]" >Buy</span>, <span className="text-[#00BF63]">Sell</span> and <span className="text-[#00bf63]">Swap 70+ </span>supported assets in <span className="text-[#00BF63]">150+</span> jurisdictions
        </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-row sm:flex-row items-center">
        <button 
            className="m-1.5 py-2 px-2 rounded-md bg-[#5B21B6] text-white font-semibold uppercase hover:bg-[#00BF63]"
            style={{
                //background: 'linear-gradient(#593690 50%, #DB1B9A 75%, #9A1AAF 100%);',
                //background: 'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(198,45,253,1) 100%)'
            }}
            >
            Coming Soon
        </button>
        <button className="m-1.5 py-2 px-3 rounded-md bg-[#001431]  text-white font-semibold uppercase hover:text-teal-400 hover:border-teal-400">Join WaitList</button>
      </div>
    </div>
  </div>
  {/* :HERO ILLUSTRATION */}
  <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center overflow-hidden">
    <img src={BuyCryptoDesignSVG.src} 
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