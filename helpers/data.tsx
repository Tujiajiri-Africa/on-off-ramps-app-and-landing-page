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
      title: "Buy/Sell",
      href: "/dashboard/user",
      icon: "add",
      label: "add",
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
    // {
    //     title: "Transactions",
    //     href: "/dashboard/invoices",
    //     icon: "list",
    //     label: "list",
    // },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: "profile",
        label: "profile",
      },
    {
      title: "Logout",
      href: "/logout",
      icon: "logout",
      label: "logout",
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

export const COIN_API_PERIOD_DATA =
  {
    hour : '1HRS',
    seconds: '5SEC',
    _1_second:'2SEC',
    day : ''

  }
