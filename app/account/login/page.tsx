import React from "react";
import { LoginForm } from "@/components/auth/login/login";
import { Suspense } from "react";
import {UserLoginWithProductIntro} from '@/components/auth/login/login-improved'

const  Login = () =>{
    return (
        <>
        <Suspense>
            {/* <LoginForm /> */}
            <UserLoginWithProductIntro />
        </Suspense>
        
        </>
    )
}

export default Login;