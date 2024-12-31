import prisma from "@/lib/db";
import { LoginSchema } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
export async function POST(req:NextRequest) {

    const data = await req.json()

    const {email, password}=data;
    if( !email ||!password){
        return NextResponse.json({
            msg:'provide all the fields'
        })
    }

    const verifyData = LoginSchema.safeParse(data)
    if(!verifyData.success){
        return NextResponse.json({
            msg:"provide valid fields"
        })
    }

    const UserExits = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(!UserExits){
        return NextResponse.json({
            msg:"user not  exists create account first!"
        })
    }
    const verifyPassword = await bcrypt.compare(password, UserExits.password )
    if(!verifyPassword){
        return NextResponse.json({
            msg:"invalid password"
        })
    }

    
    return NextResponse.json({
        msg:'user login success',
         
    })
    
}