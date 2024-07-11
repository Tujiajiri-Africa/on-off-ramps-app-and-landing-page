'use client'

import React, { useCallback, useEffect, useMemo, useState, useTransition, useRef } from 'react'
import {ArrowDownLeftFromCircle, ArrowDownRightFromCircle, DollarSign, PlusCircleIcon, PlusIcon} from 'lucide-react'

import { fetchTransactionHistory } from '@/actions/payments';
import {useSession} from 'next-auth/react'

import { TransactionHistoryProps } from '@/helpers/data';
import { useQuery } from 'react-query';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {MinusIcon, Cross1Icon} from '@radix-ui/react-icons'
import GreenLoader from '@/app/assets/icons/loaders/loading-green.svg'
import ItmesNotFoundIllustration from '@/app/assets/backgrounds/items-not-found-illustration.png';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

export function RecentSales() {
  const {data: userSessionData} = useSession()
  const [transansactionHistoryData, setTransactionData] = useState<TransactionHistoryProps[]|undefined>([]) //TransactionHistoryProps[]|undefined>([]

  const fetchTransactionData = useCallback(async() => {
    const result = await fetchTransactionHistory(userSessionData?.user.accessToken)
    const transactions = result
    //console.log(transactions)
    setTransactionData(transactions)
},[userSessionData])

const {error, status, data:invoiceData, isLoading, isError } = useQuery({
    queryKey: 'transactions',
    queryFn: fetchTransactionData
})

const setStatusColor = (status: string|undefined) => {
  let statusColor = "";
  switch(status){
    case "Success":
      statusColor = "text-green-600";
      break;

    case "Processing":
      statusColor = "text-grey-900";
      break;

    case "Failed":
      statusColor = "text-red-600";
      break;
      
    case "Cancelled":
      statusColor = "text-yellow-600";
      break;
      
     default:
      statusColor = "text-green-600";
      break; 
  }

  return statusColor;
}

{
  isError && (
      <>
          <div className="flex flex-col items-center gap-1 text-center">
          <Image 
            //src={InvoiceVector3.src} 
            src={ItmesNotFoundIllustration.src}
            height={320} 
            width={320} 
            alt="invoice-vector-2" 
            className='w-80 h-80'//hidden dark:block
          />

          <h3 className="text-2xl font-bold tracking-tight">
            Sorry we could not fetch transansaction history.
          </h3>
          <p className="text-sm text-muted-foreground">
              Please reload page
          </p>
          <Button className="mt-4 mb-6">
            <Link href="/dashboard">
                Refresh Page
            </Link>
          </Button>
          </div>
      </>
  )
}

  return (
    <div className="space-y-8">
      {
          isLoading ?
                    
              <div className='flex items-center gap-2'>
                <Image 
                width={40}
                height={40}
                className="animate-spin" //w-16 h-16 
                src={GreenLoader.src} 
                alt="Loading icon"
                />
            <span className="text-md font-medium text-gray-400 dark:text-gray-200">Fetching transactions, please wait...</span>
              </div>
      :
      
      transansactionHistoryData  && transansactionHistoryData?.length < 1 ?

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
            src={ItmesNotFoundIllustration.src}
            height={100} 
            width={100} //320
            // height={320} 
            // width={320} //320
            alt="invoice-vector-2" 
            className='w-80 h-80'//hidden dark:block
          />

          <h3 className="text-2xl font-bold tracking-tight">
            You do not have any transactions yet
          </h3>
          <p className="text-sm text-muted-foreground">
              {/* Once you verify your account and top up your AjiraPay account, <br/> you can start investing in cUSD and or send out invoices and get paid seamlessly in cUSD */}
              You can start investing in cUSD with as little as 1 {userSessionData?.user.currency} from M-Pesa and earn cash rewards in either {userSessionData?.user.currency} and cUSD
          </p>
          <Button className="mt-4 mb-6">
            <Link href="/dashboard/deposit">
                Get Started
            </Link>
          </Button>
      </div>
      
      : 
      transansactionHistoryData && transansactionHistoryData.length > 1 && transansactionHistoryData?.slice(0, 5).map((transansactionItem, index) => (
          <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>
                <PlusIcon className="w-4 h-4"  />
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transansactionItem.description}</p>
            <p className={`text-sm  ${setStatusColor(transansactionItem.status)}`}
            //text-muted-foreground
            >
              {transansactionItem.status}
            </p>
          </div>
          <div className="ml-auto font-medium">{transansactionItem.asset_name} {transansactionItem.amount}</div>
        </div>
        ))
      }
      {/* <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>
              <PlusIcon className="w-4 h-4"  />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Deposit</p>
          <p className="text-sm  text-green-600"
          //text-muted-foreground
          >
            Success
          </p>
        </div>
        <div className="ml-auto font-medium">KES 1,999.00</div>
      </div> */}
      {/* <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>
            <PlusIcon className="w-4 h-4"  />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Buy USDT</p>
          <p className="text-sm text-green-600"
          //text-muted-foreground
          >
            Success
            </p>
        </div>
        <div className="ml-auto font-medium">KES 39.00</div>
      </div> */}
      {/* <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>
            <MinusIcon className="w-4 h-4"  />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Withdraw cUSD</p>
          <p className="text-sm text-green-600"
          //text-muted-foreground
          >
            Success
          </p>
        </div>
        <div className="ml-auto font-medium">KES 299.00</div>
      </div> */}
      {/* <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>
            <PlusIcon className="w-4 h-4"  />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Buy BTC</p>
          <p className="text-sm text-green-600"
          //text-muted-foreground
            >
              Success
            </p>
        </div>
        <div className="ml-auto font-medium">KES 5,300.00</div>
      </div> */}
      {/* <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>
            <Cross1Icon className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sell USDC</p>
          <p className="text-sm text-red-700">Insufficient Balance</p>
        </div>
        <div className="ml-auto font-medium">KES 3,039.00</div>
      </div> */}
      {/* <div className="flex items-center">
        <Button className=" bg-orange-600 text-white hover:bg-orange-500 hover:text-white">
          <div className="flex gap-2 items-center">
            View More <ArrowUpRight className="h-6 w-6" />
          </div>
        </Button>
      </div> */}
    </div>
  );
}
