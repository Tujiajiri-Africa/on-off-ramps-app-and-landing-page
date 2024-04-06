import React, { useState } from "react";
import Link from 'next/link'

export default function PageNotFoundV2() {

    return (
        <div>
            <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center h-screen flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16
            bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50
            ">
                <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                    <div className="relative">
                        <div className="absolute">
                            <div >
                                <h1 className="my-2 text-slate-900 font-bold text-2xl">
                                    {/* Looks like you&apos;ve found the
                                    doorway to the great nothing */}

                                    Oops! we can&apos;t find that page
                                </h1>
                                <p className="my-2 text-slate-900">Sorry about that! Please visit our homepage to get where you need to go.</p>
                                <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-orange-600 text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                                    
                                    <Link href="/">
                                        Take me back home
                                    </Link>
                                </button>
                            </div>
                        </div>
                        <div>
                            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                        </div>
                    </div>
                </div>
                <div>
                    <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
                </div>
            </div>
        </div>

    );
}


