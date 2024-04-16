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
        {/* <div className='min-h-screen bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50 flex flex-col justify-center py-12 sm:px-2 lg:px-8 border-none'
        >
            <CardContent className="mt-8 w-full sm:max-w-lg mx-auto space-y-4 "
            >
            <div className="w-[98%] sm:w-full mx-auto  bg-white py-8 px-4 shadow-2xl rounded-lg sm:rounded-lg sm:px-4">
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
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
            </CardContent>
        </div> */}
                <CardContent className="min-h-screen flex justify-center text-gray-700"
        //bg-gray-100 text-gray-900 h-full lg:min-h-screen
        >
            <div className="2xl:max-w-screen-2xl max-w-screen-xl mx-auto m-0 sm:m-10 bg-white shadow-2xl rounded-lg flex justify-center flex-1"
            //2xl:max-w-screen-2xl 
            >
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    {/* <div> */}
                        {/* <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                        className="w-32 mx-auto"
                        //w-mx-auto
                        /> */}
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
                    {/* </div> */}
                    {/* <CardHeader className='w-full'> */}
                        <CardTitle className='text-2xl sm:text-3xl mt-2 font-extrabold text-center items-center'>
                            {headerLabel}
                        </CardTitle>
                    {/* </CardHeader> */}
                    <div className="mt-4 flex flex-col items-center">
                        {/* <CardHeader className='w-full'>
                            <CardTitle className='text-2xl sm:text-3xl mt-2 font-extrabold text-center items-center'>
                                {headerLabel}
                            </CardTitle>
                        </CardHeader> */}

                <div className="w-full flex-1 mt-8">
                    {/* <div className="flex flex-col items-center">
                        <button
                            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                            <div className="bg-white p-2 rounded-full">
                                <svg className="w-4" viewBox="0 0 533.5 544.3">
                                    <path
                                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                        fill="#4285f4" />
                                    <path
                                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                        fill="#34a853" />
                                    <path
                                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                        fill="#fbbc04" />
                                    <path
                                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                        fill="#ea4335" />
                                </svg>
                            </div>
                            <span className="ml-4">
                                Sign In with Google
                            </span>
                        </button>

                    </div> */}

                    {/* <div className="my-12 border-b text-center">
                        <div
                            className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or sign In with Cartesian E-mail
                        </div>
                    </div> */}

                    <div className="mx-auto max-w-[600px]"
                    //max-w-xs
                    >
                        {/* <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" placeholder="Email" />
                        <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password" placeholder="Password" />
                        <button
                            className="mt-5 tracking-wide font-semibold bg-orange-600 text-white-500 w-full py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg 
                                className="w-6 h-6 -ml-2 text-white " fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3 text-white">
                                Sign In
                            </span>
                        </button>
                        <p className="mt-6 text-xs text-gray-600 text-center">
                            I agree to abide by Cartesian Kinetics
                            <a href="#" className="border-b border-gray-500 border-dotted">
                                Terms of Service
                            </a>
                            and its
                            <a href="#" className="border-b border-gray-500 border-dotted">
                                Privacy Policy
                            </a>
                        </p> */}
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
                    backgroundImage: `url(${BackgroundIntroImage.src})`
                }}>
            </div>
        </div>
            </div>
        </CardContent>
        </>
    )
}