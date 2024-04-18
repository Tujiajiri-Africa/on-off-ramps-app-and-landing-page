'use client'

import React,{ useState, useRef, useCallback} from 'react'
import { useSearchParams } from "next/navigation";
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import { NanaPayInvoiceProps } from '@/helpers/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CardContent } from '@mui/material';
import { getInvoiceDetails } from '@/actions/invoices';
import { format } from "date-fns"
import jsPDF from "jspdf";
//import html2canvas  from 'html2canvas'
import html2canvas from 'html2canvas-pro';
import { Button } from '@/components/ui/button';
import InvoiceInfo from '@/app/(dashboard)/dashboard/invoices/[id]/page';
import { getAssetImage } from '@/lib/utils';
import Image from 'next/image';
import logo from  '@/app/assets/logo/favicon.ico'
import Link from 'next/link'
import { ArrowDownCircle, ArrowLeftCircle } from 'lucide-react'
import GreenLoader from '@/app/assets/icons/loaders/loading-green.svg'
import {getCountryFromPhone} from '@/lib/utils'

export function InvoiceDetail(){
    const {data: userSessionData} = useSession()
    const [invoiceInfo, setInvoiceInfo] = useState<NanaPayInvoiceProps>() 
    
    const searchParams = useSearchParams();
    const ref_no = searchParams.get("ref");
    const formatedInvoiceRef = ref_no?.trim()
    //console.log(formatedInvoiceRef)

    const invoiceRef  = useRef<any>();

    const generatePDF = async(invoice_id:string) => {
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
          pdf.save(`AjiraPayFinance Invoice-${invoice_id}-Of-${format(new Date(), 'PPPP')}.pdf`)
        })
      }catch(error){
        console.log
      }
    }

    const fetchInvoiceDetails = useCallback(async() => {
      const result = await getInvoiceDetails(userSessionData?.user.accessToken, ref_no)
      const invoceData = result
      setInvoiceInfo(invoceData?.dataInfo.data)
      console.log("result", result)
    //   if(invoceData?.dataInfo.error){
    //     console.log(error)
    //   }else if(invoceData?.dataInfo.success){
    //     setInvoiceInfo(invoceData?.dataInfo.data)
    //     console.log("result", result)
    //   }
  },[userSessionData, ref_no])
  
  const {error, status, data:invoiceData, isLoading, isError } = useQuery({
      queryKey: 'invoice',
      queryFn: fetchInvoiceDetails
  })

  {
    isError && (
        <>
            <p>Something went wrong</p>
        </>
    )
 }
    return (
    <>
    <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    Invoice Details
                </h2>
            </div>
            <div className="flex items-center justify-normal gap-2">
                                    <Button 
                                        className='bg-orange-600 text-white hover:bg-orange-500 hover:text-white' 
                                        onClick={() => generatePDF(`${invoiceInfo?.id}`)}
                                        >
                                        <div className='flex items-center gap-2'>
                                            <ArrowDownCircle className='h-6 w-6'/> Download PDF
                                        </div>
                                            
                                    </Button>
                                    <Button 
                                        //variant='secondary' 
                                        className='dark:bg-[#4B49AC]/95 text-white'
                                        >
                                        <Link href="/dashboard/invoices">
                                            <div className='flex items-center gap-2'>
                                                <ArrowLeftCircle className='h-6 w-6' /> Back to invoices
                                            </div>
                                        </Link>
                                    </Button>
                            </div>

            <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8 border-none '>

                {
                    isLoading ?
                    <CardContent className="mt-8 mx-auto sm:w-full sm:max-w-xl space-y-4 content-center items-center">
                            {/* <div className='flex gap-2 items-center'>
                                <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                </path>
                            </svg>
                            Loading ...
                            </div> */}
                            <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
    {/* <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
        <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round"
            strokeWidth="24"></line>
        <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
        </line>
        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
            strokeWidth="24"></line>
        <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
        </line>
        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
            strokeWidth="24"></line>
        <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
        </line>
    </svg> */}
    <Image 
        width={60}
        height={60}
        className="w-16 h-16 animate-spin" src={GreenLoader.src} alt="Loading icon"
        />
    <span className="text-2xl font-medium text-gray-400 dark:text-gray-200">Generating invoice, please wait...</span>
</div>
                    </CardContent>
                    :
                    <CardContent 
                        className="mt-8 mx-auto w-full  space-y-4 shadow-2xl dark:shadow-none sm:max-w-[800px]"
                        //sm:max-w-xl
                        >
                    <div
                         ref={invoiceRef}
                        className="bg-white rounded-lg shadow-none px-8 py-10 w-full sm:max-w-[800px] 2xl:max-w-[800px] mx-auto"
                        >
                            <div className='flex flex-row items-center justify-center p-6 gap-2'>
                                 {/* <img className="h-8 w-8 mr-2 rounded-full" src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
                    alt="Logo" />  */}

                    <Image
                        height={60}
                        width={60}
                        src={logo.src}
                        alt='Logo'
                        //className='mb-4'
                  />
                  <div className='text-gray-700 gap-1'>
                  <h2 className='font-bold text-xl mb-4 mt-1'>Ajira Pay Finance</h2>
                  </div>
                  
                            </div>
                            <hr className='mb-2 text-gray-700'></hr>
        <div 
            className="flex items-center justify-between mb-8"
            
            >
            <div className="flex items-center">
                {/* <img className="h-8 w-8 mr-2" src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
                    alt="Logo" /> */}
                   {/* <h2 className='font-bold text-xl mb-2'>From:</h2> <br /> */}
                <div 
                    //className="text-gray-700 font-semibold text-lg"
                    className='text-gray-700 gap-1'
                    >
                        <h2 className='font-bold text-xl mb-1'>From</h2>
                    {`${invoiceInfo?.owner_first_name} ${invoiceInfo?.owner_last_name}` } <br />
                    {`${invoiceInfo?.owner_email}`} <br/>
                    {
                        invoiceInfo?.owner_address_address_line_1 != null && (
                            <div>
                                {`${invoiceInfo?.owner_address_address_line_1}`} <br/>
                            </div>
                        )
                    }
                    {
                        invoiceInfo?.owner_address_state != null && 
                        invoiceInfo.owner_address_city != null && 
                        invoiceInfo.owner_address_zip_code !== null &&
                        (
                            <div>
                                {`${invoiceInfo?.owner_address_city} ${invoiceInfo?.owner_address_state} ${invoiceInfo.owner_address_zip_code?.toString()}`} <br />
                            </div>
                        )
                    }
                    {
                        invoiceInfo?.owner_phone != null && (
                            <div>
                                {getCountryFromPhone(invoiceInfo?.owner_phone)}
                            </div>
                        )
                    }
                    {`+${invoiceInfo?.owner_phone}`} <br />
                    {/* Nana Pay LTD */}
                    {/* {invoiceInfo?.owner_first_name}
  owner_address_address_line_2?: string;
  owner_address_city?: string;
  owner_address_state?: string;
  owner_address_street?: string;
  owner_address_zip_code?: number; */}
                </div>
            </div> 
            {/* <div className='className="border-b-2 border-gray-300 pb-8 mb-8"'>
                <h2 className="text-2xl font-bold mb-4">From:</h2>
                <div className="text-gray-700">
                    {`${userSessionData?.user.first_name} ${userSessionData?.user.last_name}` } <br />
                    {`${userSessionData?.user.email}`} <br/>
                    {`${userSessionData?.user.phone}`}
                    Nana Pay LTD
                </div>
            </div> */}
            <div className="text-gray-700">
                <div className="font-bold text-xl mb-2">INVOICE</div>
                {/* <div className="text-sm">Date Created: { format(new Date(invoiceInfo?.created_at.toString()),'PPP')} */}
                <div className="text-sm">Invoice number: {`${invoiceInfo?.id}`}</div>
                <div className="text-sm">Date of issue: { invoiceInfo ? format(new Date(`${invoiceInfo?.created_at.toString()}`), 'PP') : '' }</div>
                {/* <div className="text-sm">Date Created: 04/03/2024</div> */}
                <div className="text-sm">Payment due on: { invoiceInfo ? format(new Date(`${invoiceInfo?.due_date.toString()}`), 'PP') : '' }</div>
                {/* <div className="text-sm">Ref: { invoiceInfo?.ref_no.trim() }</div> */}
                <div className="text-sm">
                    {
                        invoiceInfo?.status === "Pending" && (
                            <>
                                 <div className='flex gap-2'>
                                    Payment status:
                                    <span className="inline-flex text-xs leading-5 font-semibold rounded-full text-yellow-800 uppercase">
                                        {invoiceInfo?.status}
                                    </span>
                                </div>
                            </>

                        )
                    }
                    {
                        invoiceInfo?.status === "Created" && (
                            <>
                                 <div className='flex gap-2'>
                                    Payment status:
                                    <span className="inline-flex text-xs leading-5 font-semibold rounded-full  text-yellow-800 uppercase">
                                        {invoiceInfo?.status}
                                    </span>
                                </div>
                            </>
                      )
                    }

                    {
                        invoiceInfo?.status === "Rejected" && (
                            <>
                                 <div className='flex gap-2'>
                                    Payment status:
                                    <span className="inline-flex text-xs leading-5 font-semibold rounded-full  text-red-800 uppercase">
                                        {invoiceInfo?.status}
                                    </span>
                                </div>
                            </>
                      )
                    }

                    {
                        invoiceInfo?.status === "Expired" && (
                            <>
                                 <div className='flex gap-2'>
                                    Payment status:
                                    <span className="inline-flex text-xs leading-5 font-semibold rounded-full  text-red-800 uppercase">
                                        {invoiceInfo?.status}
                                    </span>
                                </div>
                            </>
                      )
                    }
                    {
                        invoiceInfo?.status === "Paid" && (
                            <>
                                 <div className='flex gap-2'>
                                    Payment status:
                                    <span className="inline-flex text-xs leading-5 font-semibold rounded-full  text-green-800 uppercase">
                                        {invoiceInfo?.status}
                                    </span>
                                </div>
                            </>
                      )
                    }
                </div>
                {/* <div className="text-sm">Ref:{invoiceInfo?.ref_no.toString()}</div> */}
                
                {/* 01/05/2023 */}
                {/* </div> */}
                <div className='text-sm'>
                    {/* Date Due: { format(invoiceInfo?.due_date.toString(),'PPP')} */}
                </div>
                
            </div>
        </div>
        <div className="text-gray-700 gap-1 pb-6 mb-6">
            {/* <h2 className="text-2xl font-bold mb-4">Bill To:</h2> */}
            <h2 className='font-bold text-xl mb-1'>Billed To</h2>
            {/* <div className="text-gray-700 mb-2">John Doe</div>
            <div className="text-gray-700 mb-2">123 Main St.</div>
            <div className="text-gray-700 mb-2">Anytown, USA 12345</div> */}
            <div className="text-gray-700">
                {invoiceInfo?.client_email?.trim()}
            </div>
        </div>
        <table className="w-full text-left mb-8 table-zebra-zebra">
            <thead>
                <tr>
                    {/* <th className="text-gray-700 font-bold uppercase py-2">Description</th> */}
                    <th className="text-gray-700 font-bold uppercase py-2">Item</th>
                    <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
                    <th className="text-gray-700 font-bold uppercase py-2">Unit Price</th>
                    {/* <th className="text-gray-700 font-bold uppercase py-2">Asset</th> */}
                    <th className="text-gray-700 font-bold uppercase py-2">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="py-4 text-gray-700">{invoiceInfo?.item_name?.trim()}</td>
                    <td className="py-4 text-gray-700">{invoiceInfo?.item_quantity?.toString()}</td>
                    <td className="py-4 text-gray-700">{`$${invoiceInfo?.unit_price?.toString()}`}</td>
                    {/* <td className="py-4 text-gray-700">
                        <img src={`${getAssetImage(invoiceInfo?.payment_method)}`} width={25} height={24} alt={'asset-logo'} />
                    </td> */}
                    <td className="py-4 text-gray-700">{`$${invoiceInfo?.sub_total?.toString()}`}</td>
                </tr>
                {/* <tr>
                    <td className="py-4 text-gray-700">Product 2</td>
                    <td className="py-4 text-gray-700">2</td>
                    <td className="py-4 text-gray-700">$50.00</td>
                    <td className="py-4 text-gray-700">$100.00</td>
                </tr>
                <tr>
                    <td className="py-4 text-gray-700">Product 3</td>
                    <td className="py-4 text-gray-700">3</td>
                    <td className="py-4 text-gray-700">$75.00</td>
                    <td className="py-4 text-gray-700">$225.00</td>
                </tr> */}
            </tbody>
        </table>
        <div className="flex justify-end mb-8">
            <div className="text-gray-700 mr-2">Subtotal:</div>
            <div className="text-gray-700">{`$${invoiceInfo?.sub_total?.toString()}`}</div>
        </div>
        <div className="text-right mb-8">
            <div className="text-gray-700 mr-2">Tax:</div>
            <div className="text-gray-700">$0.00</div>

        </div>
        <div className="flex justify-end mb-8">
            <div className="text-gray-700 mr-2">Total:</div>
            <div className="text-gray-700 font-bold text-xl">{`$${invoiceInfo?.sub_total?.toString()}`}</div>
        </div>
        <div className="border-t-2 border-gray-300 pt-8 mb-8">
            {/* <div className="text-gray-700 mb-2">Payment is due within 30 days. Late payments are subject to fees.</div> */}
            {/* <div className="text-gray-700 mb-2">Please make checks payable to Your Company Name and mail to:</div>
            <div className="text-gray-700">123 Main St., Anytown, USA 12345</div> */}
            <div className="text-gray-700 mb-1"><span className='font-medium'>Invoice Reference Number:</span> {invoiceInfo?.ref_no?.trim()}</div>
            <div className="text-gray-700"><span className='font-medium'>System generated on:</span> {format(new Date(), 'PPPPpppp')}</div>
             
        </div>
    </div>
            </CardContent>
                }

            </div>
        </div>
    </ScrollArea>

    </>
)
}