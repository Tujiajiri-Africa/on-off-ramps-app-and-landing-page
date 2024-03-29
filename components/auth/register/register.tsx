'use client'

import React, {useState, useTransition} from 'react'
import * as z from 'zod'
import { RegisterSchema} from '@/schemas'
import {useForm, Controller} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardWrapper } from '@/components/auth/card-wrapper'
import {
Form,
FormControl,
FormField,
FormLabel,
FormMessage,
FormItem
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import { FormErrorMessage } from '@/components/form-errors'
import {FormSuccessMessage} from '@/components/form-success'
import { register } from '@/actions/auth'
import {countries,CountryProps} from '@/helpers/data'
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
import Image from 'next/image'
import { redirect } from 'next/navigation'
//import { useRouter } from 'next/router'
import {FirstTimePhoneVerification} from '@/components/auth/verification/registration-otp'

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [showPhoneVerification, setShouldShowPhoneVerification] = useState<boolean>(false)
    const [step, setStep] = useState<number>(0)

    const DEFAULT_REGISTRATION_CALLBACK = '/account/verify-phone'

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm_password: "",
            first_name: "",
            username: "",
            phone: "",
            last_name: ""
        }
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
       
                <CardWrapper 
                backButtonHref='/account/login'
                headerLabel='Create a new account'
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
                                                            //className="block text-sm font-medium text-gray-700"
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
                                                Username(used in login)
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
                        <Button 
                            disabled={isPending}
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-pink-600"
                            >
    
                            Create account
                           
                        </Button>
                    </div>
                        </form>
                    </Form>
          {/* <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label  className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input id="email" name="email" type="email" autoComplete="email" required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your email address"/>
                        </div>
                    </div>
    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1">
                            <input id="password" name="password" type="password" autoComplete="current-password" required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your password"/>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="mt-1">
                            <input id="confirm_password" name="confirm_password" type="password" autoComplete="current-password" required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm Password"/>
                        </div>
                    </div>
    
    
                
                </form> */}
            </CardWrapper>
        </>
    )
}
