'use client'

import React, { useCallback, useEffect, useMemo, useState, useTransition, useRef } from 'react'
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
import {ArrowDownLeftFromCircle, ArrowDownRightFromCircle, DollarSign, PlusCircleIcon, PlusIcon} from 'lucide-react'
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
import { format,formatDistance, subDays } from "date-fns"
import { FormErrorMessage } from '@/components/form-errors'
import { FormSuccessMessage } from '@/components/form-success'
import { Textarea } from "@/components/ui/textarea"
import {getAssetImage} from '@/lib/utils'
import { toast } from 'react-toastify';
import {convertInvoiceToPdf,generatePdf} from '@/lib/utils'
import jsPDF from "jspdf";
//import html2canvas  from 'html2canvas'
import html2canvas from 'html2canvas-pro';
import GreenLoader from '@/app/assets/icons/loaders/loading-green.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import {IncomingInvoicePaymentsDataFrame} from '@/components/ui/dashboard/invoices/incoming-invoice-list'
import InvoiceVector1 from '@/app/assets/backgrounds/invoices/invoice_vector_1-transparent.png'
import InvoiceVector3 from '@/app/assets/backgrounds/invoices/invoice_vector_3-transparent.png'
import WomanCheckingInvoiceIllustration from '@/app/assets/backgrounds/invoices/woman-checking-invoice-colored.svg'

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

const {error, status, data:invoiceData, isLoading, isError } = useQuery({
    queryKey: 'invoicesInfo',
    queryFn: fetchInvoiceData
})

{
  isError && (
      <>
          <p>Something went wrong</p>
      </>
  )
}

   const filteredData = useMemo(() => _data?.filter(
      d => d.type === "Outgoing" && 
      d.client_email != userSessionData?.user.email) ?? [], [_data]); //|| d.type === "Incoming"
    //console.log(filteredData)

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
   
    const convertToPdf = () => {  
      const options = {
        filename: 'my-document.pdf',
        margin: 1,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: 'in',
          format: 'letter',
          orientation: 'portrait',
        },
      };
  
      //html2pdf().set(options).from(content).save();
    };

    const invoiceDataColumns: ColumnDef<NanaPayInvoiceProps>[] = useMemo(() => [
      // {
      //   accessorKey: 'id',
      //   header: ({column}) => {
      //      return (
      //          <Button variant={'ghost'}
      //          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      //          >
      //                  ID
      //              <ArrowUpDown className="ml-2 h-4 w-4" />
      //          </Button>
      //      )
      //   }
      // },

      {
        accessorKey: 'created_at',
        header: ({column}) => {
          return (
              <Button variant={'ghost'}
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                      Date Created
                  <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
          )
       },
       cell: ({ row }) => {
        //const dateDiff = new Date(row.getValue('created_at')).getTime() - new Date().getTime()
        return (
          <div 
          className="flex gap-2"
      >
          {formatDistance(new Date(row.getValue('created_at')).getTime(), new Date().getTime(),{ addSuffix: true })}
         {/* {formatDistance(subDays(row.getValue('created_at'), new Date(), {addSufix: true}))}  */}
         {/* {row?.getValue("created_at")} */}
      </div>
        )
       }, 
      },
      // {
      //   accessorKey: 'type',
      //   header: ({column}) => {
      //     return (
      //       <Button 
      //         variant={'ghost'}
      //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      //       >
      //         Type
      //         <ArrowUpDown className="ml-2 h-4 w-4" />
      //       </Button>
      //     )
      //   }
      // },
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
                Client/Vendor Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("client_email")}</div>,    
      },
      {
        accessorKey: "sub_total",
        header: ({column}) => {
          return (
              <Button variant={'ghost'}
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                      Sub Total
                  <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
          )
       },
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
                  {/* <DropdownMenuItem
                    onClick={() => {
                      convertInvoiceToPdf(invoice,`invoice-#${invoice.id}-${new Date().getFullYear()}`)
                      //generateInvoiceAsPDF()
                      //generatePdf(invoice)
                      //convertToPdf()
                    }}
                  >
                    Download PDF
                  </DropdownMenuItem> */}
                  {/* <DropdownMenuItem>View client/vendor details</DropdownMenuItem> */}
                  <DropdownMenuItem>
                    <Link href={`/dashboard/invoices/${invoice.id}?ref=${invoice.ref_no}`}>
                      Expand to download PDF 
                    </Link>
                      
                  </DropdownMenuItem>
                  {
                    invoice.status !== 'Paid' && (
                      <DropdownMenuItem>
                          Send Email Reminder
                      </DropdownMenuItem>
                    )
                  }
                  {/* {
                    invoice.status !== 'Paid' || 'Rejected' && invoice.client_email.trim() !== userSessionData?.user.email.trim() && (
                      <DropdownMenuItem>
                          Proceed to Pay
                      </DropdownMenuItem>
                    )
                  } */}
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
                  {
            isLoading  ?
              <>
              <div className='flex items-center gap-2'>
                <Image 
                width={40}
                height={40}
                className="animate-spin" //w-16 h-16 
                src={GreenLoader.src} 
                alt="Loading icon"
                />
            <span className="text-md font-medium text-gray-400 dark:text-gray-200">Fetching your invoices, please wait...</span>
              </div>

              </>
            :
            <>
            {
              filteredData && filteredData.length? 

              <>
     <div className="flex items-center py-4 gap-2">
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
                    colSpan={table.getAllColumns().length} //columns.length
                    className="h-24 text-center"
                  >
                    {/* No results. */}
                    {/* <br />
                    <br />
                                  <Button variant="outline" className='bg-orange-600 text-white hover:bg-orange-500 hover:text-white content-start group  rounded-md px-3 py-2 text-sm font-medium'>
                                          <Link href="/dashboard/invoices/new-invoice">
                                            <div className='flex gap-2 items-center'>
                                              <PlusIcon className='h-6 w-6'/> Create New Invoice
                                            </div>
                                        </Link>
                                    </Button> */}
                                            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                                              <div className="flex flex-col items-center gap-1 text-center">
                                                    <h3 className="text-2xl font-bold tracking-tight">
                                                      You have no invoices
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        You can start creating invoices and get paid in your preffered crypto asset.
                                                    </p>
                                                    <Button className="mt-4">
                                                      <Link href="/dashboard/invoices/new-invoice">Create Invoice</Link>
                                                    </Button>
                                                  </div>
                                            </main>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4 gap-2">
          {/* <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div> */}
          <div className="space-x-2">
          <Button
            variant="outline"
            //className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            First Page
           
          </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>

          {" "}
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()} 
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
            <Button
            variant="outline"
            size={'sm'}
            //className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            Last Page
            {/* <DoubleArrowRightIcon className="h-4 w-4" /> */}
          </Button>
          </div>
        </div>      

              </>

              :

              <div className="flex flex-col items-center gap-1 text-center">
                {/* <h3 className="text-2xl font-bold tracking-tight">
                  You have not sent out any invoices yet
                </h3> */}
                {/* <Image 
                  src={InvoiceVector1.src} 
                  //src={WomanCheckingInvoiceIllustration.src}
                  height={320} 
                  width={320} 
                  alt="invoice-vector-1" 
                  className='w-80 h-80 dark:hidden'//dark:hidden w-80 h-80
                  //w-80 h-80 
                /> */}
                <Image 
                  //src={InvoiceVector3.src} 
                  src={WomanCheckingInvoiceIllustration.src}
                  height={320} 
                  width={320} 
                  alt="invoice-vector-2" 
                  className='w-80 h-80'//hidden dark:block
                />

                <h3 className="text-2xl font-bold tracking-tight">
                  You are yet to send out any invoices
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can start creating invoices seamlessly. <br/> Unlock the power of crypto invoicing today, get paid in your prefered crypto or stablecoins.
                </p>
                <Button className="mt-4 mb-6">
                  <Link href="/dashboard/invoices/new-invoice">
                      Create Invoice
                  </Link>
                </Button>
            </div>
            }

            </>
          }

      </div>
    )
  }

export function InvoiceComponent(){
  const invoiceRef  = useRef<any>();

  const downloadPdf = async() => {
    const inputData = invoiceRef.current
    //const invoiceDiv:React.ElementRef = document.querySelector('#invoice-div');

    try{
      await html2canvas(inputData).then((canvas) => {
        const imageData = canvas.toDataURL('image/png')// toDataURL()
        const pdf = new jsPDF('p','mm','a4', true)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width
        const imgHeight = canvas.height
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) /2
        const imgY = 30
        pdf.addImage(imageData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
        pdf.save('invoice.pdf')
      })
    }catch(error){
      console.log
    }
  }

    return (<>
        <ScrollArea className='h-full'>
            <div 
              ref={invoiceRef} 
              className="flex-1 space-y-4 p-4 md:p-8 pt-6"
              id="invoice-div"
              >
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
                                              <PlusIcon className='h-6 w-6'/> Create Invoice
                                            </div>
                                        </Link>
                                    </Button>
                                    {/* <Button  onClick={downloadPdf}>
                                      Download PDF
                                    </Button> */}
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
                  <Tabs defaultValue="outgoing" className="space-y-4">
                    <TabsList className="">
                      <TabsTrigger value="outgoing">
                          <div className='flex items-center gap-2'>
                              <ArrowUpRightFromCircleIcon className='w-4 h-4 text-orange-600'/>
                              Outgoing 
                          </div>
                      </TabsTrigger>
                      <TabsTrigger value="incoming">
                      <div className='flex items-center gap-2'>
                              <ArrowDownLeftFromCircleIcon className='w-4 h-4 text-orange-600'/>
                              Incoming 
                          </div>
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="outgoing" className="space-y-4">
                            <InvoicePaymentsDataFrame />
                    </TabsContent>
                    <TabsContent value="incoming" className="space-y-4">
                          <IncomingInvoicePaymentsDataFrame />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            </div>
        </ScrollArea>
    </>)
}