"use server"

import  * as z from 'zod'
import { LoginSchema, RegisterSchema, PasswordResetSchema } from '@/schemas'

export const register = async(values: z.infer<typeof RegisterSchema>) =>{
    const endpoint = "http://127.0.0.1:8000/api/v1/auth/register"

    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success){
        return {error : 'Invalid credentials'}
    }
    
    //const {email, password, confirm_password} = validatedFields.data

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedFields.data)
    }

    try{
        await fetch(endpoint,payload).then(async(response) =>{
            if(response.status == 200 || response.status === 201){
                const data = await response.json()
                console.log(data)
            }else if(response.status === 500){
                console.log('server error while creating user')
            }else if(response.status === 404){
                console.log('Not found error')
            }else if(response.status === 422){
                console.log('validation error on server')
            }
          }).catch((error) => {
                console.log(error)
        })
    }catch(error){
        console.log(error)
        throw error
    }
}

export const login = async(values: z.infer<typeof LoginSchema>) => { 
    const endpoint = "http://127.0.0.1:8000/api/v1/auth/login"

    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success){
        return {error : 'Invalid credentials'}
    }

    //const {email, password} = validatedFields.data

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedFields.data)
    }

    try{
        await fetch(endpoint, payload)
        .then(async(response) =>{
            if(response.status === 200 || response.status === 201){
                const data = await response.json()
                const message = data['message']
                console.log(data)
            }else if(response.status === 500){
                console.log('server error while logging in')
            }else if(response.status === 404){
                console.log('Not found error')
            }else if(response.status === 422){
                console.log('validation error on server')
            }
    
          })
          .catch((error) => {
            console.log(error)
        })
    }catch(error){
        console.log(error)
        throw error
    }
}

export const resetPassword = async(values: z.infer<typeof PasswordResetSchema>) =>{
    console.log(values)
}