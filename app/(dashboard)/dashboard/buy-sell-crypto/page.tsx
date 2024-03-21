'use client'

import React,{useState} from 'react'
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
  CardFooter,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormErrorMessage } from '@/components/form-errors'
import { FormSuccessMessage } from '@/components/form-success'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {BuyAssetSchema, SellAssetSchema} from '@/schemas'


export default function Profile(){
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const form = useForm<z.infer<typeof BuyAssetSchema>>({
    resolver: zodResolver(BuyAssetSchema),
    defaultValues:{
        asset: "",
        amount: 300,
        payment_method: ""
    }
  })

    return (
        <>
        <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Buy/Sell
          </h2>
          
          <div className="md:flex items-center space-x-2">
            {/* <CalendarDateRangePicker /> */}
            {/* <Button
                className="bg-[#16a34a] dark:text-white"
            >
                Send/Receive
            </Button> */}
              {/* <Dialog>
                            <DialogTrigger asChild>
                                    <Button variant="outline">Edit Profile</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                        Name
                                        </Label>
                                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                        Username
                                        </Label>
                                        <Input id="username" value="@peduarte" className="col-span-3" />
                                    </div>
                                    </div>
                                    <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                    </DialogFooter>
                                </DialogContent>
                        </Dialog> */}
                    <Sheet>
                    {/* <SheetTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                    </SheetTrigger> */}
                    <SheetContent>
                        <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                            Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                            Username
                            </Label>
                            <Input id="username" value="@peduarte" className="col-span-3" />
                        </div>
                        </div>
                        <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                    </Sheet>
          </div>
        </div>
        <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8 border-none'>
            <CardContent className="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-4">
             
              <Tabs defaultValue="buy" className="w-full">
                <TabsList>
                  <TabsTrigger value="buy" className=''>Buy</TabsTrigger>
                  <TabsTrigger value="sell" className=''>Sell</TabsTrigger>
                </TabsList>
                <TabsContent value="buy">
                  <Card>
                    <CardHeader>
                      <CardTitle>Buy</CardTitle>
                      <CardDescription>Buy crypto and pay with either mobile money or from bank</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                          <form
                            className="space-y-6"
                          >
                          <div>
                        <FormField 
                            control={form.control}
                            name='asset'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700"
                                        >
                                        Select asset to buy
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            {/* <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="Enter amount to deposit"
                                                type='number'
                                                //disabled={isPending}
                                                min={0}
                                                
                                            /> */}
                                            <Select
                                            {...field}
                                            >
                                                <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="select asset" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="btc">BTC</SelectItem>
                                                  <SelectItem value="eth">ETH</SelectItem>
                                                  <SelectItem value="usdt">USDT</SelectItem>
                                                  <SelectItem value="usdc">USDC</SelectItem>
                                                  <SelectItem value="sol">SOL</SelectItem>
                                                  <SelectItem value="cUSD">cUSD</SelectItem>
                                                  <SelectItem value="pyUSD">PYUSD</SelectItem>
                                                </SelectContent>
                                            </Select>
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
                            name='amount'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700"
                                        >
                                        Amount
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="Enter amount to deposit"
                                                type='number'
                                                //disabled={isPending}
                                                min={0}
                                                
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
                            name='payment_method'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700"
                                        >
                                        Select payment method
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            {/* <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="Enter amount to deposit"
                                                type='number'
                                                //disabled={isPending}
                                                min={0}
                                                
                                            /> */}
                                            <Select
                                            {...field}
                                            >
                                                <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="select payment method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="btc">Mobile Money</SelectItem>
                                                  <SelectItem value="eth">Bank</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormErrorMessage message={error}/>
                    <FormSuccessMessage message={success}/>
                          </form>
                        </Form>
                    </CardContent>
                    <CardFooter>
                      <Button className='w-full'>
                        Buy
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="sell">
                  <Card>
                      <CardHeader>
                        <CardTitle>Sell</CardTitle>
                        <CardDescription>Sell your crypto for fiat</CardDescription>
                      </CardHeader>
                      <CardContent>
                      </CardContent>
                      <CardFooter>
                      
                      </CardFooter>
                    </Card>
                </TabsContent>
              </Tabs>
             
            </CardContent>
        </div>
        {/* <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
              <CardHeader>
                  <CardTitle>Buy Crypto</CardTitle>
                  <CardDescription>
                    Buy your favourite crypto asset and pay with KES
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                 
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Sell Crypto</CardTitle>
                  <CardDescription>
                    Sell crypto and receive KES
                  </CardDescription>
                </CardHeader>
                <CardContent>
                 
                </CardContent>
              </Card>
        </div> */}
      </div>
        {/* <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7"> */}

        {/* </div> */}
        </ScrollArea>


        </>
    )
}