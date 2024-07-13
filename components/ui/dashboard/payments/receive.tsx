'use client'

import React, { useTransition, useState, ReactNode } from 'react'
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
    CardFooter
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {DepositSchema} from '@/schemas'
import Image from 'next/image'
import { useMiniPay } from '@/hooks/web3/useConnectWallet'
import {truncateAddress} from '@/helpers/addresses'
import { toast } from 'react-toastify';
import { useQRCode } from 'next-qrcode'
import { CopyIcon } from 'lucide-react'

export function BuildWalletQRCode(){
    const { SVG, Image, Canvas } = useQRCode()
    const miniPayWlletAddress = useMiniPay()

    //if(!miniPayWlletAddress) return;

    return (
        <>
     <SVG
        text={miniPayWlletAddress && miniPayWlletAddress != undefined ? miniPayWlletAddress: ""}
        options={{
          margin: 2,
          width: 200,
          color: {
            dark: '#010599FF',
            light: '#FFBF60FF',
          },
        }}
      />
        </>
    )
}

export function ReceivePaymentComponent(){
    const miniPayWallet = useMiniPay()

    const form = useForm<z.infer<typeof DepositSchema>>({
        resolver: zodResolver(DepositSchema),
        // defaultValues:{
        //     amount: "",
        //     payment_method: ""
        // }
    })

    const handleCopyWallet = () =>{
        if(!miniPayWallet) return;
        navigator.clipboard.writeText(miniPayWallet).then(() => {
            toast.success("Wallet copied successfully",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              //transition: Bounce,
            }
            );
          }).catch((error) => {
            toast.error("Failed to copy!",{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              //transition: Bounce,
            })
          })
    }
    
    return (<>
    <CardContent 
        >
                <Card>
            <CardHeader>
                <CardTitle>Receive Money</CardTitle>
                <CardDescription className="mb-10">
                    {/* Top up your AjiraPay wallet with {userSessionData?.user.currency} and start making money buying and selling cUSD seamlessly on MiniPay */}
                        Receive money into your MiniPay wallet from anywhere around the globe
                </CardDescription>
                {/* <CardDescription className="mb-10">Top up your mobile money wallet and start buying and selling crypto seamlessly</CardDescription> */}
            </CardHeader>
            <CardContent>     
                <div className='mb-4'>
                    <BuildWalletQRCode  />
                </div>               
            <div className="mb-4">
                        <FormField 
                            control={form.control}
                            name='amount'
                            render={({field}) => (
                                <FormItem>

                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            <Input
                                                //{...field}
                                                value={truncateAddress(miniPayWallet)}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="Enter amount to send"
                                                // placeholder="Enter amount to deposit"
                                                type='number'
                                                //disabled={isPending}
                                                disabled
                                                min={0}
                                                
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
            </CardContent>
            <CardFooter>
            <Button 
                className='w-full bg-orange-600 text-white hover:bg-orange-500 hover:text-white'
                type='button'
                onClick={handleCopyWallet}
                    >
                    <div className='flex items-center content-center gap-2'>
                        Copy wallet

                        <CopyIcon className='w-10 h-10'/>
                    </div>
            </Button>

            </CardFooter>
        </Card>
        </CardContent>

    </>)
}