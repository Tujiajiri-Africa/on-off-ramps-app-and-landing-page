import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
//import BackgroundImage from '../app/assets/logo/background-image-sample-svg.svg'
import GoogleAnalytics from '@/components/utils/GoogleAnalytics';
const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID

import  Navbar  from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import CookieBanner from '@/components/ui/cookiebanner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AjiraPay Finance |Buy and Sell Crypto at market rates across 20+ African countries and beyond",
  description: "Buy and Sell your favourite crypto with instant settlement in your local currency across 20+ compliant jurisdictions across Africa and beyond",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_MEASUREMENT_ID='G-0000000000'/>
      <body 
      //className="bg-[#191F22]"
      //className={inter.className}
      className=" bg-[#081e1c]"
      // style={{
      //   backgroundImage: `url(${BackgroundImage.src})`,
      //   backgroundSize: '100% 95%',
      //   backgroundRepeat: 'no-repeat'
      // }}
      //className="h-screen bg-gradient-to-t from-[#593690] to-[#9A1AAF]"
      >
         <Navbar />
        {children}
        <Footer />
        <CookieBanner/>
      </body>
    </html>
  );
}
