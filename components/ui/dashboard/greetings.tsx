'use client'
import React from "react";
import { useSession } from "next-auth/react";
import {getUserNameFromEmail} from '@/lib/utils'

export function Greetings(){
    const session = useSession()
    return (
        session && (
            <h2 className="text-xl font-bold tracking-tight">
                Hello, { session.data?.user?.first_name ? session.data?.user?.first_name: getUserNameFromEmail(session.data?.user?.email)} 👋
                {/* Welcome back */}
            </h2>
        )
)
}
