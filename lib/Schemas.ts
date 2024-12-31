import {z} from 'zod'

export const SignUpSchema = z.object({
    name:z.string().min(4,{message:'name must be 4 char long'}),
    email:z.string().email({message:"email must be valid"}),
    password:z.string().min(4,{message:'password must be 4 char long'})
})

export const LoginSchema = z.object({
   
    email:z.string().email({message:"email must be valid"}),
    password:z.string().min(4,{message:'password must be 4 char long'})
})

export const BlogSchema = z.object({
    title:z.string().min(4,{message:"title must be 4 char long"}),
    desc:z.string().min(4,{message:"desc must be 4 char long"})
})

export const UpdateBlogSchema = z.object({
    title:z.string().min(4,{message:"title must be 4 char long"}).optional(),
    description:z.string().min(4,{message:"desc must be 4 char long"}).optional()
})
export type UpdateBlogSchemaType = z.infer<typeof UpdateBlogSchema>
export type BlogSchemaType = z.infer<typeof BlogSchema>
export type SignUpType = z.infer<typeof SignUpSchema>
export type LogInType = z.infer<typeof LoginSchema>

export enum StatusCode{
    success=200,
    NotFound=404,
    created=201,
    InternalServerError=500,
    Unauthorized=411
}