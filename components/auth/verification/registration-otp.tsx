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
        resolver: zodResolver(PhoneRegistrationOTPSchema),
        defaultValues: {
            registration_otp: ""
        }
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
                    window.location.replace('/auth/login')
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
            backButtonHref='/auth/login'
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
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <FormField
                            control={form.control}
                            name="registration_otp"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className='block text-sm font-medium text-gray-700'>Enter verification code sent to phone</FormLabel>
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
                        <Button 
                            disabled={isPending}
                            type="submit"
                            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#FDC707] to-[#F00FDA]"
                            >

                            Verify Phone
                        
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>
        </>
    )
}