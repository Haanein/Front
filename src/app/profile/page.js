"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function DashboardPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

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
        return user.username || user.firstName || "Not set";
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

  // Handle item clicks
  const handleItemClick = (item) => {
    switch (item) {
      case "Username":
        router.push("/user-profile");
        break;
      case "Phone number":
        user.createPhoneNumberVerification();
        break;
      case "Email":
        router.push("/email-settings");
        break;
      case "Password":
        router.push("/password-settings");
        break;
      case "Theme":
        // Implement theme toggle functionality
        break;
      case "Language":
        // Implement language settings
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
        <h2 className="mt-2 text-lg font-semibold">
          {user.firstName} {user.lastName}
        </h2>
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
              } cursor-pointer hover:bg-gray-700`}
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
            } cursor-pointer hover:bg-gray-700`}
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
            } cursor-pointer hover:bg-gray-700`}
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
          onClick={() => {
            user.signOut();
            router.push("/");
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-full transition duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
