import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area";

export function UserWallet(){
    return (
        <>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">
                            My Wallet
                        </h2>
                    </div>
                </div>
            </ScrollArea>
        </>
    )
}