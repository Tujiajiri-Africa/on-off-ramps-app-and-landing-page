import React from "react";
import Image from 'next/image'
import SellWithdrawIllustration from '@/app/assets/backgrounds/sell-withdraw-illustration-light-green.svg'
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import { Button } from "@/components/ui/button";

export function SellWithdrawIllustrationPage(){
    return (
    <>
        {/* <div className="px-2 py-10 w-full h-full flex justify-center bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50">
            <div className="bg-inherit lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg rounded-lg">
                <div className="lg:w-1/2">
                    <div className="lg:scale-110 h-80 bg-cover lg:h-full rounded-b-none border lg:rounded-lg"
                        style={{backgroundImage: `url(${SellWithdrawIllustration.src})`}}
                        //https://images.unsplash.com/photo-1517694712202-14dd9538aa97
                        >
                    </div>
                </div>
                <div className="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg">
                    <h2 className="text-3xl text-gray-800 font-bold">
                        Promoting Sustainable Lifestyle Choices
                        <span className="text-indigo-600">Choices</span>
                    </h2>
                    <p className="mt-1.5 text-sm leading-6 text-secondary-500">With AjiraPay, you get the best quotes for your crypto buy and sell orders, convert supported assets to your local currency in seconds for use in your day to day utilities</p>
                     <p className="mt-4 text-gray-600">
                        The "Eco-Tracker" project aims to create a web-based platform that encourages individuals to adopt
                        sustainable lifestyle choices and actively contribute to environmental conservation. The platform will
                        provide users with personalized tracking, education, and engagement features to empower them to make
                        eco-friendly decisions in various aspects of their lives.
                    </p> 
                    <div className="mt-8">
                        <Button  className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-3 font-semibold rounded">Start Now</Button>
                    </div>
                </div>
            </div>
        </div> */}
        <div className="w-full content-center bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-s">
                    
                </div>
            </div>
        </div>
    </>
    )
}   