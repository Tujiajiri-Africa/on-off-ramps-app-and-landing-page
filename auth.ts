import NextAuth from "next-auth"
import authConfig from '@/auth.config'
//import GitHub from "next-auth/providers/github"
//import CredentialsProvider from "next-auth/providers/credentials";

//import {login} from '@/actions/auth'
// export type UserProps={
//   accessToken:string,
//   email:string,
//   tokenType:string
// }
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      //Allow OAuth without email verification
      // if (account?.provider !== "credentials") return true;
      // //const data = await login(user.email)
      // if(!user.email){
      //   return false
      // }

      // if(user && user['user']['email_verified_at'] == null) {
      //   //verify email here
      //   send OTP here
      //   throw new Error('Email verification pending')
      // }
      console.log("LOGGED IN USER DETAILS", user)
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user['accessToken'],
          //refreshToken: user.refreshToken,
          tokenType: user['tokenType'],
          email: user['user']['email'],
          emailVerifiedAt: user['user']['email_verified_at'],
          id: user.id
        };
      }

      console.log('USER JWT', token)
      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      //session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
      session.email = token.email
      console.log("USER SESSION", session)
      return session;
    },
  },
  //adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
