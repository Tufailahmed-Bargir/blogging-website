import prisma from "@/lib/db";
import { BlogSchema, BlogSchemaType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

    const data:BlogSchemaType = await req.json()

    const {title, description }= data
    if(!title || !description){
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
    
    const createBlog = await prisma.blogs.create({
        data:{
            title,
            description,
            authorId:'122'
        }
    })

    return NextResponse.json({
        msg:"blog created success!"
    })
}