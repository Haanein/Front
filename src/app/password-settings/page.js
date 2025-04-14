"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../components/Header";

export default function PasswordSettingsPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      if (user && password) {
        await user.update({ password });
        setSuccess(true);
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
      } else {
        setError("Please fill in all fields.");
      }
    } catch (err) {
      setError("Failed to update password.");
    }
  };

  if (!isLoaded) {
    return <div className="text-white p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#1E2636] text-white px-4 sm:px-6 lg:px-8 py-8">
      <Header />
      <div className="max-w-md mx-auto mt-10 bg-[#2A3448] p-8 rounded-2xl shadow-lg border border-[#3A465C]">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Change Password
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#1E2636] border border-[#3A465C] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter new password"
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {success && (
            <div className="text-green-500 text-sm mb-4">
              Password updated successfully! Redirecting...
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-4 rounded-md"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
