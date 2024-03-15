import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import {LoginSchema} from '@/schemas'
//import {login} from '@/actions/auth'
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
        //const {} = req.
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

          try{
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
          }catch(error){
            throw error
          }  
        }

        return null
      }
    })
  ],
} satisfies NextAuthConfig