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