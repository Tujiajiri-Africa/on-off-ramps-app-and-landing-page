import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image'
import Link from 'next/link'
import BTC_LOGO from '@/app/assets/logo/bitcoin-btc-logo.svg'
import ETH_LOGO from '@/app/assets/logo/ethereum-eth-logo.svg'
import SOL_lOGO from '@/app/assets/logo/solana-sol-logo.svg'
import MATIC_LOGO from '@/app/assets/logo/polygon-matic-logo.svg'
import USDT_LOGO from '@/app/assets/logo/crypto/usdt_transparent.png'
import USDC_LOGO from '@/app/assets/logo/crypto/usdc_transparent.png'
import cUSD_LOGO from '@/app/assets/logo/crypto/cUSD.png'

export function UserWallet(){
    return (
        <>
            <ScrollArea className="h-full"
            //dark:bg-[#182122]
            >
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">
                            My Wallet
                        </h2>
                    </div>
                    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                        <Card className="col-span-4">
                            <CardHeader>
                                <div className="flex items-center justify-between space-y-2">
                                    <div className="md:flex items-center space-x-2">
                                    <CardTitle>
                                        Crypto Wallet
                                    </CardTitle>
                                    
                                    </div>
                                    <Button 
                                        className="content-start group  rounded-md px-3 py-2 text-sm bg-[#00BF63] text-white font-medium hover:bg-accent hover:text-accent-foreground"
                                        variant={'outline'}
                                    >
                                        View More
                                    </Button>
                                </div>   
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
                                            <div className='text-2xl font-bold'>
                                                KES 43,184.00
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-6">
                                                <span className="text-green-600">
                                                    10.19%
                                                </span> last 1 month
                                            </p>
                                            <Button
                                                className="w-full"
                                            >
                                                <Link href={`/dashboard/buy-sell-crypto?baseAsset=BTC&currency=KES`}>
                                                    Buy/Sell
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            USDT
                                        </CardTitle>
                                        <Image
                                            src={USDT_LOGO.src}
                                            width={30}
                                            height={30}
                                            alt={'btc-logo'}
                                        />
                                        </CardHeader>
                                        <CardContent>
                                            <div className='text-2xl font-bold'>
                                                KES 5,184.00
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-6">
                                                <span className="text-green-600">
                                                    34.97%
                                                </span> last 1 month
                                            </p>
                                            <Button
                                                className="w-full"
                                            >
                                                <Link href={`/dashboard/buy-sell-crypto?baseAsset=BTC&currency=KES`}>
                                                    Buy/Sell
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            USDC
                                        </CardTitle>
                                        <Image
                                            src={USDC_LOGO.src}
                                            width={30}
                                            height={30}
                                            alt={'btc-logo'}
                                        />
                                        </CardHeader>
                                        <CardContent>
                                            <div className='text-2xl font-bold'>
                                                KES 8,184.00
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-6">
                                                <span className="text-green-600">
                                                    25.93%
                                                </span> last 1 month
                                            </p>
                                            <Button
                                                className="w-full"
                                            >
                                                <Link href={`/dashboard/buy-sell-crypto?baseAsset=BTC&currency=KES`}>
                                                    Buy/Sell
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            cUSD
                                        </CardTitle>
                                        <Image
                                            src={cUSD_LOGO.src}
                                            width={30}
                                            height={30}
                                            alt={'btc-logo'}
                                        />
                                        </CardHeader>
                                        <CardContent>
                                            <div className='text-2xl font-bold'>
                                                KES 2,184.00
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-6">
                                                <span className="text-red-600">
                                                    2.23%
                                                </span> last 1 month
                                            </p>
                                            <Button
                                                className="w-full"
                                            >
                                                <Link href={`/dashboard/buy-sell-crypto?baseAsset=BTC&currency=KES`}>
                                                    Buy/Sell
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>


                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </ScrollArea>
        </>
    )
}