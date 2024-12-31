import Quote from "@/app/components/Quote";
import SignUp from "@/app/components/Signup";




export default function SigninPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <SignUp />
      <Quote />
    </div>
  );
}