'use client'

import React, {useState, useTransition} from 'react'
import * as z from 'zod'
import { PhoneRegistrationOTPSchema} from '@/schemas'
import {useForm, Controller} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardWrapper } from '@/components/auth/card-wrapper'
import {
Form,
FormControl,
FormField,
FormLabel,
FormMessage,
FormItem,
FormDescription
} from '@/components/ui/form'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import {Button} from '@/components/ui/button'
import { FormErrorMessage } from '@/components/form-errors'
import {FormSuccessMessage} from '@/components/form-success'
import { redirect } from 'next/navigation'
import {verifyPhone} from '@/actions/auth'

export function FirstTimePhoneVerification(){
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const [step, setStep] = useState<number>(0)

    
    const form = useForm<z.infer<typeof PhoneRegistrationOTPSchema>>({
        resolver: zodResolver(PhoneRegistrationOTPSchema)
        // defaultValues: {
        //     registration_otp: ""
        // }
    })

    const handleSubmit = (values: z.infer<typeof PhoneRegistrationOTPSchema>) => {
        setError("")
        setSuccess("")

        startTransition(async() => {
            verifyPhone(values)
            .then((data:any) => {
                if(data?.data.error){
                    //form.reset()
                    setError(data?.data.error)
                }
                if(data?.data.success){
                    form.reset()
                    setSuccess(data?.data.success)
                    //redirect('/auth/login')
                    window.location.replace('/account/login')
                }
            }).catch(() => {
                setError("Something went wrong")
                setSuccess("")
            })
        })
    }

    return (
        <>
        <CardWrapper 
            backButtonHref='/account/login'
            headerLabel='Verify phone number'
            backButtonLabel="Already verified? Sign in instead"
            showSocial={false} 
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(handleSubmit)} 
                    className="space-y-6"
                >
                    <div className="flex flex-wrap -mx-3 mb-6 items-center">
                        <div className="w-full  px-3 mb-6 md:mb-0"
                        //md:w-1/2
                        >
                            <FormField
                            control={form.control}
                            name="registration_otp"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className='block text-sm font-medium text-gray-700'>Enter verification code sent to your phone</FormLabel>
                                <div className='mt-1' >
                                    <FormControl className='items-center'>
                                        <InputOTP maxLength={6} {...field} >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage/>
                                </div>    
                                </FormItem>
                            )}
                            />
                        </div>
                    </div>
                    <FormErrorMessage message={error}/>
                    <FormSuccessMessage message={success}/>
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
                             Verifying
                    </Button>

                    :
                    <Button 
                        //disabled={isPending}
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500">

                        Verify phone
                    </Button>
                    }
                    </div>
                </form>
            </Form>
        </CardWrapper>
        </>
    )
}