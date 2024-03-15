import React from "react";
import CoinList from '@/components/ui/crypto/CoinList'

const cmcApiKey = process.env.COINAMERKETCAP_API_KEY

export default function CoinListMain({priceData}){
    return (
    <>
        <CoinList priceData={priceData}/>
    </>
    )
}

export const getServerSideProps = async() => {
    let priceData = null
    const endpoint = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=bitcoin`
    const payload = {
        method: 'GET',
        headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'utf-8',
            'X-CMC_PRO_API_KEY': `${cmcApiKey}`,
        }  
    }

    const response = await fetch(endpoint, payload)

    if (response.status == 200){
        const data  = await response.json()
        const price = parseFloat(data.data['1']['quote']['USD']['price']).toFixed(3).toString()
        const _24hr_change = parseFloat(data.data['1']['quote']['USD']['percent_change_24h']).toFixed(3).toString()

        priceData = {
            price,
            _24hr_change
        }
    }

    return {
        props: priceData
    }
}