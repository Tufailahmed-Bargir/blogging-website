import prisma from "@/lib/db";
import { BlogSchema, BlogSchemaType, UpdateBlogSchema } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest) {

    const data:BlogSchemaType = await req.json()

    const {title, description }= data
    if(!title && !description){
        return NextResponse.json({
            msg:"atleast one fild is required!"
        })
    }
    const verifyData  = UpdateBlogSchema.safeParse(data)
    if(!verifyData){
        return NextResponse.json({
            msg:"provide the valid data formate"
        })
    }
    
    const updateBlog = await prisma.blogs.update({
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