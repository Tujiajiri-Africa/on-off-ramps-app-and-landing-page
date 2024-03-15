'use client'
import React from "react";
import { useSession } from "next-auth/react";
import {getUserNameFromEmail} from '@/lib/utils'

export function Greetings(){
    const session = useSession()
    return (
        session && (
            <h2 className="text-3xl font-bold tracking-tight">
                Hi, Welcome back 👋 { session.data?.user?.name ? session.data?.user?.name: getUserNameFromEmail(session.data?.user?.email)}
            </h2>
        )
)
}
