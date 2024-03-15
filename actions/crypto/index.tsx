import { TimeSeriesApiResponse, COIN_API_PERIOD_DATA} from '@/helpers/data'
import { BigNumber } from '@ethersproject/bignumber'
import axios from 'axios'

const apiKey = process.env.COINAPI_API_KEY
const baseUrl = process.env.COINAPI_BASE_URI
const cmcApiKey = process.env.COINAMERKETCAP_API_KEY

const payload = {
    method: 'GET',
    headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'deflate, gzip',
        'X-CoinAPI-Key': `${apiKey}`
    },
    next:{
        revalidate: 3600
    }
}

export const getCurrentAssetPrice  = async() => {
    const endpoint = 'https://rest.coinapi.io/v1/quotes/:symbol_id/current'
    let price 
    await fetch(endpoint, payload)
    .then(async(response) => {
        if(response.status != 200) return null 
        const data:TimeSeriesApiResponse[] = await response.json()
        price = data[0]['rate_close'].toFixed(2).toString()
        //console.log(coinData)
    }).catch((error) => {
        console.log(error)
    })

    return price
}

export const getAssetTimeSeriesData = async(quoteAsset:string, baseAsset:string) =>{
    let coinData: string = "" 
    const endpoint = `${baseUrl}/exchangerate/${quoteAsset}/${baseAsset}/history?period_id=${COIN_API_PERIOD_DATA._1_second}`



    await fetch(endpoint, payload)
    .then(async(response) => {
        if(response.status != 200) return null 
        const data:TimeSeriesApiResponse[] = await response.json()
        coinData = data[0]['rate_close'].toFixed(2).toString()
        //console.log(coinData)
    }).catch((error) => {
        console.log(error)
    })

    return coinData
}   

export const getBTCPrice = async() =>{
    let price:string = ""
    let _24hr_change:string = ""
    let _1hr_change:string = ""

    const payload = {
        method: 'GET',
        headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'deflate, gzip',
            'X-CMC_PRO_API_KEY': `${cmcApiKey}`,
        },
        next:{
            revalidate: 3600
        }  
    }

    const endpoint = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=bitcoin`
    await fetch(endpoint, payload).then(async(response) => {
        if(response.status == 200){
            const data = await response.json()
            price = parseFloat(data.data['1']['quote']['USD']['price']).toFixed(3).toString()
            _1hr_change = parseFloat(data.data['1']['quote']['USD']['percent_change_1h']).toFixed(3).toString()
            _24hr_change = parseFloat(data.data['1']['quote']['USD']['percent_change_24h']).toFixed(3).toString()
            //console.log(data.data['1']['quote']['USD']['price'])
        }
    }).catch((error) => {
        console.log(error)
        throw error
    })

    //console.log(price, _24hr_change, _1hr_change)
    return {
        price,
        _24hr_change,
        _1hr_change
    }
}

export const getBtcLatestAssetPrice = async() => {
    async function getPrice(){
        let price:string = ""
        let _24hr_change:string = ""
        let _1hr_change:string = ""
    
        const payload = {
            method: 'GET',
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Accept-Encoding': 'deflate, gzip',
                'X-CMC_PRO_API_KEY': `${cmcApiKey}`,
            },
            next:{
                revalidate: 3600
            } 
        }
    
        const endpoint = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=bitcoin`
        await fetch(endpoint, payload).then(async(response) => {
            if(response.status == 200){
                const data = await response.json()
                price = parseFloat(data.data['1']['quote']['USD']['price']).toFixed(3).toString()
                _1hr_change = parseFloat(data.data['1']['quote']['USD']['percent_change_1h']).toFixed(3).toString()
                _24hr_change = parseFloat(data.data['1']['quote']['USD']['percent_change_24h']).toFixed(3).toString()
                //console.log(data.data['1']['quote']['USD']['price'])
            }
        }).catch((error) => {
            console.log(error)
            throw error
        })
    
        //console.log(price, _24hr_change, _1hr_change)
        return {
            price,
            _24hr_change,
            _1hr_change
        }
    }

    // const data = setInterval(async() => {
    //     await getPrice()
    // }, 2000)
    // //return setInterval(getPrice, 2000)
    // ///return await getPrice()
    return await getPrice()
}

export const getEthLatestAssetPrice = async() => {
    let price:string = ""
    let _24hr_change:string = ""
    let _1hr_change:string = ""

    const payload = {
        method: 'GET',
        headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'deflate, gzip',
            'X-CMC_PRO_API_KEY': `${cmcApiKey}`,
        },  
        next:{
            revalidate: 3600
        } 
    }

    const endpoint = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=ethereum`
    await fetch(endpoint, payload).then(async(response) => {
        if(response.status == 200){
            const data = await response.json()
            //console.log(data)
            price = parseFloat(data.data['1027']['quote']['USD']['price']).toFixed(3).toString()
            _1hr_change = parseFloat(data.data['1027']['quote']['USD']['percent_change_1h']).toFixed(3).toString()
            _24hr_change = parseFloat(data.data['1027']['quote']['USD']['percent_change_24h']).toFixed(3).toString()
            //console.log(data.data['1']['quote']['USD']['price'])
        }
    }).catch((error) => {
        console.log(error)
        throw error
    })

    //console.log(price, _24hr_change, _1hr_change)
    return {
        price,
        _24hr_change,
        _1hr_change
    }
}

export const getSolLatestAssetPrice = async() => {
    let price:string = ""
    let _24hr_change:string = ""
    let _1hr_change:string = ""

    const payload = {
        method: 'GET',
        headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'deflate, gzip',
            'X-CMC_PRO_API_KEY': `${cmcApiKey}`,
        },
        next:{
            revalidate: 3600
        }   
    }

    const endpoint = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=solana`
    await fetch(endpoint, payload).then(async(response) => {
        if(response.status == 200){
            const data = await response.json()
            price = parseFloat(data.data['5426']['quote']['USD']['price']).toFixed(3).toString()
            _1hr_change = parseFloat(data.data['5426']['quote']['USD']['percent_change_1h']).toFixed(3).toString()
            _24hr_change = parseFloat(data.data['5426']['quote']['USD']['percent_change_24h']).toFixed(3).toString()
            //console.log(data.data['1']['quote']['USD']['price'])
        }
    }).catch((error) => {
        console.log(error)
        throw error
    })

    //console.log(price, _24hr_change, _1hr_change)
    return {
        price,
        _24hr_change,
        _1hr_change
    }
}

export const getMaticLatestAssetPrice = async() => {
    let price:string = ""
    let _24hr_change:string = ""
    let _1hr_change:string = ""

    const payload = {
        method: 'GET',
        headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'deflate, gzip',
            'X-CMC_PRO_API_KEY': `${cmcApiKey}`,
        },
        next:{
            revalidate: 3600
        }   
    }

    const endpoint = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=polygon`

    // await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=200&sort=cmc_rank&symbol=matic', payload).then(async(response) => {
    //     if(response.status == 200){
    //         const data = await response.json()
    //         console.log(data)
    //     }
    // }).catch((error) => {
    //     console.log(error)
    //     throw error
    // })
    await fetch(endpoint, payload).then(async(response) => {
        if(response.status == 200){
            const data = await response.json()
            price = parseFloat(data.data['3890']['quote']['USD']['price']).toFixed(3).toString()
            _1hr_change = parseFloat(data.data['3890']['quote']['USD']['percent_change_1h']).toFixed(3).toString()
            _24hr_change = parseFloat(data.data['3890']['quote']['USD']['percent_change_24h']).toFixed(3).toString()
            //console.log(data.data['1']['quote']['USD']['price'])
        }
    }).catch((error) => {
        console.log(error)
        throw error
    })

    //console.log(price, _24hr_change, _1hr_change)
    return {
        price,
        _24hr_change,
        _1hr_change
    }
}

export const getAssetQuote = async(slug:string) =>{
    let response = null

    const endpoint = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=${slug}`
    const payload = {
        method: 'GET',
        headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'deflate, gzip',
            'X-CMC_PRO_API_KEY': `${cmcApiKey}`,
        },
        next:{
            revalidate: 3600
        }   
    }



new Promise(async (resolve, reject) => {
  try {
       response = await axios.get(endpoint, {
        headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'utf-8',
            'X-CMC_PRO_API_KEY': `${cmcApiKey}`,
        } 
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const data = await response.data
    resolve(data)
  }
});

return response
}