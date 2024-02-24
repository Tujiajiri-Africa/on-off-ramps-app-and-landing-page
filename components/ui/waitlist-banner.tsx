import React from 'react'

export default function WaitListBanner(){
    return (
        <>
        <div className="relative mx-auto h-screen flex flex-col justify-center items-center bg-[#010203]">
            <div className='pt-0.5 sm:pt-20 lg:pt-40 w-[80%] mx-auto flex flex-col lg:flex-row'>
            <div className='w-[80%] mx-auto flex flex-col bg-[#064e3b] text-center justify-between items-center p-10 rounded-xl'>
                   <h1 className='p-10 text-3xl sm:text-7xl font-semibold tracking-wide leading-normal text-white'>Want to <span className="text-[#06F0FF] ">stay updated </span> on our latest updates and releases?</h1>
                   <div className='flex gap-6 items-center justify-center'>
                     <button className="bg-[#010203] text-white text-xl-3 p-4 rounded hover:bg-[]">Join Waitlist</button>
                     <button className="bg-[#001431] text-white text-xl-3 p-4 rounded hover:bg-[]">Visit Documentation</button>
                   </div>
               </div>
            </div>

        </div>
        </>
    )
}