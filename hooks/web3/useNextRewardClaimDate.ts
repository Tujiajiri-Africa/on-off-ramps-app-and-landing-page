
import React, {useState, useEffect, useCallback} from 'react'
import { useAccount } from 'wagmi'
import {useSession} from 'next-auth/react'
import {fetchUserCryptoRewardNextClaimDate} from '@/actions/payments'

export const useUserRewardClaimDate = () =>{
    const {data: userSessionData} = useSession()
    const {address, isConnected} = useAccount()
    const [ nextRewardClaimDate, setNextRewardClaimDate ] = useState<string|undefined>("");

    const fetchNextClaimDate = useCallback(async() => {
        if(!isConnected || !address) return;
        const result = await fetchUserCryptoRewardNextClaimDate(userSessionData?.user.accessToken)
        const date = result

        setNextRewardClaimDate(date)
    },[isConnected, address, userSessionData?.user.accessToken, setNextRewardClaimDate])


    useEffect(() => {
        fetchNextClaimDate()
    }, [fetchNextClaimDate]);

    return nextRewardClaimDate
}