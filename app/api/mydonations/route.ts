import { connectMongo } from "@/middleware/connectMongo";
import donation from "@/model/donation";
import { NextAuthOptions, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/model/user";
import mongoose from "mongoose";
import { useId } from "react";

interface CustomUser {
    _id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    phone : string
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
            const {name, email, _id, phone} = user ;
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




export async function GET(req: Request){
    const session = await getServerSession(authOption)

    try {
        await connectMongo() ;
        const userId = new mongoose.Types.ObjectId((session as any).user._id)
        console.log((session as any).user)
        let data = await donation.find({user: userId}) ; 
        

        if (data ){

        return NextResponse.json({message: "success data",data: data.reverse() },{status: 200})}
        else 
        return NextResponse.json({message: "No donations found"}, {status: 404})
    } catch (error) {
        console.log(error) ; 
        return NextResponse.json({message: "Failed"}, {status: 500})
    }
}