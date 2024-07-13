'use client'

import React, { useTransition, useState, useCallback } from 'react'
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
import {CryptoRewardClaimSchema} from '@/schemas'
import {FormErrorMessage} from '@/components/form-errors'
import {FormSuccessMessage} from '@/components/form-success'
import { ScrollArea } from "@/components/ui/scroll-area";
import {useSession} from 'next-auth/react'
import { claimCryptoReward } from '@/actions/payments'
import { useMiniPay } from '@/hooks/web3/useConnectWallet'
import { useUserCryptoRewardBalance } from '@/hooks/web3/useCryptoRewardBalance'

export function RewardClaimsForm(){
    const miniPayWallet = useMiniPay()
    const cryptoRewardBalance = useUserCryptoRewardBalance()

    const {data: userSessionData} = useSession()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [claimAmount, setClaimAmount] = useState<string>("")

    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true)

    const form = useForm<z.infer<typeof CryptoRewardClaimSchema>>({
        resolver: zodResolver(CryptoRewardClaimSchema),
        // defaultValues:{
        //     amount: "1",
        //     payment_method: ""
        // }
    })

    const handleInputAmountChange = useCallback((amount:string) => {
        if(!cryptoRewardBalance) return;
        
        let formatedAmount = parseFloat(amount)
        if(formatedAmount > cryptoRewardBalance){
            setError("Amount exceeds available balance")
            setIsSubmitButtonDisabled(true)
            setClaimAmount("")
        }else{
            setClaimAmount(amount)
            setIsSubmitButtonDisabled(false)
            setError("")
        }
    },[cryptoRewardBalance, setIsSubmitButtonDisabled, setError, setClaimAmount])

    const processRewardClaim = (values: z.infer<typeof CryptoRewardClaimSchema>) => {
        setError("")
        setSuccess("")

        startTransition(async() => {
            claimCryptoReward(
                values, 
                userSessionData?.user.accessToken,
                miniPayWallet
            )
            .then((data:any) => {
                if(data?.data.error){
                    //form.reset()
                    setError(data?.data.error)
                }
                if(data?.data.success){
                    form.reset()
                    setSuccess(data?.data.success)
                }
            }).catch(() => {
                setError("Something went wrong")
                setSuccess("")
            })
        })
    }

    const calculateAssetAmountFromPercentage = useCallback((percentageValue:number) => {
        if(!cryptoRewardBalance) return;
        let totalToClaim = (cryptoRewardBalance * percentageValue) / 100;
        setClaimAmount(totalToClaim.toString());
    },[cryptoRewardBalance])

    return (<>
        <ScrollArea className='h-full'>
        {/* <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    Withdraw
                </h2>
            </div>
        </div> */}
        <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8 border-none'>
        <CardContent className="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-4">
        <Card>
            <CardHeader>
                <CardTitle>Claim Reward Earnings</CardTitle>
                <CardDescription className="mb-10">Instantly withdraw your AjiraPay cUSD reward earnings to your MiniPay wallet</CardDescription>
                {/* <CardDescription className="mb-10">Withdraw from your fiat wallet to your mobile money or directly to your bank account</CardDescription> */}
            </CardHeader>
            <CardContent>
            
                <Form  {...form}>

                    <form 
                        className="space-y-6"
                        onSubmit={form.handleSubmit(processRewardClaim)}
                    >
                    <div>
                        <FormField 
                            control={form.control}
                            name='amount'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                        {/* Amount */}
                                        {/* Amount in {userSessionData?.user.currency} */}
                                        Amount in cUSD
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                //placeholder="Enter cUSD amount"
                                                placeholder=""
                                                type='number'
                                                //disabled={isPending}
                                                disabled
                                                value={claimAmount}
                                                min={0}
                                                onChangeCapture={e => handleInputAmountChange(e.currentTarget.value)}
                                                { ...form.register('amount', { valueAsNumber: true } ) }
                                            />
                                        </FormControl>
                                        <FormLabel
                                            className='block text-sm font-medium'
                                        >
                                            <p className="text-gray-700 dark:text-gray-400">Available Balance: <span className="text-orange-600">{`$ ${cryptoRewardBalance}`}</span> </p>
                                        </FormLabel>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <div className='flex flex-1 sm:gap-40 gap-10'>
                        {
                            cryptoRewardBalance && cryptoRewardBalance > 0 && 
                            (
                             <>
                               <Button
                                    className='bg-orange-600 text-white text-sm'
                                    onClick={() => calculateAssetAmountFromPercentage(25)}
                               >
                                    25%
                               </Button>
                               <Button
                                    className='bg-orange-600 text-white text-sm'
                                    onClick={() => calculateAssetAmountFromPercentage(50)}
                               >
                                    50%
                               </Button>
                                
                               <Button
                                    className='bg-orange-600 text-white text-sm'
                                    onClick={() => calculateAssetAmountFromPercentage(70)}
                               >
                                    70%
                               </Button>

                               <Button
                                    className='bg-orange-600 text-white text-sm'
                                    onClick={() => calculateAssetAmountFromPercentage(100)}
                               >
                                    All
                               </Button>
                             </>
                            )
                        }
                    </div>
                    <FormErrorMessage message={error}/>
                    <FormSuccessMessage message={success}/>
                    <div className='flex flex-1 sm:gap-40 gap-10'>
                    {
                                                       isPending ? (
                                                            <Button 
                                                                type="button" 
                                                                disabled
                                                                className='w-full bg-orange-600 text-white hover:bg-orange-500 hover:text-white'
                                                                //className="py-2 px-4 flex justify-center items-center  bg-orange-600  hover:bg-orange-500 hover:text-white focus:ring-orange-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
                                                                >
                                                                
                                                                <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                                         <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                                                        </path>
                                                                   </svg>
                                                                   {/* Buying  */}
                                                                   {/* {selectedCryptoAsset != null || selectedCryptoAsset != undefined ? `Buying ${selectedCryptoAsset}`: "Processing"} */}
                                                                   Processing claim
                                                            </Button>
                                                       )

                                                       :
                                                       <Button 
                                                       disabled={ isSubmitButtonDisabled || claimAmount == "" || claimAmount == null || claimAmount == undefined }
                                                       type='submit'
                                                       className='w-full bg-orange-600 text-white hover:bg-orange-500 hover:text-white'
                                                       >
                                                       {/* {selectedCryptoAsset != null || selectedCryptoAsset != undefined ? `Buy ${selectedCryptoAsset}`: "Buy"} */}
                                                        Claim
                                                   </Button>
                                                    }
                    </div>
                    </form>
                </Form>
            </CardContent>
            {/* <CardFooter>
                <Button className='w-full bg-orange-600 text-white hover:bg-orange-500 hover:text-white'>
                    Claim
                </Button>
            </CardFooter> */}
        </Card>
        </CardContent>

        </div>
    </ScrollArea>
       
    </>)
}