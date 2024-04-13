'use client'

import React, { useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import {ScrollArea} from '@/components/ui/scroll-area'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import {DollarSign, PlusCircleIcon, PlusIcon} from 'lucide-react'
import { RecentSales } from '@/components/recent-sales';
import { UserBalanceChartAnalysis } from '../wallet/chart-metrics';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"
  import { 
    ArrowUpDown, 
    ChevronDown, 
    MoreHorizontal, 
    ArrowDownLeftFromCircleIcon, 
    ArrowUpRightFromCircleIcon,
    Clock } from "lucide-react"
  import { Checkbox } from "@/components/ui/checkbox"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import BTC_LOGO from '@/app/assets/logo/bitcoin-btc-logo.svg'
import ETH_LOGO from '@/app/assets/logo/ethereum-eth-logo.svg'
import SOL_LOGO from '@/app/assets/logo/solana-sol-logo.svg'
import MATIC_LOGO from '@/app/assets/logo/polygon-matic-logo.svg'
import USDT_LOGO from '@/app/assets/logo/crypto/usdt_transparent.png'
import USDC_LOGO from '@/app/assets/logo/crypto/usd-coin-usdc-logo.svg'
import cUSD_LOGO from '@/app/assets/logo/crypto/cUSD.png'
import PAYPAL_USD_LOGO from '@/app/assets/logo/crypto/paypal-usd-logo-transparent.png'
import ADA_LOGO from '@/app/assets/logo/crypto/cardano-ada-logo.svg'
import TETHER_GOLD_LOGO from '@/app/assets/logo/crypto/tether-gold-xaut-logo.svg'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';
//import {samplePayments, Payment} from '@/helpers/data'
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
import {createInvoice, listInvoices} from '@/actions/invoices'
import {useSession} from 'next-auth/react'
//import InvoiceListComponent from './list-invoices';
import { InvoiceList } from './invoiceList';
import { NanaPayInvoiceProps } from '@/helpers/data';
import { useQuery } from 'react-query';
import { NewInvoiceForm } from './new-invoice-form';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { InvoiceSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
//import { FormLabel } from '../../form';
import * as z from 'zod'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Form, FormControl, FormField, FormDescription, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {supportedAssets, supportedPaymentMethods} from '@/helpers/data'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { FormErrorMessage } from '@/components/form-errors'
import { FormSuccessMessage } from '@/components/form-success'
import { Textarea } from "@/components/ui/textarea"
import {getAssetImage} from '@/lib/utils'
import { toast } from 'react-toastify';

const InvoiceForm = () => {
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

  const form = useForm<z.infer<typeof InvoiceSchema>>({
      resolver: zodResolver(InvoiceSchema),
      defaultValues: {
          client_email: "",
          item_name: "",
          item_description: "",
          unit_price: "",
          item_quantity: "",
          //currency: "",
          payment_method: "",
      }
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
                                                                onChangeCapture={e =>setClientEmail(field.value.toString())}
                                                            
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
                                                                    format(field.value, "PPPPpppp")
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

                                                    {/* <Button  variant={'outline'} className='justify-end'>
                                                        Preview
                                                    </Button> */}
                                        {/* <NewInvoicePreview /> */}
                                        </div>
                                    </form>
                                </Form>

                        </CardContent>      

                </Card>
            </CardContent>
  </>
  )
}

const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
      settlement_method: 'SOL (Solana)',
      type: 'Outgoing',
      icon: SOL_LOGO
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
      settlement_method: 'ETH (Ethereum)',
      type: 'Outgoing',
      icon: ETH_LOGO
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
      settlement_method: 'XAUT',
      type: 'Incoming',
      icon: TETHER_GOLD_LOGO
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
      settlement_method: 'ADA (Cardano)',
      type: 'Outgoing',
      icon: ADA_LOGO
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
      settlement_method: 'BTC',
      type: 'Incoming',
      icon: BTC_LOGO
    },

    {
        id: "bhqeecj4p",
        amount: 121,
        status: "failed",
        email: "carmewlla@hotmail.com",
        settlement_method: 'BTC',
        type: 'Outgoing',
        icon: BTC_LOGO
      },
      {
        id: "bhqecj4p",
        amount: 241,
        status: "failed",
        email: "ncarmella@hotmail.com",
        settlement_method: 'USDC (Polygon)',
        type: 'Incoming',
        icon: USDC_LOGO
      },
      {
        id: "bhqecj4p",
        amount: 421,
        status: "failed",
        email: "ycarmella@hotmail.com",
        settlement_method: 'MATIC(Polygon)',
        type: 'Incoming',
        icon: MATIC_LOGO
      },
  ]
   
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
    settlement_method?: string
    chain?: string
    creationDate?: string
    type?: 'Incoming' | 'Outgoing'
    icon?: ImageProps
}

// id?: number;
// user_id: number;
// ref_no: string;
// due_date: Date;
// item_name: string;
// unit_price: number;
// item_quantity: number;
// payment_method: string;
// client_email: string;
// item_description: string;
// sub_total: number;
// type: string;
// status: string;



const columns: ColumnDef<Payment>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
         accessorKey: 'type',
         header: ({column}) => {
            return (
                <Button variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                        Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
         }
    },
    {
        accessorKey: "settlement_method",
        header: ({column}) => {
            return (
                <Button variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                        Settlement Method
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
      //header: "Status",
      cell: ({ row }) => (
        <div 
            className="flex gap-2"
        >
            <Image src={`${row.original.icon?.src}`} width={25} height={24} alt={'asset-logo'} />
            {row.getValue("settlement_method")} 
        </div>
      ),
    },
    {
      accessorKey: "status",
        header: ({column}) => {
            return (
                <Button variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
      //header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
            {row.getValue("status")}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Client Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
   
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
   
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const invoice = row.original
        return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(invoice.id)}
                >
                  Copy invoice ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View client/vendor details</DropdownMenuItem>
                <DropdownMenuItem>
                  View invoice details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
      }
    } 
]

const InvoicePaymentsDataFrame = () =>{
  const {data: userSessionData} = useSession()
  const [_data, setInvoices] = useState<NanaPayInvoiceProps[]|undefined>([]) //NanaPayInvoiceProps[]|undefined>([]

  const fetchInvoiceData = useCallback(async() => {
    const result = await listInvoices(userSessionData?.user.accessToken)
    const invoceData = result
    //console.log(invoceData)
    setInvoices(invoceData)
},[userSessionData])

const {error, status, data:invoiceData, isLoading } = useQuery({
    queryKey: 'invoicesInfo',
    queryFn: fetchInvoiceData
})

   const filteredData = useMemo(() => _data?.filter(d => d.type === "Outgoing" || d.type === "Incoming") ?? [], [_data]);
    //console.log(filteredData)

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    )
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
   
    const invoiceDataColumns: ColumnDef<NanaPayInvoiceProps>[] = useMemo(() => [
      {
        accessorKey: 'id',
        header: ({column}) => {
           return (
               <Button variant={'ghost'}
               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               >
                       ID
                   <ArrowUpDown className="ml-2 h-4 w-4" />
               </Button>
           )
        }
      },
      {
        accessorKey: 'type',
        header: ({column}) => {
          return (
            <Button 
              variant={'ghost'}
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Type
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        }
      },
      {
        accessorKey: 'item_name',
        header: ({column}) => {
           return (
               <Button variant={'ghost'}
               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               >
                       Item
                   <ArrowUpDown className="ml-2 h-4 w-4" />
               </Button>
           )
        }
      },
      {
        accessorKey: "payment_method",
        header: ({column}) => {
            return (
                <Button variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                        Payment Method
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
      //header: "Status",
      cell: ({ row }) => (
        <div 
            className="flex gap-2"
        >
            <img src={`${getAssetImage(row?.getValue('payment_method'))?.src}`} width={25} height={24} alt={'asset-logo'} 
            //${row?.original?.icon?.src}
            />
            {row?.getValue("payment_method")} 
        </div>
      ), 
      },
      {
        accessorKey: "status",
        header: ({column}) => {
            return (
                <Button variant={'ghost'}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
      //header: "Status",
      cell: ({ row }) => (
        // const INVOICE_STATUS_CREATED = 'Created';
        // const INVOICE_STATUS_PENDING = 'Pending';
        // const INVOICE_STATUS_PAID = 'Paid';
        // const INVOICE_STATUS_REJECTED = 'Rejected';
        // const INVOICE_STATUS_EXPIRED = 'Expired';
        <div className="px-6 py-4 whitespace-nowrap">
              {
              row?.getValue("status") === "Pending" && (
                 
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {row?.getValue("status")}
                        </span>
              )
            } 
            {
              row?.getValue("status") === "Created" && (
                 
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {row?.getValue("status")}
                        </span>
              )
            } 
            {
              row?.getValue('status') === "Rejected" && (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  {row?.getValue("status")}
                </span>
              )
            }
            {
              row?.getValue('status') === "Expired" && (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  {row?.getValue("status")}
                </span>
              )
            }

            {
              row?.getValue('status') === "Paid" && (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {row?.getValue("status")}
                </span>
              )
            }
        </div>
      ),
    
      },
      {
        accessorKey: "client_email",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Client Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("client_email")}</div>,    
      },
      {
        accessorKey: "sub_total",
        header: () => <div className="text-right">Sub Total</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row?.getValue("sub_total"))
     
          // Format the amount as a dollar amount
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            //currency: "KES",
            //currencySign: "KES"
          }).format(amount)
     
          return <div className="text-right font-medium">{formatted}</div>
        },    
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const invoice = row.original
          return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={
                      () => {
                        navigator.clipboard.writeText(invoice?.ref_no).then(() => {
                          toast.success("Invoice reference successfully copied",
                          {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            //transition: Bounce,
                          }
                          );
                        }).catch((error) => {
                          toast.error("Failed to copy!",{
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            //transition: Bounce,
                          })
                        })
                        
                      }
                    }
                  >
                    Copy invoice Reference No
                   
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View client/vendor details</DropdownMenuItem>
                  <DropdownMenuItem>View invoice details</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
        }
      } 
    ],[])

    
    const table = useReactTable({
      //dataItems,
      //data,
      //columns,
      data:filteredData,
      columns:invoiceDataColumns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    })
   
    return (
      <div className="w-full">
        <div className="flex items-center py-4 gap-2">
          {/* <p>
            Filter by client email
          </p> <br /> */}
          <Input
            placeholder="Search by client email..."
            value={(table.getColumn("client_email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("client_email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                    {/* <br />
                    <br />
                                  <Button variant="outline" className='bg-orange-600 text-white hover:bg-orange-500 hover:text-white content-start group  rounded-md px-3 py-2 text-sm font-medium'>
                                          <Link href="/dashboard/invoices/new-invoice">
                                            <div className='flex gap-2 items-center'>
                                              <PlusIcon className='h-6 w-6'/> Create New Invoice
                                            </div>
                                        </Link>
                                    </Button> */}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    )
  }

export function InvoiceComponent(){
    return (<>
        <ScrollArea className='h-full'>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Invoice
                    </h2>
                </div>
                <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                    <div className='col-span-4'>
                        <CardHeader>
                                <div className="flex items-center justify-between space-y-2">
                                    <div className="md:flex items-center space-x-2">
                                    <CardTitle>
                                        Overview
                                    </CardTitle>
                                    
                                    </div>
                                    {/* <Dialog>
                                      <DialogTrigger asChild>
                                      <Button variant="outline" className='bg-orange-600 text-white hover:bg-orange-500 hover:text-white content-start group  rounded-md px-3 py-2 text-sm font-medium'>
                                          <Link href="/dashboard/invoices/new-invoice">
                                            <div className='flex gap-2 items-center'>
                                              <PlusIcon className='h-6 w-6'/> Create New Invoice
                                            </div>
                                        </Link>
                                    </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <InvoiceForm />
                                      </DialogContent>
                                    </Dialog> */}
                                    <Button variant="outline" className='bg-orange-600 text-white hover:bg-orange-500 hover:text-white content-start group  rounded-md px-3 py-2 text-sm font-medium'>
                                          <Link href="/dashboard/invoices/new-invoice">
                                            <div className='flex gap-2 items-center'>
                                              <PlusIcon className='h-6 w-6'/> Create New Invoice
                                            </div>
                                        </Link>
                                    </Button>
                                </div>   
                        </CardHeader>
                        <CardContent className='pl-2'>
                            <div className='grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
                            <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Invoice Income
                                        </CardTitle>
                                        <DollarSign className='w-4 h-4'/>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='text-2xl font-bold'>
                                                KES 43,184.00
                                            </div>
                                            {/* <p className='text-sm font-normal'>Available Balance</p> */}
                                            <p className="text-xs text-muted-foreground mb-6">
                                                <span className="text-green-600">
                                                    10.19%
                                                </span> last 1 month
                                            </p>
                                            {/* <Button
                                                className="w-full"
                                            >
                                                <Link href={`/dashboard/buy-sell-crypto?baseAsset=BTC&currency=KES`}>
                                                    Buy/Sell
                                                </Link>
                                            </Button> */}
                                        </CardContent>
                                    </Card>

                                    <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Incoming Invoices
                                        </CardTitle>
                                        <ArrowDownLeftFromCircleIcon className='w-4 h-4'/>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='text-2xl font-bold'>
                                                34
                                            </div>
                                            {/* <p className='text-sm font-normal'>Available Balance</p> */}
                                            <p className="text-xs text-muted-foreground mb-6">
                                                <span className="text-green-600">
                                                    10.19%
                                                </span> last 1 month
                                            </p>
                                            {/* <Button
                                                className="w-full"
                                            >
                                                <Link href={`/dashboard/buy-sell-crypto?baseAsset=BTC&currency=KES`}>
                                                    Buy/Sell
                                                </Link>
                                            </Button> */}
                                        </CardContent>
                                    </Card>

                                    <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Outgoing Invoices
                                        </CardTitle>
                                        <ArrowUpRightFromCircleIcon className='w-4 h-4'/>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='text-2xl font-bold'>
                                            10
                                            </div>
                                            {/* <p className='text-sm font-normal'>Available Balance</p> */}
                                            <p className="text-xs text-muted-foreground mb-6">
                                                <span className="text-green-600">
                                                    10.19%
                                                </span> last 1 month
                                            </p>
                                            {/* <Button
                                                className="w-full"
                                            >
                                                <Link href={`/dashboard/buy-sell-crypto?baseAsset=BTC&currency=KES`}>
                                                    Buy/Sell
                                                </Link>
                                            </Button> */}
                                        </CardContent>
                                    </Card>

                                    
                                    <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Pending Invoices
                                        </CardTitle>
                                        <CounterClockwiseClockIcon className='w-4 h-4'/>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='text-2xl font-bold'>
                                            2
                                            </div>
                                            {/* <p className='text-sm font-normal'>Available Balance</p> */}
                                            <p className="text-xs text-muted-foreground mb-6">
                                                <span className="text-green-600">
                                                    2.19%
                                                </span> last 1 month
                                            </p>
                                            {/* <Button
                                                className="w-full"
                                            >
                                                <Link href={`/dashboard/buy-sell-crypto?baseAsset=BTC&currency=KES`}>
                                                    Buy/Sell
                                                </Link>
                                            </Button> */}
                                        </CardContent>
                                    </Card>
                            </div>
                        </CardContent>
                    </div>
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-7">
                <CardHeader>
                <div className="flex items-center justify-between space-y-2">
                    <div className="md:flex items-center space-x-2">
                    <CardTitle>
                      My Invoices
                    </CardTitle>
                    {/* <CalendarDateRangePicker /> */}
                    </div>
                  </div>   
                </CardHeader>
                <CardContent className="pl-2">
                  {/* <Overview />  */}
                  <InvoicePaymentsDataFrame 
                  //dataItems={_data} 
                  
                  />
                </CardContent>
              </Card>
              {/* <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Recent Invoices</CardTitle>
                  <CardDescription>
                      Your invoice history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InvoiceList />
                </CardContent>
              </Card> */}
            </div>
            </div>
        </ScrollArea>
    </>)
}