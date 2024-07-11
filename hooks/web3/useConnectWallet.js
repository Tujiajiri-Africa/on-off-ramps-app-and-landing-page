'use client'

import { useState } from "react"

export const useWeb3Connection = async() => {
    const [miniPayAddress, setMiniPayAddress] = useState();
      
    if(typeof window !== "undefined") {

      if(window.ethereum){
        // User has a injected wallet
      
        if (window.ethereum.isMinipay) {
          // User is using Minipay
      
          // Requesting account addresses
          let accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
            params: [],
          });
      
          // Injected wallets inject all available addresses,
          // to comply with API Minipay injects one address but in the form of array
          console.log(accounts[0]);
          setMiniPayAddress(accounts[0]);
        }
        // User is not using MiniPay
      }
      }

      return miniPayAddress;
}