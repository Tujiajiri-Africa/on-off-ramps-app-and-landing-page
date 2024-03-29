import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";
//import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";
import Providers from "@/components/layout/providers";
import {auth} from '@/auth'

export const metadata: Metadata = {
  title: "NanaPay |Buy and Sell USDT, USDC, Bitcoin, cUSD, ETH, SOL, ADA, at market rates across 20+ African countries and beyond, cash out in your local currency",
  description: "Buy and Sell your favourite crypto with instant settlement in your local currency across 20+ compliant jurisdictions across Africa and beyond",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const session = await auth()
  return (
    <>
      
        {/* <ThemeProvider 
              attribute="class" 
              defaultTheme="system" 
              enableSystem
              >
              <Header />
          
          <div 
              className="flex h-screen overflow-hidden"
              >
              <Sidebar />
              <main 
                  className="w-full pt-16"
                  >
                      {children}
              </main>
          </div>
          </ThemeProvider> */}
   
        <Providers
          session={session}
        >
          <Header />
          <div 
            className="flex h-screen overflow-hidden"
            //bg-gradient-to-r from-[#69e4de] via-[#FDC707] to-[#F00FDA] text-white bg-[#4B49AC]/5
            >
            <Sidebar />
            <main 
            //dark:#191C24
                className="w-full pt-16 dark:bg-[#191C24]/30 bg-white/50"
                >
                    {children}
            </main>
        </div>
        </Providers>
    </>
  );
}
