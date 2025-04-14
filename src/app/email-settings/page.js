"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../components/Header";

export default function EmailSettingsPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (user && newEmail) {
        await user.update({ email: newEmail });
        router.push("/profile");
      }
    } catch (error) {
      setError(error.message || "Failed to update email.");
    } finally {
      setLoading(false);
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
          Change Email
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newEmail"
              className="block text-sm font-medium mb-1"
            >
              New Email Address
            </label>
            <input
              type="email"
              id="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#1E2636] border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white transition"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold rounded-lg transition ${
              loading
                ? "bg-blue-600 opacity-50 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Update Email"}
          </button>
        </form>
      </div>
    </div>
  );
}
