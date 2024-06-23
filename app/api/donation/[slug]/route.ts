import { connectMongo } from "@/middleware/connectMongo";
import donation from "@/model/donation";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: Request, { params }: { params: { slug: string } }){
    const slug = params.slug ; 
    
    console.log(slug)
    const id = new mongoose.Types.ObjectId(slug) ;
    try {
        await connectMongo() ; 
        const res  = await donation.findById(id) ;
        
        if(res){
            console.log(res)
            return NextResponse.json({data: res}, {status : 200})
        }
        else {
            return NextResponse.json({data: null}, {status:405})
        }
    } catch (error) {
            console.log(error) ; 
            return NextResponse.json({data: null}, {status:500})
    }
}