'use client'

import React, { useTransition } from 'react'
import { CardWrapper } from '@/components/auth/card-wrapper'
import Link from 'next/link'
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

import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {FormErrorMessage} from '@/components/form-errors'
import {FormSuccessMessage} from '@/components/form-success'

import { LoginSchema } from '@/schemas'
import { login } from '@/actions/auth'

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values)
        })
    }

    return (
        <CardWrapper 
            backButtonHref='/register'
            headerLabel='Sign in to your account'
            backButtonLabel="Don't have an account? Create account"
            showSocial={false} 
            >
                <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-6"
                    >
                    <div>
                        <FormField 
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700"
                                        >
                                        Email address
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="Enter your email address"
                                                type='email'
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
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700"
                                        >
                                        Password
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="********"
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
                <div 
                    className="flex items-center justify-between"
                    >
                    <div 
                        className="text-sm"
                        >
                        <Link 
                            href="/forgot-password" 
                            className="font-medium text-blue-600 hover:text-blue-500"
                            >
                            Forgot your password?
                        </Link>
                    </div>
                </div>
                    <FormErrorMessage message=""/>
                    <FormSuccessMessage message=""/>
                <div>
                    <Button 
                        disabled={isPending}
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#FDC707] to-[#F00FDA] ">

                        Sign in
                    </Button>
                </div>
            </form>
                </Form>

        </CardWrapper>
    )
}