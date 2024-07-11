'use client'

import React,{useTransition, useState} from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
  } from "@/components/ui/sheet"
import { UserProfileUpdateForm } from '@/app/(dashboard)/dashboard/user/profileUpdateForm'
import {UserPasswordUpdateForm} from '@/app/(dashboard)/dashboard/user/passwordChangeForm'
import {UserAddPhoneForm} from '@/app/(dashboard)/dashboard/user/addPhoneForm'
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
import {FormErrorMessage} from '@/components/form-errors'
import {FormSuccessMessage} from '@/components/form-success'
import {useSession} from 'next-auth/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileSchema } from '@/schemas'
import {UseAddressForm} from '@/components/ui/dashboard/user-address-form'

export function UserProfileComponent(){
    const {data: userSessionData} = useSession()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    
    const form = useForm<z.infer<typeof UserProfileSchema>>({
      resolver: zodResolver(UserProfileSchema),
      defaultValues: {
          email: userSessionData?.user.email,
          username: userSessionData?.user.username,
          first_name: userSessionData?.user.first_name,
          last_name: userSessionData?.user.last_name,
          phone: `+${userSessionData?.user.phone}`//userSessionData?.user.phone
      }
  })

    return (
        <>
        <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Profile
          </h2>
          
          <div className="hidden sm:flex items-center space-x-2 ">
            
            <Button
                className="bg-[#16a34a] dark:text-white"
            >
                Send/Receive
            </Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button >Add Mobile Money Number</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <UserAddPhoneForm />
                    </SheetContent>
                  </Sheet>

                  <Sheet>
                    <SheetTrigger asChild>
                        <Button>Edit Profile</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <UserProfileUpdateForm />
                    </SheetContent>
                    </Sheet>

                    <Sheet>
                      <SheetTrigger asChild>
                          <Button className='bg-orange-600 text-white hover:bg-orange-500 hover:text-white'>Change Password</Button>
                      </SheetTrigger>
                      <SheetContent>
                          <UserPasswordUpdateForm />
                      </SheetContent>
                    </Sheet>
          </div>
        </div> */}

        {/* <div className="sm:hidden grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"> 
        <Sheet>
                    <SheetTrigger asChild>
                        <Button >Add Mobile Money Number</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <UserAddPhoneForm />
                    </SheetContent>
                  </Sheet>

                  <Sheet>
                    <SheetTrigger asChild>
                        <Button>Edit Profile</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <UserProfileUpdateForm />
                    </SheetContent>
                    </Sheet>

                    <Sheet>
                      <SheetTrigger asChild>
                      <Button className='bg-orange-600 text-white hover:bg-orange-500 hover:text-white'>Change Password</Button>
                      </SheetTrigger>
                      <SheetContent>
                          <UserPasswordUpdateForm />
                      </SheetContent>
                    </Sheet>
          
        </div> */}
        <Tabs defaultValue="personal_info" className="space-y-4 w-full">
            {/* <DashboardIntro /> */}
          <TabsList>
            <TabsTrigger value="personal_info">General Info</TabsTrigger>
            <TabsTrigger value="address_info">Address</TabsTrigger>
          </TabsList>
          <TabsContent value="personal_info" className="space-y-4">
            <div className='items-center w-full sm:max-w-[600px] mx-auto'>
            <Card className="col-span-4">
                <CardHeader>
                <div className="flex items-center justify-between space-y-2">
                    <div className="md:flex items-center space-x-2">
                    <CardTitle>
                      General Info
                    </CardTitle>
                    {/* <CalendarDateRangePicker /> */}
                    </div>
                  </div>   
                </CardHeader>
                <CardContent className="pl-2">
                    <Form {...form}>  
                      <form
                        className='space-y-6'
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
                                                        //value={userSessionData?.user.first_name}
                                                        //disabled={isPending}
                                                        disabled
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
                                                      disabled
                                                        //value={userSessionData?.user.last_name}
                                                        //disabled={isPending}
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
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <FormField
                                        control={form.control}
                                        name='username'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className='block text-sm font-medium text-gray-700'>Username</FormLabel>
                                                <div 
                                                className='mt-1'
                                                >
                                                <FormControl>
                                                    <Input
                                                      disabled
                                                      //value={userSessionData?.user.username}
                                                        //disabled={isPending}
                                                        {...field}
                                                        //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                        placeholder="Username"
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
                                        name='email'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className='block text-sm font-medium text-gray-700'>Email</FormLabel>
                                                <div 
                                                className='mt-1'
                                                >
                                                <FormControl>
                                                    <Input
                                                       // value={userSessionData?.user.email}
                                                        //disabled={isPending}
                                                        disabled
                                                        {...field}
                                                        //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                        placeholder="Email address"
                                                        type='email'
                                                        
                                                        
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
                            name='phone'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700"
                                        >
                                        Phone number
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="Mobile Money Number"
                                                type='text'
                                                //disabled={isPending}
                                                disabled
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
                                        Updating
                                </Button>

                                :
                                <Button 
                                    //disabled={isPending}
                                    disabled
                                    type="submit"
                                    className="group relative w-full hidden justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500">

                                    Update
                                </Button>
                                }

                          </div>
                      </form>
                    </Form>
                </CardContent>
              </Card>
            </div>

            </TabsContent>
            <TabsContent value="address_info" className="space-y-4">
            <div className='items-center w-full sm:max-w-[800px] mx-auto'>
            <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Address Details</CardTitle>
                  <CardDescription>
                      {/* Your transactions history */}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                     <UseAddressForm />           
                </CardContent>
              </Card>
            </div>

            </TabsContent>
            </Tabs>
        {/* <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">


            </div> */}
        </div>
   
        </ScrollArea>


        </>
    )
}