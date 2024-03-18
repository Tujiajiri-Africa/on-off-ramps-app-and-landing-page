import React from 'react'
import {UserPhineVerificationForm} from '@/components/ui/user/phoneVerification'
import { Suspense } from "react";

export const UserAddPhoneForm = () => {
    return (<>
    <Suspense>
        <UserPhineVerificationForm />
    </Suspense>
        
    </>)
}