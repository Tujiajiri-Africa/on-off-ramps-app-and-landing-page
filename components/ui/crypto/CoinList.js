//'use client'

import React from 'react'

import Coins from './Coins'

export default function CoinList({ priceData }){
    return (
        <>
       <Coins 
                //key={index}
                price={priceData?.price}
                priceChange={priceData?._24hr_change}
            />
              
        </>
    )
}

export async function getServerSideProps(){
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
        // next: {
        //     revalidate: 3600,
        //     //cache: 'no-store'//force-cache'
        // },
        //cache: 'force-cache'
    }

    const response = await fetch(endpoint, payload,{next:{revalidate:10}}) //cache:'force-cache' cache: 'no-store'

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
    return {
        props:{
            priceData: priceData
        },
        revalidate: 10
    }
}
