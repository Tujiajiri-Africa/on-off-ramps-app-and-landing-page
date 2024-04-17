'use client'

import React, { useCallback,useMemo, useState } from 'react'
import { Button } from "@/components/ui/button";
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
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

import {listIncomingInvoices} from '@/actions/invoices'
import {useSession} from 'next-auth/react'

import { NanaPayInvoiceProps } from '@/helpers/data';
import { useQuery } from 'react-query';
import { formatDistance } from "date-fns"
import {getAssetImage} from '@/lib/utils'
import { toast } from 'react-toastify';
import GreenLoader from '@/app/assets/icons/loaders/loading-green.svg'

export function IncomingInvoicePaymentsDataFrame(){
    const {data: userSessionData} = useSession()
    const [_data, setInvoices] = useState<NanaPayInvoiceProps[]|undefined>([])
  
    const fetchInvoiceData = useCallback(async() => {
      const result = await listIncomingInvoices(userSessionData?.user.accessToken)
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
  
     const filteredData = useMemo(() => _data?.filter(d => d.client_email == userSessionData?.user.email) ?? [], [_data]);
      //console.log(filteredData)
  
      const [sorting, setSorting] = React.useState<SortingState>([])
      const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
      )
      const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
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
          accessorKey: "owner_first_name",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  Sender Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
          cell: ({ row }) =>  <div className="">{`${row.getValue("owner_first_name")} ${row.getValue('owner_last_name')}`}</div>,    
        },
        {
          accessorKey: "owner_last_name",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className='hidden'
              >
                  Owner Last Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
          cell: ({ row }) =>  <div className="hidden">{row.getValue("owner_last_name")}</div>,    
        },
        {
          accessorKey: "owner_email",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Sender Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("owner_email")}</div>,    
        },
        // {
        //   accessorKey: "client_email",
        //   header: ({ column }) => {
        //     return (
        //       <Button
        //         variant="ghost"
        //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        //       >
        //         Client Email
        //         <ArrowUpDown className="ml-2 h-4 w-4" />
        //       </Button>
        //     )
        //   },
        //   cell: ({ row }) => <div className="lowercase">{row.getValue("client_email")}</div>,    
        // },
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
                    {
                      invoice.status !== 'Paid' || 'Rejected' && invoice.client_email.trim() !== userSessionData?.user.email.trim() && (
                        <DropdownMenuItem>
                            Proceed to Pay
                        </DropdownMenuItem>
                      )
                    }
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
                  width={60}
                  height={60}
                  className="w-16 h-16 animate-spin" src={GreenLoader.src} alt="Loading icon"
                  />
              <span className="text-2xl font-medium text-gray-400 dark:text-gray-200">Fetching your invoices, please wait...</span>
                </div>
  
                </>
              :
              <>
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
                      colSpan={table.getAllColumns().length} //columns.length
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
            }
  
        </div>
      )
    }