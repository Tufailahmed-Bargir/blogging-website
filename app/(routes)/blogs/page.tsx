import { getBlogs } from "@/app/Actions/action"
import BlogPost from "@/components/BlogPost"
import Header from "@/components/Header"
import { BlogSchemaType } from "@/lib/Schemas"
// import BlogPost from "./components/BlogPost"
// import Header from "./components/Header"

export default async function Page() {
  const blogs = await getBlogs()

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Latest Stories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((item) => (
            <BlogPost key={item.id} {...item} />
          ))}
        </div>
      </main>
    </div>
  )
}

