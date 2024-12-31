import Quote from "@/app/components/Quote";
import Signin from "@/app/components/Signin";




export default function SigninPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <Signin />
      <Quote />
    </div>
  );
}