import * as z from 'zod'
import {countries} from '@/helpers/data'
import {phoneRegex} from '@/lib/utils'

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6,{
        message: "Minimum 6 characters required"
    }),
    confirm_password: z.string().min(6,{
        message: "Minimum 6 characters required"
    })
}).refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    }
  );

export const PasswordResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    })
})

export const UserProfileSchema = z.object({
    first_name: z.string().min(3,{
        message: "Minimum 3 characters required"
    }),
    last_name: z.string().min(3,{
        message: "Minimum 3 characters required"
    })
})

export const UserPasswordChangeSchema = z.object({
    current_password: z.string().min(6,{
        message: "Minimum 6 characters required"
    }),
    new_password: z.string().min(6,{
        message: "Minimum 6 characters required"
    }),
    confirm_password: z.string().min(6,{
        message: 'Minimum 6 characters required'
    })
}).refine((values) => {
    //get user session and check password match current logged in user password here
    const isValid = values.new_password === values.confirm_password
    return isValid
}, {
    message: "Passwords do not match"
})

export const UserPhoneVerificationSchema = z.object({
    phone: z.string().min(10,{
       message: "Minimum 10 characters required"
    }).regex(phoneRegex, {message: "Invalid phone number"})
}).refine((values) => {
    const codePattern = values.phone.slice(0, 4)
    const country = countries.find(({ code }) => code === codePattern);
    return country?.active == true
},
{
    message: "Country not supported yet"
}
)