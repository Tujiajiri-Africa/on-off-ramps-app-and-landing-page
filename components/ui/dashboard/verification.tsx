import React from 'react'
import {ScrollArea} from '@/components/ui/scroll-area'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
    CardHeader
} from '@/components/ui/card'

export function VerificationPage(){
    return (<>
    
    <ScrollArea className="h-full">
        <div className='className="flex-1 space-y-4 p-4 md:p-8 pt-6"'>
            <div className="flex items-center justify-between space-y-2">
                <div className="sm:flex items-center space-x-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Verification & Compliance
                    </h2>
               
                </div>
                
            </div>
            {/* <div className='container'> */}
                <Card>
                        <CardHeader>
                            <CardDescription>
                                Before you get started buying and selling crypto with fiat, please activate your account by submitting the required KYC/KYB details and documents for approval by our compliance team
                            </CardDescription>
                        </CardHeader>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
                            <CardContent>
                                <Card>
                                    
                                </Card>
                            </CardContent>
                        </div>
                    </Card>
                {/* </div>   */}
            {/* <span>Before you get started buying and selling crypto with fiat, please activate your account by submitting the required KYC/KYB details and documents for approval by our compliance team</span> */}
        </div>
                        {/* <Card>
                            <CardContent>
                                <p>Verification Page with steps</p>
                            </CardContent>
                        </Card> */}
    </ScrollArea>
           
    </> 
)
}