"use server"

import  * as z from 'zod'
import { LoginSchema, RegisterSchema, PasswordResetSchema } from '@/schemas'
import {UserResponseDataProps} from '@/lib/utils'

export const register = async(values: z.infer<typeof RegisterSchema>) =>{
    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

    const endpoint = "http://127.0.0.1:8000/api/v1/auth/register"

    const validatedFields = RegisterSchema.safeParse(values)
    
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
            'Accept': 'application/json'
        },
        body: JSON.stringify(validatedFields.data)
    }

    const sendUserRegistrationRequest = fetch(endpoint,payload).then(async(response) =>{
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
        //handle login here with nextauth
        return sendUserRegistrationRequest
    }catch(error){
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    }
}

export const login = async(values: z.infer<typeof LoginSchema>) => { 
    const endpoint = "http://127.0.0.1:8000/api/v1/auth/login"

    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success){
        dataInfo = {
            error: 'Invalid Credentials',
            success: '',
            data: ''
        }
        return  { data: dataInfo}
    }

    //const {email, password} = validatedFields.data

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedFields.data)
    }

    const sendUserLoginRequest = fetch(endpoint,payload).then(async(response) =>{
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
        //handle login here with nextauth
        return sendUserLoginRequest
    }catch(error){
        dataInfo = {
            error: 'Something went wrong!',
            success: '',
            data: ''
        }
        return {data: dataInfo}
    }
}

export const resetPassword = async(values: z.infer<typeof PasswordResetSchema>) =>{
    console.log(values)
}