"use client";
import React from "react";
import ThemeProvider from "./ThemeToggle/theme-provider";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { Theme } from '@radix-ui/themes';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

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
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system" 
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
    </QueryClientProvider>
    

    </>
  );
}
