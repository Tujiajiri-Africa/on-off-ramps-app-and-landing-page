//import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BTC_LOGO from '@/app/assets/logo/bitcoin-btc-logo.svg'
import ETH_LOGO from '@/app/assets/logo/ethereum-eth-logo.svg'
import SOL_lOGO from '@/app/assets/logo/solana-sol-logo.svg'
import MATIC_LOGO from '@/app/assets/logo/polygon-matic-logo.svg'
import Image from 'next/image'
import {
  getBtcLatestAssetPrice,
  getEthLatestAssetPrice,
  getSolLatestAssetPrice,
  getMaticLatestAssetPrice} from '@/actions/crypto'

import { Greetings } from '@/components/ui/dashboard/greetings'

export default async function Page() {
  return (
 <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          {/* <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋 Dickens
          </h2> */}
          <Greetings />
          <div className="hidden md:flex items-center space-x-2">
            {/* <CalendarDateRangePicker /> */}
            {/* <Button
                className="bg-[#16a34a] dark:text-white"
            >
                Send/Receive
            </Button> */}
            <Button
                className="bg-[#16a34a] dark:text-white"
            >
                Buy/Sell
            </Button>
          </div>
        </div>
          <Button
                className="sm:hidden bg-[#16a34a] dark:text-white"
            >
                Buy/Sell
          </Button>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
           
              {/* <LatestBtcPrice /> */}
                
              <Card>
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
                  <div className="text-2xl font-bold">$ 
                    {
                      //await getAssetTimeSeriesData('BTC','USDT')
                      (await getBtcLatestAssetPrice()).price
                      
                    }

                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-6">
                    { 
                      parseFloat((await getBtcLatestAssetPrice())._24hr_change) < 0 && 
                    (
                      <>
                        <span className="text-red-600">
                          {(await getBtcLatestAssetPrice())._24hr_change.slice(1)}%
                        </span> 24hr Change
                      </>
                      
                      )
                    } 
                     { 
                      parseFloat((await getBtcLatestAssetPrice())._24hr_change) > 0 && 
                    (
                      <>
                        <span className="text-green-600">
                          {(await getBtcLatestAssetPrice())._24hr_change}%
                        </span> 24hr Change
                      </>
                      
                      )
                    }
                  </p>
                  <Button
                    //className="w-full"
                  >
                    Buy/Sell
                  </Button>
                </CardContent>
              </Card> 
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    ETH
                  </CardTitle>
                   <Image
                      src={ETH_LOGO.src}
                      width={20}
                      height={20}
                      alt={'ethereum-logo'}
                  />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">$ 
                    {
                      //await getAssetTimeSeriesData('BTC','USDT')
                      (await getEthLatestAssetPrice()).price
                    }

                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-6">
                    { 
                      parseFloat((await getEthLatestAssetPrice())._24hr_change) < 0 && 
                    (
                      <>
                        <span className="text-red-600">
                          {(await getEthLatestAssetPrice())._24hr_change.slice(1)}%
                        </span> 24hr Change
                      </>
                      
                      )
                    } 
                     { 
                      parseFloat((await getEthLatestAssetPrice())._24hr_change) > 0 && 
                    (
                      <>
                        <span className="text-green-600">
                          {(await getEthLatestAssetPrice())._24hr_change}%
                        </span> 24hr Change
                      </>
                      
                      )
                    }
                  </p>
                  <Button
                    //className="w-full"
                  >
                    Buy/Sell
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">SOL</CardTitle>
                     <Image
                      src={SOL_lOGO.src}
                      width={30}
                      height={30}
                      alt={'solana-logo'}
                  />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">$ 
                    {
                      //await getAssetTimeSeriesData('BTC','USDT')
                      (await getSolLatestAssetPrice()).price
                    }

                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-6">
                    { 
                      parseFloat((await getSolLatestAssetPrice())._24hr_change) < 0 && 
                    (
                      <>
                        <span className="text-red-600">
                          {(await getSolLatestAssetPrice())._24hr_change.slice(1)}%
                        </span> 24hr Change
                      </>
                      
                      )
                    } 
                     { 
                      parseFloat((await getSolLatestAssetPrice())._24hr_change) > 0 && 
                    (
                      <>
                        <span className="text-green-600">
                          {(await getSolLatestAssetPrice())._24hr_change}%
                        </span> 24hr Change
                      </>
                      
                      )
                    }
                  </p>
                  <Button
                    //className="w-full"
                  >
                    Buy/Sell
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    MATIC
                  </CardTitle>
                   <Image
                      src={MATIC_LOGO.src}
                      width={30}
                      height={30}
                      alt={'matic-logo'}
                  />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">$ 
                    {
                      //await getAssetTimeSeriesData('BTC','USDT')
                      (await getMaticLatestAssetPrice()).price
                    }

                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-6">
                    { 
                      parseFloat((await getMaticLatestAssetPrice())._24hr_change) < 0 && 
                    (
                      <>
                        <span className="text-red-600">
                          {(await getMaticLatestAssetPrice())._24hr_change.slice(1)}%
                        </span> 24hr Change
                      </>
                      
                      )
                    } 
                     { 
                      parseFloat((await getMaticLatestAssetPrice())._24hr_change) > 0 && 
                    (
                      <>
                        <span className="text-green-600">
                          {(await getMaticLatestAssetPrice())._24hr_change}%
                        </span> 24hr Change
                      </>
                      
                      )
                    }
                  </p>
                  <Button
                    //className="w-full"
                  >
                    Buy/Sell
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview /> 
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                      Your transactions history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}