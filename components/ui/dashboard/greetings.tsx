'use client'
import React from "react";
import { useSession } from "next-auth/react";
import {getUserNameFromEmail} from '@/lib/utils'

export function Greetings(){
    const {data:session} = useSession()
    return (
        session && (
            <h2 className="text-3xl font-bold tracking-tight">
                Hi, Welcome back 👋 { session.user?.name ? session.user?.name: getUserNameFromEmail(session.user?.email)}
            </h2>
        )
)
}
