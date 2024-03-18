import React from 'react'
import {UserPasswordChangeForm} from '@/components/ui/user/passwordRest'
import { Suspense } from "react";

export const UserPasswordUpdateForm = () => {
    return (<>
    <Suspense>
        <UserPasswordChangeForm />
    </Suspense>
        
    </>)
}