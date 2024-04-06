'use client'

import React, {useTransition} from 'react'
import * as z from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { CardWrapper } from '@/components/auth/card-wrapper'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {
Form,
FormControl,
FormLabel,
FormItem,
FormField,
FormMessage
} from '@/components/ui/form'
import { ForgotPasswordSchema } from '@/schemas'
import {FormErrorMessage} from '@/components/form-errors'
import {FormSuccessMessage} from '@/components/form-success'
import {handleForgotPassword} from '@/actions/auth'

export const ForgotPasswordForm = () => {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema)
    })

    const handleSubmit = (values: z.infer<typeof ForgotPasswordSchema>) =>{
        startTransition(() => {
            handleForgotPassword(values)
        })
    }

    return (
        <>
            <CardWrapper
                backButtonHref='/account/login'
                headerLabel='Forgot password'
                backButtonLabel="Sign in instead"
                showSocial={false} 
            >
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(handleSubmit)}
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
                                                Email
                                            </FormLabel>
                                            <div 
                                                className='mt-1'
                                                >
                                                <FormControl>
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                        placeholder="Enter your email address"
                                                        type='email'
                                                        
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormErrorMessage message=""/>
                            <FormSuccessMessage message=""/>
                        <div>
                            <Button 
                                disabled={isPending}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 ">
                                Request code
                            </Button>
                        </div>
                    </form>
                </Form>

            </CardWrapper>
        </>
    )
}

