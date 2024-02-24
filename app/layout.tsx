import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
//import BackgroundImage from '../app/assets/logo/background-image-sample-svg.svg'

import  Navbar  from '@/components/ui/navbar'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AjiraPay Finance",
  description: "A multichain decentralized web3 protocol for secure and seamless crypto payments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      //className={inter.className}
      className=" bg-[#010203]"
      // style={{
      //   backgroundImage: `url(${BackgroundImage.src})`,
      //   backgroundSize: '100% 95%',
      //   backgroundRepeat: 'no-repeat'
      // }}
      //className="h-screen bg-gradient-to-t from-[#593690] to-[#9A1AAF]"
      >
         <Navbar />
        {children}
      </body>
    </html>
  );
}
