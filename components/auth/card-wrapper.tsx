'use client'
import { 
    CardContent, 
    CardHeader, 
}from '@/components/ui/card'
import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import Link from 'next/link'

interface CardWrapperProps{
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
    }: CardWrapperProps)=>{
    return (
        <>
        <div className='min-h-screen bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50 flex flex-col justify-center py-12 sm:px-2 lg:px-8 border-none'
        //bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50
        //bg-gradient-to-r from-[#FDC707] to-[#F00FDA]
        //bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50
        >
            <CardContent className="mt-8 w-full sm:max-w-lg mx-auto space-y-4 "
            //sm:max-w-md sm:w-full
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
        </div>
        </>
    )
}