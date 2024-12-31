'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpType } from "@/lib/Schemas"; // Ensure these are correctly defined
import axios from "axios";
import Link  from "next/link";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignUpType) => {
    // alert("Button clicked");
    const {name, email, password}= data;
    console.log('frontend data', name, email, password);
    try {
      const result = await axios.post("http://localhost:3000/api/users/signup",{name,email,password});
      console.log("Result:", result.data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section - Sign Up Form */}
      <div className="flex-1 p-8 md:p-16 lg:p-24 bg-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-black mb-2">Welcome to Medium!</h1>
          <h2 className="text-3xl font-black mb-6">Create an account</h2>

          <div className="mb-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href={'/signin'} className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                {...register("name")}
                type="text"
                id="username"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="JOhn Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                {...register("email")}
                type="text"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="JohnDoe@gmail.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123456"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#1A1B1E] text-white py-3 rounded-md hover:bg-gray-800 transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Signing in..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>


    </div>
  );
}