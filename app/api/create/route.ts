import prisma from "@/lib/db";
import { BlogSchema, BlogSchemaType } from "@/lib/Schemas";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
export async function POST(req:NextRequest) {

  
    try {
        
        
    const data:BlogSchemaType = await req.json()

    const {title, desc }= data
    if(!title || !desc){
        return NextResponse.json({
            msg:"all fields are mandatory!"
        })
    }
    const verifyData  = BlogSchema.safeParse(data)
    if(!verifyData){
        return NextResponse.json({
            msg:"provide the valid data formate"
        })
    }
    
  
    const createBlog = await prisma.blog.create({
        data:{
            title,
            desc,
             
        }
    })

    return NextResponse.json({
        msg:"blog created success!",
        createBlog,
        Success:true
    })
    } catch (error:any) {
        return NextResponse.json(
            {msg:'error found',error:error.message},
             
        )
    }
}