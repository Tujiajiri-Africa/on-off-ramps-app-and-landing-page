import React from "react";
import { RegisterForm } from "@/components/auth/register/register";
import {UserRegistrationWithProductIntro} from '@/components/auth/register/register-improved'

const  Register = () =>{
    return (
        <>
            {/* <RegisterForm /> */}
            <UserRegistrationWithProductIntro />
        </>
    )
}

export default Register;