import * as z from 'zod'
import {countries} from '@/helpers/data'
import {phoneRegex} from '@/lib/utils'
import {isValidPhoneNumber} from 'react-phone-number-input'

export const LoginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Email must be a valid email address"
    }),
    password: z.string({
        required_error: "Password is required"
    })
})

export const RegisterSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Email must be a valid email address"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6,{
        message: "Minimum 6 characters required"
    }),
    confirm_password: z.string({
        required_error: "Password confirmation is required"
    }).min(6,{
        message: "Minimum 6 characters required"
    }),
    // username: z.string({
    //     required_error: "Username is required"
    // }).min(4,{
    //     message: 'Minimum 4 characters required'
    // }).max(8,{
    //     message: 'Maximum 8 characters required'
    // }),
    first_name: z.string({
        required_error: "First name is required"
    }).min(3, {
        message: 'Minimum 3 characters required'
    }).max(11,{
        message: 'Maximum 11 characters required'
    }),
    last_name: z.string({
        required_error: "Last name is required"
    }).min(3, {
        message: "Minimum 3 characters required"
    }).max(11,{
        message: 'Maximum 11 characters required'
    }),
    phone: z.string({
        required_error: "Please provide phone number"
    }).min(13, {
        message: 'Minimum 13 characters required'
    }).max(14,{
        message: 'Maximum 14 characters required'
    }),
    iso_code: z.string({
        required_error: "Country is required!"
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

//   phone: z.object({
//     phone: z
//       .string()
//       .refine(isValidPhoneNumber, { message: "Invalid phone number" })
//       .or(z.literal("")),
//   });
export const PasswordResetSchema = z.object({
    current_password: z.string({
        required_error: "Current password is required!"
    }).min(6,{
        message: 'Minimum 6 characters required!'
    }),
    new_password: z.string({
        required_error: "Passsword is required!"
    }).min(6,{
        message: 'Miminum 6 characters required!'
    }),
    confirm_password: z.string({
        required_error: "Password confirmation is required!"
    }).min(6,{
        message: 'Miminum 6 characters required!'
    })
}).refine((value) => {
    return value.new_password == value.confirm_password;
},{
    message: 'Passwords do not match!',
    path: ['confirm_password']
})

export const ForgotPasswordSchema = z.object({
    email: z.string({
        required_error: 'Email is required!'
    }).email({
        message: "Invalid email address!"
    }).trim()
}).required()
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
    }),
    username: z.string({
        required_error: "Username is requried!"
    }).min(3,{
        message: "Mimimum 3 characters required!"
    }).max(10,{
        message: "Maximum 10 characters required"
    }),
    email: z.string({
        required_error: "Email is required!"
    }).email({
        message: "Invalid email address!"
    }),
    phone: z.string({
        required_error: "Please provide phone number, ensure it is your mobile money number!"
    }).min(13, {
        message: 'Minimum 13 characters required!'
    }).max(14,{
        message: 'Maximum 14 characters required!'
    }),
})

export const UserProfileAddressInfo = z.object({
    address_line_1: z.string({
        required_error: "Address is required!"
    }).max(50, {
        message: 'Maximum 50 characters required!'
    }),
    address_line_2: z.string().max(50, {
        message: 'Maximum 50 characters required!'
    }).optional(),
    zip_code: z.string({
        required_error: "Zip code is required!"
    }).min(4,{
        message: "Minimum 4 characters required!"
    }).max(10,{
        message: 'Maximum 10 characters required!'
    }),
    street: z.string({
        required_error: "Street is required!"
    }).min(3, {
        message: "Minimum 3 characters required!"
    }).max(20,{
        message: "Maximum 20 characters required!"
    }),
    // building: z.string().min(3,{
    //     message: "Minimum 3 characters required!"
    // }).max(20,{
    //     message: "Maximum 20 characters required!"
    // }).optional(),
    city: z.string({
        required_error: "City is required!"
    }).min(3,{
        message: 'Minimum 3 characters required!'
    }).max(20,{
        message: 'Maximum 20 characters required!'
    }),
    state: z.string({
        required_error: "State is required!"
    }).min(3,{
        message: "Minimum 3 characters required!"
    }).max(20, {
        message: 'Maximum 20 characters required!'
    })
});

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
    // amount: z.number().gt(1,{ //300
    //     message: "Minimum deposit amount is KES 1" //300
    // })
    amount: z.string({
        required_error: 'Amount is required'
    }),
    payment_method: z.string({
        required_error: 'Please select payment network'
    })
})

export const WithdrawSchema = z.object({
    amount: z.string({required_error: 'Amount is required'}),
    channel: z.string({required_error: "Please select payment network"})
})

export const CryptoRewardClaimSchema = z.object({
    amount: z.string({
        required_error: 'Amount is required'
    }),
    payment_method: z.string({
        required_error: 'Please select payment network'
    })
})

export const BuyAssetSchema = z.object({
    asset_address: z.string({required_error: "Please specify the crypto to buy"}),
    amount: z.string({
        required_error: "Please specify local currency amount"
    }),
    payment_method: z.string({required_error: "Please select payment method"})
})

export const SellAssetSchema = z.object({
    asset: z.string({required_error: "Please specify specify the crypto to sell"}),
    amount: z.number({required_error: "Please specify amount"}).min(300,{
        message: 'Minimum purchase amount is KES 300'
    }),
    payment_method: z.string({required_error: "Please select payment method"})
})

export const PhoneRegistrationOTPSchema = z.object({
    registration_otp: z.string({
        required_error: "OTP is required!"
    }).min(6,{
        message: "Please enter the correct number of characters sent to your phone"
    })
})

export const InvoiceSchema = z.object({
    client_email: z.string({
        required_error: 'Client or vendor email is required!'
    }).email({
        message: 'Client email must be valid email address'
    }),
    unit_price: z.string({
        required_error: 'Unit price is required!'
    }),
    // }).min(1,{
    //     message: 'Amount must be greator than 1'
    // }),
    // currency: z.string({
    //     required_error: "Please enter currency!"
    // }),
    item_quantity: z.string({
        required_error: 'Please specify quantity!'
    }).min(1,{
        message: 'Quantity must be at leats 1'
    }),
    item_name: z.string({
        required_error: 'Item name is required!'
    }).min(3,{
        message: 'Minimum 3 characters required!'
    }).max(50, {
        message: "Maximum 50 characters required!"
    }),
    item_description: z.string({
        required_error: 'Item description is required!'
    }).min(3, {
        message: 'Minimum 3 characters required!'
    }).max(180, {
        message: "Only 180 characters required!"
    }),
    payment_method: z.string({
        required_error: 'Please select payment method!'
    }),
    due_date: z.date({
        required_error: 'Due date is required!',
        invalid_type_error: 'Invalid date format!'
    })//.min(new Date(),{message: 'Cannot use previous date!'})
}).refine((value) => {
    return value.due_date > new Date()
},{message: 'Due date must be a date greator than today!'})

export const UserIdVerificationSchema = z.object({
    id_type: z.string({
        required_error: "ID type is required!"
    }),
    id_number: z.string({
        required_error: "ID number is required!"
    }),
    dob: z.string({
        required_error: "Please provide your date of birth!"
    }),
    gender: z.string({
        required_error: "Please specify your gender!"
    }),
    middle_name: z.string({
        required_error: "Legal middle name is required!"
    })
})