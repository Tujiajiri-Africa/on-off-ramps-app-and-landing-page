'use client'

import React, { useCallback, useEffect, useState } from 'react'
import {NanaPayInvoiceProps} from '@/helpers/data'
import {listInvoices} from '@/actions/invoices'
import {useSession} from 'next-auth/react'
import { useQuery } from 'react-query'

export function InvoiceList(){
    const [invoices, setInvoices] = useState<NanaPayInvoiceProps[]|undefined>([]);

    const {data:userSessionData} = useSession()

    const fetchData = useCallback(async() => {
        const result = await listInvoices(userSessionData?.user.accessToken)
        const data = result
        setInvoices(data)
    },[userSessionData])

    const {error, status, data, isLoading } = useQuery({
        queryKey: 'invoices',
        queryFn: fetchData
    })

    return (<>
        <div className='flex'>
            {invoices?.map((value: NanaPayInvoiceProps) => (
                <div key={value.ref_no}>
                    {/* {value.client_email} <br />
                    {value.status} <br />
                    {value.item_quantity} <br />
                    { value.due_date.toString()} <br />
                    {value.item_name} <br />
                    {value.item_quantity} <br />
                    {value.payment_method} <br/>
                    {value.item_description} <br />
                    {value.unit_price} <br /> */}
                    {value.ref_no} <br />
                    {value.sub_total} <br />
                </div>
            ))}
        </div>
    </>)
}
