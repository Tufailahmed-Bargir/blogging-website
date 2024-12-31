import { BlogSchemaType } from "@/lib/Schemas"
import Image from "next/image"
import Link from "next/link"

export default function BlogPost({  title, desc,  }: BlogSchemaType) {
  return (
    <Link href={`/blog/`} className="block">
      <article className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
     
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
          <p className="text-gray-600 mb-4">{desc}</p>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">{'Anonymous'}</span>
            <span>{new Date( Date.now()).toLocaleDateString()}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

