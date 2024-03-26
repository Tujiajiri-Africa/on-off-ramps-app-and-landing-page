import { NavItem, SidebarNavItem } from "@/types";
import {BigNumber} from 'bignumber.js'
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react"

//ASSET LOGOS
import BTC_LOGO from '@/app/assets/logo/bitcoin-btc-logo.svg'
import ETH_LOGO from '@/app/assets/logo/ethereum-eth-logo.svg'
import SOL_lOGO from '@/app/assets/logo/solana-sol-logo.svg'
import MATIC_LOGO from '@/app/assets/logo/polygon-matic-logo.svg'
import USDT_LOGO from '@/app/assets/logo/crypto/usdt_transparent.png'
import USDC_LOGO from '@/app/assets/logo/crypto/usd-coin-usdc-logo.svg'
import cUSD_LOGO from '@/app/assets/logo/crypto/cUSD.png'
import PAYPAL_USD_LOGO from '@/app/assets/logo/crypto/paypal-usd-logo-transparent.png'
import ADA_LOGO from '@/app/assets/logo/crypto/cardano-ada-logo.svg'
import TETHER_GOLD_LOGO from '@/app/assets/logo/crypto/tether-gold-xaut-logo.svg'

//FLAGS
import KE_FLAG from '@/app/assets/icons/countries/flags/ke.svg'
import UG_FLAG from '@/app/assets/icons/countries/flags/ug.svg'
import SOUTH_AFRICAN_LOGO from '@/app/assets/icons/countries/flags/za.svg'
import TZ_FLAG from '@/app/assets/icons/countries/flags/tz.svg'
import ZAMBIA_FLAG from '@/app/assets/icons/countries/flags/zm.svg'
import RWANDA_FLAG from '@/app/assets/icons/countries/flags/rw.svg'
import BOTSWANA_FLAG from '@/app/assets/icons/countries/flags/bw.svg'
import MALAWI_FLAG from '@/app/assets/icons/countries/flags/mw.svg'
import CAMEROON_FLAG from '@/app/assets/icons/countries/flags/cm.svg'
import GHANA_FLAG from '@/app/assets/icons/countries/flags/gh.svg'
import NIGERIAN_FLAG from '@/app/assets/icons/countries/flags/ng.svg'


import Image, { ImageProps } from 'next/image'

export const PROD_BASE_URI = process.env.PROD_BASE_URI
export const DEV_BASE_URI = process.env.DEV_BASE_URI
export const ENVIRONMENT = process.env.ENVIRONMENT


export const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
      label: "Dashboard",
    },
    {
      title: "Verification",
      href: "/dashboard/verification",
      icon: "check_circle_icon",
      //icon: 'badge_check'
      label: "Verification",
    },
    {
      title: "Buy/Sell Crypto",
      href: "/dashboard/buy-sell-crypto",
      icon: "dolarSign",
      label: "Buy/Sell",
    },
    {
      title: "Invoice",
      href: "/dashboard/invoices",
      icon: "list",
      label: "invoice",
    },
    // {
    //   title: "Withdraw",
    //   href: "/dashboard/withdrawals",
    //   icon: "list",
    //   label: "kanban",
    // },
    // {
    //     title: "Subscriptions",
    //     href: "/dashboard/subscriptions",
    //     icon: "list",
    //     label: "kanban",
    // },
    {
        title: "Deposit",
        href: "/dashboard/deposit",
        icon: "circle_arrow_up",
        label: "deposit",
    },
    {
      title: "Withdraw",
      href: "/dashboard/withdraw",
      icon: "circle_arrow_down",
      label: "withdraw",
  },
  {
    title: 'My Wallet',
    href: '/dashboard/wallet',
    icon: 'wallet',
    label: 'wallet'
  },
  {
    title: "Profile",
    href: "/dashboard/user/profile",
    icon: "profile",
    label: "profile",
  },

  ];

export type TimeSeriesApiResponse  = {
    time_period_start: string;//// string; "2024-03-09T08:00:00.0000000Z",
    time_period_end: string;// "0001-01-01T00:00:00.0000000Z",
    time_open:  string; //"2024-03-09T08:00:00.0000000Z",
    time_close: string; // "2024-03-09T08:59:00.0000000Z",
    rate_open: BigNumber;//// 3926.207760270926,
    rate_high: BigNumber; //3939.7079211459427,
    rate_low: BigNumber; //3824.239060355248,
    rate_close: BigNumber; //3925.2395386860276
}

export type CountryProps = {
  name: string;
  code: string;
  active: boolean;
  currency: string;
  flag : ImageProps;
  href?: string;
}

export const COIN_API_PERIOD_DATA =
  {
    hour : '1HRS',
    seconds: '5SEC',
    _1_second:'2SEC',
    day : ''

  }

export const countries:CountryProps[] = [
  {
    name: 'Kenya',
    code: "+254",
    active: true,
    currency: "KES",
    href: "https://www.freepik.com/icon/flag_14009694#fromView=search&page=1&position=31&uuid=2ce58cdf-77c1-4a08-8c28-9ba1caf9799c",
    flag: KE_FLAG
  },
  {
    name: "Nigeria",
    code: "+234",
    active: true,
    currency: "NGN",
    flag: NIGERIAN_FLAG
  },
  {
    name: 'Uganda',
    code: "+256",
    active: true,
    currency: 'UGX',
    flag: UG_FLAG
  },
  {
    name: 'Tanzania',
    code: '+255',
    active: true,
    currency: 'TZS',
    flag: TZ_FLAG
  },
  {
    name: 'Ghana',
    code: '+233',
    active: true,
    currency: 'GHS',
    flag: GHANA_FLAG
  },
  {
    name: 'Cameroon',
    code: '+237',
    active: true,
    currency: 'XAF',
    flag: CAMEROON_FLAG
  },
  {
    name: 'Zambia',
    code: '+260',
    active: true,
    currency: 'ZMW',
    flag: ZAMBIA_FLAG
  },
  {
    name: 'South Africa',
    code: '+27',
    active: true,
    currency: 'ZAR',
    flag: SOUTH_AFRICAN_LOGO
  },
  {
    name: 'Rwanda',
    code: '+250',
    active: true,
    currency: 'RWF',
    flag: RWANDA_FLAG
  },
  {
    name: 'Botswana',
    code: '+267',
    active: true,
    currency: 'BWP',
    flag: BOTSWANA_FLAG
  },
  {
    name: 'Malawi',
    code: '+265',
    active: true,
    currency: 'MWK',
    flag: MALAWI_FLAG
  }
]

export type Asset = {
  value: string
  label: string
  icon: ImageProps,
  active: boolean
}
 
export const supportedAssets: Asset[] = [
  {
    value: "bitcoin",
    label: "BTC",
    icon: BTC_LOGO,
    active: true,
  },
  {
    value: "eth",
    label: "ETH",
    icon: ETH_LOGO,
    active: true,
  },
  {
    value: "usdt",
    label: "USDT",
    icon: USDT_LOGO,
    active: true,
  },
  {
    value: "solana",
    label: "SOL",
    icon: SOL_lOGO,
    active: true,
  },
  {
    value: "matic",
    label: "MATIC",
    icon: MATIC_LOGO,
    active: true,
  },
  {
      value: 'usdc',
      label: 'USDC',
      icon: USDC_LOGO,
      active: true,
  },
  {
      value: 'pyusd',
      label: 'PYUSD',
      icon: PAYPAL_USD_LOGO,
      active: true,
  },
  {
      value: 'cUSD',
      label: 'cUSD',
      icon: cUSD_LOGO,
      active: true,
  },
  {
    value: 'cardano',
    label: 'ADA',
    icon: ADA_LOGO,
    active: true
  },{
    value: 'tether_gold',
    label: 'XAUT',
    icon: TETHER_GOLD_LOGO,
    active: true
  }
] 

export type SupportedPaymentMethods = {
  value: string;
  label: string;
  active: boolean;
}

export const supportedPaymentMethods:SupportedPaymentMethods[] = [
  {
    value: 'mobile_money',
    label: 'Mobile Money',
    active: true,
  },
  {
    value: 'bank',
    label: 'Bank Transfer',
    active: true
  }
]

export type WaletChartData = {
  asset: string;
  label: string;
  total?: number;
  incoming: number;
  outgoing: number;
}

export const sampleWalletData:WaletChartData[] = [
  {
    asset: 'BTC',
    label: 'BTC',
    total: 2000,
    incoming: 1700,
    outgoing:300
  },
  {
    asset: 'USDT',
    label: 'USDT',
    total: 3990,
    incoming: 2000,
    outgoing: 1999
  },
  {
    asset: 'cUSD',
    label: 'cUSD',
    total: 1600,
    incoming: 327,
    outgoing:3456
  },
  {
    asset: 'USDC',
    label: 'USDC',
    total: 300,
    incoming: 6364,
    outgoing: 6383
  }
]

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const samplePayments: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
]
 
