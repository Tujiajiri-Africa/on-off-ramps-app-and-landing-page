"use server"

import  * as z from 'zod'
import { DEV_BASE_URI, PROD_BASE_URI, ENVIRONMENT, TransactionHistoryProps } from '@/helpers/data'
import { DepositSchema, BuyAssetSchema, CryptoRewardClaimSchema, SendPaymentSchema, WithdrawSchema } from '@/schemas'
import { UserResponseDataProps } from '@/lib/utils'
import { getChainIdFromAssetAddress, cUSD_MAINNET_CONTRACT_ADDRESS, CELO_MAINNET_CHAIN_ID } from '@/helpers/data'

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
            balance = data['data']
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

export const fetchUserCryptoRewardBalance = async(bearerToken: string|undefined) =>{
    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/payments/rewards/user-crypto-reward-balance' : PROD_BASE_URI + '/payments/rewards/user-crypto-reward-balance'
    
    let balance = 0;
   
    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        }
    }

    const fetchUserCUSDRewardBalance = await fetch(endpoint, payload).then(async(response) => {
        if(response.status === 500){
            return balance
        }

        const data = await response.json()

        if(data['status'] == false){
            return balance
        }

        if(data['status'] == true){
            balance = data['data']
            return balance
        }
    }).catch((error) =>{
        console.log(error)
        return balance
    })

    try{
        return fetchUserCUSDRewardBalance
    }catch(error){
        console.log(error)
        return balance
    }
}

export const fetchUserCryptoRewardNextClaimDate = async(
    bearerToken: string|undefined
) =>{
    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/payments/rewards/next-claim-date' : PROD_BASE_URI + '/payments/rewards/next-claim-date'
    
    let claimDate = "";
   
    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        }
    }

    const fetchUserRewardNextClaimDate = await fetch(endpoint, payload).then(async(response) => {
        if(response.status === 500){
            return claimDate
        }

        const data = await response.json()

        if(data['status'] == false){
            return claimDate
        }

        if(data['status'] == true){
            claimDate = data['data']
            return claimDate
        }
    }).catch((error) =>{
        console.log(error)
        return claimDate
    })

    try{
        return fetchUserRewardNextClaimDate
    }catch(error){
        console.log(error)
        return claimDate
    }
}

// asset_address = request.args.get('asset_address')
// user_address = request.args.get('user_address')
// chain_id = request.args.get('chain')

export const fetchUserCryptoWalletBalance = async(
    userWalletAdddress: string|undefined,
) =>{
    const endpoint = `https://stream-api-service.ajirapay.finance/api/v1/wallet/asset_balance?asset_address=${cUSD_MAINNET_CONTRACT_ADDRESS}&user_address=${userWalletAdddress}&chain=${CELO_MAINNET_CHAIN_ID}`
    
    let balance = 0
   
    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }

    const fetchCryptoWalletBalance = await fetch(endpoint, payload).then(async(response) => {
        if(response.status === 500){
            return balance
        }

        const data = await response.json()

        if(data['status'] == false){
            return balance
        }

        if(data['status'] == true){
            balance = data['data']
            return balance
        }
    }).catch((error) =>{
        console.log(error)
        return balance
    })

    try{
        return fetchCryptoWalletBalance
    }catch(error){
        console.log(error)
        return balance
    }
}

export const buyCrypto = async(
    values: z.infer<typeof BuyAssetSchema>,
    bearerToken: string|undefined,
    userWalletAddress: string|undefined,
    assetAmount: string|undefined
) => {
    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/payments/onramp/buy-crypto' : PROD_BASE_URI + '/payments/onramp/buy-crypto'

    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

    const validatedFields = BuyAssetSchema.safeParse(values)
    
    if(!validatedFields.success){
        dataInfo = {
            error: 'Invalid Recipient parameters',
            success: '',
            data: ''
        }
        return  { data: dataInfo}
    }

    const chainId = getChainIdFromAssetAddress(validatedFields.data.asset_address)

    const onrampPayload = {
        asset_address: validatedFields.data.asset_address,
        amount: assetAmount,
        chain: chainId,
        recipient_address: userWalletAddress,
        fiat_amount_local: validatedFields.data.amount
    }

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        },
        body: JSON.stringify(onrampPayload)
    }

    const initiateCryptoPurchase = await fetch(endpoint, payload).then(async(response) => {
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
        return initiateCryptoPurchase
    }catch(error){
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    }
}

export const claimCryptoReward = async(
    values: z.infer<typeof CryptoRewardClaimSchema>,
    bearerToken: string|undefined,
    userWalletAddress: string|undefined
) => {
    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/payments/rewards/claim-crypto-reward' : PROD_BASE_URI + '/payments/rewards/claim-crypto-reward'

    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

    const validatedFields = CryptoRewardClaimSchema.safeParse(values)
    
    if(!validatedFields.success){
        dataInfo = {
            error: 'Invalid Recipient parameters',
            success: '',
            data: ''
        }
        return  { data: dataInfo}
    }

    const onrampPayload = {
        amount: validatedFields.data.amount,
        recipient_address: userWalletAddress,
    }

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        },
        body: JSON.stringify(onrampPayload)
    }

    const initiateRewardClaim = await fetch(endpoint, payload).then(async(response) => {
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
        return initiateRewardClaim
    }catch(error){
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    }
}

export const sendCrypto = async(
    values: z.infer<typeof SendPaymentSchema>,
    bearerToken: string|undefined,
    recipientPhone: string|undefined,
    amount: string|undefined
) =>{
    //const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/payments/deposits/stkpush' : PROD_BASE_URI + '/payments/deposits/stkpush'
    const endpoint = ''

    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

    const validatedFields = SendPaymentSchema.safeParse(values)
    
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

export const wthdrawFiatToMpesa = async(
    values: z.infer<typeof WithdrawSchema>,
    bearerToken: string|undefined,
    recipientPhoneNumber: string|undefined
) => {
    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/payments/withdrawals/process' : PROD_BASE_URI + '/payments/withdrawals/process'

    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

    const validatedFields = WithdrawSchema.safeParse(values)
    
    if(!validatedFields.success){
        dataInfo = {
            error: 'Invalid parameters',
            success: '',
            data: ''
        }
        return  { data: dataInfo}
    }

    const withdrawalPayload = {
        amount: validatedFields.data.amount,
        recipient_phone: recipientPhoneNumber
    }

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        },
        body: JSON.stringify(withdrawalPayload)
    }

    const processFiatWithdrawal = await fetch(endpoint, payload).then(async(response) => {
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
        return processFiatWithdrawal
    }catch(error){
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    }
}

export const sellCrypto = async() =>{

}

export const receiveCrypto = async() =>{

}

export const sendFiat = async() =>{

}

export const receiveFiat = async() =>{
    
}



