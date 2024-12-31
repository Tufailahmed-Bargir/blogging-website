import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { StatusCode } from "./lib/types";
export default async function Middleware(req:NextRequest) {

    try {
        const token = req.headers.get('authorization')
    if(!token){
        return NextResponse.json(
            {msg:"token required!"},
            {status:StatusCode.Unauthorized}
        )
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET||"")
    
    return NextResponse.next()
    } catch (error:any) {
        return NextResponse.json({
            msg:"error found",
            error:error.message
        },{status:StatusCode.Unauthorized})
    }

    

    
}

export const config = {
    matcher: ['/api/protected/'], // Adjust this path according to your needs
};