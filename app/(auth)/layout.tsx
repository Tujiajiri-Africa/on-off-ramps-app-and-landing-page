import { ReactNode } from "react";

export default function AuthLayout({children}:{children: ReactNode}){
    return (
       <>
        <div className="min-h-screen bg-gradient-to-r from-[#FDC707] to-[#F00FDA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                {children}
        </div>
       </>
    )
}