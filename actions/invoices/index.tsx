"use server"

import  * as z from 'zod'
import {UserResponseDataProps} from '@/lib/utils'
import { DEV_BASE_URI, PROD_BASE_URI, ENVIRONMENT, NanaPayInvoiceProps } from '@/helpers/data'
import {InvoiceSchema} from '@/schemas'


export const listInvoices = async(bearerToken: string|undefined) => {
    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/invoices/list-invoices' : PROD_BASE_URI + '/invoices/list-invoices'

    let invoices: NanaPayInvoiceProps[] = []
   
    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        }
    }

    const fetchUserInvoices = await fetch(endpoint, payload).then(async(response) => {
        if(response.status === 500){
            invoices = []
            return invoices
        }

        const data = await response.json()

        if(data['status'] == false){
            invoices = []
            return invoices
        }

        if(data['status'] == true){
            invoices = data['data']
            return invoices
        }
    }).catch((error) =>{
        console.log(error)
        invoices = []
        return invoices
    })

    try{
        return fetchUserInvoices
    }catch(error){
        console.log(error)
        invoices = []
        return invoices
    }
}

export const createInvoice = (values: z.infer<typeof InvoiceSchema>, bearerToken: string|undefined) =>{
    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/invoices/create-invoice' : PROD_BASE_URI + '/invoices/create-invoice'

    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

    const validatedFields = InvoiceSchema.safeParse(values)
    
    if(!validatedFields.success){
        dataInfo = {
            error: 'Invalid Invoice parameters',
            success: '',
            data: ''
        }
        return  { data: dataInfo}
    }

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        },
        body: JSON.stringify(validatedFields.data)
    }

    const submitNewInvoice = fetch(endpoint, payload).then(async(response) => {
        if(response.status === 500){
            dataInfo = {
                error: 'Something went wrong!',
                success: '',
                data: ''
            }

            return { data: dataInfo}
        }

        const data = await response.json()

        if(data['status'] == false){
            dataInfo = {
                error: data['message'],
                success: '',
                data: ''
            }

            return { data: dataInfo}
        }
        if(data['status'] == true){
            dataInfo = {
                error: "",
                success: data['message'],
                data: data['data']
            }

            return { data: dataInfo}
        }
    }).catch((error) =>{
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    })

    try{
        return submitNewInvoice
    }catch(error){
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    }
}

export const updateInvoice = () => {

}