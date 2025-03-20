import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center h-auto w-screen gap-10">
      <SignUp />
    </div>
  );
}
