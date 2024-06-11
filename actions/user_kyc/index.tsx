"use server"

import  * as z from 'zod'
import { 
    UserIdVerificationSchema
} from '@/schemas'
import {UserResponseDataProps} from '@/lib/utils'
import { DEV_BASE_URI, PROD_BASE_URI, ENVIRONMENT, UserKYCIDTypeProps } from '@/helpers/data'

export const sendIdVerificationRequest = async(
    values: z.infer<typeof UserIdVerificationSchema>,
    bearerToken: string|undefined,
    first_name: string|undefined,
    last_name: string|undefined,
    phone_number: string|undefined,
    iso_code: string|undefined 
) => {
    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/kyc/send-enhanced-id-verification-request' : PROD_BASE_URI + '/kyc/send-enhanced-id-verification-request'

    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

    const validatedFields = UserIdVerificationSchema.safeParse(values)
    
    if(!validatedFields.success){
        dataInfo = {
            error: 'Please check that all fields are correct!',
            success: '',
            data: ''
        }
        return  { data: dataInfo}
    }

    const body = {
        middle_name: validatedFields.data.middle_name,
        id_number: validatedFields.data.id_number,
        id_type: validatedFields.data.id_type,
        dob: validatedFields.data.dob,
        phone_number: phone_number,
        first_name: first_name,
        last_name: last_name,
        iso_code: iso_code
    }

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        },
        body: JSON.stringify(body)
    }

    const submitIdVerificationRequest = await fetch(endpoint, payload).then(async(response) => {
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
        return submitIdVerificationRequest
    }catch(error){
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    }
}

export const fetchIdVerificationTypes = async(bearerToken: string|undefined, isoCode: string|undefined) => {
    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + `/kyc/country-verification-types?iso_code=${isoCode}` : PROD_BASE_URI + `/kyc/country-verification-types?iso_code=${isoCode}`

    let idTypes: UserKYCIDTypeProps[] = []
   
    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        }
    }

    const fetchVerificationTypes = await fetch(endpoint, payload).then(async(response) => {
        if(response.status === 500){
            idTypes = []
            return idTypes
        }

        const data = await response.json()

        if(data['status'] == false){
            idTypes = []
            return idTypes
        }

        if(data['status'] == true){
            idTypes = data['data']
            return idTypes
        }
    }).catch((error) =>{
        console.log(error)
        idTypes = []
        return idTypes
    })

    try{
        return fetchVerificationTypes
    }catch(error){
        console.log(error)
        idTypes = []
        return idTypes
    }
}