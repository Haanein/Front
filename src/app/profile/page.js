"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../components/Header";
import { useClerk } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

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

  // Helper function to display user data with fallbacks
  const getUserData = (key) => {
    switch (key) {
      case "Username":
        return user.username || "Not set";
      case "Phone number":
        return user.primaryPhoneNumber?.phoneNumber || "Not set";
      case "Email":
        return user.primaryEmailAddress?.emailAddress || "Not set";
      case "Password":
        return "••••••••";
      default:
        return "Not available";
    }
  };

  // Handle item clicks with improved Clerk functionality
  const handleItemClick = async (item) => {
    setIsUpdating(true);
    try {
      switch (item) {
        case "Username":
          // Clerk doesn't have a direct username update method through the frontend SDK
          // We need to use the user.update() method
          router.push("/user-profile");
          break;
        case "Phone number":
          if (!user.primaryPhoneNumber) {
            // If no phone number exists, show the phone verification UI
            const phoneVerification = await user.createPhoneNumberVerification({
              strategy: "popup",
            });
            // This will open Clerk's modal for phone verification
          } else {
            // If phone exists, navigate to a page to update it
            router.push("/phone-settings");
          }
          break;
        case "Email":
          if (user.emailAddresses.length > 0) {
            router.push("/email-settings");
          } else {
            // If no email exists, show the email creation UI
            await user.createEmailAddress({
              strategy: "popup",
            });
          }
          break;
        case "Password":
          // This requires Clerk's hosted pages or a custom implementation
          // Redirect to Clerk's password change page
          const { openUserProfile } = useClerk();
          openUserProfile({
            initialPage: "security", // Open security tab directly
          });
          break;
        case "Theme":
          // Implement theme toggle functionality
          // You would typically use a state or context for this
          break;
        case "Language":
          // Implement language settings
          router.push("/language-settings");
          break;
        case "Rate the app":
          window.open("https://your-app-store-link.com", "_blank");
          break;
        case "Privacy Policy":
          router.push("/privacy-policy");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error handling item click:", error);
      // Implement proper error handling here
      // Could show a toast notification
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Header />

      <div className="text-2xl font-bold flex items-center gap-2 mt-4">
        Account
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center mt-6">
        <img
          src={
            user.imageUrl ||
            user.profileImageUrl ||
            "https://via.placeholder.com/150"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-white object-cover"
        />
        <h2 className="mt-2 text-lg font-semibold">{user.fullName}</h2>
      </div>

      {/* Personal Information */}
      <h3 className="text-lg font-semibold mt-6">Personal information</h3>
      <div className="border border-gray-700 rounded-3xl mt-2 overflow-hidden">
        {["Username", "Phone number", "Email", "Password"].map(
          (item, index, array) => (
            <div
              key={item}
              className={`flex justify-between py-4 px-6 bg-gray-800 ${
                index !== array.length - 1 ? "border-b border-gray-700" : ""
              } cursor-pointer hover:bg-gray-700 ${
                isUpdating ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              <span>{item}</span>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">{getUserData(item)}</span>
                <span>&gt;</span>
              </div>
            </div>
          )
        )}
      </div>

      {/* Settings */}
      <h3 className="text-lg font-semibold mt-6">Settings</h3>
      <div className="border border-gray-700 rounded-3xl mt-2 overflow-hidden">
        {["Theme", "Language"].map((item, index, array) => (
          <div
            key={item}
            className={`flex justify-between py-4 px-6 bg-gray-800 ${
              index !== array.length - 1 ? "border-b border-gray-700" : ""
            } cursor-pointer hover:bg-gray-700 ${
              isUpdating ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            <span>{item}</span>
            <span>&gt;</span>
          </div>
        ))}
      </div>

      {/* More */}
      <h3 className="text-lg font-semibold mt-6">More</h3>
      <div className="border border-gray-700 rounded-3xl mt-2 overflow-hidden">
        {["Rate the app", "Privacy Policy"].map((item, index, array) => (
          <div
            key={item}
            className={`flex justify-between py-4 px-6 bg-gray-800 ${
              index !== array.length - 1 ? "border-b border-gray-700" : ""
            } cursor-pointer hover:bg-gray-700 ${
              isUpdating ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            <span>{item}</span>
            <span>&gt;</span>
          </div>
        ))}
      </div>

      {/* Sign Out Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-full transition duration-200 disabled:opacity-50"
          disabled={isUpdating}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
