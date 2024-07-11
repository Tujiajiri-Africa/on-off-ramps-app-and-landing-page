"use client";
import React from "react";
import ThemeProvider from "./ThemeToggle/theme-provider";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { Theme } from '@radix-ui/themes';
import { web3WagmiConfig } from '../../providers/web3Provider'
import { WagmiConfig } from 'wagmi'
import {
  RainbowKitProvider,
  darkTheme,
  DisclaimerComponent   
} from '@rainbow-me/rainbowkit';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet and interacting with this app and available and future features, you agree to the Ajira Pay Finance{' '}
    <Link href="https://docs.ajirapay.finance/legal/terms-of-use">Terms of Service</Link> and
    acknowledge that you have read and understood the protocol {' '}
    <Link href="https://docs.ajirapay.finance/legal/disclaimer">Disclaimer</Link>
  </Text>
);

export default function Providers({
  session,
  children,
}: {
  session: SessionProviderProps["session"];
  children: React.ReactNode;
}) {
  return (
    <>
    
    <QueryClientProvider  client={queryClient}>
    <WagmiConfig config={web3WagmiConfig}>
      <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem
        >
          {/* <Theme 
              appearance="dark" 
              accentColor="pink" 
              grayColor="gray" 
              panelBackground="solid" 
              radius="small" 
              scaling="95%"
            > */}

            
            <SessionProvider session={session}>{children}</SessionProvider>  
              
          {/* </Theme> */}
                
        </ThemeProvider>
      </WagmiConfig>

    </QueryClientProvider>
    

    </>
  );
}
