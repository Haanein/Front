import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#6366F1",
            colorBackground: "#FFFFFF",
            fontFamily: "sans-serif",
          },
        }}
      />
    </div>
  );
}
