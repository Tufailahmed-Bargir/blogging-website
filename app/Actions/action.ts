import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function getBlogs() {
    const blogs = await prisma.blog.findMany({})
    return blogs
    
}