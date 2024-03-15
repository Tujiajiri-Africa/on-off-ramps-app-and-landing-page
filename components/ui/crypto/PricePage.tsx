'use client'

import React, { useEffect, useState } from "react";
import {
    useQuery
  } from 'react-query'
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import BTC_LOGO from '@/app/assets/logo/bitcoin-btc-logo.svg'
import Image from "next/image";
import axios from "axios";

const cmcApiKey = process.env.COINAMERKETCAP_API_KEY
const endpoint = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=bitcoin`
const payload = {
    method: 'GET',
    mode:  'cors',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': ['https://pro-api.coinmarketcap.com/v2/', 'http://localhost:3000/'],
        //'Accept' : 'application/json',
        //'Content-Type': 'application/json',
        //'Accept-Encoding': 'deflate, gzip',
        'X-CMC_PRO_API_KEY': `${cmcApiKey}`,
        //'mode': 'no-cors',
        //'Access-Control-Allow-Origin': '*'
    },
    //mode: 'no-cors',  
}

const getAssetPriceData = async()=>{
    let _price:string = ""
    let _24hr_change:string = ""
    let _1hr_change:string = ""
    // fetch(endpoint, {
    //     mode: 'cors',
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'X-CMC_PRO_API_KEY': `${cmcApiKey}`,
    //         'Access-Control-Allow-Origin': '*', 
    //     },
    // }).then(async(response) => {
    //     if(response.status == 200){
    //         const data = await response.json()
    //         console.log(data)
    //         _price = parseFloat(data.data['1']['quote']['USD']['price']).toFixed(3).toString()
    //         _1hr_change = parseFloat(data.data['1']['quote']['USD']['percent_change_1h']).toFixed(3).toString()
    //         _24hr_change = parseFloat(data.data['1']['quote']['USD']['percent_change_24h']).toFixed(3).toString()
    //         console.log(data.data['1']['quote']['USD']['price'])
    //     }
    // }).catch((error) => {
    //     console.log(error)
    //     throw error
    // })

    // setPrice(_price)
    // set1hrChange(_1hr_change)
    // set24HrChange(_24hr_change)

    await axios.get(endpoint, {
        headers: {
            //'cors': true,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CMC_PRO_API_KEY': `${cmcApiKey}`,
            'Access-Control-Allow-Origin': '*',
        }
    }).then(async(response) =>{
        if(response.status == 200){
            const data = await response.data
            console.log(data)
            _price = parseFloat(data.data['1']['quote']['USD']['price']).toFixed(3).toString()
            _1hr_change = parseFloat(data.data['1']['quote']['USD']['percent_change_1h']).toFixed(3).toString()
            _24hr_change = parseFloat(data.data['1']['quote']['USD']['percent_change_24h']).toFixed(3).toString()
            console.log(data.data['1']['quote']['USD']['price'])
        }
    }).catch((error) => {
        console.log(error)
        //throw error
        return null
    })
    return {
        _price,
        _24hr_change,
        _1hr_change
    }
}

export default function PricePage(){
    const [price, setPrice] = useState<string>()
    const [_1hrChange, set1hrChange] = useState<string>()
    const [_24hrChange, set24HrChange] = useState<string>()

    const {isLoading, error, data} = useQuery({
        queryKey: 'priceInfo',
        queryFn: getAssetPriceData
    })

    //if (isLoading) return 'Loading...'

    //if (error) return 'An error has occurred: ' + error?.message

    return (
        <>

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
                    {data?._price}

                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-6">
                        { 
                        <>
                        <span className="text-green-600">
                            { data?._24hr_change.toString() } %
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
        </>
        
    )
}