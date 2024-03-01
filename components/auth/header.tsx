import React from "react";
import Logo from '@/app/assets/logo/nana-pay-logo-color.png'
import Image from "next/image";

interface HeaderProps{
    label: string
}

export const Header = ({label}:HeaderProps) =>{
    return (
        <>
        <div className="flex text-center justify-center ">
            <Image src={Logo.src} width={100} height={100}  className="rounded-full" alt="logo"/>
        </div>
        <div className="w-[80%] mx-auto sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                {label}
            </h2>
        </div>
        </>
        )
}