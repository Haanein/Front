"use client";

import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Header />

      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-400 hover:text-white mb-6"
      >
        &lt; Back
      </button>

      <div className="text-2xl font-bold mb-6">Privacy Policy</div>

      <div className="bg-gray-800 rounded-xl p-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-300 mb-4">
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our application. Please read
            this Privacy Policy carefully. By using the application, you agree
            to the collection and use of information in accordance with this
            policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-300 mb-4">
            We collect several different types of information for various
            purposes to provide and improve our service to you:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>
              <span className="font-semibold">Personal Data:</span> While using
              our application, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you. This may include, but is not limited to:
              <ul className="list-disc pl-6 mt-2">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Usage Data</li>
              </ul>
            </li>
            <li className="mt-2">
              <span className="font-semibold">Usage Data:</span> We may also
              collect information on how the application is accessed and used.
              This may include information such as your device's Internet
              Protocol address, browser type, browser version, the pages of our
              application that you visit, the time and date of your visit, the
              time spent on those pages, unique device identifiers, and other
              diagnostic data.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Use of Data</h2>
          <p className="text-gray-300 mb-2">
            We use the collected data for various purposes:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>
              To gather analysis or valuable information so that we can improve
              our service
            </li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To fulfill any other purpose for which you provide it</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Security of Data</h2>
          <p className="text-gray-300">
            The security of your data is important to us, but remember that no
            method of transmission over the Internet, or method of electronic
            storage is 100% secure. While we strive to use commercially
            acceptable means to protect your Personal Data, we cannot guarantee
            its absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-300">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "effective date" at the top of this Privacy Policy.
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-300">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <div className="mt-2 text-blue-400">support@yourapp.com</div>
        </section>
      </div>
    </div>
  );
}
