
import React, {useState, useEffect, useCallback} from 'react'
import { useAccount } from 'wagmi'
import {useSession} from 'next-auth/react'
import {fetchFiatBalance} from '@/actions/payments'

export const useUserFiatBalanceBalance = () =>{
    const {data: userSessionData} = useSession()
    const {address, isConnected} = useAccount()
    const [ userFiatBalance, setUserFiatBalance ] = useState<number|undefined>(0);

    const fetchBalance = useCallback(async() => {
        if(!isConnected || !address) return;
        const result = await fetchFiatBalance(userSessionData?.user.accessToken)
        const balance = result

        setUserFiatBalance(balance)
    },[isConnected, address, userSessionData?.user.accessToken, setUserFiatBalance])


    useEffect(() => {
        fetchBalance()
    }, [fetchBalance]);

    return userFiatBalance
}