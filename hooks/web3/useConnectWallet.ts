declare var window: any

import React, {useState, useEffect} from 'react'
import {useConnect, useAccount} from 'wagmi'
import { InjectedConnector } from "wagmi/connectors/injected";

export const useMiniPay = () =>{
    const {address} = useAccount()

    const { connect } = useConnect({
      connector: new InjectedConnector(),
    });
  
    // const checkMiniPayExists = () => {
    //   if (typeof window.ethereum !== 'undefined') {
            // if(window.ethereum.isMinipay){

            // }
    //   }
    // }
  
    useEffect(() => {
      connect();
    }, [connect]);

    return address
}