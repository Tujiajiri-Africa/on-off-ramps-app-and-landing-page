'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react";

export function DashboardIntro(){
    const session = useSession()

    return (
        <div className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-8 h-45">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-3">
              <h1 className="text-4xl font-bold text-white mb-4">
                  Complete Account Verification
              </h1>
              <p className="text-lg text-white mb-8">
                  Submit verification documents to our compliance team for approval and unlock more features including crypto/fiat transactions.
              </p>
              <Link href="/dashboard/deposit" className="bg-white hover:bg-gray-200 text-purple-600 font-bold py-2 px-4 rounded">
                  Get verified
              </Link>
          </div>
          <div className="col-span-2">
              <h1 className="text-4xl font-bold text-white mb-4">
                  Top Up Account
              </h1>
              <p className="text-lg text-white mb-8">
                  After verification, you are now ready to top up your account and seamlessly manage transactions.
              </p>
              <Link href="/dashboard/deposit" className="bg-white hover:bg-gray-200 text-purple-600 font-bold py-2 px-4 rounded">
                  Deposit
              </Link>
          </div>
          <div className="col-span-2">
            {/* <Image src={AboutPageIllustration.src} width={150} height={20} alt='d' className="h-auto"/> */}
            <h1 className="text-4xl font-bold text-white mb-4">
                  Buy/Sell
              </h1>
              <p className="text-lg text-white mb-8">
                  Start buying and selling crypto, create and manage invoices with ease.
              </p>
              <Link href="/dashboard/buy-sell-crypto" className="bg-white hover:bg-gray-200 text-purple-600 font-bold py-2 px-4 rounded">
                  Get started
              </Link>
          </div>
        </div>
          </div> 
    )
}