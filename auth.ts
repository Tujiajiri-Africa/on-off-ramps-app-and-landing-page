import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import authConfig from '@/auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {

    },
    callbacks:{

    },
    //adapter: '',
    session: {strategy: 'jwt'},
    ...authConfig
})