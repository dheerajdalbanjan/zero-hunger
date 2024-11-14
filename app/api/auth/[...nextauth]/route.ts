
import { connectMongo } from "@/middleware/connectMongo";
import User from "@/model/user";
import NextAuth from "next-auth"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {},
      async authorize(credentials) {
        let { email, password } = (credentials as any)
        const e = email ;
        try {
          // ... authentication logic
          const db = await connectMongo();

          const user = await User.findOne({ email: e })
          if (!user) {
            throw new Error('Email not found')
          }
          if (password != user?.password) {
            throw new Error('Password did not match')
          }
          console.log(user)
          const {name, email, _id, phone, role} = user ;
          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          if ((error as Error).message === 'Email not found' || (error as Error).message === 'Password did not match') {
            throw error; // Pass along the original error
          } 
          else if((error as Error).message === 'Email not found' && (error as Error).message === 'Password did not match'){
            throw new Error('Invalid credentials')
          }else {
            throw new Error('Something went wrong'); // For other unexpected errors
          }
        }
      }

      })
  ],
  session: {
    strategy: "jwt",

  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session && session.user) {
        session.user._id = token.id as string;
      }
      
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  }

}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }