'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, Toaster } from 'sonner';

type BlogSchemaType = {
  title: string;
  desc: string;
};

export default function CreateBlog() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<BlogSchemaType>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: BlogSchemaType) => {
    setIsLoading(true);
    try {
      const result = await axios.post('/api/create', data);
      if (result.data.Success) {
        toast.success("Blog created successfully!");
        setTimeout(() => {
          router.push('/blogs');
        }, 1000);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
      toast.error("Failed to create the blog.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-extrabold text-center text-white mb-6">
            Create a New Blog Post
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className={`mt-1 block w-full px-4 py-2 bg-gray-700 border rounded-md shadow-sm ${
                  errors.title ? 'border-red-500' : 'border-gray-600'
                } text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter your blog title"
              />
              {errors.title && <p className="mt-2 text-sm text-red-400">{errors.title.message}</p>}
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="desc" className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                id="desc"
                {...register("desc", { required: "Description is required" })}
                className={`mt-1 block w-full px-4 py-2 bg-gray-700 border rounded-md shadow-sm ${
                  errors.desc ? 'border-red-500' : 'border-gray-600'
                } text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 resize-none`}
                placeholder="Write a brief description of your blog post"
                rows={4}
              ></textarea>
              {errors.desc && <p className="mt-2 text-sm text-red-400">{errors.desc.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Blog Post'}
            </button>
          </form>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

