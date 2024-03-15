import NextAuth from "next-auth"
import authConfig from '@/auth.config'
//import GitHub from "next-auth/providers/github"
//import CredentialsProvider from "next-auth/providers/credentials";

//import {login} from '@/actions/auth'
export type UserProps={
  accessToken:string,
  email:string,
  tokenType:string
}
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
      // if(!user){
      //   console.log("No access token")
      // }
      console.log("LOGGED IN USER DETAILS", user)
      return true;
    },
    jwt: async ({ token, user }) => {
      if (!token.sub) return token;

      //const existingUser = await getUserById(token.sub);

      //if (!existingUser) return token;

      // const existingAccount = await getAccountByUserId(
      //   existingUser.id
      // );

      //token.isOAuth = !!existingAccount;
      //token.name = existingUser.name;
      //token.email = existingUser.email;
      //token.role = existingUser.role;
      //token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      console.log("JWT USER TOKEN OBJECT", token)
      return token;
     },
     session: async ({ session, token }) => {
      //  if (token) {
      //    //session.jwt = token.jwt;
      //  }
      console.log("USER SESSION", session)
       return session;
     },
  },
  //adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
