import { ReactNode } from "react";

export default function AuthLayout({children}:{children: ReactNode}){
    return (
       <>
        <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                {children}
        </div>
       </>
    )
}