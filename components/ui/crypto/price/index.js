// import React from "react";
// import CoinList from '@/components/ui/crypto/CoinList'
// import {getBtcLatestAssetPrice, getBTCPrice} from '@/actions/crypto/index'

// export default async function CoinListMain(){
//     const priceData = await getBtcLatestAssetPrice()
//     return (
//     <>
//         <CoinList priceData={priceData}/>
//     </>
//     )
// }

// //export default CoinListMain
import React from "react";
import CoinList from '@/components/ui/crypto/CoinList'

const cmcApiKey = process.env.COINAMERKETCAP_API_KEY

export const getServerSideProps = async() => {
    let priceData 
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
        props: {
            data:priceData
        }
    }
}

export default function CoinListMain({data}){
    console.log(data)

    return (
    <>
        <CoinList priceData={data}/>
    </>
    )
}

