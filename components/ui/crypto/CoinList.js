//'use client'

import React from 'react'

import Coins from './Coins'

const CoinList = ({ priceData }) => {
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
export default CoinList