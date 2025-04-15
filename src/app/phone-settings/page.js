"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function PhoneSettingsPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [verificationId, setVerificationId] = useState(null);

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

  // Load user's current phone number
  useEffect(() => {
    if (user && user.primaryPhoneNumber) {
      setPhoneNumber(user.primaryPhoneNumber.phoneNumber || "");
    }
  }, [user]);

  const handleAddPhone = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Create a new phone verification
      const result = await user.createPhoneNumber({ phoneNumber });
      setVerificationId(result.id);
      setIsVerifying(true);
      setSuccessMessage("Verification code sent to your phone number!");
    } catch (error) {
      console.error("Error adding phone:", error);
      setErrorMessage(
        error.message || "Failed to add phone number. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyPhone = async (e) => {
    e.preventDefault();
    if (!verificationCode || !verificationId) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Verify the phone number with the code
      await user.verifyPhoneNumber({
        code: verificationCode,
        phoneNumberId: verificationId,
      });

      // Set as primary phone
      if (user.phoneNumbers && user.phoneNumbers.length > 0) {
        const phoneToSet = user.phoneNumbers.find(
          (phone) => phone.id === verificationId
        );
        if (phoneToSet) {
          await user.setPrimaryPhoneNumber({ phoneNumberId: phoneToSet.id });
        }
      }

      setSuccessMessage("Phone number verified and set as primary!");
      setIsVerifying(false);

      // Redirect back to dashboard after successful verification
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error verifying phone:", error);
      setErrorMessage(
        error.message ||
          "Failed to verify phone number. Please check the code and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemovePhone = async () => {
    if (!user.primaryPhoneNumber) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await user.deletePhoneNumber({ id: user.primaryPhoneNumber.id });
      setSuccessMessage("Phone number removed successfully!");
      setPhoneNumber("");

      // Redirect back to dashboard after successful removal
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error removing phone:", error);
      setErrorMessage(
        error.message || "Failed to remove phone number. Please try again."
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

      <div className="text-2xl font-bold mb-6">Phone Settings</div>

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

      {/* Current Phone Number */}
      {user.primaryPhoneNumber && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Your Phone Number</h3>

          <div className="border border-gray-700 rounded-xl overflow-hidden">
            <div className="flex justify-between py-4 px-6 bg-gray-800 items-center">
              <div>
                <div className="flex items-center">
                  <span>{user.primaryPhoneNumber.phoneNumber}</span>
                  <span className="ml-2 bg-blue-600 text-xs py-1 px-2 rounded-full">
                    Primary
                  </span>
                </div>
              </div>
              <button
                onClick={handleRemovePhone}
                disabled={isSubmitting}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Update Phone Number Form */}
      {!user.primaryPhoneNumber && !isVerifying && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {user.primaryPhoneNumber
              ? "Update Phone Number"
              : "Add Phone Number"}
          </h3>
          <form onSubmit={handleAddPhone} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter phone number (e.g., +1234567890)"
                required
              />
              <p className="text-sm text-gray-400 mt-1">
                Include country code (e.g., +1 for US)
              </p>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting || !phoneNumber}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Verification Code"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Verify Phone Code Form */}
      {isVerifying && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Verify Your Phone Number
          </h3>
          <p className="mb-4 text-gray-300">
            We've sent a verification code to {phoneNumber}. Please enter it
            below.
          </p>
          <form onSubmit={handleVerifyPhone} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter 6-digit code"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsVerifying(false)}
                className="text-gray-400 hover:text-white"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !verificationCode}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {isSubmitting ? "Verifying..." : "Verify Phone Number"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
