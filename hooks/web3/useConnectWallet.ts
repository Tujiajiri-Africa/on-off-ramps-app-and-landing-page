declare var window: any

import React, {useState, useEffect} from 'react'
import {useConnect, useAccount} from 'wagmi'
import { InjectedConnector } from "wagmi/connectors/injected";

export const useMiniPay = () =>{
    const {address, isConnected} = useAccount()

    const { connect } = useConnect({
      connector: new InjectedConnector(),
    });
  
    // const checkMiniPayExists = () => {
    //   if (typeof window.ethereum !== 'undefined') {
            // if(window.ethereum.isMinipay){

            // }
    //   }
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkMiniPayAndconnectWallet = () => {
      if(typeof window.ethereum !== 'undefined'){
        if(window.ethereum && window.ethereum.isMiniPay){
          if(!isConnected) {
            connect()
          }
        }
      }
    }
  
    useEffect(() => {
      // connect();
      if(!isConnected){connect()}
      //checkMiniPayAndconnectWallet()
    }, [ connect, isConnected]); //checkMiniPayAndconnectWallet

    return address
}