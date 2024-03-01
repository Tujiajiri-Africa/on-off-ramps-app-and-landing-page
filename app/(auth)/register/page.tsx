import React from "react";
import Link from 'next/link'
import Logo from '@/app/assets/logo/nana-pay-logo-color.png'
import Image from "next/image";

const  Register = () =>{
    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-[#FDC707] to-[#F00FDA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="flex text-center justify-center ">
            <Image src={Logo.src} width={100} height={100}  className="rounded-full" alt="logo"/>
        </div>
    <div className="w-[80%] mx-auto sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create a new account
        </h2>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-[80%] mx-auto  bg-white py-8 px-4 shadow rounded-lg sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
                <div>
                    <label  className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input id="email" name="email" type="email" autoComplete="email" required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter your email address"/>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1">
                        <input id="password" name="password" type="password" autoComplete="current-password" required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter your password"/>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <div className="mt-1">
                        <input id="confirm_password" name="confirm_password" type="password" autoComplete="current-password" required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Confirm Password"/>
                    </div>
                </div>


                <div>
                    <button type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#FDC707] to-[#F00FDA] ">

                        Create account
                       
                    </button>
                </div>
            </form>
            <div className="mt-6">

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-100 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 mb-6">
                    {/* <div>
                        <a href="#"
                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                                alt=""/>
                        </a>
                    </div> */}
                    {/* <div>
                        <a href="#"
                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                                alt=""/>
                        </a>
                    </div> */}
                    <div>
                        <a href="#"
                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <Image className="h-6 w-6" height={24} width={24} src="https://www.svgrepo.com/show/506498/google.svg"
                                alt=""/>
                        </a>
                    </div>
                </div>
                <div className="flex items-center justify-between  ">
                    <div className="text-sm items-center">
                        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Have an account? Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </>
    )
}

export default Register;