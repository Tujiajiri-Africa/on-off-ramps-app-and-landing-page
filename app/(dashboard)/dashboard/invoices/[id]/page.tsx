import React, {Suspense} from 'react'
import {InvoiceDetail} from '@/components/ui/dashboard/invoices/details'

export default function InvoiceInfo({params}:{ params: { id: number } }){
    return (<>
        <Suspense>
            <InvoiceDetail />
        </Suspense>
    </>)
}