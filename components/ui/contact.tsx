import React from "react";
import AboutPageIllustration from '../../app/assets/logo/contact-page-illustration-svg.svg'
import { Bars3Icon, BellIcon, XMarkIcon,ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function About(){
    return (
        <>
        <div className="relative w-full h-full flex justify-center items-center bg-[#010203] overflow-hidden opacity-100">
            <div className="pt-0.5 sm:pt-20 lg:pt-40 w-[98%] mx-auto flex flex-col lg:flex-row">
                <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center overflow-hidden">
                        {/* <img src={AboutPageIllustration.src} 
                            alt='illustration' 
                            //className="w-2/3 lg:w-full"
                            //bg-[#050520]
                            style={{
                                width: '100%',
                                height: '80%',
                                opacity: '100%'
                            }}
                        /> */}
                        <Image
                          height={400}
                          width={680}
                          src={AboutPageIllustration.src}
                          alt='Logo'
                  />
                            {/* <img src="https://fancytailwind.com/static/8b86283c874a1f43a78c79fe871525ff/d552e/illustration1.webp" alt="" className="w-2/3 lg:w-full" /> */}
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-gray-600"> {/* Container */}
    {/* ::Hero Inner */}
    <div className="p-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
      {/* Hero Title */}
      <h1 className="py-10 text-4xl sm:text-7xl font-semibold leading-tight text-white">
                You have something in mind? <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]">Let&apos;s Talk</span>
            </h1>
            <div className="p-2 flex flex-col sm:flex-row md:flex-row lg:flex-row w-full gap-3">
            <div className="bg-gradient-to-r from-[#050520] to-[#470645] rounded flex p-4 h-full w-[80%] mx-auto items-center justify-center hover:text-gray-100">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                className="text-[#00BF63] w-10 h-10 flex-shrink-0 mr-4" 
                >
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg> 

                <span className="font-medium text-gray-300">
                <p>hello@ajirapay.finance</p>
                </span>
            </div>
            <div className="bg-gradient-to-r from-[#050520] to-[#470645] rounded flex p-4 h-full w-[80%] mx-auto items-center justify-center hover:text-gray-100">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="text-[#00BF63] w-10 h-10 flex-shrink-0 mr-4" 
            >
            <path 
                fillRule="evenodd" 
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" 
                clipRule="evenodd" 
                />
        </svg>
                <span className="font-medium text-gray-300">
                    <p>+254 714 905 613</p>
                </span>
            </div>
    </div>
    </div>
  </div>
            </div>
        </div>
        </>
        )
}