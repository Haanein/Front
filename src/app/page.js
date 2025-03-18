"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "./components/Header";

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  if (!isSignedIn) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md p-8 shadow-xl rounded-2xl border border-gray-300 bg-white text-center transition-transform transform scale-105">
          <h2 className="text-2xl font-bold text-white">Access Denied</h2>
          <p className="text-gray-600 mt-3 mb-6 text-sm">
            You must be signed in to view this page.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="w-full px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-dark-blue flex flex-col items-center justify-center h-screen text-white">
      <Header />
      <h1 className="text-2xl font-bold">Welcome, {user.firstName}!</h1>
      <UserButton />
    </div>
  );
}
