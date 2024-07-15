import React, { useState, useEffect } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import {CELO_MAINNET_CHAIN_ID, cUSD_MAINNET_CONTRACT_ADDRESS} from '@/helpers/data'
import CUSD_TOKEN_CONTRACT_ABI from '@/lib/artifacts/cUSD_contract_abi'

export const useTokenContract = () => {
    const {isConnected, address} = useAccount()
    const { chain } = useNetwork()

    const [tokenAddress, setTokenAddress] = useState<string>("")
    const [activeTokenContractAbi, setActiveTokenContractAbi] = useState<any>();
    
    useEffect(() => {
        if(!address || !isConnected) return;

        if(!chain?.id){return;}
        
        switch(chain.id){
            case CELO_MAINNET_CHAIN_ID:
              setTokenAddress(cUSD_MAINNET_CONTRACT_ADDRESS)
              setActiveTokenContractAbi(CUSD_TOKEN_CONTRACT_ABI)    
              break;
            
            default:
                setTokenAddress(cUSD_MAINNET_CONTRACT_ADDRESS)
                setActiveTokenContractAbi(CUSD_TOKEN_CONTRACT_ABI)
        }

    },[isConnected, address, chain])

    return [tokenAddress, activeTokenContractAbi];
}