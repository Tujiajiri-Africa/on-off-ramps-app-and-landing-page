import React from "react";
import { Bars3Icon, BellIcon, XMarkIcon,ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import curve from '@/app/assets/hero/curve.png'
import Image from 'next/image'
import illustration from '@/app/assets/backgrounds/sell-withdraw-illustration-light-green.svg'

export function FeatureListV2(){
    return (<>
            <div className='relative w-full h-full sm:h-screen flex justify-center items-center bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50 overflow-hidden opacity-100' id="features">
            <div className="pt-0.5 2xl:w-[80%]  w-[98%]  mx-auto flex flex-col lg:flex-row"
            //sm:pt-20 lg:pt-40
            >
            <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center overflow-hidden"> 
   
    <div className="p-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
    <h2 className="font-display text-4xl sm:text-7xl font-bold leading-tight text-slate-900 md:text-4xl sm:text-start">
    Achieve your web3 financial goals with our cutting-edge features
    </h2>
        {/* <h1 className="py-10 text-4xl sm:text-7xl font-semibold leading-start text-white">
           
            <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">Achieve</span> your <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">web3 financial goals </span> with our 
            <span className="inline-block relative">
            cutting-edge{" "}
              <Image
                src={curve.src}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span> <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">features</span>
        </h1> */}
     
        <p className="mt-1.5 text-sm leading-6 text-secondary-500">
       
        We have challenged ourselves to bring blockchain technology and cryptocurrency to the unbanked and underbanked African community combining it with the existing local payment channels to connect the African continent to the global digital financial ecosystem with a strict focus on compliance and real-world usecase of these powerful technologies to positively impact the lives of our users and the communities around us

        </p>

      {/* Buttons */}
      <div className="mt-4 ">
        <button className=" ">
            <a href="#" className="inline-flex  gap-4 justify-start items-center px-3 py-2 font-medium rounded leading-5 bg-orange-600 text-primary-100 text-white hover:text-white hover:bg-orange-500">
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
        <div className="bg-white shadow-md rounded-xl flex p-4 h-full items-center">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                className="text-orange-600 w-10 h-10 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            {/* <span className="mt-1.5 text-sm leading-6 text-secondary-500">Buy</span> 70+ crypto assets including  */}
            <p className="mt-1.5 text-sm leading-6 text-secondary-500">Buy 70+ crypto assets including USDT, USDC, cUSD and PYUSD stablecoins with your local currency </p>
            {/* <span className='font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]'> USDT, USDC, cUSD and PYUSD stablecoins </span > with your local or any supported fiat currency</span> */}
        </div>
    </div>
    <div className="p-2 w-full">
        <div className="bg-white shadow-md rounded-xl flex p-4 h-full items-center ">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                className="text-orange-600 w-10 h-10 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <p className="mt-1.5 text-sm leading-6 text-secondary-500">Sell your crypto at market rates and cash out in your local currency </p>

            {/* <span className="font-medium text-secondary-500"><span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">Sell</span> your crypto at market rates for any fiat or your local currency</span> */}
        </div>
    </div>
    <div className="p-2 w-full">
        <div className="bg-white shadow-md rounded-xl flex p-4 h-full items-center">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                className="text-orange-600 w-10 h-10 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <p className="mt-1.5 text-sm leading-6 text-secondary-500">
              Seamlessly create and manage invoices with ease, get paid in your preffered currency
            </p>

            {/* <span className="font-medium text-secondary-500"><span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">Send</span> to and <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">Receive</span> crypto assets from your friends and family, convert to your local currency at market rates in seconds</span> */}
        </div>
    </div>
    <div className="p-2  w-full">
    {/* #050520, 470645 */}
        <div className="bg-white shadow-md rounded-xl flex p-4 h-full items-center">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                className="text-orange-600 w-10 h-10 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <p className="mt-1.5 text-sm leading-6 text-secondary-500">
              Send to and Receive crypto assets from your friends and family, convert to your local currency at market rates in seconds
            </p>
            {/* <span className="font-medium text-secondary-500"><span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">Swap</span> between multiple assets across multiple chains</span> */}
        </div>
    </div>

    <div className="p-2  w-full">
        <div className="bg-white shadow-md rounded-xl flex p-4 h-full items-center">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                className="text-orange-600 w-10 h-10 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <p className="mt-1.5 text-sm leading-6 text-secondary-500">
               We support bank and mobile money based on country or jurisdiction
            </p>
            {/* <span className="font-medium text-secondary-500">Supports <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">bank</span> and <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">mobile money </span> based on country or jurisdiction</span> */}
        </div>
    </div>
</div> 

                </div>
   
            </div>

        </div>
        {/* <div className="relative flex justify-center h-[520px] w-[250px] border-4 border-black rounded-2xl bg-gray-50"
    style={{boxShadow: '10px 10px 5px 12px rgb(209, 218, 218)'}}>
    
    <span className="border border-black bg-black w-28 h-5 rounded-br-xl rounded-bl-xl"></span>
     <div className="content-center items-center ">
        <Image src={illustration.src} width={1028} height={870} alt="illustration" />
     </div> 
    <span className="absolute -right-2 top-20 border-4 border-black h-10 rounded-md"></span>
    <span className="absolute -right-2 top-44 border-4 border-black h-24 rounded-md"></span>
</div> */}
    </>
)
}