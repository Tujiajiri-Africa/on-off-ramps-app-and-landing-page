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
    CardFooter
} from '@/components/ui/card'

import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {FormErrorMessage} from '@/components/form-errors'
import {FormSuccessMessage} from '@/components/form-success'

import { PasswordResetSchema } from '@/schemas'
import { changePassword } from '@/actions/settings'
import { useSession } from 'next-auth/react';
import {signOut} from '@/auth'

export const UserPasswordChangeForm = () => {
    const {data:userSessionData}= useSession()
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const form = useForm<z.infer<typeof PasswordResetSchema>>({
        resolver: zodResolver(PasswordResetSchema)
        // defaultValues: {
        //     current_password: "",
        //     new_password: "",
        //     confirm_password: ""
        // }
    })

    const onSubmit = async(values: z.infer<typeof PasswordResetSchema>) => {
        setError("")
        setSuccess("")

        startTransition(async() => {
            changePassword(values, userSessionData?.user.accessToken.toString())
            .then(async(data:any) => {
                if(data?.data.error){
                    //form.reset()
                    setError(data?.data.error)
                }
                if(data?.data.success){
                    form.reset()
                    setSuccess(data?.data.success)
                    //await signOut()
                }
            }).catch(() => {
                setError("Something went wrong")
                setSuccess("")
            })
        })
    }

    return (
                <Card className='dark:bg-[#191C24]/30'>
                    <CardHeader className='font-bold text-2xl dark:text-white'>
                        Change your password
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
                            name='current_password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                        Current password
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="************"
                                                type='password'
                                                disabled={isPending}
                                                
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField 
                            control={form.control}
                            name='new_password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                        New password
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="**********"
                                                type='password'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField 
                            control={form.control}
                            name='confirm_password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                        Confirm new password
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="**********"
                                                type='password'
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
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 ">

                        Change password
                    </Button>
                </div>
            </form>
                </Form>
                    </CardContent>
                </Card>
    )
}