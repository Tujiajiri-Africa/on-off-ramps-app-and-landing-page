'use client'

import React, { useTransition, useState } from 'react'
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
import {CryptoRewardClaimSchema} from '@/schemas'
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
import {supportedAssets,supportedPaymentMethods} from '@/helpers/data'
import {useSession} from 'next-auth/react'
import Image from 'next/image'

export function RewardClaimsForm(){
    const {data: userSessionData} = useSession()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const form = useForm<z.infer<typeof CryptoRewardClaimSchema>>({
        resolver: zodResolver(CryptoRewardClaimSchema),
        defaultValues:{
            amount: "1",
            payment_method: ""
        }
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
                <CardTitle>Claim Reward Earnings</CardTitle>
                <CardDescription className="mb-10">Instantly withdraw your AjiraPay cUSD earnings to your MiniPay wallet</CardDescription>
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
                                                placeholder="Enter cUSD amount"
                                                type='number'
                                                disabled={isPending}
                                                min={0}
                                                
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormErrorMessage message={error}/>
                    <FormSuccessMessage message={success}/>
                    <Button 
                        type='submit'
                        className='w-full bg-orange-600 text-white hover:bg-orange-500 hover:text-white'>
                        Claim
                    </Button>
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