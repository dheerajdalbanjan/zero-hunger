
import {connectMongo} from '@/middleware/connectMongo'
import User from '@/model/user';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {


    try {
        const {name, email, password, role, phone} = await req.json() ;
        await connectMongo() ;
        User.create({name, email, password, role, phone})

        return NextResponse.json({ message: "User created" }, { status: 201 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "An error occured while signing up the user" }, { status: 500 })
    }
}
