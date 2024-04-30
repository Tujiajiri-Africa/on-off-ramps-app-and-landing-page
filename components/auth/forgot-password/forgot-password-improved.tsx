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
import { AuthCardWrapperWithIntroBackground } from '@/components/auth/card-wrapper-v2'

export function UserForgotPasswordFormWithProductIntro(){
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
            <AuthCardWrapperWithIntroBackground
                backButtonHref='/account/login'
                headerLabel='Forgot your password?'
                backButtonLabel="Sign in instead"
                showSocial={false} 
                headerDescription="Submit your email address and we'll send you instructions on how to reset your password."
                shouldPositionDescriptionAtCenter={true}
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
                        {
                        isPending ? 

                        <Button 
                            type="button" 
                            disabled
                            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500'
                            //className="py-2 px-4 flex justify-center items-center  bg-orange-600  hover:bg-orange-500 hover:text-white focus:ring-orange-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
                            >
                        <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                </path>
                           </svg>
                             Requesting code
                    </Button>

                    :
                    <Button 
                        //disabled={isPending}
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500">

                        Send Request
                    </Button>
                    }
                        </div>
                    </form>
                </Form>

            </AuthCardWrapperWithIntroBackground>
        </>
    )
}