'use client'
import { 
    CardContent, 
    CardHeader, 
    CardTitle
}from '@/components/ui/card'
import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import Link from 'next/link'
import Logo from '@/app/assets/logo/nana-pay-logo-color.png'
import Image from "next/image";
import BackgroundIntroImage from '@/app/assets/backgrounds/auth/intro-page-image-1-svg.svg'

interface CardWrapperProps{
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const AuthCardWrapperWithIntroBackground = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
    }: CardWrapperProps)=>{
    return (
        <>
                <CardContent className="min-h-screen flex justify-center text-gray-700"
        //bg-gray-100 text-gray-900 h-full lg:min-h-screen
        >
            <div className="2xl:max-w-screen-2xl max-w-screen-xl mx-auto m-0 sm:m-10 bg-white shadow-2xl rounded-lg flex justify-center flex-1"
            //2xl:max-w-screen-2xl 
            >
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex text-center justify-center ">
                    <Image 
                        src={Logo.src} 
                        width={80} 
                        height={80}  
                        className="rounded-full mx-auto mb-2" 
                        alt="logo"
                        //w-28
                    />
            </div>
                <CardTitle className='text-2xl sm:text-3xl mt-2 font-extrabold text-center items-center'>
                    {headerLabel}
                </CardTitle>
            <div className="mt-4 flex flex-col items-center">
                <div className="w-full flex-1 mt-8">
                    <div className="mx-auto max-w-[600px]"
                    //max-w-xs
                    >

                            {children}
                            <div className="mt-6">
                            {
                                showSocial &&
                                (
                                    <>
                                        <Social />
                                    </>

                                )
                            }
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm items-center">
                                <Link href={backButtonHref} className="font-medium text-blue-600 hover:text-blue-500">
                                    {backButtonLabel}
                                </Link>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${BackgroundIntroImage.src})`,
                }}>
            </div>
        </div>
            </div>
        </CardContent>
        </>
    )
}