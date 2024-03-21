import React from 'react'
import {CardContent} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {BuyComponent} from '@/components/ui/dashboard/buy'
import {SellComponent} from '@/components/ui/dashboard/sell'

export function BuySellComponent(){
    return (
        <>
        <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Buy/Sell
          </h2>
          <div className="md:flex items-center space-x-2">
          </div>
        </div>
        <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8 border-none'>
            <CardContent className="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-4">
             
              <Tabs defaultValue="buy" className="w-full">
                <TabsList>
                  <TabsTrigger value="buy" className=''>Buy</TabsTrigger>
                  <TabsTrigger value="sell" className=''>Sell</TabsTrigger>
                </TabsList>
                <TabsContent value="buy">
                    <BuyComponent />
                </TabsContent>
                <TabsContent value="sell">
                    <SellComponent />
                </TabsContent>
              </Tabs>
             
            </CardContent>
        </div>
      </div>
      </ScrollArea>
  </>
    )
}