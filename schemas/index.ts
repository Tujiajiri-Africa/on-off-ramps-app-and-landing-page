import * as z from 'zod'
import {countries} from '@/helpers/data'
import {phoneRegex} from '@/lib/utils'
import {isValidPhoneNumber} from 'react-phone-number-input'

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
    }),
    username: z.string().min(4,{
        message: 'Minimum 4 characters required'
    }).max(8,{
        message: 'Maximum 8 characters required'
    }),
    first_name: z.string().min(4, {
        message: 'Minimum 4 caharacters required'
    }).max(11,{
        message: 'Maximum 11 characters required'
    }),
    last_name: z.string().min(4, {
        message: "Minimum 4 characters required"
    }).max(11,{
        message: 'Maximum 11 characters required'
    }),
    phone: z.string().min(13, {
        message: 'Minimum 13 characters required'
    }).max(14,{
        message: 'Maximum 14 characters required'
    }),
    //country:z.string()
}).refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    }
  );

//   phone: z.object({
//     phone: z
//       .string()
//       .refine(isValidPhoneNumber, { message: "Invalid phone number" })
//       .or(z.literal("")),
//   });
export const PasswordResetSchema = z.object({
    current_password: z.string().min(6,{
        message: 'Current password is required!'
    }),
    new_password: z.string().min(6,{
        message: 'Miminum 6 characters required!'
    }),
    confirm_password: z.string().min(6,{
        message: 'Miminum 6 characters required!'
    })
}).refine((value) => {
    return value.new_password == value.confirm_password;
},{
    message: 'Passwords do not match!',
    path: ['confirm_password']
})

export const ForgotPasswordSchema = z.object({
    email: z.string().email({
        message: "Invalid email address"
    })
})
// const sender = {
//     name: "Sample Name",
//     country: "US",
//     phone: "+12222222222",
//     address: "Sample Address",
//     dob: "mm/dd/yyyy",
//     email: "email@domain.com",
//     idNumber: "0123456789",
//     idType: "license"
//   }

//   const destination = {
//     accountNumber: "0690000040",
//     accountType: network.accountNumberType,
//     country: network.country,
//     networkId: network.id,
//     accountBank: network.code
//   }

// let request = {
//     channelId: channel.id,
//     currency: channel.currency,
//     country: channel.country,
//     amountUSD,
//     reason,
//     destination,
//     sender
//   }

// {
//     "partnerId": "9ecf5248-17e7-4a2b-b5a8-3bd58ff0fe01",
//     "currency": "NGN",
//     "rate": 679.91,
//     "status": "process",
//     "createdAt": "2023-03-21T17:01:46.746Z",
//     "sequenceId": "64ajhfba-aHbv-4b96-v28d-5h8a19c2aa8c",
//     "country": "NG",
//     "reason": "other",
//     "sender": {
//       "country": "Nigeria",
//       "address": "12 John Street, Lagos",
//       "idType": "12",
//       "phone": "+12514218828",
//       "dob": "02/01/1997",
//       "name": "John Smith",
//       "idNumber": "12",
//       "email": "justin@yellowcard.io"
//     },
//     "convertedAmount": 60000,
//     "channelId": "fe8f4989-3bf6-41ca-9621-ffe2bc127569",
//     "expiresAt": "2023-03-21T17:11:46.729Z",
//     "updatedAt": "2023-03-21T17:02:28.733Z",
//     "amount": 88.25,
//     "destination": {
//       "networkName": "Stanbic Ibtc Bank",
//       "networkId": "3d4d08c1-4811-4fee-9349-a302328e55c1",
//       "accountNumber": "0760349371",
//       "accountName": "Héloïse D'arban",
//       "accountType": "bank"
//     },
//     "id": "0d72f565-f617-534c-871d-c055ee28c544"
//   }
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
    message: "Passwords do not match",
    path: ['confirm_password']
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

export const DepositSchema = z.object({
    amount: z.number().gt(300,{
        message: "Minimum deposit amount is KES 300"
    })
})

export const WithdrawSchema = z.object({
    amount: z.number().gt(50,{
        message: "Minimum withdrawal amount is KES 50"
    }),
    channel: z.string()
})

export const BuyAssetSchema = z.object({
    asset: z.string(),
    amount: z.number().min(300,{
        message: 'Minimum purchase amount is KES 300'
    }),
    payment_method: z.string()
})

export const SellAssetSchema = z.object({
    asset: z.string(),
    amount: z.number().min(300,{
        message: 'Minimum purchase amount is KES 300'
    }),
    payment_method: z.string()
})

export const PhoneRegistrationOTPSchema = z.object({
    registration_otp: z.string().min(6,{
        message: "Please enter the correct number of characters sent to your phone"
    })
})