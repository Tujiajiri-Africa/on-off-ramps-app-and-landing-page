import { CalendarDateRangePicker } from "@/components/date-range-picker";
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

export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋 Dickens
          </h2>
          <div className="hidden md:flex items-center space-x-2">
            {/* <CalendarDateRangePicker /> */}
            <Button
                className="bg-[#16a34a] dark:text-white"
            >
                Send/Receive
            </Button>
            <Button
                className="w-full"
            >
                Buy/Sell
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$66,705.89</div>
                  <p className="text-xs text-muted-foreground mb-6">
                  <span className="text-green-600">+20.1%  </span> 24hr Change
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
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg> */}
                   <Image
                      src={ETH_LOGO.src}
                      width={20}
                      height={20}
                      alt={'ethereum-logo'}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,860.33</div>
                  <p className="text-xs text-muted-foreground mb-6">
                    <span className="text-green-600"> +180.1% </span> 24hr Change
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
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg> */}
                     <Image
                      src={SOL_lOGO.src}
                      width={30}
                      height={30}
                      alt={'solana-logo'}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$131.13</div>
                  <p className="text-xs text-muted-foreground mb-6">
                  <span className="text-green-600">+19%</span> 24hr Change
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
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg> */}
                   <Image
                      src={MATIC_LOGO.src}
                      width={30}
                      height={30}
                      alt={'matic-logo'}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1.10</div>
                  <p className="text-xs text-muted-foreground mb-6">
                    <span className="text-green-600"> +23.1% </span> 24hr Change
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
                  <CardTitle>Recent Send Transactions</CardTitle>
                  <CardDescription>
                      You made 265 crypto send transactions this month
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
