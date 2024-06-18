"use server"

import  * as z from 'zod'
import { DEV_BASE_URI, PROD_BASE_URI, ENVIRONMENT, TransactionHistoryProps } from '@/helpers/data'
import { DepositSchema } from '@/schemas'
import { UserResponseDataProps } from '@/lib/utils'

export const depositFiat = async(
    values: z.infer<typeof DepositSchema>,
    bearerToken: string|undefined
) => {
    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/payments/deposits/stkpush' : PROD_BASE_URI + '/payments/deposits/stkpush'

    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

    const validatedFields = DepositSchema.safeParse(values)
    
    if(!validatedFields.success){
        dataInfo = {
            error: 'Invalid Invoice parameters',
            success: '',
            data: ''
        }
        return  { data: dataInfo}
    }

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        },
        body: JSON.stringify(validatedFields.data)
    }

    const initiateFiatDeposit = await fetch(endpoint, payload).then(async(response) => {
        if(response.status === 500){
            dataInfo = {
                error: 'Something went wrong!',
                success: '',
                data: ''
            }

            return { data: dataInfo}
        }

        const data = await response.json()

        if(data['status'] == false){
            dataInfo = {
                error: data['message'],
                success: '',
                data: ''
            }

            return { data: dataInfo}
        }
        if(data['status'] == true){
            dataInfo = {
                error: "",
                success: data['message'],
                data: data['data']
            }

            return { data: dataInfo}
        }
    }).catch((error) =>{
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    })

    try{
        return initiateFiatDeposit
    }catch(error){
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    }
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

export const fetchFiatBalance = async(bearerToken: string|undefined) =>{
    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/payments/balances/user-mpesa-balance' : PROD_BASE_URI + '/payments/balances/user-mpesa-balance'
    
    let balance = 0;
   
    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        }
    }

    const fetchMpesaBalance = await fetch(endpoint, payload).then(async(response) => {
        if(response.status === 500){
            return balance
        }

        const data = await response.json()

        if(data['status'] == false){
            return balance
        }

        if(data['status'] == true){
            balance += data['data']
            return balance
        }
    }).catch((error) =>{
        console.log(error)
        return balance
    })

    try{
        return fetchMpesaBalance
    }catch(error){
        console.log(error)
        return balance
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



