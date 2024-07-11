import { ThemingProps } from '@chakra-ui/react'
import { 
  mainnet, 
  polygon, 
  optimism, 
  arbitrum, 
  bsc, 
  celo, 
  arbitrumGoerli, 
  bscTestnet, 
  polygonMumbai, 
  avalanche, 
  lineaTestnet
} from 'wagmi/chains'

import { Chain } from 'wagmi'
import kava_logo  from '../assets/images/kava_main_logo.png'
import linea_icon from '../assets/images/logo/Linea-Icon.svg'

const KAVA_MAINNET_NODIES_RPC = process.env.NEXT_PUBLIC_KAVA_EVM_MAINNET_NODIES_RPC
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT

//"wagmi": "^2.9.11",

export const kava: Chain = {
  //iconUrl : kava_logo.src,
  testnet: false,
  id: 2222,
  name: 'Kava EVM',
  //network: 'kava',
  nativeCurrency: {
    decimals: 18,
    name: 'KAVA',
    symbol: 'KAVA',
  },
  rpcUrls: {
    public: { 
      http: ['https://kava-evm.publicnode.com']//['https://evm.kava.io']  //[KAVA_MAINNET_NODIES_RPC]//['https://evm.kava.io'] 
    },
    default: { 
      http: ['https://kava-evm.publicnode.com']// ['https://evm.kava.io']  //[KAVA_MAINNET_NODIES_RPC]//['https://evm.kava.io'] 
    },
  },

  blockExplorers: {
    etherscan: { name: 'Kava Explorer', url: 'https://explorer.kava.io' },
    default: { name: 'Kava Explorer', url: 'https://explorer.kava.io' },
  },
  contracts: {
    multicall3: {
      address: '0x7ED7bBd8C454a1B0D9EdD939c45a81A03c20131C',
      blockCreated: 390,
    },
  },
} //as const satisfies Chain

export const linea: Chain = {
  //iconUrls : [linea_icon.src],
  testnet: false,
  id: 59144,
  name: 'Linea Mainnet',
  //network: 'linea',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc.linea.build'] },
    default: { http: ['https://rpc.linea.build'] },
  },

  blockExplorers: {
    etherscan: { name: 'Lineascan', url: 'https://lineascan.build/' },
    default: { name: 'Lineascan', url: 'https://lineascan.build/' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 42,
    },
  },
} //as const satisfies Chain

export const kavaTestNet: Chain = {
  testnet: true,
  id: 2221,
  name: 'Kava EVM Testnet',
  //network: 'kava',
  nativeCurrency: {
    decimals: 18,
    name: 'KAVA',
    symbol: 'KAVA',
  },
  rpcUrls: {
    public: { http: ['https://evm.testnet.kava.io'] },
    default: { http: ['https://evm.testnet.kava.io'] },
  },

  blockExplorers: {
    etherscan: { name: 'Kava Explorer', url: 'https://explorer.testnet.kava.io' },
    default: { name: 'Kava Explorer', url:  'https://explorer.testnet.kava.io/api' },
  },
  //iconUrls : [kava_logo.src],

}

export const SITE_NAME = 'Ajira Pay Finance'
export const SITE_DESCRIPTION = 'A Multichain Decentralized Web3 Protocol for secure and seamless crypto payments, Pay and get paid in real-time with USDT, USDC, WBTC plus 150+ more assets'
export const SITE_URL = ENVIRONMENT == 'local' ? 'http://localhost:3000' : 'https://app.ajirapay.finance'

export const THEME_INITIAL_COLOR = 'system' //system, dark, light
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] =  "slate-900"
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
  //useSystemColorMode: true
}

export const SOCIAL_TWITTER = 'ajirapayDefi'
export const SOCIAL_GITHUB = 'Tujiajiri-Africa'

export const ETH_CHAINS = [linea, polygon, arbitrum, bsc, celo]//lineaTestnet,linea,kava, mainnet, arbitrum, optimism, polygon, bsc, kava, avalanche, kavaTestNet, bscTestnet]
export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
