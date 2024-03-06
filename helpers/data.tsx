import { NavItem, SidebarNavItem } from "@/types";


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
  