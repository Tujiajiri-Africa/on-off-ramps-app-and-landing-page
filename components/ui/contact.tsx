import React from 'react'
import AboutPageIllustration from '../../app/assets/logo/contact-page-illustration-svg.svg'

export default function ContactPage(){
    return (
        <>
            <div className="relative w-[80%] mx-auto h-full flex flex-col justify-center items-center bg-[#010203] overflow-hidden">
                <div>
               
                </div>
            <div className="pt-0.5 sm:pt-20 lg:pt-40  flex flex-col lg:flex-row">
            <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center overflow-hidden">
            <h1 className="py-10 text-3xl sm:text-7xl font-semibold tracking-wide leading-tight text-white">
            {/* Effortless, <br/>fancy hero 12, <br/>made with love. */}
                    You have something in mind? <span className="text-[#00BF63]" >Let's Talk</span>
            </h1>
            <div className="p-2  flex flex-col  w-full gap-3">
        <div className="bg-slate-900 rounded flex p-4 h-full items-center  hover:text-gray-100">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                className="text-[#00BF63] w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <span className="font-medium text-gray-300">hello@ajirapay.finance</span>
        </div>
        <div className="bg-slate-900 rounded flex p-4 h-full items-center  hover:text-gray-100">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                className="text-[#00BF63] w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <span className="font-medium text-gray-300">+254714905613</span>
        </div>
    </div>
                        
                            {/* <img src="https://fancytailwind.com/static/8b86283c874a1f43a78c79fe871525ff/d552e/illustration1.webp" alt="" className="w-2/3 lg:w-full" /> */}
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-gray-600"> {/* Container */}
    {/* ::Hero Inner */}
                <div className="pt-2 w-full h-screen flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                    <div className='text-center gap-1 rounded'>
                        <div className='p-10 flex flex-col justify-between text-center'>
                        <img className="" src={AboutPageIllustration.src} 
                            alt='illustration' 
                            //className="w-2/3 lg:w-full"
                            style={{
                                width: '100%',
                                height: '50%',
                                borderRadius: '50px'
                            }}
                        />
                        
                        {/* <p className='text-white fron-semibold gap-2'>hello@ajirapay.finance</p>
                        <p className="text-white fron-semibold gap-2">+254714905613</p> */}
                        </div>
               
                    </div>
                
                </div>
            </div>
            </div>
            </div>    
        </>
    )
}