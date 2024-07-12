'use client'

import React,{useCallback, useState, useTransition} from 'react'
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormErrorMessage } from '@/components/form-errors'
import { FormSuccessMessage } from '@/components/form-success'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {BuyAssetSchema} from '@/schemas'
import {   
    supportedAssets, 
    supportedPaymentMethods, 
    supportedMiniPayAssets, 
    getAssetNameFromAssetAddress,
    cUSD_MAINNET_CONTRACT_ADDRESS
} from '@/helpers/data'
import {Clock8Icon} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {useSession} from 'next-auth/react'
import { buyCrypto } from '@/actions/payments'
import { useMiniPay } from '@/hooks/web3/useConnectWallet'
//import { NumberInput } from '@chakra-ui/react'
//https://medium.com/@mobileatexxeta/conditional-form-validation-with-react-hook-form-and-zod-46b0b29080a3
//https://github.com/orgs/react-hook-form/discussions/2194

export function BuyComponent(){
    const miniPayWallet = useMiniPay()

    const {data: userSessionData} = useSession()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [isPending, startTransition] = useTransition()
    const [ fiatAmountLocal, setFiatAmountLocal ] = useState<string>("")
    const [ calculatedCryptoAmount, setCalculatedCryptoAmount ] = useState<string>("")
    const [ selectedCryptoAsset, setSelectedCryptoAsset ] = useState<string>("")

    const form = useForm<z.infer<typeof BuyAssetSchema>>({
      resolver: zodResolver(BuyAssetSchema),
      defaultValues:{
          asset_address: "",
          amount: 1,
          payment_method: ""
      }
    })

    const handleAssetChange = useCallback((value: string) => {
        const assetName = getAssetNameFromAssetAddress(value)

        setSelectedCryptoAsset(assetName)
    },[setSelectedCryptoAsset])

    const handleAmountChange = useCallback((amount:string) => {
        const buyRate = 129.76
        setFiatAmountLocal(amount)

        const assetAmount = parseFloat(amount) / buyRate;

        setCalculatedCryptoAmount(assetAmount.toString())
        
    },[setFiatAmountLocal, setCalculatedCryptoAmount])

    const processOnramp = (values: z.infer<typeof BuyAssetSchema>) => {
        setError("")
        setSuccess("")

        startTransition(async() => {
            buyCrypto(
                values, 
                userSessionData?.user.accessToken,
                miniPayWallet,
                fiatAmountLocal
            )
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

    return (
        <>
                <Card>
                    <CardHeader>
                      <CardTitle>Buy</CardTitle>
                      {/* <CardDescription>Buy crypto and pay with either mobile money or from your bank account</CardDescription> */}
                      <CardDescription>Buy cUSD with {userSessionData?.user.currency} from M-Pesa</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                          <form
                            className="space-y-6"
                            onSubmit={form.handleSubmit(processOnramp)}
                          >
                          <div>
                        <FormField 
                            control={form.control}
                            name='asset_address'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                        Select the asset you want to buy
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            {/* <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="Enter amount to deposit"
                                                
                                                
                                                
                                                
                                            /> */}
                                            <Select
                                            {...field}
                                            onValueChange={field.onChange}
                                            // onValueChange={
                                            //    (value) => {
                                            //     field.onChange
                                            //     handleAssetChange(value)
                                            //    }
                                            // }
                                            //onValueChange={value  => handleAssetChange(field.value)}
                                            defaultValue={field.value}
                                            //defaultvalue={cUSD_MAINNET_CONTRACT_ADDRESS}
                                            //onOpenChange={e => handleAssetChange(e.)}
                                            >
                                                <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="select asset" />
                                                </SelectTrigger>
                                                <SelectContent position="popper">
                                                    {
                                                        // supportedAssets
                                                        supportedMiniPayAssets
                                                        .filter((s) => s.active == true)
                                                        .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
                                                        .map((asset) => (
                                                                <SelectItem key={asset.value} value={asset.address}>
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
                                        Amount in { userSessionData?.user.currency}
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            {/* <NumberInput 
                                                
                                                onChange={(value: any) => handleAmount(value, onChange)}
                                            /> */}
                                            <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="Enter amount to deposit"
                                                type='number'
                                                //disabled={isPending}
                                                min={0}
                                                //onChange={(amount:any) => handleAmountChange(amount)}
                                                //onChange={(value:any) => handleAmount(value, onChange)}
                                                //value={value}
                                                onChangeCapture={e => handleAmountChange(e.currentTarget.value)}
                                                { ...form.register('amount', { valueAsNumber: true } ) }
                                                
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
                                        Select how you want to pay
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
                    <div>
                    <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='text-[14px] text-gray-700 dark:text-gray-400'>Expand to view quote details</AccordionTrigger>
                        <AccordionContent>
                            <p className='text-gray-700 dark:text-gray-400'>
                                {/* You will receive ~2.26 USDT for {`${userSessionData?.user.currency } 300.00`} */}
                                You will receive {`~${calculatedCryptoAmount}`} cUSD for {`${userSessionData?.user.currency } ${fiatAmountLocal}`}
                            </p>
                            <br/>
                            <Table className='text-sm'>
                            {/* <TableCaption>Quote details</TableCaption> */}
                                    <TableHeader>
                                        <TableRow className='w-full'>
                                        <TableHead className="text-sm font-medium">Base Cost</TableHead>
                                        <TableHead className='text-sm font-medium'>Processing Fee</TableHead>
                                        {/* <TableHead>Method</TableHead>
                                        <TableHead className="text-right">Amount</TableHead> */}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                        <TableCell className="font-medium">{`~ ${userSessionData?.user.currency } 129.76`}</TableCell>
                                        <TableCell>{`${userSessionData?.user.currency } 3.00`}</TableCell>
                                        {/* <TableCell>Credit Card</TableCell>
                                        <TableCell className="text-right">$250.00</TableCell> */}
                                        </TableRow>
                                    </TableBody>
                            </Table>
                        </AccordionContent>
                    </AccordionItem>
                    </Accordion>
                    </div>
                    <div 
                    //className='inline-flex items-center  justify-between  content-center gap-2'
                    //justify-between content-center flex-row border-b border-gray-200 
                    className="inline-flex px-6 py-[6px] whitespace-no-wrap  text-sm leading-5 text-black-500 gap-1 items-center justify-items-center"
                    >
                     <Clock8Icon className='rounded-full w-3 h-3'/> Quote updates in 3s  
                                               
                    </div>
                    <div>
                    
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
                                                                   Buying cUSD
                                                            </Button>
                                                       )

                                                       :
                                                       <Button 
                                                       //disabled={isPending}
                                                       type='submit'
                                                       className='w-full bg-orange-600 text-white hover:bg-orange-500 hover:text-white'
                                                       >
                                                       {/* {selectedCryptoAsset != null || selectedCryptoAsset != undefined ? `Buy ${selectedCryptoAsset}`: "Buy"} */}
                                                       Buy cUSD
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