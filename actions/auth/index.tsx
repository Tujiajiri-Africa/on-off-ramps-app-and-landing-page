"use server"

import  * as z from 'zod'
import { LoginSchema, RegisterSchema, PasswordResetSchema } from '@/schemas'

export const register = async(values: z.infer<typeof RegisterSchema>) =>{
    console.log(values)
}

export const login = async(values: z.infer<typeof LoginSchema>) => {
    console.log(values)
}

export const resetPassword = async(values: z.infer<typeof PasswordResetSchema>) =>{
    console.log(values)
}