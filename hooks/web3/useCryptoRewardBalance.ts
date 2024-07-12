
import React, {useState, useEffect, useCallback} from 'react'
import { useAccount } from 'wagmi'
import {useSession} from 'next-auth/react'
import {fetchUserCryptoRewardBalance} from '@/actions/payments'

export const useUserCryptoRewardBalance = () =>{
    const {data: userSessionData} = useSession()
    const {address, isConnected} = useAccount()
    const [ rewardBalance, setCryptoRewardBalance ] = useState<number|undefined>(0);

    const fetchBalance = useCallback(async() => {
        if(!isConnected || !address) return;
        const result = await fetchUserCryptoRewardBalance(userSessionData?.user.accessToken)
        const balance = result

        setCryptoRewardBalance(balance)
    },[isConnected, address, userSessionData?.user.accessToken, setCryptoRewardBalance])


    useEffect(() => {
        fetchBalance()
    }, [fetchBalance]);

    return rewardBalance
}