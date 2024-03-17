'use client'

import React, { useTransition, useState } from 'react'
import { useSearchParams } from "next/navigation";
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage,
FormDescription
} from '@/components/ui/form'
import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardFooter,
    CardTitle
} from '@/components/ui/card'

import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {FormErrorMessage} from '@/components/form-errors'
import {FormSuccessMessage} from '@/components/form-success'

import { UserPhoneVerificationSchema } from '@/schemas'
import { addPhoneNumber } from '@/actions/settings'
//import {PhoneInput} from '@/components/lib/phone-input'
import { countries } from '@/helpers/data';

export const UserPhineVerificationForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const form = useForm<z.infer<typeof UserPhoneVerificationSchema>>({
        resolver: zodResolver(UserPhoneVerificationSchema),
        defaultValues: {
            phone: ""
        }
    })

    const onSubmit = (values: z.infer<typeof UserPhoneVerificationSchema>) => {
        setError("")
        setSuccess("")

        startTransition(async() => {
            addPhoneNumber(values, callbackUrl)
            .then((data:any) => {
                if(data?.data.error){
                    form.reset()
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

    return (
                <Card>
                    <CardHeader className='font-bold text-2xl dark:text-white'>
                        <CardTitle>Add mobile money number</CardTitle>
                        <CardDescription>
                            <ol className='max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400'>
                                <li>Please enter your mobile money number that you can verify with us</li>
                                <li>Ensure you can receive our verification code on this number for approval</li>
                                <li>This is the phone number that you will be using to transact with mobile money and to receive our authentication codes</li>
                            </ol>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-6"
                    >
                    <div>
                        <FormField 
                            control={form.control}
                            name='phone'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                        Mobile money number
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="Enter your phone number"
                                                type='text'
                                                disabled={isPending}
                                                
                                            /> 
                                            
                                        </FormControl>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                {/* <div 
                    className="flex items-center justify-between"
                    >
                    <div 
                        className="text-sm"
                        >
                        <Link 
                            href="/auth/forgot-password" 
                            className="font-medium text-blue-600 hover:text-blue-500"
                            >
                            Forgot your password?
                        </Link>
                    </div>
                </div> */}
                    <FormErrorMessage message={error}/>
                    <FormSuccessMessage message={success}/>
                <div>
                    <Button 
                        disabled={isPending}
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#FDC707] to-[#F00FDA] ">

                        Add phone
                    </Button>
                </div>
            </form>
                </Form>
                    </CardContent>
                </Card>
    )
}