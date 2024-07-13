
import React, {useState, useEffect, useCallback} from 'react'
import { useAccount } from 'wagmi'
import {useSession} from 'next-auth/react'
import {fetchUserCryptoWalletBalance} from '@/actions/payments'
import { cUSD_MAINNET_CONTRACT_ADDRESS, CELO_MAINNET_CHAIN_ID } from '@/helpers/data'

export const useUserCryptoWalletBalance = () =>{
    const {data: userSessionData} = useSession()
    const {address, isConnected} = useAccount()
    const [ userCryptoBalance, setUserCryptoBalance ] = useState<number|undefined>(0);

    const fetchBalance = useCallback(async() => {
        if(!isConnected || !address) return;
        const result = await fetchUserCryptoWalletBalance(address)
        const balance = result

        setUserCryptoBalance(balance)
    },[isConnected, address, setUserCryptoBalance])


    useEffect(() => {
        fetchBalance()
    }, [fetchBalance]);

    return userCryptoBalance
}