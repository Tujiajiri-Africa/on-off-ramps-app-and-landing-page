'use client'

import React, {useState, useTransition} from 'react'
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from '@/components/ui/card'
import {
    Form,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form'
import {
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectLabel, 
    SelectScrollDownButton, 
    SelectSeparator, 
    SelectTrigger, 
    SelectValue} from '@/components/ui/select'
import { FormErrorMessage } from '@/components/form-errors'
import {FormSuccessMessage} from '@/components/form-success'

import * as z from 'zod'
import { RegisterSchema} from '@/schemas'
import {useForm, Controller} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

import { register } from '@/actions/auth'
import {countries,CountryProps} from '@/helpers/data'
import { AuthCardWrapperWithIntroBackground } from '@/components/auth/card-wrapper-v2'

export function UserRegistrationWithProductIntro(){
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [showPhoneVerification, setShouldShowPhoneVerification] = useState<boolean>(false)
    const [step, setStep] = useState<number>(0)

    const DEFAULT_REGISTRATION_CALLBACK = '/account/verify-phone'

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema)
    })

    const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")

        startTransition(async() => {
            register(values)
            .then((data:any) => {
                if(data?.data.error){
                    //form.reset()
                    setError(data?.data.error)
                    setShouldShowPhoneVerification(false)
                }
                if(data?.data.success){
                    form.reset()
                    setSuccess(data?.data.success)
                    setShouldShowPhoneVerification(true)
                    //redirect('/account/verify-phone')
                    //router.push('/account/verify-phone')
                    //return Response.redirect(new URL(DEFAULT_REGISTRATION_CALLBACK))
                    window.location.replace(DEFAULT_REGISTRATION_CALLBACK)
                }
            }).catch(() => {
                setError("Something went wrong")
                setSuccess("")
                setShouldShowPhoneVerification(false)
            })
        })
    }

    return (
    <>

            <AuthCardWrapperWithIntroBackground 
                backButtonHref='/account/login'
                headerLabel='Create Account'
                backButtonLabel="Have an account? Sign in"
                showSocial={false} 
                >

<Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(handleSubmit)} 
                            className="space-y-6"
                            >
                                <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <FormField
                                        control={form.control}
                                        name='first_name'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className='block text-sm font-medium text-gray-700'>First name</FormLabel>
                                                <div 
                                                className='mt-1'
                                                >
                                                <FormControl>
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        //className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                        //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                        placeholder="Enter your first name"
                                                        type='text'
                                                        
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                            </FormItem>
                                            
                                        )}
                                    />
                                {/* <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    First Name
                                </label> */}
                                {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"> */}
                                
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                {/* <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Last Name
                                </label> */}
                                {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"> */}
                                <FormField
                                        control={form.control}
                                        name='last_name'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className='block text-sm font-medium text-gray-700'>Last name</FormLabel>
                                                <div 
                                                className='mt-1'
                                                >
                                                <FormControl>
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                        placeholder="Enter your last name"
                                                        type='text'
                                                        
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                            </FormItem>
                                            
                                        )}
                                    />
                                </div>
                            </div>
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
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
    
                            <div>
                            </div>
                            
                                        <div>
                                            <FormField
                                                    control={form.control}
                                                    name='phone'
                                                    render={({field}) => (
                                                        <FormItem>
                                                        <FormLabel 
                                                            className="block text-sm font-medium text-gray-700"
                                                            >
                                                            Country 
                                                        </FormLabel>
                                                        <div 
                                                            className='mt-1'
                                                            >
                                                            <FormControl> 
                                                                <Select
                                                                   // {...field}
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                    >
                                                                        <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="select country" />
                                                                        </SelectTrigger>
                                                                        <SelectContent position="popper">
                                                                            {
                                                                                countries
                                                                                .filter((s) => s.active == true)
                                                                                .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                                                                                .map((country) => (
                                                                                    <SelectItem key={country.code} value={country.code}>
                                                                                        <div className='flex items-center content-center gap-2'>
                                                                                        
                                                                                           <Image 
                                                                                                src={country.flag.src} 
                                                                                                width={18} 
                                                                                                height={18} 
                                                                                                alt={country.name}
                                                                                                className='rounded-full'
                                                                                            /> 
                                                                                            { ` ${country.name} `}
                                                                                        </div>
                                                                                    </SelectItem>
                                                                                ))
                                                                            }
                                                                        </SelectContent>
                                                                    </Select> 
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                    )}
                                            />
                                        </div>
                            <div>
                        
                                <FormField 
                                    control={form.control}
                                    name='phone'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel 
                                                className="block text-sm font-medium text-gray-700"
                                                >
                                                Mobile money number
                                            </FormLabel>
                                            <div 
                                                className=' mt-1'
                                                >
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                        placeholder="Enter phone number"
                                                        type='text'
                                                        
                                                    />
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField 
                                    control={form.control}
                                    name='username'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel 
                                                className="block text-sm font-medium text-gray-700"
                                                >
                                                Username
                                            </FormLabel>
                                            <div 
                                                className='mt-1'
                                                >
                                                <FormControl>
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                        placeholder="Enter your username"
                                                        type='text'
                                                        
                                                    />
                                                </FormControl>
                                                <FormMessage />
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
                                                    disabled={isPending}
                                                    {...field}
                                                    //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                    placeholder="********"
                                                    type='password'
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
                                            className="block text-sm font-medium text-gray-700"
                                            >
                                            Confirm Password
                                        </FormLabel>
                                        <div 
                                            className='mt-1'
                                            >
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    {...field}
                                                    //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                    placeholder="********"
                                                    type='password'
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
                            Creating account
                    </Button>

                    :
                    <Button 
                        //disabled={isPending}
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500">

                        Create account
                    </Button>
                    }
                    </div>
                        </form>
                    </Form>
            </AuthCardWrapperWithIntroBackground>
    </>
    )
}