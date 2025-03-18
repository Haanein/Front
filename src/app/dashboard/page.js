"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  if (!isSignedIn) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md p-6 shadow-lg rounded-lg border border-gray-200 bg-white">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Access Denied
            </h2>
            <p className="text-gray-600 mt-2 mb-4">
              You must be signed in to view this page.
            </p>
            <button
              onClick={() => router.push("/sign-in")}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-semibold">Welcome, {user.firstName}!</h1>
      <UserButton />
    </div>
  );
}
