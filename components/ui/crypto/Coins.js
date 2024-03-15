'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BTC_LOGO from '@/app/assets/logo/bitcoin-btc-logo.svg'

const Coins = ({price, priceChange}) => {
    return (
        <>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        BTC
                    </CardTitle>
                    <Image
                        src={BTC_LOGO.src}
                        width={30}
                        height={30}
                        alt={'btc-logo'}
                    />
                    
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">$ 
                    {price}

                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-6">
                        { 
                        priceChange < 0 && 
                        <>
                        <span className="text-red-600">
                            { priceChange } %
                            </span> 
                            24hr Change 
                        </>
                        }
                        { 
                        priceChange > 0 && 
                        <>
                        <span className="text-green-600">
                            { priceChange } %
                            </span> 
                            24hr Change 
                        </>
                        }
                    </p>
                    <Button
                        //className="w-full"
                    >
                        Buy/Sell
                    </Button>
                    </CardContent>
                </Card>
        </>
        )
}

export default Coins