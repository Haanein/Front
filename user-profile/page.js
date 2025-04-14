"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UserProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setUsername(user.username || "");
    }
  }, [user, isLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const updatedFields = {};
      if (firstName !== user.firstName) {
        updatedFields.firstName = firstName;
      }
      if (lastName !== user.lastName) {
        updatedFields.lastName = lastName;
      }
      if (username !== user.username) {
        updatedFields.username = username;
      }

      if (Object.keys(updatedFields).length > 0) {
        await user.update(updatedFields);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error) {
      setError(error.message || "Failed to update profile.");
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold">Please log in to view this page.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center mb-8">Update Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg"
        >
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-white text-sm font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-white text-sm font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-white text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Error: </strong> {error}
            </div>
          )}

          {success && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Success!</strong> Profile updated
              successfully.
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Username
          </button>
        </form>
      </div>
    </div>
  );
}
