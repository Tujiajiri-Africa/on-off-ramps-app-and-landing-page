'use client'

import React, { useState } from 'react'
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
import {DollarSign, PlusCircleIcon} from 'lucide-react'
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
        const payment = row.original
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
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Copy invoice ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View client</DropdownMenuItem>
                <DropdownMenuItem>View invoice details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
      }
    } 
]

const  InvoicePaymentsDataFrame = () =>{
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    )
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
   
    const table = useReactTable({
        data,
      columns,
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
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
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
                                    
                                    <Button variant="outline" className='bg-orange-600 text-white hover:bg-orange-500 hover:text-white content-start group  rounded-md px-3 py-2 text-sm font-medium'>
                                          <Link href="/dashboard/invoices/new-invoice">
                                            <div className='flex gap-2'>
                                            <PlusCircleIcon className='h-4 w-4 mr-2 '/> Create New Invoice
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
                  <InvoicePaymentsDataFrame />
                </CardContent>
              </Card>
              {/* <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                      Your transactions history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card> */}
            </div>
            </div>
        </ScrollArea>
    </>)
}