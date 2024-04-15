'use client'

import React,{useTransition, useState, useMemo, useCallback} from 'react'
import { UserProfileSchema, UserProfileAddressInfo } from '@/schemas'
import {addUserAddressToProfile} from '@/actions/settings'
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {FormErrorMessage} from '@/components/form-errors'
import {FormSuccessMessage} from '@/components/form-success'
import {useSession} from 'next-auth/react'

export function UseAddressForm(){
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const {data: userSessionData, update} = useSession()

    const form = useForm<z.infer<typeof UserProfileAddressInfo>>({
        resolver: zodResolver(UserProfileAddressInfo),
        defaultValues: {
          address_line_1: userSessionData?.user?.address?.address_line_1,
          address_line_2: userSessionData?.user?.address?.address_line_2,
          zip_code: userSessionData?.user?.address?.zip_code,
          //building: "",
          street: userSessionData?.user?.address?.street,
          city: userSessionData?.user?.address?.city,
          state: userSessionData?.user?.address?.state
        }
    })

    const handleUserAddressSubmission = (values: z.infer<typeof UserProfileAddressInfo>) => {
        setError("")
        setSuccess("")
    
        startTransition(async() => {
            addUserAddressToProfile(userSessionData?.user.accessToken, values)
            .then((data:any) => {
                if(data?.data.error){
                    //form.reset()
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

    const shouldDisableSubmitButton = useMemo(() => {
        if(userSessionData?.user?.address?.address_line_1 != null && 
            userSessionData?.user?.address?.city != null &&
            userSessionData?.user?.address?.state != null &&
            userSessionData?.user?.address?.zip_code != null &&
            userSessionData?.user?.address?.street != null
        ){
            return true
        }
        return false
    },[userSessionData])

    return (
        <>
                    <Form {...form}>  
                      <form
                        onSubmit={form.handleSubmit(handleUserAddressSubmission)}
                        className='space-y-6'
                      >
                                <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <FormField
                                        control={form.control}
                                        name='address_line_1'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className='block text-sm font-medium text-gray-700'>Address Line 1</FormLabel>
                                                <div 
                                                className='mt-1'
                                                >
                                                <FormControl>
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                        placeholder="Address Line 1"
                                                        type='text'
                                                        
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                            </FormItem>
                                            
                                        )}
                                    />
                               
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                            
                                <FormField
                                        control={form.control}
                                        name='address_line_2'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className='block text-sm font-medium text-gray-700'>Address Line 2</FormLabel>
                                                <div 
                                                className='mt-1'
                                                >
                                                <FormControl>
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                        placeholder="Address Line 2"
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
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <FormField
                                        control={form.control}
                                        name='city'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className='block text-sm font-medium text-gray-700'>City</FormLabel>
                                                <div 
                                                className='mt-1'
                                                >
                                                <FormControl>
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                        placeholder="City"
                                                        type='text'
                                                        
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                            </FormItem>
                                            
                                        )}
                                    />
                            
                                
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                              
                                <FormField
                                        control={form.control}
                                        name='state'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className='block text-sm font-medium text-gray-700'>State</FormLabel>
                                                <div 
                                                className='mt-1'
                                                >
                                                <FormControl>
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                        placeholder="State"
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
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <FormField
                                        control={form.control}
                                        name='street'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className='block text-sm font-medium text-gray-700'>Street</FormLabel>
                                                <div 
                                                className='mt-1'
                                                >
                                                <FormControl>
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                        placeholder="Street"
                                                        type='text'
                                                        
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                            </FormItem>
                                            
                                        )}
                                    />
                        
                                </div>
                                <div className="w-full md:w-1/2 px-3">
            
                                <FormField
                                        control={form.control}
                                        name='zip_code'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className='block text-sm font-medium text-gray-700'>Zip Code</FormLabel>
                                                <div 
                                                className='mt-1'
                                                >
                                                <FormControl>
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                        placeholder="Zip Code"
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
                                        Saving
                                </Button>

                                :
                                <Button
                                    disabled={shouldDisableSubmitButton} 
                                    //disabled={isPending}
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500">

                                    Save
                                </Button>
                                }

                          </div>
                      </form>
                    </Form>
        </>
    )
}