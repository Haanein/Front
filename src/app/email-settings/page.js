"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function EmailSettingsPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  // Load user's email addresses
  useEffect(() => {
    if (user) {
      setEmails(user.emailAddresses || []);
    }
  }, [user]);

  const handleAddEmail = async (e) => {
    e.preventDefault();
    if (!newEmail) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Create a new email address
      await user.createEmailAddress({ email: newEmail });
      setSuccessMessage("Verification email sent! Please check your inbox.");
      setNewEmail("");
      // Refresh the list of emails
      setEmails(user.emailAddresses);
    } catch (error) {
      console.error("Error adding email:", error);
      setErrorMessage(
        error.message || "Failed to add email. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSetPrimary = async (emailId) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await user.setPrimaryEmailAddress({ id: emailId });
      setSuccessMessage("Primary email updated successfully!");
      // Refresh the list of emails
      setEmails(user.emailAddresses);
    } catch (error) {
      console.error("Error setting primary email:", error);
      setErrorMessage(
        error.message || "Failed to update primary email. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveEmail = async (emailId) => {
    // Don't allow removing the primary email
    const emailToRemove = emails.find((email) => email.id === emailId);
    if (emailToRemove?.primary) {
      setErrorMessage("You cannot remove your primary email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await user.deleteEmailAddress({ id: emailId });
      setSuccessMessage("Email removed successfully!");
      // Refresh the list of emails
      setEmails(user.emailAddresses);
    } catch (error) {
      console.error("Error removing email:", error);
      setErrorMessage(
        error.message || "Failed to remove email. Please try again."
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

      <div className="text-2xl font-bold mb-6">Email Settings</div>

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

      {/* Current Email Addresses */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Your Email Addresses</h3>

        {emails.length === 0 ? (
          <p className="text-gray-400">No email addresses added yet.</p>
        ) : (
          <div className="border border-gray-700 rounded-xl overflow-hidden">
            {emails.map((email, index) => (
              <div
                key={email.id}
                className={`flex justify-between py-4 px-6 bg-gray-800 items-center ${
                  index !== emails.length - 1 ? "border-b border-gray-700" : ""
                }`}
              >
                <div>
                  <div className="flex items-center">
                    <span>{email.emailAddress}</span>
                    {email.primary && (
                      <span className="ml-2 bg-blue-600 text-xs py-1 px-2 rounded-full">
                        Primary
                      </span>
                    )}
                    {!email.verified && (
                      <span className="ml-2 bg-yellow-600 text-xs py-1 px-2 rounded-full">
                        Unverified
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-3">
                  {!email.primary && email.verified && (
                    <button
                      onClick={() => handleSetPrimary(email.id)}
                      disabled={isSubmitting}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Make Primary
                    </button>
                  )}
                  {!email.primary && (
                    <button
                      onClick={() => handleRemoveEmail(email.id)}
                      disabled={isSubmitting}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  )}
                  {!email.verified && (
                    <button
                      onClick={async () => {
                        try {
                          await user.resendEmailAddressVerification({
                            id: email.id,
                          });
                          setSuccessMessage(
                            "Verification email sent! Please check your inbox."
                          );
                        } catch (error) {
                          setErrorMessage(
                            "Failed to resend verification email."
                          );
                        }
                      }}
                      disabled={isSubmitting}
                      className="text-yellow-400 hover:text-yellow-300 text-sm"
                    >
                      Resend Verification
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add New Email */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Add New Email</h3>
        <form onSubmit={handleAddEmail} className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter new email address"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !newEmail}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Adding..." : "Add Email"}
          </button>
        </form>
      </div>
    </div>
  );
}
