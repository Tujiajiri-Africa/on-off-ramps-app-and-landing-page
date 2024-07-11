declare var window: any

'use client'

import React, {useEffect, useState } from 'react';

import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import logo from '@/app/assets/logo/nana-pay/logo-no-background.svg'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { getConnectedMiniPayAddress } from '@/hooks/useGetMiniPayAddress';
import {useConnect, useAccount} from 'wagmi'
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Header() {
  const {address, isConnected} = useAccount()

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const checkMiniPayExists = () => {
    if (typeof window.ethereum !== 'undefined') {
      
    }
  }

  useEffect(() => {
    connect();
  }, [connect]);
  
  // useEffect(() => {
  //   if (window.ethereum && window.ethereum.isMiniPay) {
  //     // User is using MiniPay wallet
  
  //     connect({ 
  //       // connector: injected({ 
  //       //   target: "metaMask" 
  //       // }) 
  //       connector: injected({ 
  //         target: "metaMask" 
  //       }) 
  //     });
  //   }
  // }, []);

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            href="/"
            //target="_blank"
          >
            <Image 
              src={logo.src}
              height={80}
              width={80}
              alt={'nana-pay-logo'}  
              className="dark:h-10 dark:w-h-10"
            />
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          {/* {window == undefined && window?.ethereum.isMiniPay ? <p></p> : <p></p>} */}
          {
            isConnected ? address : ''
          }

          {/* <Button>
            Connect Wallet
          </Button> */}
          

          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
