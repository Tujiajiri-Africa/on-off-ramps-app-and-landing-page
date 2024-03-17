import React from 'react'
import {UserProfileForm} from '@/components/ui/user/profile'
import { Suspense } from "react";

export const UserProfileUpdateForm = () => {
    return (<>
    <Suspense>
        <UserProfileForm />
    </Suspense>
        
    </>)
}