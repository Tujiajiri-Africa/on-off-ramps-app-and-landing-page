"use server"

import  * as z from 'zod'
import { DEV_BASE_URI, PROD_BASE_URI, ENVIRONMENT, TransactionHistoryProps } from '@/helpers/data'

export const depositFiat = async() => {

}

export const fetchTransactionHistory = async(bearerToken: string|undefined) =>{
    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/transactions/history' : PROD_BASE_URI + '/transactions/history'

    let transactions: TransactionHistoryProps[] = []
   
    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        }
    }

    const fetchUserTransactionHistory = await fetch(endpoint, payload).then(async(response) => {
        if(response.status === 500){
            transactions = []
            return transactions
        }

        const data = await response.json()

        if(data['status'] == false){
            transactions = []
            return transactions
        }

        if(data['status'] == true){
            transactions = data['data']
            return transactions
        }
    }).catch((error) =>{
        console.log(error)
        transactions = []
        return transactions
    })

    try{
        return fetchUserTransactionHistory
    }catch(error){
        console.log(error)
        transactions = []
        return transactions
    }
}

export const buyCrypto = async() =>{

}

export const sellCrypto = async() =>{

}

export const sendCrypto = async() =>{

}

export const receiveCrypto = async() =>{

}

export const sendFiat = async() =>{

}

export const receiveFiat = async() =>{
    
}



