import React from 'react'
import Image from 'next/image'

import InvoiceVector from '@/app/assets/icons/products/invoice/invoice-ticket-svgrepo-com.svg'
import WalletVector1 from '@/app/assets/icons/products/invoice/wallet-svgrepo-com.svg'
import WalletVector2 from '@/app/assets/icons/products/invoice/wallet-money-svgrepo-com.svg'

import {Button} from '@/components/ui/button'

export function ProductsV2(){
    return (
        <>
        <div id="products" className=" bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50  px-2 py-10 ">

<div className="2xl:w-[80%] md:pt-1.5  lg:pt-1.5 w-[98%] mx-auto bg-inherit">
  <p className="text-center text-base font-semibold leading-7 text-primary-500">Products</p>
  <h2 className="text-center font-display text-4xl sm:text-7xl font-bold leading-tight text-slate-900 md:text-4xl ">
    Explore our core products
  </h2>
  <ul className="mt-16 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-4 xl:grid-cols-4">
    <li className="rounded-xl bg-white px-6 py-8 shadow-md">

      <Image 
        //src="https://www.svgrepo.com/show/530438/ddos-protection.svg" 
        src={WalletVector2.src}
        alt="" 
        width={40}
        height={40}
        className="mx-auto h-10 w-10"/>
      <h3 className="my-3 font-display font-medium">Crypto On Ramp</h3>
      <p className="mt-1.5 text-sm leading-6 text-secondary-500">
      Buy USDT, USDC, cUSD, PYUSD, BTC, ETH, SOL, DAI and other supported crypto assets with your local currency using either mobile money or bank transfer.
      </p>
        <Button className='w-full bg-orange-600 text-white hover:bg-orange-500 px-4 py-3 sm:mt-10 mt-8'>
            Coming Soon
        </Button>
    </li>
    <li className="rounded-xl bg-white px-6 py-8 shadow-md">

      <Image 
        //src="https://www.svgrepo.com/show/530442/port-detection.svg"
            src={WalletVector2.src}
            width={40}
            height={40}
            alt="" className="mx-auto h-10 w-10"/>
      <h3 className="my-3 font-display font-medium">Crypto Off Ramp</h3>
      <p className="mt-1.5 text-sm leading-6 text-secondary-500">
      Sell USDT, USDC, cUSD, PYUSD, BTC, ETH, SOL, DAI and other supported crypto assets at market rates with minimal fee and cash out into your local currency for use in your day to day utilities.
      </p>
      <Button className='w-full bg-orange-600 text-white hover:bg-orange-500 px-4 py-3 sm:mt-10 mt-8'>
            Coming Soon
        </Button>
    </li>
    <li className="rounded-xl bg-white px-6 py-8 shadow-md">
        <Image 
            src={InvoiceVector.src} 
            alt="" 
            width={40}
            height={40}
            className="mx-auto h-10 w-10"
        />
        <h3 className="my-3 font-display font-medium group-hover:text-primary-500">Crypto Invoicing</h3>
        <p className="mt-1.5 text-sm leading-6 text-secondary-500">
        We offer support for one-click invoice payments, real-time invoice payment reconciliation, settlement in fiat, invoice payments in crypto
          </p>
      <Button className='mt-8 w-full bg-orange-600 text-white hover:bg-orange-500 px-4 py-3 sm:mt-10'>
                Coming Soon
        </Button>
    </li>
    <li className="rounded-xl bg-white px-6 py-8 shadow-md">
      <Image 
        src={WalletVector1.src} 
        alt="" 
        width={40}
        height={40}
        className="mx-auto h-10 w-10"
    />
      <h3 className="my-3 font-display font-medium">Realtime Crypto Payments</h3>
      <p className="mt-1.5 text-sm leading-6 text-secondary-500">
      Harness the power of real-time token transfers popularly known as token streaming to empower your friends and family to access liquidity in real-time giving them the flexibility to explore and invest in other profitable DeFi products or cash out in local currency.
      </p>
      <Button className='w-full bg-orange-600 text-white hover:bg-orange-500 px-4 py-3 sm:mt-10 mt-8'>
            Coming Soon
        </Button>
    </li>


    {/* <li className="rounded-xl bg-white px-6 py-8 shadow-2xl">
        <img src={InvoiceVector.src} alt="" className="mx-auto h-10 w-10"/>
        <h3 className="my-3 font-display font-medium group-hover:text-primary-500">Crypto Subscriptions</h3>
        <p className="mt-1.5 text-sm leading-6 text-secondary-500">
        We offer support for one-click invoice payments, real-time invoice payment reconciliation, settlement in fiat, invoice payments in crypto
          </p>
      <Button className='mt-6 w-full bg-gradient-to-r from-[#FDC707] to-[#F00FDA] text-white'>
            Get started
        </Button>
    </li> */}
    {/* <li className="rounded-xl bg-white px-6 py-8 shadow-2xl">
        <img src={InvoiceVector.src} alt="" className="mx-auto h-10 w-10"/>
        <h3 className="my-3 font-display font-medium group-hover:text-primary-500">Crypto Payment Links</h3>
        <p className="mt-1.5 text-sm leading-6 text-secondary-500">
        We offer support for one-click invoice payments, real-time invoice payment reconciliation, settlement in fiat, invoice payments in crypto
          </p>
      <Button className='mt-6 w-full bg-gradient-to-r from-[#FDC707] to-[#F00FDA] text-white'>
            Get started
        </Button>
    </li> */}
    {/* <li className="rounded-xl bg-white px-6 py-8 shadow-2xl">
      <a href="/templates" className="group">
        <img src="https://www.svgrepo.com/show/530450/page-analysis.svg" alt="" className="mx-auto h-10 w-10"/>
        <h3 className="my-3 font-display font-medium group-hover:text-primary-500">
          90+ templates
        </h3>
        <p className="mt-1.5 text-sm leading-6 text-secondary-500">We offer many templates covering areas such as
          writing,
          education, lifestyle and creativity to inspire your potential. </p>
      </a>
    </li> */}
    {/* <li className="rounded-xl bg-white px-6 py-8 shadow-2xl">
      <a href="/download" className="group">
        <img src="https://www.svgrepo.com/show/530453/mail-reception.svg" alt="" className="mx-auto h-10 w-10"/>
        <h3 className="my-3 font-display font-medium group-hover:text-primary-500">Use Anywhere</h3>
        <p className="mt-1.5 text-sm leading-6 text-secondary-500">Our product is compatible with multiple platforms
          including Web, Chrome, Windows and Mac, you can use MagickPen anywhere.</p>
      </a>
    </li> */}
  </ul>
</div>
    <span className="absolute top-0 right-0 -z-10">
        <svg 
            width="388" 
            height="250" 
            viewBox="0 0 388 220" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
                <path 
                    opacity="0.05" 
                    d="M203 -28.5L4.87819e-05 250.5L881.5 250.5L881.5 -28.5002L203 -28.5Z" 
                    fill="url(#paint0_linear_971_6910)">
                        </path>
                        <defs>
                            <linearGradient 
                                id="paint0_linear_971_6910" 
                                x1="60.5" 
                                y1="111" 
                                x2="287" 
                                y2="111" 
                                gradientUnits="userSpaceOnUse">
                                    <stop 
                                        offset="0.520507" 
                                        stopColor="white">
                                    </stop>
                                    <stop 
                                        offset="1" 
                                        stopColor="white" 
                                        stopOpacity="0">
                                    </stop>
                                        </linearGradient>
                        </defs>
                        </svg>
                    </span>
                    <span 
                        className="absolute top-0 right-0 -z-10">
                            <svg 
                            width="324" 
                            height="250" 
                            viewBox="0 0 324 220" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    opacity="0.05" 
                                    d="M203 -28.5L4.87819e-05 250.5L881.5 250.5L881.5 -28.5002L203 -28.5Z" fill="url(#paint0_linear_971_6911)"></path><defs><linearGradient id="paint0_linear_971_6911" x1="60.5" y1="111" x2="287" y2="111" gradientUnits="userSpaceOnUse"><stop offset="0.520507" stopColor="white"></stop><stop offset="1" stopColor="white" stopOpacity="0"></stop></linearGradient></defs></svg></span><span className="absolute top-4 left-4 -z-10"><svg width="43" height="56" viewBox="0 0 43 56" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><circle cx="40.9984" cy="1.49626" r="1.49626" transform="rotate(90 40.9984 1.49626)" fill="white"></circle><circle cx="27.8304" cy="1.49626" r="1.49626" transform="rotate(90 27.8304 1.49626)" fill="white"></circle><circle cx="14.6644" cy="1.49626" r="1.49626" transform="rotate(90 14.6644 1.49626)" fill="white"></circle><circle cx="1.49642" cy="1.49626" r="1.49626" transform="rotate(90 1.49642 1.49626)" fill="white"></circle><circle cx="40.9984" cy="14.6642" r="1.49626" transform="rotate(90 40.9984 14.6642)" fill="white"></circle><circle cx="27.8304" cy="14.6642" r="1.49626" transform="rotate(90 27.8304 14.6642)" fill="white"></circle><circle cx="14.6644" cy="14.6642" r="1.49626" transform="rotate(90 14.6644 14.6642)" fill="white"></circle><circle cx="1.49642" cy="14.6642" r="1.49626" transform="rotate(90 1.49642 14.6642)" fill="white"></circle><circle cx="40.9984" cy="27.8302" r="1.49626" transform="rotate(90 40.9984 27.8302)" fill="white"></circle><circle cx="27.8304" cy="27.8302" r="1.49626" transform="rotate(90 27.8304 27.8302)" fill="white"></circle><circle cx="14.6644" cy="27.8302" r="1.49626" transform="rotate(90 14.6644 27.8302)" fill="white"></circle><circle cx="1.49642" cy="27.8302" r="1.49626" transform="rotate(90 1.49642 27.8302)" fill="white"></circle><circle cx="40.9984" cy="40.9982" r="1.49626" transform="rotate(90 40.9984 40.9982)" fill="white"></circle><circle cx="27.8304" cy="40.9963" r="1.49626" transform="rotate(90 27.8304 40.9963)" fill="white"></circle><circle cx="14.6644" cy="40.9982" r="1.49626" transform="rotate(90 14.6644 40.9982)" fill="white"></circle><circle cx="1.49642" cy="40.9963" r="1.49626" transform="rotate(90 1.49642 40.9963)" fill="white"></circle><circle cx="40.9984" cy="54.1642" r="1.49626" transform="rotate(90 40.9984 54.1642)" fill="white"></circle><circle cx="27.8304" cy="54.1642" r="1.49626" transform="rotate(90 27.8304 54.1642)" fill="white"></circle><circle cx="14.6644" cy="54.1642" r="1.49626" transform="rotate(90 14.6644 54.1642)" fill="white"></circle><circle cx="1.49642" cy="54.1642" r="1.49626" transform="rotate(90 1.49642 54.1642)" fill="white"></circle></g>
        </svg>
    </span>
</div>

    </>
)
}