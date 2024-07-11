import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';

import {
    injectedWallet,
    rainbowWallet,
    walletConnectWallet,
    metaMaskWallet,
    trustWallet,
    argentWallet,
    braveWallet,
    ledgerWallet,
    phantomWallet,
    safeWallet,
    coinbaseWallet,
    okxWallet ,
    rabbyWallet,
    //enkryptWallet ,
   // uniswapWallet 
  } from '@rainbow-me/rainbowkit/wallets';

import { configureChains, createConfig, WagmiConfig, Chain, useSwitchNetwork } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public';
import { ETH_CHAINS } from '../config';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'

const projectId = "404fbd377b1ef1584cabb059e1c9adf3" //process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID//"404fbd377b1ef1584cabb059e1c9adf3"//"404fbd377b1ef1584cabb059e1c9adf3";//process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID == 9a05b8761bf046b1b808f748d6567107?? ''
const infuraKey = "9a05b8761bf046b1b808f748d6567107"//process.env.NEXT_PUBLIC_INFURA_PROJECT_ID//"9a05b8761bf046b1b808f748d6567107"

const { chains, publicClient } = configureChains(
  ETH_CHAINS, 
  [
    publicProvider(), 
    w3mProvider({ projectId: projectId }),
    infuraProvider({apiKey: infuraKey }),
   // alchemyProvider({apiKey: projectId })
  ])

export const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({projectId,chains}),
      okxWallet({projectId, chains }),
      rabbyWallet({chains}),
      walletConnectWallet({ projectId, chains }),
      
      //rainbowWallet({ projectId, chains}),
    ]
  },
  {
    groupName: 'Alternatives',
    wallets: [
      coinbaseWallet({
        appName: 'Ajira Pay Finance',
        chains: chains
      }),
        trustWallet({chains, projectId}),
        //enkryptWallet({chains}),
        //argentWallet({chains, projectId}),
        //braveWallet({ chains }),
        //ledgerWallet({chains, projectId}),
        //phantomWallet({ chains }),
        // safeWallet({ 
        //     chains: chains,
        //     allowedDomains: [],
        //     debug: true
        //  })
    ]
  },
]);

// const { connectors1 } = getDefaultWallets({
//     appName: 'My RainbowKit App',
//     projectId: projectId,
//     chains
//   });

// const {isError, isLoading, isIdle, switchNetwork} = useSwitchNetwork({
//   throwForSwitchChainNotSupported: true
// })

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    
  })