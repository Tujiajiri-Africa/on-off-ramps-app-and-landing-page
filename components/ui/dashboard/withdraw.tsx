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
import {WithdrawSchema} from '@/schemas'
import {FormErrorMessage} from '@/components/form-errors'
import {FormSuccessMessage} from '@/components/form-success'
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { supportedPaymentMethods } from '@/helpers/data'
import {useSession} from 'next-auth/react'
import Image from 'next/image'
import { fetchFiatBalance } from '@/actions/payments'
import { useQuery } from 'react-query';
import { useUserFiatBalanceBalance } from '@/hooks/fiat/useUserFiatBalance'

export function WithdrawForm(){
    const totalMobileMoneyBalance = useUserFiatBalanceBalance()

    const {data: userSessionData} = useSession()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [withDrawalAmount, setWithDrawalAmount] = useState<string>("")
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true)
    const [fiatBalance, setFiatBalance] = useState<number|undefined>(0);

    const fetchUserFiatBalance = useCallback(async() => {
        const result = await fetchFiatBalance(userSessionData?.user.accessToken)
        const balance = result

        setFiatBalance(balance)
    },[userSessionData])

    const {error: balanceLoadError, status, data:fiatBalanceData, isLoading: balanceIsLoading, isError } = useQuery({
        queryKey: 'fiat_balance',
        queryFn: fetchUserFiatBalance
    })

    const handleInputAmountChange = useCallback((amount:string) => {
        if(!totalMobileMoneyBalance) return;
        
        let formatedAmount = parseFloat(amount)
        if(formatedAmount > totalMobileMoneyBalance){
            setError("Amount exceeds available balance")
            setIsSubmitButtonDisabled(true)
            setWithDrawalAmount("")
        }else{
            setWithDrawalAmount(amount)
            setIsSubmitButtonDisabled(false)
            setError("")
        }
    },[totalMobileMoneyBalance, setIsSubmitButtonDisabled, setError, setWithDrawalAmount])

    const form = useForm<z.infer<typeof WithdrawSchema>>({
        resolver: zodResolver(WithdrawSchema),
        // defaultValues:{
        //     amount: 100,
        //     channel: ""
        // }
    })

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
                <CardTitle>Withdraw</CardTitle>
                <CardDescription className="mb-10">Withdraw {userSessionData?.user.currency} from your AjiraPay wallet to your mobile wallet</CardDescription>
                {/* <CardDescription className="mb-10">Withdraw from your fiat wallet to your mobile money or directly to your bank account</CardDescription> */}
            </CardHeader>
            <CardContent>
            
                <Form  {...form}>

                    <form 
                        className="space-y-6"
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
                                        Amount in {userSessionData?.user.currency}
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="Enter amount to deposit"
                                                type='number'
                                                disabled={isPending}
                                                min={0}
                                                
                                            />
                                        </FormControl>
                                        <FormLabel
                                            className='block text-sm font-medium'
                                        >
                                            <p className="text-gray-700 dark:text-gray-400">Available Balance: <span className="text-orange-600">{`$ ${fiatBalance}`}</span> </p>
                                        </FormLabel>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField 
                            control={form.control}
                            name='channel'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                        {/* Select Withdawal method */}
                                        Select payment network for withdrawal
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            {/* <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="Enter amount to deposit"
                                                type='number'
                                                //disabled={isPending}
                                                min={0}
                                                
                                            /> */}
                                            <Select
                                            {...field}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="withdrawal method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                {
                                                        supportedPaymentMethods
                                                        .filter((p) => p.active == true)
                                                        .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
                                                        .map((channel) => (
                                                            <SelectItem key={channel.value} value={channel.value}>
                                                                
                                                                <div className='flex items-center content-center gap-2'>
                                                                            <Image src={channel.iconUrl?.src} width={30} height={30} alt={channel.value} />
                                                                            {channel.label}
                                                                </div>
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
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
                                                                   Processing withdrawal
                                                            </Button>
                                                       )

                                                       :
                                                       <Button 
                                                
                                                       type='submit'
                                                       className='w-full bg-orange-600 text-white hover:bg-orange-500 hover:text-white'
                                                       >
                                                       {/* {selectedCryptoAsset != null || selectedCryptoAsset != undefined ? `Buy ${selectedCryptoAsset}`: "Buy"} */}
                                                       Withdraw
                                                   </Button>
                                                    }
                    </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
        </CardContent>

        </div>
    </ScrollArea>
       
    </>)
}