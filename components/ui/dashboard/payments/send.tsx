'use client'

import React, { useTransition, useState, useCallback,ChangeEventHandler, HTMLProps, useMemo } from 'react'
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
    CardFooter
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {Input} from '@/components/ui/input'
import {Input as ChakraUiInputField} from '@chakra-ui/react'
import {Button} from '@/components/ui/button'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {SendPaymentSchema} from '@/schemas'
import {FormErrorMessage} from '@/components/form-errors'
import {FormSuccessMessage} from '@/components/form-success'
import { ScrollArea } from "@/components/ui/scroll-area";
import { depositFiat, sendCrypto } from '@/actions/payments'
import {useSession} from 'next-auth/react'
import {   
    supportedAssets, 
    supportedPaymentMethods, 
    supportedMiniPayAssets, 
    getAssetNameFromAssetAddress,
    cUSD_MAINNET_CONTRACT_ADDRESS,
    supportedMiniPayPaymentMethods
} from '@/helpers/data'
import Image from 'next/image'
import { useUserCryptoWalletBalance } from '@/hooks/web3/useUserCryptoWalletBalance'
import { useMiniPay } from '@/hooks/web3/useConnectWallet'
import {
    useAccount,
    useBalance,
    useContractWrite,
    useNetwork,
    useWaitForTransaction,
    useSendTransaction,
    usePrepareContractWrite
} from 'wagmi'
//import { useDebounce } from 'usehooks-ts'
import { useTokenContract } from '@/hooks/web3/useTokenContract'
import { BigNumber } from "@ethersproject/bignumber";
import { BigNumberInput } from 'big-number-input';
import { toast } from 'react-toastify';
import { isAddress } from '@ethersproject/address'

export function MakePaymentComponent(){
    const miniPayWallet = useMiniPay()
    const {chain} = useNetwork()

    const {data: userSessionData} = useSession()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [recipientPhone, setRecipientPhone] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true)
    const [fiatBalance, setFiatBalance] = useState<number|undefined>(0);
    const [recipientWalletAddress, setRecipientWalletAddress] = useState<string>("")

    const cryptoBalance = useUserCryptoWalletBalance()

    const [activeTokenContract, activeTokenContractAbi] = useTokenContract()
    

    const form = useForm<z.infer<typeof SendPaymentSchema>>({
        resolver: zodResolver(SendPaymentSchema),
        // defaultValues:{
        //     amount: "",
        //     payment_method: ""
        // }
    })
    
    const shouldDisableSendCryptoSubmitButton = useMemo(() => {
        if(!miniPayWallet){
            return true
        }

        if(!isAddress(recipientWalletAddress)){
            return true
        }

        return (
            !recipientWalletAddress ||
            !amount ||
            !cryptoBalance 
            //parseFloat(amount) > cryptoBalance 
        )
    },[amount, cryptoBalance, miniPayWallet, recipientWalletAddress])

    const handleAmountChange = useCallback((value: string): void => {
        if(!value){
            return
        }
        setAmount(value)
        }, [setAmount]);

    const handleRecipientInpuChange = useCallback((value: string) => {
        setRecipientWalletAddress(value)
    },[])

    const handleInputAmountChange = useCallback((amount:string) => {
        if(!cryptoBalance) return;
        
        let formatedAmount = parseFloat(amount)
        if(formatedAmount > cryptoBalance){
            setError("Amount exceeds available balance")
            setIsSubmitButtonDisabled(true)
            setAmount("")
        }else{
            setAmount(amount)
            setIsSubmitButtonDisabled(false)
            setError("")
        }
    },[cryptoBalance, setAmount, setIsSubmitButtonDisabled, setError])

    const handleSendPayment = (values: z.infer<typeof SendPaymentSchema>) => {
        setError("")
        setSuccess("")
    
        startTransition(async() => {
            sendCrypto(values, userSessionData?.user.accessToken, recipientWalletAddress, miniPayWallet, amount)
            .then((data:any) => {
                if(data?.data.error){
                    //form.reset()
                    setError(data?.data.error)
                }
                if(data?.data.success){
                    form.reset()
                    setSuccess(data?.data.success)
                }
            }).catch(() => {
                setError("Something went wrong")
                setSuccess("")
            })
        })
    }
    
    const tokenAmountBn: BigNumber = BigNumber.from(amount ? amount: 0);

    const {
        data: contractWriteData, 
        isLoading:contractWriteLoad, 
        isIdle: contractWriteIdle, 
        //isError: contractWriteIsError, 
        //error: contractWriteError, 
        isSuccess: contractWriteIsSuccess, 
        write: sendCUSDContractWrite 
    } = useContractWrite({
        address: activeTokenContract,
        abi: activeTokenContractAbi,
        functionName: "transfer",
        chainId: chain?.id,
        args: [recipientWalletAddress, tokenAmountBn],
        onError(error: any){
            toast.error("Transaction failed!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                //transition: Bounce,
              })
        }
    })

    const {
        isLoading: sendCryptoWaitIsLoading,
        isError: sendCryptoWaitIsError,
        isIdle: sendCryptoWaitIsIdle,
        data: sendCryptoWaitData,
        isSuccess: sendCryptoWaitIsSuccess,
        error: sendCryptoWaitError   
    } = useWaitForTransaction({
      hash: contractWriteData?.hash,
      async onSuccess(data){
        toast.success("Success",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              //transition: Bounce,
            }
        );
      },
      onError(error){
        const errorData = Object.entries(error);
        let data = errorData.map( ([key, val]) => {
          return `${val}`
        });

        toast.error(`${error.cause}`,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            //transition: Bounce,
          })
    }
    })

     const sendWalletCryptoSendTransaction = () => {
        try{
            sendCUSDContractWrite()
        }catch(error){
            console.log(error)
        }
     }

    return (<>
            <Form {...form}>
                <form
                    //onSubmit={form.handleSubmit(handleSendPayment)} 
                    onSubmit={form.handleSubmit(sendWalletCryptoSendTransaction)}
                    className="space-y-6"
                >
                <Card>
            <CardHeader>
                <CardTitle>Send Money</CardTitle>
                <CardDescription className="mb-10">
                    {/* Top up your AjiraPay wallet with {userSessionData?.user.currency} and start making money buying and selling cUSD seamlessly on MiniPay */}
                        Send money to your friends and loved ones at zero fee, make cUSD payments across the globe
                </CardDescription>
                {/* <CardDescription className="mb-10">Top up your mobile money wallet and start buying and selling crypto seamlessly</CardDescription> */}
            </CardHeader>
            <CardContent>
            <div className='mb-4'>
                        <FormField 
                            control={form.control}
                            name='payment_method'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            Select payment method
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            {/* <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="Enter amount to deposit"
                                                type='number'
                                                //disabled={isPending}
                                                min={0}
                                                
                                            /> */}
                                            <Select
                                            {...field}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="payment network" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        supportedMiniPayPaymentMethods
                                                        .filter((p) => p.active == true)
                                                        .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
                                                        .map((channel) => (
                                                            <SelectItem key={channel.value} value={channel.value}>
                                                                
                                                                <div className='flex items-center content-center gap-2'>
                                                                            <Image src={channel.iconUrl?.src} width={30} height={30} alt={channel.value} />
                                                                            {channel.label}
                                                                </div>
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <div className='mb-4'>
                           <FormLabel 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                                       
                              Amount
                        </FormLabel>
                        <BigNumberInput
                            decimals={18}
                            onChange={handleAmountChange}
                            value={amount}
                            renderInput={(props: HTMLProps<HTMLInputElement>) => (
                                <Input
                                    //ChakraUiInputField 
                                    //onError={validateAmountValue}
                                    value={String(props.value)} 
                                    placeholder={"Enter cUSD amount"} 
                                    onChange={props.onChange as ChangeEventHandler<HTMLInputElement>} 
                                    className='mb-2'
                                />
                            )}
                    />
                                        <FormLabel
                                            className='block text-sm font-medium'
                                        >
                                            <p className="text-gray-700 dark:text-gray-400">Balance: <span className="text-orange-600">{`$ ${cryptoBalance}`}</span> </p>
                                        </FormLabel>
                    </div>
            {/* <div className="mb-4">
                        <FormField 
                            control={form.control}
                            name='amount'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                       
                                        Amount
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl className='mb-2'>
                                            <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                placeholder="Enter amount to send"
                                                // placeholder="Enter amount to deposit"
                                                type='number'
                                                disabled={isPending}
                                                //min={0}
                                                onChangeCapture={e => handleInputAmountChange(e.currentTarget.value)}
                                                
                                            />
                                        </FormControl>
                                        <FormLabel
                                            className='block text-sm font-medium'
                                        >
                                            <p className="text-gray-700 dark:text-gray-400">Balance: <span className="text-orange-600">{`$ ${cryptoBalance}`}</span> </p>
                                        </FormLabel>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div> */}

                    <div className="mb-4">
                        <FormField 
                            control={form.control}
                            name='recipient'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel 
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                        {/* Amount in {userSessionData?.user.currency} */}
                                        Recipient&apos;s wallet
                                    </FormLabel>
                                    <div 
                                        className='mt-1'
                                        >
                                        <FormControl>
                                            <Input
                                                {...field}
                                                //className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                                //placeholder="Enter recipient address/phone"
                                                // placeholder="Enter amount to deposit"
                                                type='text'
                                                disabled={isPending}
                                                //min={0}
                                                onChangeCapture={e => handleRecipientInpuChange(e.currentTarget.value)}
                                                
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormErrorMessage message={error}/>
                    <FormSuccessMessage message={success}/>
            </CardContent>
            <CardFooter>
                {
                                            //isPending ? 
                                            sendCryptoWaitIsLoading ?

                                            <Button 
                                                type="button" 
                                                disabled
                                                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500'
                                                //className="py-2 px-4 flex justify-center items-center  bg-orange-600  hover:bg-orange-500 hover:text-white focus:ring-orange-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
                                                >
                                            <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                     <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                                    </path>
                                               </svg>
                                                 Processing...
                                        </Button>

                                        :

                                        <Button 
                                            disabled={ shouldDisableSendCryptoSubmitButton }
                                            className='w-full bg-orange-600 text-white hover:bg-orange-500 hover:text-white'
                                            //type='submit'
                                            type='submit'
                                            onClick={() => sendWalletCryptoSendTransaction()}
                                        >
                                            {
                                                !recipientWalletAddress ? 'Enter recipient wallet' :
                                                !isAddress(recipientWalletAddress) ? 'Invalid recipient wallet':
                                                recipientWalletAddress == miniPayWallet ? 'Cannot send to own wallet' :
                                                !amount ? `Enter cUSD amount` :
                                                //cryptoBalance && parseFloat(amount) > cryptoBalance ? 'Insuffcient balance':
                                                'Pay'
                                            }
                                        </Button>
                }

            </CardFooter>
        </Card>
                </form>
            </Form>

    </>)
}