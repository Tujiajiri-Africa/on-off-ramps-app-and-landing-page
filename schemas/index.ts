import * as z from 'zod'

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
    }),
    phone: z.string().min(10,{
        message: "Enter your mobile money number"
    })
}).refine((values) => {
    return values.phone.startsWith("+254") || values.phone.startsWith("+234") || values.phone.startsWith("+255")
}, {
    message: "Phone must begin with +254 or +234 or +255"
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