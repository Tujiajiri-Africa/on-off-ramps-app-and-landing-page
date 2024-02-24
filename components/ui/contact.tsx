import React from 'react'
import AboutPageIllustration from '../../app/assets/logo/contact-page-illustration-svg.svg'

export default function ContactPage(){
    return (
            <div className="relative w-[80%] mx-auto h-full flex flex-col justify-center items-center bg-[#010203] overflow-hidden">
            <div className="pt-0.5 sm:pt-20 lg:pt-40  flex flex-col lg:flex-row">
            <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center overflow-hidden">
            <h1 className="py-10 text-3xl sm:text-7xl font-semibold tracking-wide leading-tight text-white">
                    You have something in mind? <span className="text-[#00BF63]" >Let's Talk</span>
            </h1>
            <div className="p-2  flex flex-col w-full gap-3">
        <div className="bg-slate-900 rounded flex p-4 h-full items-center  hover:text-gray-100">
            {/* <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
               className="text-[#00BF63] w-6 h-6 flex-shrink-0 mr-4" 
            >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg> */}

            <span className="font-medium text-gray-300">
             hello@ajirapay.finance
            </span>
        </div>
        <div className="bg-slate-900 rounded flex p-4 h-full items-center  hover:text-gray-100">
        {/* <svg 
           xmlns="http://www.w3.org/2000/svg" 
           viewBox="0 0 24 24" 
           fill="currentColor" 
          className="text-[#00BF63] w-6 h-6 flex-shrink-0 mr-4" 
         >
           <path 
               fillRule="evenodd" 
               d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" 
               clipRule="evenodd" 
            />
       </svg> */}
            <span className="font-medium text-gray-300">+254 714 905 613</span>
        </div>
    </div>           
        </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-gray-600"> 
    
                <div className="pt-2 w-full h-screen flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                    <div className='text-center gap-1 rounded'>
                        <div className='flex flex-col justify-between text-center'>
                        <img className="" src={AboutPageIllustration.src} 
                            alt='illustration' 
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '50px'
                            }}
                        />
                        </div>
               
                    </div>
                
                </div>
            </div>
            </div>
            </div>    
    )
}