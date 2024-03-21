'use client'

import React,{useState} from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
  } from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormErrorMessage } from '@/components/form-errors'
import { FormSuccessMessage } from '@/components/form-success'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {BuyAssetSchema, SellAssetSchema} from '@/schemas'
import {BuyComponent} from '@/components/ui/dashboard/buy'
import {SellComponent} from '@/components/ui/dashboard/sell'

export default function Profile(){
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const form = useForm<z.infer<typeof BuyAssetSchema>>({
    resolver: zodResolver(BuyAssetSchema),
    defaultValues:{
        asset: "",
        amount: 300,
        payment_method: ""
    }
  })

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