import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";

export const metadata: Metadata = {
  title: "NanaPay |Buy and Sell USDT, USDC, Bitcoin, cUSD, ETH, SOL, ADA, at market rates across 20+ African countries and beyond",
  description: "Buy and Sell your favourite crypto with instant settlement in your local currency across 20+ compliant jurisdictions across Africa and beyond",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>

        <ThemeProvider 
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
        </ThemeProvider>
    </>
  );
}
