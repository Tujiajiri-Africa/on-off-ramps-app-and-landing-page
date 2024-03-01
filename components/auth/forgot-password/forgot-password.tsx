import React from 'react'
import { CardWrapper } from '@/components/auth/card-wrapper'

export const ForgotPasswordForm = () => {
    return (
        <>
            <CardWrapper
                backButtonHref='/login'
                headerLabel='Forgot password'
                backButtonLabel="Sign in instead"
                showSocial={false} 
            >
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
                    <button type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#FDC707] to-[#F00FDA] ">

                        Request code
                    </button>
                </div>
            </form>
            </CardWrapper>
        </>
    )
}

