'use client'

import React, {useState, useTransition} from 'react'
import * as z from 'zod'
import {useForm, Controller} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {CardContent} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {Form, FormControl, FormField, FormDescription, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {InvoiceSchema} from '@/schemas'
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {supportedAssets, supportedPaymentMethods} from '@/helpers/data'
import Image from 'next/image'
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"
  import {DollarSign, PlusCircleIcon} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dateFormat, { masks } from "dateformat";
import { createInvoice } from '@/actions/invoices'
import { useSearchParams } from "next/navigation";
import { FormErrorMessage } from '@/components/form-errors'
import { FormSuccessMessage } from '@/components/form-success'
import Link from 'next/link'

export function NewInvoiceForm(){
    const [clientEmail, setClientEmail] = useState<string>("")
    const [itemName, setItemName] = useState<string>("")
    const [itemQty, setItemQty] = useState<number>(0)
    const [itemDescription, setItemDescription] = useState<string>("")
    const [itemAmount, setItemAmount] = useState<number>(0)
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("pathname");
    const [isPending, startTransition] = useTransition()
    const [shouldShowViewButton, setShouldShoViewButton] = useState<boolean>(false)

    const form = useForm<z.infer<typeof InvoiceSchema>>({
        resolver: zodResolver(InvoiceSchema)
        // defaultValues: {
        //     client_email: "",
        //     item_name: "",
        //     item_description: "",
        //     unit_price: "",
        //     item_quantity: "",
        //     //currency: "",
        //     payment_method: "",
        // }
    })

    const {data: userSessionData} = useSession()

    const onSubmit = (values: z.infer<typeof InvoiceSchema>) => {
        setError("")
        setSuccess("")

        startTransition(async() => {
            createInvoice(values, userSessionData?.user.accessToken)
            .then((data:any) => {
                if(data?.data.error){
                    //form.reset()
                    setError(data?.data.error)
                    setShouldShoViewButton(false)
                }
                if(data?.data.success){
                    form.reset()
                    setSuccess(data?.data.success)
                    setShouldShoViewButton(true)
                }
            }).catch(() => {
                setError("Something went wrong")
                setSuccess("")
                setShouldShoViewButton(false)
            })
        })
    }
    
    const NewInvoicePreview = () => {    
        const {data:userSessionData} = useSession()
        return (
        <>
            <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className='hover:text-gray-900 content-start group  rounded-md px-3 py-2 text-sm font-medium'>
              {/* <PlusCircleIcon className='h-4 w-4 mr-2 '/>   */}
              Preview
              
            </Button>
          </DialogTrigger>
          <DialogContent className=""
          //sm:max-w-[425px]
          >
            {/* <DialogHeader>
              <DialogTitle>Create Invoice</DialogTitle>
              <DialogDescription>
                Create a new invoice and chose how you get paid
              </DialogDescription>
            </DialogHeader> */}
            <ScrollArea className="h-full">
            <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
                {/* <img className="h-8 w-8 mr-2" src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
                    alt="Logo" /> */}
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage
                src={userSessionData?.user?.image ?? ""}
                alt={userSessionData?.user?.username ?? ""}
              /> 
              <AvatarFallback>
                 {`${userSessionData?.user?.first_name?.[0].toUpperCase()}${userSessionData?.user?.last_name?.[0].toUpperCase()}`} 
                 {/**+ session.user?.email?.[1].toUpperCase() */}
                {/* DO */}
              </AvatarFallback>
            </Avatar>
                <div className="text-gray-700  text-md">
                    {/* Your Company Name */}
                    From: <br />
                    {userSessionData?.user.first_name} {userSessionData?.user.last_name} <br />
                    {userSessionData?.user.email}
                    
                </div>
            </div>
            <div className="text-gray-700">
                <div className="font-bold text-xl mb-2">INVOICE</div>
                <div className="text-sm">
                    {/* Date: 01/05/2023 */}
                    {/* Date: {new Date().toString()} */}

                    Date: {dateFormat(new Date(), "mmmm dS, yyyy")}
                </div>
                <div className="text-sm">Invoice #: INV12345</div>
            </div>
        </div>
        <div className="border-b-2 border-gray-300 pb-8 mb-8">
            <h2 className="text-md font-bold mb-4">Bill To:</h2>
            {/* <div className="text-gray-700 mb-2">John Doe</div>
            <div className="text-gray-700 mb-2">123 Main St.</div>
            <div className="text-gray-700 mb-2">Anytown, USA 12345</div> */}
            <div className="text-gray-700">
                {/* johndoe@example.com */}
                {clientEmail}
            </div>
        </div>
        <table className="w-full text-left mb-4">
            <thead>
                <tr>
                    <th className="text-gray-700 font-bold uppercase py-2">Description</th>
                    <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
                    <th className="text-gray-700 font-bold uppercase py-2">Price</th>
                    <th className="text-gray-700 font-bold uppercase py-2">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="py-4 text-gray-700">
                        {/* Product 1 */}
                        {itemName}
                    </td>
                    <td className="py-4 text-gray-700">
                        {/* 1 */}
                        {itemQty}
                    </td>
                    <td className="py-4 text-gray-700">
                        {/* KES 100.00 */}
                        KES {itemAmount}
                    </td>
                    <td className="py-4 text-gray-700">
                        {/* KES 100.00 */}
                        KES {itemQty * itemAmount}
                    </td>
                </tr>
                {/* <tr>
                    <td className="py-4 text-gray-700">Product 2</td>
                    <td className="py-4 text-gray-700">2</td>
                    <td className="py-4 text-gray-700">$50.00</td>
                    <td className="py-4 text-gray-700">$100.00</td>
                </tr> */}
                {/* <tr>
                    <td className="py-4 text-gray-700">Product 3</td>
                    <td className="py-4 text-gray-700">3</td>
                    <td className="py-4 text-gray-700">$75.00</td>
                    <td className="py-4 text-gray-700">$225.00</td>
                </tr> */}
            </tbody>
        </table>
        <div className="flex justify-end mb-2">
            <div className="text-gray-700 mr-2">Subtotal:</div>
            <div className="text-gray-700">
                {/* KES 100.00 */}
                KES {itemQty * itemAmount}
            </div>
        </div>
        <div className="text-right mb-2">
            <div className="text-gray-700 mr-2">Tax:</div>
            <div className="text-gray-700">KES 0.00</div>
        </div>
        <div className="flex justify-end mb-2">
            <div className="text-gray-700 mr-2">Total:</div>
            <div className="text-gray-700 font-bold text-xl">
            {/* KES 100.00   */}
               KES {itemQty * itemAmount}
            </div>
        </div>
        {/* <div className="border-t-2 border-gray-300 pt-8 mb-8">
             <div className="text-gray-700 mb-2">Payment is due within 30 days. Late payments are subject to fees.</div> 
             <div className="text-gray-700 mb-2">Please make checks payable to Your Company Name and mail to:</div>
            <div className="text-gray-700">123 Main St., Anytown, USA 12345</div> 
        </div> */}
    </div>
            </ScrollArea>

            <DialogFooter className='grid grid-cols-2 gap-2'>
              <div className='col-span-1'>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Exit
                  </Button>
                </DialogClose>
                  {/* <Button>Exit</Button> */}
              </div>
              
              {/* <div className='col-span-1'>
                <Button variant={'outline'} type="submit" className='bg-orange-600 text-white hover:bg-orange-500 hover:text-white'>Save changes</Button>
              </div> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </>
      )
      }

    return (
    <>
    <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            New Invoice
          </h2>
          <div className="md:flex items-center space-x-2">
          </div>
        </div>
        <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8 border-none'>
            <CardContent className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Invoice</CardTitle>
                        <CardDescription>Create a new invoice and chose how you get paid</CardDescription>
                    </CardHeader>
                        <CardContent>
                            
                                <Form {...form}>
                                    <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                                    <div>
                                        <FormField 
                                            control={form.control}
                                            name='item_name'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel 
                                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                                        >
                                                        Item name
                                                    </FormLabel>
                                                    <div 
                                                        className='mt-1'
                                                        >
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                                placeholder="Enter item name"
                                                                type='text'
                                                                onChangeCapture={e => setItemName(field.value)}
                                                                //disabled={isPending}
                                                                //min={0}
                                                                
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 px-3">
                                        <FormField 
                                            control={form.control}
                                            name='unit_price'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel 
                                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                                        >
                                                        Unit price
                                                    </FormLabel>
                                                    <div 
                                                        className='mt-1'
                                                        >
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                                placeholder="Enter unit price"
                                                                type='number'
                                                                //disabled={isPending}
                                                                //onChangeCapture={e => setItemAmount(field.value)}
                                                                min={1}
                                                                
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <FormField 
                                            control={form.control}
                                            name='item_quantity'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel 
                                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                                        >
                                                        Item quantity
                                                    </FormLabel>
                                                    <div 
                                                        className='mt-1'
                                                        >
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                                placeholder="Enter the quantity of items"
                                                                type='number'
                                                                //disabled={isPending}
                                                                min={1}
                                                                //onChangeCapture={e => setItemQty(field.value)}
                                                                
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
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
                                        Select payment method by chain
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
                                                  <SelectValue placeholder="select settlement method" />
                                                </SelectTrigger>
                                                <SelectContent position="popper">
                                                    {
                                                        supportedAssets
                                                        .filter((s) => s.active == true)
                                                        .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
                                                        .map((asset) => (
                                                                <SelectItem key={asset.value} value={asset.label}>
                                                                        <div className='flex items-center content-center gap-2'>
                                                                            <Image src={asset.icon.src} width={18} height={18} alt={asset.label} />
                                                                            {asset.label}  { asset.chain != undefined ? `(${asset.chain})`: ''} 
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
                                            name='client_email'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel 
                                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                                        >
                                                        Client email
                                                    </FormLabel>
                                                    <div 
                                                        className='mt-1'
                                                        >
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                                placeholder="Enter vendor email address"
                                                                type='email'
                                                                //onChange={() => setClientEmail(field.value)}
                                                                //value={clientEmail}
                                                                //onChangeCapture={e =>setClientEmail(field.value.toString())}
                                                            
                                                                disabled={isPending}
                                                                //min={0}
                                                                //() => setClientEmail(field.value)
                                                                
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
                                            name='due_date'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel 
                                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                                        >
                                                        Due date
                                                    </FormLabel>
                                                    <div 
                                                        className='mt-1'
                                                        >
                                                          <Popover >
                                                            <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                                >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick due date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                date < new Date(Date.now() - 1) //|| date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                                className='w-full'
                                                                //showWeekNumber
                                                            />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage/>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField 
                                            control={form.control}
                                            name='item_description'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel 
                                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                                        >
                                                        Item description
                                                    </FormLabel>
                                                    <div 
                                                        className='mt-1'
                                                        >
                                                        <FormControl>
                                                            <Textarea 
                                                                {...field}
                                                                placeholder="Enter some brief description of the item..." 
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
                                                <div className='flex flex-1 sm:gap-40 gap-10'>
                                                    <Button 
                                                        disabled={isPending}
                                                        type='submit'
                                                        className='w-full bg-orange-600 text-white hover:bg-orange-500 hover:text-white'
                                                        >
                                                        Save
                                                    </Button>
                                                      {
                                                        shouldShowViewButton && (
                                                            <Button  variant={'outline'} className='justify-end'>
                                                            <Link href="/dashboard/invoices">
                                                               View Invoices
                                                            </Link>
                                                        </Button>
                                                        )
                                                    }

                                        {/* <NewInvoicePreview /> */}
                                        </div>
                                    </form>
                                </Form>

                        </CardContent>      

                </Card>
            </CardContent>


        </div>
      </div>
      </ScrollArea>
    </>
)
}