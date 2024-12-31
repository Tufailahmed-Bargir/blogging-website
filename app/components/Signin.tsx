'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LogInType} from "@/lib/Schemas"; // Ensure these are correctly defined
import axios from "axios";
import  Link  from "next/link";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LogInType) => {
    alert("Button clicked");
    try {
      const result = await axios.post("/api/signup", data);
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
          <h2 className="text-3xl font-black mb-6">Login to your account</h2>

          <div className="mb-6">
            <p className="text-gray-600">
              Dont&apos;t  have an account?{" "}?
              <Link href={'/signup'} className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


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
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>


    </div>
  );
}