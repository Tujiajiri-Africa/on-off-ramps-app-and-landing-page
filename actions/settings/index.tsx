"use server"

import { AuthError } from "next-auth";
import  * as z from 'zod'
import { 
    LoginSchema, 
    RegisterSchema, 
    PasswordResetSchema, 
    UserProfileSchema, 
    UserPasswordChangeSchema,
    UserPhoneVerificationSchema, 
    UserProfileAddressInfo
} from '@/schemas'
import {UserResponseDataProps} from '@/lib/utils'
import { DEV_BASE_URI, PROD_BASE_URI, ENVIRONMENT } from '@/helpers/data'
import {update} from '@/auth'
import {DEFAULT_LOGIN_REDIRECT} from '@/routes'
import { Session } from "inspector";

export const updateSession = async(prev:any, data:UserResponseDataProps) => {
    await update({
        ...prev, address: data?.data.address
    })
}

export const changePassword = async(
    values: z.infer<typeof PasswordResetSchema>, 
    bearerToken: string|undefined) =>{
        
    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

    const validatedFields = PasswordResetSchema.safeParse(values)
    
    if(!validatedFields.success){
        dataInfo = {
            error: 'Invalid Credentials',
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

    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/settings/reset-password' : PROD_BASE_URI + '/settings/reset-password'

    const sendUserPasswordResetRequest = fetch(endpoint,payload).then(async(response) =>{
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
        }).catch(()=>{
            dataInfo = {
                error: "Something went wrong!",
                success: '',
                data: ''
            }
            return {data: dataInfo}
        })

    try{
        return sendUserPasswordResetRequest
    }catch(error){
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    }
}

export const addPhoneNumber = async(
    values: z.infer<typeof UserPhoneVerificationSchema>,
    callbackUrl?: string | null
    ) => { 

    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

    const validatedFields = UserPhoneVerificationSchema.safeParse(values)

    if(!validatedFields.success){
        dataInfo = {
            error: 'Invalid Credentials',
            success: '',
            data: ''
        }
        return  { data: dataInfo}
    }

    const {phone} = validatedFields.data

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedFields.data)
    }

    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/profile/add-phone' : PROD_BASE_URI + '/profile/add-phone'

    const sendUserAddPoneRequest = fetch(endpoint,payload).then(async(response) =>{
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
        }).catch(()=>{
            dataInfo = {
                error: "Something went wrong!",
                success: '',
                data: ''
            }
            return {data: dataInfo}
        })

    try{
        return sendUserAddPoneRequest
    }catch(error){
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    }
}

export const updateProfile = async(
    values: z.infer<typeof UserProfileSchema>,
    callbackUrl?: string | null
    ) => { 

    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

    const validatedFields = UserProfileSchema.safeParse(values)

    if(!validatedFields.success){
        dataInfo = {
            error: 'Invalid Credentials',
            success: '',
            data: ''
        }
        return  { data: dataInfo}
    }

    const {first_name, last_name} = validatedFields.data

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedFields.data)
    }

    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/profile/update' : PROD_BASE_URI + '/profile/update'

    const sendUserProfileUpdateRequest = fetch(endpoint,payload).then(async(response) =>{
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
        }).catch(()=>{
            dataInfo = {
                error: "Something went wrong!",
                success: '',
                data: ''
            }
            return {data: dataInfo}
        })

    try{
        return sendUserProfileUpdateRequest
    }catch(error){
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    }
}

export const addUserAddressToProfile = async(
    bearerToken:string|undefined,
    values: z.infer<typeof UserProfileAddressInfo>
) => {

    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

    const validatedFields = UserProfileAddressInfo.safeParse(values)
    
    if(!validatedFields.success){
        dataInfo = {
            error: 'Invalid Credentials',
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

    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/profile/address' : PROD_BASE_URI + '/profile/address'

    const sendUserProfileAddressUpdateRequest = fetch(endpoint,payload).then(async(response) =>{
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
        }).catch(()=>{
            dataInfo = {
                error: "Something went wrong!",
                success: '',
                data: ''
            }
            return {data: dataInfo}
        })

    try{
        return sendUserProfileAddressUpdateRequest
    }catch(error){
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    }
}

export const fetchUserAddress = async(bearerToken:string|undefined) => {
    const endpoint =  ENVIRONMENT == 'local' ? DEV_BASE_URI + '/profile' : PROD_BASE_URI + '/profile'
    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        },
    }

    const fetchAddress = await fetch(endpoint, payload)
    .then(async(response) => {
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
        }).catch(()=>{
            dataInfo = {
                error: "Something went wrong!",
                success: '',
                data: ''
        }
        return {data: dataInfo}
    })

    try{
        return fetchAddress
    }catch(error){
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    }
}