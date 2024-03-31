import React from 'react'
import { Card,CardContent } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'

export function FaqV2(){
    return (<>
    <div
    className="bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50  px-2 py-10 h-full content-center">
        <div className="2xl:w-[80%] md:pt-1.5  lg:pt-1.5 w-[98%] mx-auto bg-inherit">
        <p className="text-center text-base font-semibold leading-7 text-primary-500">Faq</p>
       <h2 className="text-center font-display text-4xl sm:text-7xl font-bold leading-tight text-slate-900 md:text-4xl ">
         Frequently Asked Questions
       </h2>
       <div className="max-w-2xl mx-auto text-center">
        {/* <h2 className="text-center font-display text-4xl sm:text-7xl font-bold leading-tight text-slate-900 md:text-4xl ">
            How to get started
        </h2> */}
            {/* <p className="max-w-2xl mx-auto mt-4 text-base text-gray-400 leading-relaxed md:text-2xl">
                We believe there should be no barrier to your adoption of crypto across Africa
            </p> */}
       <p className="mt-1.5 text-sm leading-6 text-secondary-500">Need help? check out some of the major questions asked by the community and the respective responses from us, can&apos;t find the answer you are looking for? feel free to reach out to us at hello@ajirapay.finance for further assistance</p>
        </div>

        </div>
    <div className="mx-auto px-5">
        {/* <div className="flex flex-col items-center">

        </div> */}
        <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
            <div className="py-5">
                <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                        <span> What are some of the supported countries?</span>
                        <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                    </summary>
                    <Card>
                    <CardContent>
                    <p className="group-open:animate-fadeIn mt-1.5 leading-6 text-sm text-neutral-600">
                        Our pilot program focuses on Kenya with plans to expand to Nigeria, South Africa, Rwanda, Uganda, Tanzania, Senegal, Malawi, Burkina Faso, Benin, Mali, Ivory Coast, Ghana, Gabon,Cameroon,
                        Botswana, DR Congo, Togo and Congo Brazzaville
                    </p>
                    </CardContent>
                    </Card>


                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                        <span> What payment methods do you support?</span>
                        <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                    </summary>
                    <Card>
                        <CardContent>
                        <p className="group-open:animate-fadeIn mt-1.5 leading-6 text-sm text-neutral-600">
                            We support both mobile money and bank transfer subject to your country/jurisdiction
                    </p>
                        </CardContent>
                    </Card>

                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                        <span> Which crypto assets do you support?</span>
                        <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                    </summary>
                    <Card>
                        <CardContent>
                        <p className="group-open:animate-fadeIn mt-1.5 leading-6 text-sm text-neutral-600">
                         We support all the major stablecoins; USDT, USDC, cUSD, PYUSD and the major coins such BTC, ETH, SOL, ADA, MATIC, XAUT plus many more
                    </p>
                        </CardContent>
                    </Card>

                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                        <span> What fiat currencies do you support?</span>
                        <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                    </summary>
                    <Card>
                        <CardContent>
                        <p className="group-open:animate-fadeIn mt-1.5 leading-6 text-sm text-neutral-600">
                            We support the major currencies across the 20 African jurisdictions such as KES, NGN, ZAR, TZS, UGX, ZMW, RWF, MWK, GHS, XAF, BWP, CDF, XOF
                    </p>
                        </CardContent>
                    </Card>

                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                        <span> What are some of the supported mobile networks?</span>
                        <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                    </summary>
                    <Card>
                        <CardContent>
                        <p className="group-open:animate-fadeIn mt-1.5 leading-6 text-sm text-neutral-600">
                            We support M-PESA, MTN, Orange Money, Airtel Money, EXPRESSO, Wave, TNM as per your jurisdiction
                    </p>
                        </CardContent>
                    </Card>

                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                        <span> Is the platform secure?</span>
                        <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                    </summary>
                    <Card>
                        <CardContent>
                        <p className="group-open:animate-fadeIn mt-1.5 leading-6 text-sm text-neutral-600">
                         Yes, we have partnered with some of the best industry leaders to help us with internal audits, security checks and adherence to compliance across our supported jurisdictions and strict audits
                    </p>
                        </CardContent>
                    </Card>

                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                        <span> Are you licenced and how about compliance?</span>
                        <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                    </summary>
                    <Card>
                        <CardContent>
                        <p className="group-open:animate-fadeIn mt-1.5 leading-6 text-sm text-neutral-600">
                         Yes, we are legally registered in Kenyan as NanaPay LTD with Certificate No: PVT-AJUXQGB3. Furthermore, we have partnered with licensed industry players to ensure a seamless and compliant crypto onboarding
                    </p>
                        </CardContent>
                    </Card>

                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                        <span> Do I need to pay any fee to sign up?</span>
                        <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                    </summary>
                    <Card>
                        <CardContent>
                        <p className="group-open:animate-fadeIn mt-1.5 leading-6 text-sm text-neutral-600">
                            No, you can create your account for free, No hidden fees. We only charge a negligible percentage on crypto buy/sell and on successfully paid invoices.
                        </p>
                        </CardContent>
                    </Card>

                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                        <span> Do I need a credit card to get started?</span>
                        <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                    </summary>
                    <Card>
                        <CardContent>
                        <p className="group-open:animate-fadeIn mt-1.5 leading-6 text-sm text-neutral-600">
                            No. You do not need any credit card to use our platform.
                    </p>
                        </CardContent>
                    </Card>

                </details>
            </div>

            <div className="py-5">
                <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                        <span> How do I contact support?</span>
                        <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                    </summary>
                    <Card>
                        <CardContent>
                        <p className="group-open:animate-fadeIn mt-1.5 leading-6 text-sm text-neutral-600">If you need help with our platform or
                        have any other questions, you can contact the company&apos;s support team by submitting a support
                        request through the website or by emailing hello@ajirapay.finance
                    </p>
                        </CardContent>
                    </Card>

                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                        <span> Do you offer any discounts or promotions?</span>
                        <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                    </summary>
                    <Card>
                        <CardContent>
                        <p className="group-open:animate-fadeIn mt-1.5 leading-6 text-sm text-neutral-600">We may offer discounts or promotions
                        from time to time. To stay up-to-date on the latest deals and special offers, follow our social media pages.
                    </p>
                        </CardContent>
                    </Card>

                </details>
            </div>
        </div>
    </div>
</div>
    </>
)
}