import React from 'react'
import Image from 'next/image'

export function HowItWorksV2(){
    return (<>
    
    <section id="how-it-works" className="relative  bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50  px-2 py-10 lg:h-screen h-full content-center">
    <div className="2xl:w-[80%] md:pt-1.5  lg:pt-1.5 w-[98%] mx-auto bg-inherit">
        <p className="text-center text-base font-semibold leading-7 text-primary-500">Getting started</p>
        <h2 className="text-center font-display text-4xl sm:text-7xl font-bold leading-tight text-slate-900 md:text-4xl ">
            How To Get Started
        </h2>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
        {/* <h2 className="text-center font-display text-4xl sm:text-7xl font-bold leading-tight text-slate-900 md:text-4xl ">
            How to get started
        </h2> */}
            {/* <p className="max-w-2xl mx-auto mt-4 text-base text-gray-400 leading-relaxed md:text-2xl">
                We believe there should be no barrier to your adoption of crypto across Africa
            </p> */}
            <p className="mt-1.5 text-sm leading-6 text-secondary-500">We believe there should be no barrier to your adoption of crypto across Africa, we have made the onboarding process as seamless as possible</p>
        </div>
        <div className="relative mt-12 lg:mt-20">
            <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                <Image alt="" loading="lazy" width="1000" height="500" decoding="async" data-nimg="1" className="w-full" style={{color: 'transparent'}} src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"/>
            </div>
            <div className="relative grid grid-cols-1 text-center gap-y-12 lg:grid-cols-4 md:grid-cols-2 2xl:grid-cols-4 gap-x-12">
                <div>
                    <div
                        className="flex items-center justify-center w-16 h-16 mx-auto bg-orange-600 border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-white">1</span>
                    </div>
                    <h3 className="mt-6 text-xl  text-slate-900 font-semibold leading-tight md:mt-10">Sign up</h3>
                    {/* <p className="mt-4 text-base text-gray-400 md:text-lg">
                        Select template accourding to your requirement
                    </p> */}
                    {/* <p className="mt-4 text-base text-gray-400 md:text-lg">
                        Sign up with your email and mobile money number
                    </p> */}
                    <p className='mt-1.5 text-sm leading-6 text-secondary-500'>Create your account with a few general details about yourself including your mobile money number and email address</p>
                </div>
                <div>
                    <div
                        className="flex items-center justify-center w-16 h-16 mx-auto bg-orange-600 border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-white">2</span>
                    </div>
                    <h3 className="mt-6 text-xl text-slate-900 font-semibold leading-tight md:mt-10">Verify your account</h3>
                    <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                        Complete account verification by submitting your KYC/KYB documents to our compliance and anti-money laundering team for approval
                    </p>
                </div>
                <div>
                    <div
                        className="flex items-center justify-center w-16 h-16 mx-auto bg-orange-600 border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-white">3</span>
                    </div>
                    <h3 className="mt-6 text-xl text-slate-900 font-semibold leading-tight md:mt-10">Fund your account</h3>
                    <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                        Deposit fiat currency into your NanaPay account with either mobile money or bank transfer, funds are held by our licensed partner, we do not take custody of your funds. 
                    </p>
                </div>
                <div>
                    <div
                        className="flex items-center justify-center w-16 h-16 mx-auto bg-orange-600 border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-white">4</span>
                    </div>
                    <h3 className="mt-6 text-xl text-slate-900 font-semibold leading-tight md:mt-10">Get started</h3>
                    <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                        Seamlessly buy and sell any of the supported assets with either mobile money or bank transfer, create, manage, share invoices with ease, get paid in your preffered currency/asset
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
        style={{background: "radial-gradient(1.89deg, rgba(34, 78, 95, 0.4) -1000%, rgba(191, 227, 205, 0.26) 1500.74%, rgba(34, 140, 165, 0.41) 56.49%, rgba(28, 47, 99, 0.11) 1150.91%)"}}>
    </div>
    </div>

</section>
    </>)
}