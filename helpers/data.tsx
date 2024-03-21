import { NavItem, SidebarNavItem } from "@/types";
import {BigNumber} from 'bignumber.js'

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
      label: "Verification",
    },
    {
      title: "Buy/Sell",
      href: "/dashboard/buy-sell-crypto",
      icon: "dolarSign",
      label: "Buy/Sell",
    },
    // {
    //   title: "Deposit",
    //   href: "/dashboard/deposits",
    //   icon: "list",
    //   label: "employee",
    // },
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
        icon: "add",
        label: "deposit",
    },
    {
      title: "Withdraw",
      href: "/dashboard/withdraw",
      icon: "minus",
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
  flag? : JSX.Element;
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
    href: "https://www.freepik.com/icon/flag_14009694#fromView=search&page=1&position=31&uuid=2ce58cdf-77c1-4a08-8c28-9ba1caf9799c"
  },
  {
    name: "Nigeria",
    code: "+234",
    active: false,
    currency: "NGN"
  },
  {
    name: 'Uganda',
    code: "+256",
    active: false,
    currency: 'UGX',
    //flag: 
  },
  {
    name: 'Tanzania',
    code: '+255',
    active: false,
    currency: 'TZS'
  },
  {
    name: 'Ghana',
    code: '+233',
    active: false,
    currency: 'GHS'
  },
  {
    name: 'Cameroon',
    code: '+237',
    active: false,
    currency: 'XAF'
  },
  {
    name: 'Zambia',
    code: '+260',
    active: false,
    currency: 'ZMW'
  },
  {
    name: 'South Africa',
    code: '+27',
    active: false,
    currency: 'ZAR'
  },
  {
    name: 'Rwanda',
    code: '+250',
    active: false,
    currency: 'RWF'
  },
  {
    name: 'Botswana',
    code: '+267',
    active: false,
    currency: 'BWP'
  },
  {
    name: 'Malawi',
    code: '+265',
    active: false,
    currency: 'MWK'
  }
]
