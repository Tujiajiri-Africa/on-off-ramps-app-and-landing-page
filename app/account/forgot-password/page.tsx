import React from 'react'
import { ForgotPasswordForm } from '@/components/auth/forgot-password/forgot-password'
import {UserForgotPasswordFormWithProductIntro} from '@/components/auth/forgot-password/forgot-password-improved'

const PassWordReset = () =>{
    return (
        <>
            {/* <ForgotPasswordForm />     */}
            <UserForgotPasswordFormWithProductIntro />
        </>
    )
}

export default PassWordReset