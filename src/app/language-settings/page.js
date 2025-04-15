"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function LanguageSettingsPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Available languages
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "ar", name: "Arabic" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
  ];

  // Redirect if not signed in
  if (isLoaded && !isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  // Load user's language preference from localStorage or user metadata
  useEffect(() => {
    if (user) {
      // Try to get language from user metadata first
      const userLanguage =
        user.unsafeMetadata?.language ||
        localStorage.getItem("userLanguage") ||
        "en";
      setSelectedLanguage(userLanguage);
    }
  }, [user]);

  const handleChangeLanguage = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Store language in user metadata via Clerk
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          language: selectedLanguage,
        },
      });

      // Also store in localStorage for quick access
      localStorage.setItem("userLanguage", selectedLanguage);

      setSuccessMessage("Language preference updated successfully!");

      // Redirect back to dashboard after successful update
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error updating language:", error);
      setErrorMessage(
        error.message ||
          "Failed to update language preference. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Header />

      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-400 hover:text-white mb-6"
      >
        &lt; Back
      </button>

      <div className="text-2xl font-bold mb-6">Language Settings</div>

      {errorMessage && (
        <div className="bg-red-900/50 border border-red-500 text-white px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-900/50 border border-green-500 text-white px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleChangeLanguage} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-4">
            Select Language
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {languages.map((language) => (
              <div
                key={language.code}
                onClick={() => setSelectedLanguage(language.code)}
                className={`
                  p-4 rounded-xl cursor-pointer transition-all
                  ${
                    selectedLanguage === language.code
                      ? "bg-blue-600 border-2 border-blue-400"
                      : "bg-gray-800 border border-gray-700 hover:bg-gray-700"
                  }
                `}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center">
                    {selectedLanguage === language.code && (
                      <div className="h-3 w-3 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="ml-3">
                    <label className="text-md font-medium cursor-pointer">
                      {language.name}
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Language"}
          </button>
        </div>
      </form>
    </div>
  );
}
