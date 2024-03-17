import React from 'react'
import {PlaneIcon,WalletIcon,LightBulbIcon, GiftIcon,MedalIcon,ChartIcon,MagnifierIcon} from '@/components/icons/index'
import {
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription,
    CardContent,
    CardFooter
} from '@/components/ui/card'
import Link from 'next/link';
import {Button} from '@/components/ui/button'

interface ProductProps {
    icon: JSX.Element;
    title: string;
    description: string;
    href: string;
    buttonLabel: string;
    showButton: boolean;
}

const productsList:ProductProps[] = [
    {
        title: "On Ramp",
        description: "Buy USDT, USDC, cUSD, PYUSD, BTC, ETH, SOL, DAI and other supported crypto assets with your local currency using either mobile money or bank transfer",
        icon: <WalletIcon />,
        href: "#",
        buttonLabel: "Get Started",
        showButton: true
    },
    {
        title: "Off Ramp",
        description: "Sell the supported assets at market rates with minimal fee and cash out into your local currency for use in your day to day utilities",
        icon: <WalletIcon />,
        href: "#",
        buttonLabel: "Get Started",
        showButton: true
    },
    {
        title: "Realtime Crypto Payments",
        description: "Harness the power of real-time token streaming to empower your friends and family to access liquidity in real-time giving them the flexibility to explore and invest in other profitable DeFi products",
        icon: <MagnifierIcon />,
        href: "#",
        buttonLabel: "Get Started",
        showButton: true
    },
    {
        title: "Crypto Invoicing",
        description: "We offer support for one-click invoice payments, real-time invoice payment reconciliation, settlement in fiat, invoice payments in crypto",
        icon: <MedalIcon />,
        href: "#",
        buttonLabel: "Join Waitlist",
        showButton: true
    },
    // {
    //     title: "Crypto Subscriptions",
    //     description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis",
    //     icon: <LightBulbIcon />,
    //     href: "#",
    //     buttonLabel: "Join Waitlist",
    //     showButton: true
    // },
    // {
    //     title: "Token Vesting",
    //     description: "token streaming and token vesting",
    //     icon: <GiftIcon />,
    //     href: "#",
    //     buttonLabel: "Join Waitlist",
    //     showButton: true
    // }
]

export default function Products(){
    return (
    <>
        <section
      id="products"
      className="w-full h-full text-center py-24 sm:py-32 bg-[#010203]"
      //className='relative w-full h-full flex justify-center items-center bg-gradient-to-r bg-[#010203] overflow-hidden opacity-100'
      //className='w-full lg:w-1/2 flex flex-col justify-center items-center text-gray-600'
    >
        <div className='container'>
            <h1 className="py-10 text-4xl sm:text-7xl font-semibold tracking-wide leading-tight text-white">
                {/* Effortless, <br/>fancy hero 12, <br/>made with love. */}
                Our <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FDC707] to-[#F00FDA]'>core products</span>
            </h1>
        <p className="md:w-3/4 mx-auto mt-4 mb-8 text-[18px] font-medium text-gray-400 tracking-wide">
            We have challenged ourselves to bring blockchain technology and cryptocurrency to the unbanked and underbanked African community combining it with the existing local payment channels to connect the African continent to the global digital financial ecosystem with a strict focus on compliance and real-world usecase of these powerful technologies to positively impact the lives of our users and the communities around us
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsList.map(({ icon, title, description, href, buttonLabel, showButton }: ProductProps) => (
            <Card
                key={title}
                //className="bg-[#00BF63] text-white"
                //className='bg-[#00BF63] text-white'
                //className='bg-gradient-to-r from-[#050520] to-[#470645] text-white'
                //bg-muted/50 
                //FFC90B
                //className="bg-gradient-to-r from-[#050520] to-[#470645]   text-white"
                // via-[#FFC90B] to-[rgb(151,17,163)]
                //className='bg-[#F00FDA]'
                className='bg-gradient-to-b from-[#FDC707] to-[#F00FDA] text-white'
            >
                <CardHeader>
                <CardTitle className="grid gap-4 place-items-center font-bold">
                    {icon}
                    {title}
                </CardTitle>
                </CardHeader>
                <CardContent 
                    //className='text-gray-200'
                    >
                        {description}
                </CardContent>
                <CardFooter>
                    {showButton && (
                        <Button 
                        className='w-full'
                        //className="w-full bg-[#00BF63]"
                        //className='bg-gradient-to-r from-[#FDC707] to-[#F00FDA] w-full'
                    // bg-gradient-to-r from-[#FDC707] to-[#F00FDA]
                    >
                        <Link href={href}>
                            {buttonLabel}
                        </Link>
                    </Button>
                    )}
                    
                </CardFooter>
            </Card>
            ))}
        </div>
        </div>

    </section>
    </>
)
}