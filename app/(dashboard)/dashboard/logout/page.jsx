'use client'

import React from 'react'

import {signOut} from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function LogOut(){
    return(
        <>
            <Button
                onClick={() => signOut()}
            >
                Logout
            </Button>
        </>
        )
}