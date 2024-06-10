"use server"

import { AuthError } from "next-auth";
import  * as z from 'zod'
import { 
    UserIdVerificationSchema
} from '@/schemas'
import {UserResponseDataProps} from '@/lib/utils'
import { DEV_BASE_URI, PROD_BASE_URI, ENVIRONMENT } from '@/helpers/data'
import {signIn} from '@/auth'
import {DEFAULT_LOGIN_REDIRECT} from '@/routes'

export const sendIdVerificationRequest = async(
    values: z.infer<typeof UserIdVerificationSchema>,
    bearerToken: string|undefined,
    firs_name: string|undefined,
    last_name: string|undefined,
    dob: string|undefined,
    gender: string|undefined,
    phone_number: string|undefined,
    iso_code: string|undefined 
){
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
        validatedFields.data,
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        gender: gender,
        phone_number: phone_number,
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
