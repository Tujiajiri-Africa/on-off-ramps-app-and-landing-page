'use client'

import React,{useState, useCallback } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import Image from 'next/image'
import Link from 'next/link'
import cUSD_LOGO from '@/app/assets/logo/crypto/cUSD.png'
import { useQuery } from 'react-query';
import {useSession} from 'next-auth/react'
import { fetchUserCryptoRewardBalance } from '@/actions/payments'
import { useUserCryptoRewardBalance } from '@/hooks/web3/useCryptoRewardBalance';
import { Trophy } from 'lucide-react'
import { RecentTransactions } from '@/components/recent-transactions'

export function TransactionHistory(){
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 md:col-span-3">
                    <CardHeader>
                    <div className="flex items-center justify-between space-y-2">
                                        <div className="md:flex items-center space-x-2">
                                        <CardTitle>Recent Transactions</CardTitle>

                                        </div>
                                    </div> 
                      
                      <CardDescription>
                          Your transactions history
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentTransactions />
                    </CardContent>
                  </Card>
            </div>
            </div>
        </ScrollArea>
    )
}