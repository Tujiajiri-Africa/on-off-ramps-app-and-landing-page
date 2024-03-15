import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import {LoginSchema} from '@/schemas'
import {login} from '@/actions/auth'
import {UserResponseDataProps} from '@/lib/utils'
import { DEV_BASE_URI, PROD_BASE_URI, ENVIRONMENT } from '@/helpers/data'

export default {
  providers: [
    CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            //name: "Credentials",
            // The credentials are used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            // credentials: {
            //   email: {
            //     label: "Email",
            //     type: "email",
            //     placeholder: "johndoe@email.com",
            //   },
            //   password: { label: "Password", type: "password", placeholder: "************" },
            // },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        const endpoint = ENVIRONMENT == 'local' ? DEV_BASE_URI + '/auth/login' : PROD_BASE_URI + '/auth/login'

        let dataInfo: UserResponseDataProps = {
          data: "",
          error: "",
          success: ""
        }

        if(validatedFields.success){
          const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validatedFields.data)
          }

          return await fetch(endpoint, payload).then(async(response) => {
            const data = await response.json()
            if(data['status'] == true){
                const user = data['data']
                return user
            }else{
              return false
            }
          }).catch((error) => {
            console.log(error)
            throw error
          })

          // const sendUserLoginRequest = await fetch(endpoint,payload).then(async(response) =>{
          //   if(response.status === 500){
          //       dataInfo = {
          //           error: 'Something went wrong!',
          //           success: '',
          //           data: ''
          //       }
    
          //       return { data: dataInfo}
          //   }
          //   const data = await response.json()
          //   if(data['status'] == false){
          //       dataInfo = {
          //           error: data['message'],
          //           success: '',
          //           data: ''
          //       }
    
          //       return { data: dataInfo}
          //   }
          //   if(data['status'] == true){
          //       dataInfo = {
          //           error: "",
          //           success: data['message'],
          //           data: data['data']
          //       }
    
          //       return { data: dataInfo}
          //   }
          //   }).catch(()=>{
          //       dataInfo = {
          //           error: "Something went wrong!",
          //           success: '',
          //           data: ''
          //       }
          //       return {data: dataInfo}
          //   })

          // try{
          //     //handle login here with nextauth
          //     return sendUserLoginRequest
          // }catch(error){
          //     dataInfo = {
          //         error: 'Something went wrong!',
          //         success: '',
          //         data: ''
          //     }
          //     return {data: dataInfo}
          // }
          /**
           * 
           *    {
            "status": true,
            "message": "Login successful",
            "data": {
                "user": {
                    "id": 1,
                    "email": "dickensodera9@gmail.com",
                    "email_verified_at": null,
                    "created_at": "2024-03-03T21:09:14.000000Z",
                    "updated_at": "2024-03-15T12:31:17.000000Z",
                    "last_login": "2024-03-15T12:31:17.000000Z"
                },
                "accessToken": "9|J77rd0gwPOJQkpGF5c3XOxMBDBB4pYh1jffZSsiq5a5d738f",
                "tokenType": "Bearer"
            }
        }
           */
       
          // const {email, password} = validatedFields.data
          // const data = await login(validatedFields.data)
          // if(!data?.data.success) return null
          // const user = data?.data.data['user']
          // const accessToken = data?.data.data['accessToken']
          // const tokenType = data?.data.data['tokenType']
          // const userData = {
          //   email: user['email'],
          //   accessToken: accessToken,
          //   tokenType: tokenType
          // }
          // if(user['email'] == email) return userData
          //return userData
          // return {
          //   ...credentials,
          //   userData
          // }

          
        }

        return null
      }
    })
  ],
} satisfies NextAuthConfig