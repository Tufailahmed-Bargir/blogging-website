// import prisma from "@/lib/db";
// import { SignUpSchema } from "@/lib/types";
// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// export async function POST(req:NextRequest) {

//    try {
//     const data = await req.json()

//     const {name, email, password}=data;
//     if(!name || !email ||!password){
//         return NextResponse.json({
//             msg:'provide all the fields'
//         })
//     }

//     const verifyData = SignUpSchema.safeParse(data)
//     if(!verifyData.success){
//         return NextResponse.json({
//             msg:"provide valid fields"
//         })
//     }

//     const UserExits = await prisma.user.findUnique({
//         where:{
//             email
//         }
//     })

//     if(UserExits){
//         return NextResponse.json({
//             msg:"user with this email already exists login instead!"
//         })
//     }
//     const hashPassword = await bcrypt.hash(password, 10)

//     const CreateUser = await prisma.user.create({
//         data:{
//             name,
//             email,
//             password:hashPassword
//         }
//     })
//     const jwtToken = await jwt.sign({id:CreateUser.id}, process.env.JWT_SECRET)
//     return NextResponse.json({
//         msg:'user created success',
//         CreateUser,
//         jwtToken
//     })
//    } catch (error:any) {
//     return NextResponse.json({
//         msg:"error found",
//         error:error.message
//     })
//    }
    
// }


import prisma from "@/lib/db";
import { SignUpSchema } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, password } = data;

    if (!name || !email || !password) {
      return NextResponse.json(
        { msg: "Provide all the fields" },
        { status: 400 }
      );
    }

    const verifyData = SignUpSchema.safeParse(data);
    if (!verifyData.success) {
      return NextResponse.json(
        { msg: "Provide valid fields", errors: verifyData.error.errors },
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json(
        { msg: "User with this email already exists. Login instead!" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    const jwtToken = jwt.sign(
      { id: createUser.id },
      process.env.JWT_SECRET ||"ahmed"
    );

    
    return NextResponse.json(
      {
        msg: "User created successfully",
        success:true,
        token:jwtToken,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        msg: "Error occurred",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
