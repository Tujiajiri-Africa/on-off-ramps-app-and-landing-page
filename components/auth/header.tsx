import React from "react";
import Logo from '@/app/assets/logo/nana-pay-logo-color.png'
import Image from "next/image";

interface HeaderProps{
    label: string
    description? : string
}

export const Header = ({label, description}:HeaderProps) =>{
    return (
        <>
            <div className="flex text-center justify-center ">
                <Image src={Logo.src} width={80} height={80}  className="rounded-full" alt="logo"/>
            </div>
            <div 
            //className="w-[92%] sm:w-[86%] mx-auto sm:max-w-md"
            className="w-full "
            //space-y-4
            >
                <h2 className="mt-2 text-center md:text-center text-1xl font-bold">
                    {label}
                </h2>
                <p className="text-center font-normal text-sm">{description}</p>
            </div>
        </>
        )
}