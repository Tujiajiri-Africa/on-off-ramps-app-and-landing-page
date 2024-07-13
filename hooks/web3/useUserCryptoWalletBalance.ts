
import React, {useState, useEffect, useCallback} from 'react'
import { useAccount } from 'wagmi'
import {useSession} from 'next-auth/react'
import {fetchUserCryptoWalletBalance} from '@/actions/payments'

export const useUserCryptoWalletBalance = () =>{
    const {data: userSessionData} = useSession()
    const {address, isConnected} = useAccount()
    const [ userCryptoBalance, setUserCryptoBalance ] = useState<number|undefined>(0);

    const fetchBalance = useCallback(async() => {
        if(!isConnected || !address) return;
        const result = await fetchUserCryptoWalletBalance(userSessionData?.user.accessToken)
        const balance = result

        setUserCryptoBalance(balance)
    },[isConnected, address, userSessionData?.user.accessToken, setUserCryptoBalance])


    useEffect(() => {
        fetchBalance()
    }, [fetchBalance]);

    return userCryptoBalance
}