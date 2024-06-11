'use client'

import React, {useState } from 'react';

import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import logo from '@/app/assets/logo/nana-pay/logo-no-background.svg'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { getConnectedMiniPayAddress } from '@/hooks/useGetMiniPayAddress';

export default function Header() {
  const [connectedMiniPayAddress, setConnectedMiniPayAddress] = useState<string|undefined>("")

  getConnectedMiniPayAddress().then((value) => {
    setConnectedMiniPayAddress(value);
  })

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
          {/* <Button>
            Connect Wallet
          </Button> */}
          {connectedMiniPayAddress}

          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
