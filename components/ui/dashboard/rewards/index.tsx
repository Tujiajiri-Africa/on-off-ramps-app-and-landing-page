'use client'

import React,{useState, useCallback } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import Image from 'next/image'
import Link from 'next/link'
import cUSD_LOGO from '@/app/assets/logo/crypto/cUSD.png'
import { useQuery } from 'react-query';
import {useSession} from 'next-auth/react'
import { fetchUserCryptoRewardBalance } from '@/actions/payments'
import { useUserCryptoRewardBalance } from '@/hooks/web3/useCryptoRewardBalance';
import { useNextRewardClaimDate } from '@/hooks/web3/useNextRewardClaimDate'

import { Trophy } from 'lucide-react'

export function UserRewardInfoPage(){
    //const balance = useUserCryptoRewardBalance();
    const nextClaimDate = useNextRewardClaimDate()

    const {data: userSessionData} = useSession()
    const [ rewardBalance, setRewardBalance ] = useState<number|undefined>(0);

    const fetchBalance = useCallback(async() => {
        const result = await fetchUserCryptoRewardBalance(userSessionData?.user.accessToken)
        const balance = result
        setRewardBalance(balance)
    },[userSessionData])

    const {error: balanceLoadError, status, data:rewardBalanceData, isLoading: balanceIsLoading, isError } = useQuery({
        queryKey: 'balance',
        queryFn: fetchBalance
    })
    
    {
        isError && <div>Error</div>
    }
    return (
        <>
            <ScrollArea className="h-full"
            
            >
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <div 
                        className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
                    >
                        <Card 
                            className='col-span-5 sm:col-span-1 lg:col-span-5'
                            
                            
                            >
                            <CardHeader>
                                    <div className="flex items-center justify-between space-y-2">
                                        <div className="md:flex items-center space-x-2">
                                        <CardTitle>
                                            My Earnings
                                            {/* {userSessionData?.user.currency}  Wallet */}
                                        </CardTitle>
                                        
                                        </div>
                                        {/* <Button 
                                            className="content-start group  rounded-md px-3 py-2 text-sm bg-[#00BF63] text-white font-medium hover:bg-accent hover:text-accent-foreground"
                                            variant={'outline'}
                                        >
                                            View More
                                        </Button> */}
                                        <Trophy className='w-10 h-10 rounded-full' />
                                    </div>   
                                </CardHeader>
                                <CardContent className="pl-2 gap-4">
                                <div className=''
                                //bg-[#00BF63]/60 dark:bg-[#00BF63]/20
                                >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            cUSD
                                        </CardTitle>
                                        <Image
                                            src={cUSD_LOGO.src}
                                            width={40}
                                            height={40}
                                            alt={'cUSD-logo'}
                                        />
                                            {/* <Wallet2Icon className='w-10 h-10 rounded-full' /> */}
                                        </CardHeader>
                                        <CardContent>
                                            <div className='text-2xl font-bold'>
                                                {/* KES 73,424.00 */}
                                                

                                                {
                                                    balanceIsLoading ? 

                                                    <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                                        </path>
                                                    </svg>

                                                    :
                                                    
                                            
                                                    `$ ${rewardBalance?.toString()}`
                                                }
                                            </div>
                                            <p className='text-sm font-normal'>Total Rewards</p>
                                            {
                                                rewardBalance != undefined && rewardBalance > 0 && (
                                                    <p className="text-xs text-muted-foreground mb-6">
                                                        <span className="dark:text-gray-300 text-black">
                                                            Claimable 
                                                        </span> <span className='dark:text-gray-300 text-black'>{ nextClaimDate }</span>
                                                    </p>
                                                )
                                            }

                                            <br></br>
                                            <hr></hr>
                                            <br></br>
                                            <Button
                                                className="w-full bg-orange-600 text-white hover:bg-orange-500 hover:text-white"
                                            >
                                                <Link href={`/dashboard/rewards/claim`}>
                                                    Claim
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </div>
                                </CardContent>
                        </Card>
                        
                    </div>
                </div>
            </ScrollArea>
        </>
    )
}