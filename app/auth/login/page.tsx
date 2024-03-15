import React from "react";
import { LoginForm } from "@/components/auth/login/login";
import { Suspense } from "react";

const  Login = () =>{
    return (
        <>
        <Suspense>
            <LoginForm />
        </Suspense>
        
        </>
    )
}

export default Login;