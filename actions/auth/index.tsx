"use server"

import { AuthError } from "next-auth";
import  * as z from 'zod'
import { LoginSchema, RegisterSchema, PasswordResetSchema } from '@/schemas'
import {UserResponseDataProps} from '@/lib/utils'
import { DEV_BASE_URI, PROD_BASE_URI, ENVIRONMENT } from '@/helpers/data'
import {signIn} from '@/auth'
import {DEFAULT_LOGIN_REDIRECT} from '@/routes'

export const register = async(values: z.infer<typeof RegisterSchema>) =>{
    let dataInfo: UserResponseDataProps = {
        data: "",
        error: "",
        success: ""
    }

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

    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/auth/register' : PROD_BASE_URI + '/auth/register'

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

export const login = async(
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null
    ) => { 

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

    const {email, password} = validatedFields.data

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedFields.data)
    }

    const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/auth/login' : PROD_BASE_URI + '/auth/login'

    // const sendUserLoginRequest = fetch(endpoint,payload).then(async(response) =>{
    //     if(response.status === 500){
    //         dataInfo = {
    //             error: 'Something went wrong!',
    //             success: '',
    //             data: ''
    //         }

    //         return { data: dataInfo}
    //     }
    //     const data = await response.json()
    //     if(data['status'] == false){
    //         dataInfo = {
    //             error: data['message'],
    //             success: '',
    //             data: ''
    //         }

    //         return { data: dataInfo}
    //     }
    //     if(data['status'] == true){
    //         dataInfo = {
    //             error: "",
    //             success: data['message'],
    //             data: data['data']
    //         }

    //         return { data: dataInfo}
    //     }
    //     }).catch(()=>{
    //         dataInfo = {
    //             error: "Something went wrong!",
    //             success: '',
    //             data: ''
    //         }
    //         return {data: dataInfo}
    //     })
        
        

        try {
          //const data = sendUserLoginRequest
         
            await signIn("credentials", {
              email,
              password,
              redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
            })
            
            //const sendUserLoginRequest = 
            //return sendUserLoginRequest
          } catch (error) {
            if (error instanceof AuthError) {
              switch (error.type) {
                case "CredentialsSignin":
                    dataInfo = {
                        error: 'Invalid credentials!',
                        success: '',
                        data: ''
                    }
                  return { data: dataInfo }
                case "AccessDenied":
                    dataInfo = {
                        error: "Please check and verify your email to continue!",
                        success: "",
                        data: ""
                    }
                  return {data:dataInfo}
                default:
                    dataInfo = {
                        error: 'Something went wrong!',
                        success: '',
                        data: ''
                    }
                  return { data: dataInfo }
              }
            }
            
            // dataInfo = {
            //     error: "Something went wrong!",
            //     success: '',
            //     data: ''
            // }
            // return {
            //     data: dataInfo
            // }
            throw error
          }
    // try{
    //     //handle login here with nextauth
    //     //signIn("credentials")
    //     return sendUserLoginRequest
    // }catch(error){
        // dataInfo = {
        //     error: 'Something went wrong!',
        //     success: '',
        //     data: ''
        // }
    //     return {data: dataInfo}
    // }
}

export const resetPassword = async(values: z.infer<typeof PasswordResetSchema>) =>{
    console.log(values)
}