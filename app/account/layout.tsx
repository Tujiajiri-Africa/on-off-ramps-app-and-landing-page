import { ReactNode } from "react";

export default function AuthLayout({children}:{children: ReactNode}){
    return (
       <>
        <div className="min-h-screen bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 shadow-2xl bg-inherit"
        //bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50
        //bg-gradient-to-r from-[#FDC707] to-[#F00FDA]
        //bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50
        >
                {children}
        </div>
       </>
    )
}