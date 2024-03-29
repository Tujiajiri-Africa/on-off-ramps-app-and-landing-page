'use client'

import React,{useState} from 'react'
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
import {supportedAssets,supportedPaymentMethods} from '@/helpers/data'
import Link from 'next/link'
import { Clock8Icon } from 'lucide-react'
import Image from 'next/image'

export function SellComponent(){
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
  
    const form = useForm<z.infer<typeof SellAssetSchema>>({
      resolver: zodResolver(SellAssetSchema),
      defaultValues:{
          asset: "",
          amount: 2.26,
          payment_method: ""
      }
    })

    return (
    <>
                        <Card>
                    <CardHeader>
                      <CardTitle>Sell</CardTitle>
                      <CardDescription>Sell your crypto for fiat and receive your money into your mobile money or directly to your bank account</CardDescription>
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
                                                        supportedAssets
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
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                        Select how you want to receive the pay
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
                                                            <SelectItem key={channel.value} value={channel.value}>{channel.label}</SelectItem>
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
                            You will receive ~300.00 KES for 2.26 USDT
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
                                        <TableCell className="font-medium">~KES 132.00</TableCell>
                                        <TableCell>KES 3.00</TableCell>
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
                          </form>
                        </Form>
                    </CardContent>
                    <CardFooter>
                      <Button className='w-full'>
                        Sell
                      </Button>
                      
                    </CardFooter>
                    <CardFooter>
                    <div className='text-sm text-gray-500'>
                        By continuing you agree to our <Link href="#" className='text-blue-600'>terms and conditions</Link> 
                      </div>
                    </CardFooter>
                  </Card>    
    </>
)
}