'use client'

import React,{useTransition, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import Image from 'next/image'
import Link from 'next/link'
import BTC_LOGO from '@/app/assets/logo/bitcoin-btc-logo.svg'
import ETH_LOGO from '@/app/assets/logo/ethereum-eth-logo.svg'
import SOL_lOGO from '@/app/assets/logo/solana-sol-logo.svg'
import MATIC_LOGO from '@/app/assets/logo/polygon-matic-logo.svg'
import USDT_LOGO from '@/app/assets/logo/crypto/usdt_transparent.png'
import USDC_LOGO from '@/app/assets/logo/crypto/usd-coin-usdc-logo.svg'
import cUSD_LOGO from '@/app/assets/logo/crypto/cUSD.png'
import { UserBalanceChartAnalysis } from '@/components/ui/dashboard/wallet/chart-metrics'
import {WalletIcon,MedalIcon,MagnifierIcon} from '@/components/icons/index'
import {Wallet2Icon, Wallet2, WalletCardsIcon, Wallpaper, Bitcoin, BitcoinIcon} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {DepositForm} from '@/components/ui/dashboard/deposit'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {DepositSchema,WithdrawSchema} from '@/schemas'
import {FormErrorMessage} from '@/components/form-errors'
import {FormSuccessMessage} from '@/components/form-success'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {supportedAssets,supportedPaymentMethods} from '@/helpers/data'
  
export function UserWallet(){

    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const form = useForm<z.infer<typeof DepositSchema>>({
        resolver: zodResolver(DepositSchema),
        defaultValues:{
            amount: 100
        }
    })

    const withdrawForm = useForm<z.infer<typeof WithdrawSchema>>({
        resolver: zodResolver(WithdrawSchema),
        defaultValues:{
            amount: 100,
            channel: ""
        }
    })

    return (
        <>
            <ScrollArea className="h-full"
            //dark:bg-[#182122]
            >
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">
                            My Wallet
                        </h2>
                    </div>
                    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7'>
                        <Card className='col-span-2 '>
                            <CardHeader>
                                    <div className="flex items-center justify-between space-y-2">
                                        <div className="md:flex items-center space-x-2">
                                        <CardTitle>
                                            Fiat Wallet
                                        </CardTitle>
                                        
                                        </div>
                                        {/* <Button 
                                            className="content-start group  rounded-md px-3 py-2 text-sm bg-[#00BF63] text-white font-medium hover:bg-accent hover:text-accent-foreground"
                                            variant={'outline'}
                                        >
                                            View More
                                        </Button> */}
                                    </div>   
                                </CardHeader>
                                <CardContent className="pl-2 gap-4">
                                <div className=''
                                //bg-[#00BF63]/60 dark:bg-[#00BF63]/20
                                >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            KES
                                        </CardTitle>
                                        {/* <Image
                                            src={BTC_LOGO.src}
                                            width={30}
                                            height={30}
                                            alt={'btc-logo'}
                                        /> */}
                                            <Wallet2Icon className='w-10 h-10 rounded-full' />
                                        </CardHeader>
                                        <CardContent>
                                            <div className='text-2xl font-bold'>
                                                KES 73,424.00
                                            </div>
                                            <p className='text-sm font-normal'>Available Balance</p>
                                            <p className="text-xs text-muted-foreground mb-6">
                                                <span className="text-green-600">
                                                    156.19%
                                                </span> <span className='dark:text-gray-300 text-black'>last 1 month</span>
                                            </p>
                                            <div className='flex flex-row gap-2'>
                                            <Button
                                                className="w-full bg-orange-600 text-white"
                                            >
                                                <Link href={`/dashboard/deposit`}>
                                                    Deposit
                                                </Link>
                                            </Button>

                                            <Button
                                                className="w-full bg-[#F00FDA] text-primary-foreground dark:text-white dark:hover:bg-[#4B49AC]/30 hover:bg-[#4B49AC]/95 hover:text-white"
                                            >
                                                <Link href={`/dashboard/withdraw`}>
                                                    Withdraw
                                                </Link>
                                            </Button>
                                            </div>
                                        </CardContent>
                                    </div>
                                </CardContent>
                        </Card>
                        <Card className="col-span-5">
                            <CardHeader>
                                <div className="flex items-center justify-between space-y-2">
                                    <div className="md:flex items-center space-x-2">
                                    <CardTitle>
                                        Crypto Wallet
                                    </CardTitle>
                                    
                                    </div>
                                    <Button 
                                        className="content-start group  rounded-md px-3 py-2 text-sm bg-orange-600 text-white font-medium hover:bg-accent hover:text-accent-foreground"
                                        variant={'outline'}
                                    >
                                        View More
                                    </Button>
                                </div>   
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4">
                                    <Card className=''
                                    //bg-[#9EBDFF]/60 dark:bg-[#9EBDFF]/20
                                    >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            BTC
                                        </CardTitle>
                                        <Image
                                            src={BTC_LOGO.src}
                                            width={30}
                                            height={30}
                                            alt={'btc-logo'}
                                        />
                                        </CardHeader>
                                        <CardContent>
                                            <div className='text-2xl font-bold'>
                                                KES 9,400.00
                                            </div>
                                            <p className='text-sm font-normal'>Available Balance</p>
                                            <p className="text-xs text-muted-foreground mb-6">
                                                <span className="text-green-600">
                                                    10.19%
                                                </span> <span className='dark:text-gray-300 text-black'>last 1 month</span>
                                            </p>
                                            <Button
                                                className="w-full"
                                            >
                                                <Link href={`/dashboard/buy-sell-crypto?baseAsset=BTC&currency=KES`}>
                                                    Buy/Sell
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <Card className=''
                                    //bg-orange-600/20 dark:bg-orange-800/20
                                    >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            USDT
                                        </CardTitle>
                                        <Image
                                            src={USDT_LOGO.src}
                                            width={30}
                                            height={30}
                                            alt={'btc-logo'}
                                        />
                                        </CardHeader>
                                        <CardContent>
                                            <div className='text-2xl font-bold'>
                                                KES 5,184.00
                                            </div>
                                            <p className='text-sm font-normal'>Available Balance</p>
                                            <p className="text-xs text-muted-foreground mb-6">
                                                <span className="text-green-600">
                                                    34.97%
                                                </span> <span className='dark:text-gray-300 text-black'>last 1 month</span>
                                            </p>
                                            <Button
                                                className="w-full"
                                            >
                                                <Link href={`/dashboard/buy-sell-crypto?baseAsset=USDT&currency=KES`}>
                                                    Buy/Sell
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <Card className=''
                                    //bg-[#7978E9]/60 dark:bg-[#7978E9]/80
                                    >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            USDC
                                        </CardTitle>
                                        <Image
                                            src={USDC_LOGO.src}
                                            width={30}
                                            height={30}
                                            alt={'btc-logo'}
                                        />
                                        </CardHeader>
                                        <CardContent>
                                            <div className='text-2xl font-bold'>
                                                KES 8,184.00
                                            </div>
                                            <p className='text-sm font-normal'>Available Balance</p>
                                            <p className="text-xs text-muted-foreground mb-6">
                                                <span className="text-green-600">
                                                    25.93%
                                                </span> <span className='dark:text-gray-300 text-black'>last 1 month</span>
                                            </p>
                                            <Button
                                                className="w-full"
                                            >
                                                <Link href={`/dashboard/buy-sell-crypto?baseAsset=USDC&currency=KES`}>
                                                    Buy/Sell
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <Card className=''
                                    //bg-[#F3797E]/20 dark:bg-teal-800/60
                                    >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            cUSD
                                        </CardTitle>
                                        <Image
                                            src={cUSD_LOGO.src}
                                            width={30}
                                            height={30}
                                            alt={'btc-logo'}
                                        />
                                        </CardHeader>
                                        <CardContent>
                                            <div className='text-2xl font-bold'>
                                                KES 2,184.00
                                            </div>
                                            <p className='text-sm font-normal'>Available Balance</p>
                                            <p className="text-xs text-muted-foreground mb-6">
                                                <span className="text-red-600">
                                                    2.23%
                                                </span> <span className='dark:text-gray-300 text-black'>last 1 month</span>
                                            </p>
                                            <Button
                                                className="w-full"
                                            >
                                                <Link href={`/dashboard/buy-sell-crypto?baseAsset=cUSD&currency=KES`}>
                                                    Buy/Sell
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>


                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-5 lg:col-span-4 2xl:col-span-5">
                            <CardHeader>
                            <div className="flex items-center justify-between space-y-2">
                                <div className="md:flex items-center space-x-2">
                                <CardTitle>
                                    Balance Analysis
                                </CardTitle>
                                {/* <CalendarDateRangePicker /> */}
                                </div>
                            </div>   
                            </CardHeader>
                            <CardContent className='pl-2'>
                                <UserBalanceChartAnalysis /> 
                             
                            </CardContent>
                        </Card>
                        <Card className='col-span-2 lg:col-span-3 2xl:col-span-2'>
                        <CardContent className="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-4">
             
                            <Tabs defaultValue="deposit" className="w-full">
                            <TabsList className='w-full'>
                                <TabsTrigger value="deposit" className='w-full border-spacing-4'>Deposit</TabsTrigger>
                                <TabsTrigger value="withdraw" className='w-full border-spacing-4'>Withdraw</TabsTrigger>
                            </TabsList>
                            <TabsContent value="deposit">
                            <Card>
            <CardHeader>
                <CardTitle>Deposit</CardTitle>
                <CardDescription className="mb-10">Top up your mobile money wallet and start buying and selling crypto seamlessly</CardDescription>
            </CardHeader>
            <CardContent>
            
                <Form  {...form}>

                    <form>
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
                                                disabled={isPending}
                                                min={0}
                                                
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
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <Button className='w-full bg-orange-600 text-white'>
                    Deposit
                </Button>
            </CardFooter>
        </Card>
                            </TabsContent>
                            <TabsContent value="withdraw">
                            <Card>
            <CardHeader>
                <CardTitle>Withdraw</CardTitle>
                <CardDescription className="mb-10">Withdraw from your fiat wallet to your mobile money or directly to your bank account</CardDescription>
            </CardHeader>
            <CardContent>
            
                <Form  {...withdrawForm}>

                    <form 
                        className="space-y-6"
                    >
                    <div>
                        <FormField 
                            control={withdrawForm.control}
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
                                                disabled={isPending}
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
                            control={withdrawForm.control}
                            name='channel'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                        Select Withdrawal method
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
                                                  <SelectValue placeholder="withdrawal method" />
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
                    <FormErrorMessage message={error}/>
                    <FormSuccessMessage message={success}/>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <Button className='w-full bg-orange-600 text-white'>
                    Withdraw
                </Button>
            </CardFooter>
        </Card>
                            </TabsContent>
                            </Tabs>
            
           </CardContent>
                        </Card>
                    </div>
                </div>
            </ScrollArea>
        </>
    )
}