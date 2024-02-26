import React from 'react'
import { Bars3Icon, BellIcon, XMarkIcon,ArrowRightCircleIcon } from '@heroicons/react/24/outline'


export default function FeatureList(){
    return (
        <>
        <div className='relative w-full h-full flex justify-center items-center bg-[#081e1c] overflow-hidden opacity-100'>
            <div className="pt-0.5 sm:pt-20 lg:pt-40 w-[98%] sm:w-[80%] md:w-[80%] lg:w-[80%] mx-auto flex flex-col lg:flex-row">
            <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center overflow-hidden"> {/* Container */}
   
    <div className="p-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
      
        <h1 className="py-10 text-3xl sm:text-7xl font-semibold tracking-wide leading-tight text-white">
           
            <span className="text-[#00BF63]">Achieve</span> your <span className="text-[#00BF63]">web3 financial goals </span> with our <span className="text-[#06F0FF]">tailor-made features</span>
        </h1>
     
        <p className="text-lg font-semibold text-gray-300 tracking-wide">
       
        With AjiraPay, you have a variety of options to chose from to aid your financial success  journey in web3
        </p>

      {/* Buttons */}
      <div className="mt-4 ">
        <button className=" ">
            <a href="#" className="inline-flex  gap-4 justify-start items-center px-3 py-2 font-medium rounded leading-5 bg-green-500 text-primary-100 text-white hover:text-white hover:bg-green-700">
                Learn More <ArrowRightCircleIcon className="h-6 w-6 text-3xl cursor-pointer"/>
            </a>
           
        </button>
        {/* <button className="m-1.5 py-2.5 px-5 rounded-md bg-[#001431]  text-white font-semibold uppercase hover:text-teal-400 hover:border-teal-400">Join WaitList</button> */}
      </div>
    </div>
  </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-gray-600">
                <div className="p-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              
    <div className="p-2  w-full">
        <div className="bg-slate-900 rounded flex p-4 h-full items-center hover:bg-[#5B21B6] hover:text-gray-100">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                className="text-[#00BF63] w-10 h-10 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <span className="font-medium text-gray-300"><span className="text-[#06F0FF]">Buy</span> 70+ crypto assets with your local or any supported fiat currency</span>
        </div>
    </div>
    <div className="p-2 w-full">
        <div className="bg-slate-900 rounded flex p-4 h-full items-center hover:bg-[#5B21B6] hover:text-gray-100">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                className="text-[#00BF63] w-10 h-10 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <span className="font-medium text-gray-300"><span className="text-[#06F0FF]">Sell</span> your crypto at market rates for any fiat or your local currency</span>
        </div>
    </div>
    <div className="p-2 w-full">
        <div className="bg-slate-900 rounded flex p-4 h-full items-center hover:bg-[#5B21B6] hover:text-gray-100">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                className="text-[#00BF63] w-10 h-10 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <span className="font-medium text-gray-300"><span className="text-[#06F0FF]">Send</span> to and <span className="text-[#06F0FF]">Receive</span> crypto assets from your friends and family, convert to your local currency at market rates in seconds</span>
        </div>
    </div>
    <div className="p-2  w-full">
        <div className="bg-slate-900 rounded flex p-4 h-full items-center hover:bg-[#5B21B6] hover:text-gray-100">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                className="text-[#00BF63] w-10 h-10 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <span className="font-medium text-gray-300"><span className="text-[#06F0FF]">Swap</span> between multiple assets across multiple chains</span>
        </div>
    </div>

    <div className="p-2  w-full">
        <div className="bg-slate-900 rounded flex p-4 h-full items-center hover:bg-[#5B21B6] hover:text-gray-100">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                className="text-[#00BF63] w-10 h-10 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <span className="font-medium text-gray-300">Supports <span className="text-[#00BF63]">bank</span> and <span className="text-[#00BF63]">mobile money </span> based on country or jurisdiction</span>
        </div>
    </div>
</div> 

                </div>
   
            </div>
        </div>
        </>
    )
}