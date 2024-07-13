'use client'

import React,{useState, useTransition} from 'react'
import { Button } from "@/components/ui/button"
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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormErrorMessage } from '@/components/form-errors'
import { FormSuccessMessage } from '@/components/form-success'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {SellAssetSchema} from '@/schemas'
import {supportedAssets,supportedPaymentMethods, supportedMiniPayAssets} from '@/helpers/data'
import Link from 'next/link'
import { Clock8Icon } from 'lucide-react'
import Image from 'next/image'
import {useSession} from 'next-auth/react'
import { useUserCryptoWalletBalance } from '@/hooks/web3/useUserCryptoWalletBalance'
//import { useMiniPay } from '@/hooks/web3/useConnectWallet'

export function SellComponent(){
    //const miniPayWallet = useMiniPay()
    const cryptoBalance = useUserCryptoWalletBalance()

    const [isPending, startTransition] = useTransition()
    const {data: userSessionData} = useSession()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
  
    const form = useForm<z.infer<typeof SellAssetSchema>>({
      resolver: zodResolver(SellAssetSchema),
    //   defaultValues:{
    //       asset: "",
    //       amount: 1,
    //       payment_method: ""
    //   }
    })

    return (
    <>
                        <Card>
                    <CardHeader>
                      <CardTitle>Sell</CardTitle>
                      <CardDescription>Sell your cUSD for {userSessionData?.user.currency} and receive your money directly to your M-Pesa</CardDescription>
                      {/* <CardDescription>Sell your cUSD for {userSessionData?.user.currency} and receive your money into your mobile money or directly to your bank account</CardDescription> */}
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
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                        Select the asset you want to sell
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
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="select asset" />
                                                </SelectTrigger>
                                                <SelectContent position="popper">
                                                    {
                                                        //supportedAssets
                                                        supportedMiniPayAssets
                                                        .filter((s) => s.active == true)
                                                        .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
                                                        .map((asset) => (
                                                            <SelectItem key={asset.value} value={asset.value}>
                                                                <div className='flex items-center content-center gap-2'>
                                                                    <Image src={asset.icon.src} width={18} height={18} alt={asset.label} />
                                                                    {asset.label}
                                                                </div>
                                                            </SelectItem>
                                                        ))
                                                    }
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
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                        {/* Amount */}
                                        Amount in cUSD
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl className='mb-2'>
                                            <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="Enter amount to deposit"
                                                type='number'
                                                //disabled={isPending}
                                                min={0}
                                                
                                            />
                                        </FormControl>
                                        <FormLabel
                                            className='block text-sm font-medium'
                                        >
                                            <p className="text-gray-700 dark:text-gray-400">Balance: <span className="text-orange-600">{`$ ${cryptoBalance}`}</span> </p>
                                        </FormLabel>
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
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                        {/* Select how you want to receive the pay */}
                                        Select how you want to receive your money
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
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="payment method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        supportedPaymentMethods
                                                        .filter((p) => p.active == true)
                                                        .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
                                                        .map((channel) => (
                                                            // <SelectItem key={channel.value} value={channel.value}>{channel.label}</SelectItem>
                                                            <SelectItem key={channel.value} value={channel.value}>
                                                                <div className='flex items-center content-center gap-2'>
                                                                            <Image src={channel.iconUrl?.src} width={30} height={30} alt={channel.value} />
                                                                            {channel.label}
                                                                </div>
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='text-[14px] text-gray-700 dark:text-gray-400'>Expand to view quote details</AccordionTrigger>
                        <AccordionContent>
                            {/* You will receive ~300.00 {userSessionData?.user.currency} for 2.26 USDT */}
                            You will receive ~300.00 {userSessionData?.user.currency} for 2.26 cUSD
                            <br/>
                            <Table className='text-sm'>
                            {/* <TableCaption>Quote details</TableCaption> */}
                                    <TableHeader>
                                        <TableRow className='w-full'>
                                        <TableHead className="text-sm">Base Cost</TableHead>
                                        <TableHead className='text-sm'>Processing Fee</TableHead>
                                        {/* <TableHead>Method</TableHead>
                                        <TableHead className="text-right">Amount</TableHead> */}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                        <TableCell className="font-medium">{`~ ${userSessionData?.user.currency}`} 132.00</TableCell>
                                        <TableCell>{userSessionData?.user.currency} 3.00</TableCell>
                                        {/* <TableCell>Credit Card</TableCell>
                                        <TableCell className="text-right">$250.00</TableCell> */}
                                        </TableRow>
                                    </TableBody>
                            </Table>
                        </AccordionContent>
                    </AccordionItem>
                    </Accordion>
                    <div 
                    //className='inline-flex items-center  justify-between  content-center gap-2'
                    //justify-between content-center flex-row border-b border-gray-200 
                    className="inline-flex px-6 py-[6px] whitespace-no-wrap  text-sm leading-5 text-black-500 gap-1 items-center justify-items-center"
                    >
                     <Clock8Icon className='rounded-full w-3 h-3'/> Quote updates in 2s  
                                               
                    </div>
                    <FormErrorMessage message={error}/>
                    <FormSuccessMessage message={success}/>

                    <div className='flex flex-1 sm:gap-40 gap-10'>
                    {
                                                       isPending ? (
                                                            <Button 
                                                                type="button" 
                                                                disabled
                                                                className='w-full bg-orange-600 text-white hover:bg-orange-500 hover:text-white'
                                                                //className="py-2 px-4 flex justify-center items-center  bg-orange-600  hover:bg-orange-500 hover:text-white focus:ring-orange-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
                                                                >
                                                                
                                                                <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                                         <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                                                        </path>
                                                                   </svg>
                                                                   {/* Buying  */}
                                                                   {/* {selectedCryptoAsset != null || selectedCryptoAsset != undefined ? `Buying ${selectedCryptoAsset}`: "Processing"} */}
                                                                    Processing
                                                            </Button>
                                                       )

                                                       :
                                                       <Button 
                                                       //disabled={isPending}
                                                       type='submit'
                                                       className='w-full bg-orange-600 text-white hover:bg-orange-500 hover:text-white'
                                                       >
                                                       {/* {selectedCryptoAsset != null || selectedCryptoAsset != undefined ? `Buy ${selectedCryptoAsset}`: "Buy"} */}
                                                        Sell cUSD
                                                   </Button>
                                                    }
                    </div>
                          </form>
                        </Form>
                    </CardContent>
                    <CardFooter>
                    <div className='text-sm text-gray-500'>
                        By continuing you agree to our <Link href="#" className='text-blue-600'>terms and conditions</Link> 
                      </div>
                    </CardFooter>
                  </Card>    
    </>
)
}