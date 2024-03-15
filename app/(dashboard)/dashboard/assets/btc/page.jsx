import React from "react";
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BTC_LOGO from '@/app/assets/logo/bitcoin-btc-logo.svg'
import {cookies} from 'next/headers'

const cmcApiKey = process.env.COINAMERKETCAP_API_KEY

async function getData(){
    let priceData 
    const endpoint = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=bitcoin`
    const payload = {
        method: 'GET',
        headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'utf-8',
            'X-CMC_PRO_API_KEY': `${cmcApiKey}`,
            //'cache': 'no-store'//'force-cache'
        },
        next: {
            revalidate: 3600,
            //cache: 'no-store'//force-cache'
        },
        //cache: 'force-cache'
    }

    const response = await fetch(endpoint, payload) //cache:'force-cache' cache: 'no-store'

    if (response.status == 200){
        const data  = await response.json()
        
        const price = parseFloat(data.data['1']['quote']['USD']['price']).toFixed(3).toString()
        const _24hr_change = parseFloat(data.data['1']['quote']['USD']['percent_change_24h']).toFixed(3).toString()
        
        priceData = {
            price,
            _24hr_change
        }
    }
    console.log(priceData)
    return {priceData}
}

export default async function CoinListMain(){
    //cookies()
    const data = (await getData()).priceData
    
    return (
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
        {data?.price}

        </div>
        
        <p className="text-xs text-muted-foreground mb-6">
            { 
                data?._24hr_change < "0" && 
            <>
            <span className="text-red-600">
                { data?._24hr_change } %
                </span> 
                24hr Change 
            </>
            }
            { 
            data?._24hr_change > "0" && 
            <>
            <span className="text-green-600">
                { data?._24hr_change } %
                </span> 
                24hr Change 
            </>
            }
        </p>
        <Button
            //className="w-full"
        >
            Buy/Sell
        </Button>
        </CardContent>
    </Card>
    )
}

//export default CoinListMain