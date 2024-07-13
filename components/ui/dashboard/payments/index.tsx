import React from 'react'
import {CardContent} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MakePaymentComponent } from '@/components/ui/dashboard/payments/send'
import { ReceivePaymentComponent } from '@/components/ui/dashboard/payments/receive'

export function PaymentComponent(){
    return (
        <>
                <ScrollArea className="h-full">
                    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                        <div className="col-span-4 md:col-span-3">
                        <CardContent 
                              //className="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-4"
                            >
                                <Tabs defaultValue="send" className="w-full">
                                  <TabsList className='w-full'>
                                    <TabsTrigger value="send" className='w-full border-spacing-4'>Send</TabsTrigger>
                                    <TabsTrigger value="receive" className='w-full border-spacing-4'>Receive</TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="send">
                                      <MakePaymentComponent />
                                  </TabsContent>
                                  <TabsContent value="receive">
                                      <ReceivePaymentComponent />
                                  </TabsContent>
                                </Tabs>
                            </CardContent>
                          </div>
                      </div>
                    </div>
              </ScrollArea>
  </>
    )
}